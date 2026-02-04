const express = require('express');
const db = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// ============================================
// @route   POST /api/bookings
// @desc    Create new booking
// @access  Public (can be used without login)
// ============================================
// ============================================
// @route   POST /api/bookings
// @desc    Create new booking
// @access  Public
// ============================================
router.post('/', async (req, res) => {
    try {
        const {
            tripType,
            outboundPickup,
            outboundDropoff,
            outboundDateTime,
            outboundDistance,
            returnPickup,
            returnDropoff,
            returnDateTime,
            returnDistance,
            passengerName,
            passengerPhone,
            passengerEmail,
            flightNumber,
            arrivalTime,
            childSeats,
            childSeatsCount,
            specialRequests,
            selectedVehicle,
            basePrice,
            childSeatsPrice,
            totalPrice
        } = req.body;

        // Validation
        if (!outboundPickup || !outboundDropoff || !passengerName || !passengerPhone || !passengerEmail) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(passengerEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Insert booking
        const [result] = await db.query(
            `INSERT INTO bookings (
                trip_type,
                pickup_location, 
                dropoff_location, 
                outbound_date,
                outbound_distance,
                return_pickup_location,
                return_dropoff_location,
                return_date,
                return_distance,
                passenger_name, 
                passenger_phone, 
                passenger_email, 
                flight_number,
                arrival_time, 
                special_requests, 
                service_type,
                base_price,
                child_seats,
                child_seats_count,
                child_seats_price,
                total_amount,
                booking_status,
                payment_status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                tripType || 'oneway',
                outboundPickup,
                outboundDropoff,
                outboundDateTime || null,
                outboundDistance || null,
                returnPickup || null,
                returnDropoff || null,
                returnDateTime || null,
                returnDistance || null,
                passengerName,
                passengerPhone,
                passengerEmail,
                flightNumber || null,
                arrivalTime || null,
                specialRequests || null,
                selectedVehicle?.name || null,
                basePrice || null,
                childSeats || false,
                childSeatsCount || 0,
                childSeatsPrice || 0,
                totalPrice || null,
                'pending',
                'pending'
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            bookingId: result.insertId,
            booking: {
                id: result.insertId,
                tripType,
                passengerName,
                passengerEmail,
                passengerPhone,
                outboundPickup,
                outboundDropoff,
                totalPrice,
                bookingStatus: 'pending'
            }
        });

    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating booking',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});


// ============================================
// @route   GET /api/bookings
// @desc    Get all bookings (Admin)
// @access  Private
// ============================================
router.get('/', auth, async (req, res) => {
    try {
        const [bookings] = await db.query(
            'SELECT * FROM bookings ORDER BY created_at DESC'
        );

        res.json({
            success: true,
            count: bookings.length,
            bookings
        });

    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching bookings'
        });
    }
});

// ============================================
// @route   GET /api/bookings/user/:userId
// @desc    Get bookings by user ID
// @access  Private
// ============================================
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const { userId } = req.params;

        const [bookings] = await db.query(
            'SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );

        res.json({
            success: true,
            count: bookings.length,
            bookings
        });

    } catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user bookings'
        });
    }
});

// ============================================
// @route   GET /api/bookings/:id
// @desc    Get single booking by ID
// @access  Private
// ============================================
router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        const [bookings] = await db.query(
            'SELECT * FROM bookings WHERE id = ?',
            [id]
        );

        if (bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            booking: bookings[0]
        });

    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching booking'
        });
    }
});

// ============================================
// @route   PUT /api/bookings/:id/status
// @desc    Update booking status
// @access  Private
// ============================================
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const [result] = await db.query(
            'UPDATE bookings SET booking_status = ? WHERE id = ?',
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            message: 'Booking status updated successfully'
        });

    } catch (error) {
        console.error('Update booking status error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating booking status'
        });
    }
});

// ============================================
// @route   GET /api/bookings/testimonials
// @desc    Get all testimonials
// @access  Public
// ============================================
router.get('/testimonials/all', async (req, res) => {
    try {
        const [testimonials] = await db.query(
            'SELECT * FROM testimonials WHERE is_featured = TRUE ORDER BY created_at DESC'
        );

        res.json({
            success: true,
            count: testimonials.length,
            testimonials
        });

    } catch (error) {
        console.error('Get testimonials error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching testimonials'
        });
    }
});

module.exports = router;
