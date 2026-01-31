const pool = require('../config/database');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT id, phone_number, full_name, email, profile_photo_url, role, rating_average, total_trips, status, created_at
       FROM users WHERE id = $1`,
      [userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({message: 'User not found'});
    }

    const user = result.rows[0];
    res.json({
      user: {
        id: user.id,
        phoneNumber: user.phone_number,
        fullName: user.full_name,
        email: user.email,
        profilePhoto: user.profile_photo_url,
        role: user.role,
        rating: user.rating_average,
        totalTrips: user.total_trips,
        status: user.status,
        memberSince: user.created_at,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({message: 'Failed to get profile'});
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const {fullName, email, profilePhoto} = req.body;

    const result = await pool.query(
      `UPDATE users
       SET full_name = COALESCE($1, full_name),
           email = COALESCE($2, email),
           profile_photo_url = COALESCE($3, profile_photo_url)
       WHERE id = $4
       RETURNING *`,
      [fullName, email, profilePhoto, userId],
    );

    const user = result.rows[0];
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        phoneNumber: user.phone_number,
        fullName: user.full_name,
        email: user.email,
        profilePhoto: user.profile_photo_url,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({message: 'Failed to update profile'});
  }
};

// Get ride history
exports.getRideHistory = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT r.*,
              u_driver.full_name as driver_name,
              u_driver.profile_photo_url as driver_photo
       FROM rides r
       LEFT JOIN drivers d ON r.driver_id = d.id
       LEFT JOIN users u_driver ON d.user_id = u_driver.id
       WHERE r.rider_id = $1
       ORDER BY r.created_at DESC
       LIMIT 50`,
      [userId],
    );

    const rides = result.rows.map(ride => ({
      id: ride.id,
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
      driver: {
        name: ride.driver_name,
        photo: ride.driver_photo,
      },
      fare: ride.fare_amount,
      distance: ride.distance_km,
      duration: ride.duration_minutes,
      status: ride.status,
      vehicleType: ride.vehicle_type,
      paymentStatus: ride.payment_status,
      requestedAt: ride.requested_at,
      completedAt: ride.completed_at,
    }));

    res.json({rides});
  } catch (error) {
    console.error('Get ride history error:', error);
    res.status(500).json({message: 'Failed to get ride history'});
  }
};
