const otpController=require('../controllers/otpcontroller')
// require('dotenv').config();
const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/sendotp', otpController.generateOtp);
router.post('/verifyotp', otpController.verifyOtp)

module.exports = router;