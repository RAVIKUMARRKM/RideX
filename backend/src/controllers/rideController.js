const pool = require('../config/database');

// Calculate distance using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Estimate fare
exports.estimateFare = async (req, res) => {
  try {
    const {pickupLat, pickupLng, destLat, destLng, vehicleType = 'car'} = req.body;

    if (!pickupLat || !pickupLng || !destLat || !destLng) {
      return res.status(400).json({message: 'Coordinates are required'});
    }

    // Calculate distance
    const distance = calculateDistance(pickupLat, pickupLng, destLat, destLng);

    // Pricing configuration
    const pricing = {
      bike: {baseFare: 2.0, perKm: 0.5, perMinute: 0.1},
      auto: {baseFare: 1.5, perKm: 0.4, perMinute: 0.08},
      car: {baseFare: 2.5, perKm: 0.8, perMinute: 0.15},
      suv: {baseFare: 3.5, perKm: 1.2, perMinute: 0.2},
    };

    const rates = pricing[vehicleType] || pricing.car;

    // Estimate duration (assuming avg speed of 40 km/h)
    const estimatedDuration = (distance / 40) * 60; // in minutes

    // Calculate fare
    const baseFare = rates.baseFare;
    const distanceFare = distance * rates.perKm;
    const timeFare = estimatedDuration * rates.perMinute;
    const totalFare = baseFare + distanceFare + timeFare;

    res.json({
      distance: distance.toFixed(2),
      estimatedDuration: Math.round(estimatedDuration),
      baseFare: baseFare.toFixed(2),
      distanceFare: distanceFare.toFixed(2),
      timeFare: timeFare.toFixed(2),
      totalFare: totalFare.toFixed(2),
      vehicleType,
    });
  } catch (error) {
    console.error('Estimate fare error:', error);
    res.status(500).json({message: 'Failed to estimate fare'});
  }
};

// Request a ride
exports.requestRide = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      pickupLat,
      pickupLng,
      pickupAddress,
      destLat,
      destLng,
      destAddress,
      vehicleType = 'car',
    } = req.body;

    if (!pickupLat || !pickupLng || !destLat || !destLng) {
      return res.status(400).json({message: 'Coordinates are required'});
    }

    // Calculate distance and fare
    const distance = calculateDistance(pickupLat, pickupLng, destLat, destLng);
    const estimatedDuration = (distance / 40) * 60;

    const pricing = {
      bike: {baseFare: 2.0, perKm: 0.5, perMinute: 0.1},
      auto: {baseFare: 1.5, perKm: 0.4, perMinute: 0.08},
      car: {baseFare: 2.5, perKm: 0.8, perMinute: 0.15},
      suv: {baseFare: 3.5, perKm: 1.2, perMinute: 0.2},
    };

    const rates = pricing[vehicleType] || pricing.car;
    const totalFare =
      rates.baseFare +
      distance * rates.perKm +
      estimatedDuration * rates.perMinute;

    // Create ride
    const result = await pool.query(
      `INSERT INTO rides (
        rider_id, pickup_latitude, pickup_longitude, pickup_address,
        destination_latitude, destination_longitude, destination_address,
        vehicle_type, fare_amount, distance_km, duration_minutes, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`,
      [
        userId,
        pickupLat,
        pickupLng,
        pickupAddress,
        destLat,
        destLng,
        destAddress,
        vehicleType,
        totalFare.toFixed(2),
        distance.toFixed(2),
        Math.round(estimatedDuration),
        'requested',
      ],
    );

    const ride = result.rows[0];

    // TODO: Find and notify nearby drivers
    // This would involve:
    // 1. Query for nearby online drivers
    // 2. Send push notification to drivers
    // 3. Wait for driver acceptance

    res.status(201).json({
      message: 'Ride requested successfully',
      ride: {
        id: ride.id,
        status: ride.status,
        pickup: {
          address: ride.pickup_address,
          latitude: ride.pickup_latitude,
          longitude: ride.pickup_longitude,
        },
        destination: {
          address: ride.destination_address,
          latitude: ride.destination_latitude,
          longitude: ride.destination_longitude,
        },
        fare: ride.fare_amount,
        distance: ride.distance_km,
        estimatedDuration: ride.duration_minutes,
        vehicleType: ride.vehicle_type,
      },
    });
  } catch (error) {
    console.error('Request ride error:', error);
    res.status(500).json({message: 'Failed to request ride'});
  }
};

// Get ride details
exports.getRideDetails = async (req, res) => {
  try {
    const {id} = req.params;
    const userId = req.userId;

    const result = await pool.query(
      `SELECT r.*,
              u_driver.full_name as driver_name,
              u_driver.phone_number as driver_phone,
              u_driver.profile_photo_url as driver_photo,
              u_driver.rating_average as driver_rating,
              d.vehicle_model, d.vehicle_color, d.vehicle_plate_number
       FROM rides r
       LEFT JOIN drivers d ON r.driver_id = d.id
       LEFT JOIN users u_driver ON d.user_id = u_driver.id
       WHERE r.id = $1 AND (r.rider_id = $2 OR d.user_id = $2)`,
      [id, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({message: 'Ride not found'});
    }

    const ride = result.rows[0];
    res.json({
      ride: {
        id: ride.id,
        status: ride.status,
        pickup: {
          address: ride.pickup_address,
          latitude: ride.pickup_latitude,
          longitude: ride.pickup_longitude,
        },
        destination: {
          address: ride.destination_address,
          latitude: ride.destination_latitude,
          longitude: ride.destination_longitude,
        },
        driver: ride.driver_name
          ? {
              name: ride.driver_name,
              phone: ride.driver_phone,
              photo: ride.driver_photo,
              rating: ride.driver_rating,
              vehicle: {
                model: ride.vehicle_model,
                color: ride.vehicle_color,
                plate: ride.vehicle_plate_number,
              },
            }
          : null,
        fare: ride.fare_amount,
        distance: ride.distance_km,
        duration: ride.duration_minutes,
        paymentStatus: ride.payment_status,
        requestedAt: ride.requested_at,
        acceptedAt: ride.accepted_at,
        startedAt: ride.started_at,
        completedAt: ride.completed_at,
      },
    });
  } catch (error) {
    console.error('Get ride details error:', error);
    res.status(500).json({message: 'Failed to get ride details'});
  }
};

// Cancel ride
exports.cancelRide = async (req, res) => {
  try {
    const {id} = req.params;
    const userId = req.userId;
    const {reason} = req.body;

    const result = await pool.query(
      `UPDATE rides
       SET status = 'cancelled',
           cancelled_at = NOW(),
           cancellation_reason = $1
       WHERE id = $2 AND rider_id = $3 AND status IN ('requested', 'accepted')
       RETURNING *`,
      [reason, id, userId],
    );

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({message: 'Cannot cancel ride'});
    }

    res.json({
      message: 'Ride cancelled successfully',
      ride: {
        id: result.rows[0].id,
        status: result.rows[0].status,
      },
    });
  } catch (error) {
    console.error('Cancel ride error:', error);
    res.status(500).json({message: 'Failed to cancel ride'});
  }
};

// Get nearby drivers
exports.getNearbyDrivers = async (req, res) => {
  try {
    const {latitude, longitude, radius = 5} = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({message: 'Coordinates are required'});
    }

    // Demo mode - return mock drivers
    if (process.env.DEMO_MODE === 'true') {
      const mockDrivers = [
        {
          id: 1,
          name: 'John Smith',
          rating: 4.8,
          distance: '0.5',
          vehicle: {type: 'car', model: 'Toyota Camry', color: 'Black'},
          location: {latitude: parseFloat(latitude) + 0.002, longitude: parseFloat(longitude) + 0.002},
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          rating: 4.9,
          distance: '1.2',
          vehicle: {type: 'suv', model: 'Honda CR-V', color: 'White'},
          location: {latitude: parseFloat(latitude) - 0.003, longitude: parseFloat(longitude) + 0.001},
        },
        {
          id: 3,
          name: 'Mike Davis',
          rating: 4.7,
          distance: '2.0',
          vehicle: {type: 'car', model: 'Hyundai Elantra', color: 'Silver'},
          location: {latitude: parseFloat(latitude) + 0.004, longitude: parseFloat(longitude) - 0.002},
        },
      ];
      return res.json({drivers: mockDrivers});
    }

    // Simple query to get online drivers
    const result = await pool.query(
      `SELECT d.*, u.full_name, u.rating_average
       FROM drivers d
       JOIN users u ON d.user_id = u.id
       WHERE d.is_online = true
         AND d.current_latitude IS NOT NULL
         AND d.current_longitude IS NOT NULL`,
    );

    const nearbyDrivers = result.rows
      .map(driver => {
        const distance = calculateDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          parseFloat(driver.current_latitude),
          parseFloat(driver.current_longitude),
        );

        return {
          id: driver.id,
          name: driver.full_name,
          rating: driver.rating_average,
          distance: distance.toFixed(2),
          vehicle: {
            type: driver.vehicle_type,
            model: driver.vehicle_model,
            color: driver.vehicle_color,
          },
          location: {
            latitude: driver.current_latitude,
            longitude: driver.current_longitude,
          },
        };
      })
      .filter(driver => driver.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

    res.json({drivers: nearbyDrivers});
  } catch (error) {
    console.error('Get nearby drivers error:', error);
    res.status(500).json({message: 'Failed to get nearby drivers'});
  }
};

// Get ride history
exports.getRideHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const {limit = 20, offset = 0} = req.query;

    // Demo mode - return mock ride history
    if (process.env.DEMO_MODE === 'true') {
      const mockRides = [
        {
          id: 1,
          pickup_address: '123 Main St, Downtown',
          destination_address: '456 Oak Ave, Uptown',
          fare: '15.50',
          status: 'completed',
          completed_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          driver_name: 'John Smith',
          driver_rating: 4.8,
          vehicle_model: 'Toyota Camry',
        },
        {
          id: 2,
          pickup_address: '789 Elm St, Suburb',
          destination_address: '321 Pine Rd, City Center',
          fare: '22.75',
          status: 'completed',
          completed_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          driver_name: 'Sarah Johnson',
          driver_rating: 4.9,
          vehicle_model: 'Honda CR-V',
        },
        {
          id: 3,
          pickup_address: '555 Maple Dr, North Side',
          destination_address: '777 Birch Ln, South Side',
          fare: '18.25',
          status: 'completed',
          completed_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          driver_name: 'Mike Davis',
          driver_rating: 4.7,
          vehicle_model: 'Hyundai Elantra',
        },
      ];
      return res.json({rides: mockRides, total: mockRides.length});
    }

    const result = await pool.query(
      `SELECT r.*,
              u_driver.full_name as driver_name,
              u_driver.rating_average as driver_rating,
              d.vehicle_model
       FROM rides r
       LEFT JOIN drivers d ON r.driver_id = d.id
       LEFT JOIN users u_driver ON d.user_id = u_driver.id
       WHERE r.rider_id = $1
       ORDER BY r.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset],
    );

    res.json({rides: result.rows, total: result.rows.length});
  } catch (error) {
    console.error('Get ride history error:', error);
    res.status(500).json({message: 'Failed to get ride history'});
  }
};

// Rate driver
exports.rateDriver = async (req, res) => {
  try {
    const {id} = req.params;
    const userId = req.userId;
    const {rating, feedback} = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({message: 'Rating must be between 1 and 5'});
    }

    // Demo mode
    if (process.env.DEMO_MODE === 'true') {
      return res.json({
        message: 'Rating submitted successfully',
        rating: {rideId: id, rating, feedback},
      });
    }

    const result = await pool.query(
      `UPDATE rides
       SET driver_rating = $1,
           driver_feedback = $2,
           rated_at = NOW()
       WHERE id = $3 AND rider_id = $4 AND status = 'completed'
       RETURNING *`,
      [rating, feedback, id, userId],
    );

    if (result.rows.length === 0) {
      return res.status(400).json({message: 'Cannot rate this ride'});
    }

    res.json({
      message: 'Rating submitted successfully',
      rating: {rideId: id, rating, feedback},
    });
  } catch (error) {
    console.error('Rate driver error:', error);
    res.status(500).json({message: 'Failed to submit rating'});
  }
};
