const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { twilioClient, redisClient } = require('../config/clients');
const admin = require('firebase-admin');
const User = require('../models/User');
const Tenant = require('../models/Tenant');
const { AppError, ValidationError, AuthError } = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');

// Memory-based fallback for OTP storage when Redis is disabled
const memoryOtpStore = new Map();

// Cleanup expired OTPs every hour to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of memoryOtpStore.entries()) {
    if (value.expires < now) {
      memoryOtpStore.delete(key);
    }
  }
}, 3600000);

router.post('/register', asyncHandler(async (req, res, next) => {
    const { phone, name, password, role } = req.body;
    
    // Basic Request Validation
    if (!phone || !name || !password || !role) {
      return next(new ValidationError("All fields (name, phone, password, role) are required"));
    }

    if (phone.length < 10) {
      return next(new ValidationError("Please enter a valid phone number"));
    }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
  if (redisClient?.isReady) {
    await redisClient.set(phone, JSON.stringify({ 
      data: { ...req.body, password: hashedPassword }, 
      otp 
    }), { EX: 300 });
  } else {
    memoryOtpStore.set(phone, { data: { ...req.body, password: hashedPassword }, otp, expires: Date.now() + 300000 });
  }

  if (twilioClient) {
    await twilioClient.messages.create({
      body: `Your OTP for Logistics MS is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
  } else {
    console.log(`\n[DEV MOCK SMS] OTP for ${phone} is: ${otp}\n`);
  }

  res.json({ message: "OTP sent to your phone" });
}));

router.post('/verify-otp', asyncHandler(async (req, res, next) => {
  const { phone, otp } = req.body;
  
  let record = null;

  if (redisClient?.isReady) {
    const recordStr = await redisClient.get(phone);
    if (recordStr) record = JSON.parse(recordStr);
  } else {
    const memRecord = memoryOtpStore.get(phone);
    if (memRecord && memRecord.expires > Date.now()) {
      record = memRecord;
    }
  }

  if (!record) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

  const { data } = record;
  let tenantId = data.tenantId;
  if (!tenantId && data.companyName) {
    const newTenant = new Tenant({ name: data.companyName });
    await newTenant.save();
    tenantId = newTenant._id;
  }
  if (!tenantId) return next(new ValidationError("Company Name or Tenant ID is required"));

  const user = new User({ ...data, tenant: tenantId });
  await user.save();
  
  if (redisClient?.isReady) await redisClient.del(phone);
  else memoryOtpStore.delete(phone);

  res.json({ message: "User registered successfully" });
}));

router.post('/resend-otp', asyncHandler(async (req, res, next) => {
  const { phone } = req.body;
  let record = null;

  if (redisClient?.isReady) {
    const recordStr = await redisClient.get(phone);
    if (recordStr) record = JSON.parse(recordStr);
  } else {
    record = memoryOtpStore.get(phone);
  }

  if (!record) return res.status(400).json({ message: "No pending registration found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  record.otp = otp;
  
  if (redisClient?.isReady) {
    await redisClient.set(phone, JSON.stringify(record), { EX: 300 });
  } else {
    record.expires = Date.now() + 300000;
    memoryOtpStore.set(phone, record);
  }

  await twilioClient.messages.create({
    body: `Your new OTP for Logistics MS is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone
  });

  res.json({ message: "New OTP sent" });
}));

router.post('/login', asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ phone: req.body.phone });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new AuthError("Invalid credentials"));
  }
  const accessToken = jwt.sign({ id: user._id, role: user.role, tenantId: user.tenant }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user._id, role: user.role, tenantId: user.tenant }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  user.refreshToken = refreshToken;
  await user.save();
  res.cookie('refreshToken', refreshToken, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
  }).json({ accessToken, role: user.role });
}));

router.post('/refresh', asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);
  const user = await User.findOne({ refreshToken: token });
  if (!user) return res.sendStatus(403);
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign({ id: user._id, role: user.role, tenantId: user.tenant }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  });
}));

router.post('/google', asyncHandler(async (req, res, next) => {
  const { idToken } = req.body;
  if (!idToken) return next(new ValidationError("ID Token is required"));

  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const { uid, email, name, picture } = decodedToken;

  let user = await User.findOne({ $or: [{ googleUid: uid }, { email }] });

  if (!user) {
    // Create new user if not exists
    const randomPassword = await bcrypt.hash(Math.random().toString(36), 10);
    user = new User({
      name,
      email,
      googleUid: uid,
      authProvider: 'google',
      picture,
      password: randomPassword, // Satisfy schema requirement
      role: 'customer'
    });
    await user.save();
  } else {
    // Link Google account if user exists via email/phone
    user.googleUid = uid;
    user.authProvider = 'google';
    if (picture) user.picture = picture;
    await user.save();
  }

  const accessToken = jwt.sign({ id: user._id, role: user.role, tenantId: user.tenant }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user._id, role: user.role, tenantId: user.tenant }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
  }).json({ accessToken, role: user.role });
}));

router.post('/forgot-password', asyncHandler(async (req, res, next) => {
  const { phone } = req.body;
  if (!phone) return next(new ValidationError("Phone number is required"));

  const user = await User.findOne({ phone });
  if (!user) return next(new AppError("No user found with this phone number", 404));

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  if (redisClient?.isReady) {
    await redisClient.set(`reset:${phone}`, otp, { EX: 300 });
  } else {
    memoryOtpStore.set(`reset:${phone}`, { otp, expires: Date.now() + 300000 });
  }

  await twilioClient.messages.create({
    body: `Your password reset OTP for Logistics MS is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone
  });

  res.json({ message: "Reset OTP sent to your phone" });
}));

router.post('/reset-password', asyncHandler(async (req, res, next) => {
  const { phone, otp, newPassword } = req.body;
  if (!phone || !otp || !newPassword) return next(new ValidationError("All fields are required"));

  let storedOtp = null;
  if (redisClient?.isReady) {
    storedOtp = await redisClient.get(`reset:${phone}`);
  } else {
    const record = memoryOtpStore.get(`reset:${phone}`);
    if (record && record.expires > Date.now()) {
      storedOtp = record.otp;
    }
  }

  if (!storedOtp || storedOtp !== otp) {
    return next(new ValidationError("Invalid or expired OTP"));
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ phone }, { password: hashedPassword });
  
  if (redisClient?.isReady) await redisClient.del(`reset:${phone}`);
  else memoryOtpStore.delete(`reset:${phone}`);

  res.json({ message: "Password reset successfully" });
}));

module.exports = router;