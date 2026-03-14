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
const wishlistRoutes = require('./routes/wishlist.routes');
const reviewRoutes   = require('./routes/review.routes');
const reportRoutes   = require('./routes/report.routes');
const returnRoutes   = require('./routes/return.routes');

// Initialize Cron Jobs
require('./jobs');

// ── Middleware Imports ─────────────────────────────
const { errorHandler, notFound } = require('./middleware/error.middleware');
const logger = require('./config/logger');
const { initSentry, initSentryErrorHandler } = require('./config/sentry');

const app = express();

// ── Sentry (Must be first) ─────────────────────────
initSentry(app);

// ── Webhooks (Must be before express.json) ─────────
app.use('/api/webhooks', webhookRoutes);

// ── Global Middleware ──────────────────────────────
app.use(helmet());
// NOTE: mongoSanitize and xss-clean are currently disabled due to incompatibility with Express 5 
// ("Cannot set property query of # which has only a getter"). 
// app.use(mongoSanitize());
// app.use(xss());
app.use(hpp());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
}

// ── CORS — Allow known origins ────────────────────
const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.ADMIN_URL,
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5178',
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (curl, mobile apps, server-to-server)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Health Check (used by UptimeRobot + keep-alive) ─
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

// ── Sitemap ────────────────────────────────────────
app.get('/sitemap.xml', require('./controllers/sitemap.controller').generateSitemap);

// ── API Root ───────────────────────────────────────
app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: 'Duo Designs API is running 🚀',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
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
app.use('/api/wishlist',  wishlistRoutes);
app.use('/api/reviews',   reviewRoutes);
app.use('/api/admin/reports', reportRoutes);
app.use('/api/returns',   returnRoutes);

// ── Error Handling ─────────────────────────────────
app.use(notFound);

// ── Sentry Error Handler (Must be before custom error handler)
initSentryErrorHandler(app);

app.use(errorHandler);

module.exports = app;
