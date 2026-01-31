const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authMiddleware} = require('../middleware/auth');

// Get user profile
router.get('/profile', authMiddleware, userController.getProfile);

// Update user profile
router.put('/profile', authMiddleware, userController.updateProfile);

// Get ride history
router.get('/ride-history', authMiddleware, userController.getRideHistory);

module.exports = router;
