/**
 * @file         app.js
 * @description  Express application configuration for Duo Designs API.
 *               Sets up middleware, routes, and error handling.
 *
 * @module       app
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require('morgan');

// ── Route Imports ──────────────────────────────────
const webhookRoutes  = require('./routes/webhook.routes');
const authRoutes     = require('./routes/auth.routes');
const productRoutes  = require('./routes/product.routes');
const orderRoutes    = require('./routes/order.routes');
const paymentRoutes  = require('./routes/payment.routes');
const couponRoutes   = require('./routes/coupon.routes');
const shippingRoutes = require('./routes/shipping.routes');
const uploadRoutes   = require('./routes/upload.routes');
const customerRoutes = require('./routes/customer.routes');
const partnerRoutes  = require('./routes/partner.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const searchRoutes   = require('./routes/search.routes');

// ── Middleware Imports ─────────────────────────────
const { errorHandler, notFound } = require('./middleware/error.middleware');
const logger = require('./config/logger');

const app = express();

// ── Webhooks (Must be before express.json) ─────────
app.use('/api/webhooks', webhookRoutes);

// ── Global Middleware ──────────────────────────────
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
}

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Health Check ───────────────────────────────────
app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: 'Duo Designs API is running 🚀',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
});

// ── API Routes ─────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/products',  productRoutes);
app.use('/api/orders',    orderRoutes);
app.use('/api/payments',  paymentRoutes);
app.use('/api/coupons',   couponRoutes);
app.use('/api/shipping',  shippingRoutes);
app.use('/api/upload',    uploadRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/partners',  partnerRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/search',    searchRoutes);

// ── Error Handling ─────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
