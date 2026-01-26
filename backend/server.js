require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const { AppError } = require('./utils/appError');

// OPTIONAL services (won’t crash app)
require('./config/clients');

/* ===================== FIREBASE ADMIN ===================== */
const admin = require('firebase-admin');
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('✅ Firebase Admin initialized');
  } catch (err) {
    console.error('❌ Firebase Admin initialization failed:', err.message);
  }
}

const app = express();

/* ===================== MIDDLEWARE ===================== */
app.use(express.json());
app.use(cors({ 
  origin: process.env.FRONTEND_URL || "https://fleetiva-roadlines.vercel.app", 
  credentials: true 
}));
app.use(cookieParser());

/* ===================== HEALTH CHECK ===================== */
// ⚠️ MUST respond fast for Render
app.get('/', (req, res) => {
  res.status(200).send('Fleetiva backend is running 🚀');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

/* ===================== ROUTES ===================== */
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/logistics'));

/* ===================== ERROR HANDLING ===================== */
app.use((req, res, next) => {
  next(new AppError(`Route not found - ${req.originalUrl}`, 404));
});

app.use(errorHandler);

/* ===================== DATABASE ===================== */
const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', false);
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err =>
      console.error('⚠️ MongoDB connection failed (app still running):', err.message)
    );
} else {
  console.warn('⚠️ MONGO_URI not set. Running without database.');
}

/* ===================== SERVER ===================== */
// 🚨 THIS IS CRITICAL FOR RENDER
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

/* ===================== SAFETY ===================== */
// DO NOT exit process on Render
process.on('unhandledRejection', err => {
  console.error('Unhandled rejection (ignored):', err.message);
});
