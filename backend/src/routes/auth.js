const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Send OTP
router.post('/send-otp', authController.sendOTP);

// Verify OTP
router.post('/verify-otp', authController.verifyOTP);

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

module.exports = router;
