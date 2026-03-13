/**
 * @file         webhook.routes.js
 * @module       routes/webhook
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/webhook.controller');

// MUST use express.raw({ type: 'application/json' }) here
// because Razorpay verifies signature against the raw body
router.post('/razorpay', express.raw({ type: 'application/json' }), ctrl.handleRazorpayWebhook);

module.exports = router;
