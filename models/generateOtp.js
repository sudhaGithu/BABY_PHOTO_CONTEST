const mongoose = require('mongoose');

const generateOtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  otpExpiration:{
    type:Date,
    default:Date.now,
    get:(otpExpiration) => otpExpiration.getTime(),
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('generateOtp',generateOtpSchema);