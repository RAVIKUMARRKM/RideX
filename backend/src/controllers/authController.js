const pool = require('../config/database');
const jwt = require('jsonwebtoken');

// Generate random 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Send OTP
exports.sendOTP = async (req, res) => {
  try {
    const {phoneNumber} = req.body;

    if (!phoneNumber) {
      return res.status(400).json({message: 'Phone number is required'});
    }

    // Demo mode for testing without database
    if (process.env.DEMO_MODE === 'true') {
      const demoOTP = process.env.DEMO_OTP || '123456';
      console.log(`DEMO MODE: OTP for ${phoneNumber}: ${demoOTP}`);
      return res.json({
        message: 'OTP sent successfully',
        otp: demoOTP,
      });
    }

    // Generate OTP
    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to database
    await pool.query(
      `INSERT INTO otp_codes (phone_number, otp_code, expires_at)
       VALUES ($1, $2, $3)`,
      [phoneNumber, otpCode, expiresAt],
    );

    // In production, send OTP via SMS (Twilio)
    console.log(`OTP for ${phoneNumber}: ${otpCode}`);

    // For demo purposes, return OTP in development
    if (process.env.NODE_ENV === 'development') {
      return res.json({
        message: 'OTP sent successfully',
        otp: otpCode, // Remove in production!
      });
    }

    res.json({message: 'OTP sent successfully'});
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({message: 'Failed to send OTP'});
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const {phoneNumber, otp} = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({message: 'Phone number and OTP are required'});
    }

    // Demo mode for testing without database
    if (process.env.DEMO_MODE === 'true') {
      const demoOTP = process.env.DEMO_OTP || '123456';
      if (otp !== demoOTP) {
        return res.status(400).json({message: 'Invalid OTP'});
      }

      // Return demo user
      const token = jwt.sign(
        {userId: 1, role: 'rider'},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '7d'},
      );

      console.log(`DEMO MODE: Login successful for ${phoneNumber}`);
      return res.json({
        message: 'Login successful',
        token,
        user: {
          id: 1,
          phoneNumber,
          fullName: 'Demo User',
          email: 'demo@ridex.com',
          role: 'rider',
          profilePhoto: null,
        },
      });
    }

    // Check OTP
    const result = await pool.query(
      `SELECT * FROM otp_codes
       WHERE phone_number = $1 AND otp_code = $2 AND expires_at > NOW() AND is_verified = false
       ORDER BY created_at DESC LIMIT 1`,
      [phoneNumber, otp],
    );

    if (result.rows.length === 0) {
      return res.status(400).json({message: 'Invalid or expired OTP'});
    }

    // Mark OTP as verified
    await pool.query(
      `UPDATE otp_codes SET is_verified = true WHERE id = $1`,
      [result.rows[0].id],
    );

    // Check if user exists
    const userResult = await pool.query(
      `SELECT * FROM users WHERE phone_number = $1`,
      [phoneNumber],
    );

    if (userResult.rows.length === 0) {
      // New user - needs registration
      return res.json({
        message: 'OTP verified',
        needsRegistration: true,
        phoneNumber,
      });
    }

    // Existing user - generate token
    const user = userResult.rows[0];
    const token = jwt.sign(
      {userId: user.id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_EXPIRES_IN || '7d'},
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        phoneNumber: user.phone_number,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        profilePhoto: user.profile_photo_url,
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({message: 'Failed to verify OTP'});
  }
};

// Register
exports.register = async (req, res) => {
  try {
    const {phoneNumber, fullName, email, role = 'rider'} = req.body;

    if (!phoneNumber || !fullName) {
      return res.status(400).json({message: 'Phone number and full name are required'});
    }

    // Check if user already exists
    const existingUser = await pool.query(
      `SELECT * FROM users WHERE phone_number = $1`,
      [phoneNumber],
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({message: 'User already exists'});
    }

    // Create user
    const result = await pool.query(
      `INSERT INTO users (phone_number, full_name, email, role)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [phoneNumber, fullName, email, role],
    );

    const user = result.rows[0];

    // Generate token
    const token = jwt.sign(
      {userId: user.id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_EXPIRES_IN || '7d'},
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        phoneNumber: user.phone_number,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({message: 'Registration failed'});
  }
};

// Login (fallback method)
exports.login = async (req, res) => {
  try {
    const {phoneNumber} = req.body;

    if (!phoneNumber) {
      return res.status(400).json({message: 'Phone number is required'});
    }

    const result = await pool.query(
      `SELECT * FROM users WHERE phone_number = $1`,
      [phoneNumber],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({message: 'User not found'});
    }

    const user = result.rows[0];
    const token = jwt.sign(
      {userId: user.id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_EXPIRES_IN || '7d'},
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        phoneNumber: user.phone_number,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({message: 'Login failed'});
  }
};
