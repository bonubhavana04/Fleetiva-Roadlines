const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: false },
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: { 
    type: String, 
    required: false, 
    unique: true,
    sparse: true,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format validation
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'driver', 'admin', 'superadmin'], default: 'customer' },
  authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
  googleUid: { type: String, unique: true, sparse: true },
  picture: String,
  refreshToken: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);