const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// ============================================
// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
// ============================================
router.get('/profile', auth, async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, full_name, email, phone, created_at FROM users WHERE id = ?',
            [req.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: users[0]
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching profile'
        });
    }
});

// ============================================
// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
// ============================================
router.put('/profile', auth, async (req, res) => {
    try {
        const { full_name, phone } = req.body;

        if (!full_name) {
            return res.status(400).json({
                success: false,
                message: 'Full name is required'
            });
        }

        const [result] = await db.query(
            'UPDATE users SET full_name = ?, phone = ? WHERE id = ?',
            [full_name, phone || null, req.userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'Profile updated successfully'
        });

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating profile'
        });
    }
});

// ============================================
// @route   PUT /api/users/password
// @desc    Change password
// @access  Private
// ============================================
router.put('/password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide current and new password'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters'
            });
        }

        // Get user
        const [users] = await db.query(
            'SELECT password FROM users WHERE id = ?',
            [req.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Verify current password
        const isValid = await bcrypt.compare(currentPassword, users[0].password);

        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        await db.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, req.userId]
        );

        res.json({
            success: true,
            message: 'Password changed successfully'
        });

    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while changing password'
        });
    }
});

module.exports = router;
