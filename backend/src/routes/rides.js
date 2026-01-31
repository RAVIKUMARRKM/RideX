const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');
const {authMiddleware} = require('../middleware/auth');

// Estimate fare
router.post('/estimate', authMiddleware, rideController.estimateFare);

// Request a ride
router.post('/request', authMiddleware, rideController.requestRide);

// Get ride details
router.get('/:id', authMiddleware, rideController.getRideDetails);

// Cancel ride
router.put('/:id/cancel', authMiddleware, rideController.cancelRide);

// Get nearby drivers
router.get('/drivers/nearby', authMiddleware, rideController.getNearbyDrivers);

module.exports = router;
