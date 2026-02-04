const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// CORS Configuration (Multiple Origins)
// ============================================
const corsOptions = {
    origin: [
        'http://localhost:3001'   // Alternative production
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// ============================================
// Middleware
// ============================================
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ============================================
// Routes
// ============================================
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'GLIDO Server is running!',
        timestamp: new Date().toISOString()
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to GLIDO API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth',
            bookings: '/api/bookings',
            users: '/api/users'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ============================================
// Start Server
// ============================================
app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════╗');
    console.log('║      🚗 GLIDO Server Started 🚗       ║');
    console.log('╚════════════════════════════════════════╝');
    console.log(`🌐 Server running on: http://localhost:${PORT}`);
    console.log(`📅 Started at: ${new Date().toLocaleString()}`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV}`);
    console.log('════════════════════════════════════════');
});

module.exports = app;
