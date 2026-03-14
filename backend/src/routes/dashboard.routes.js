/**
 * @file         dashboard.routes.js
 * @module       routes/dashboard
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dashboard.controller');
const { protect: auth } = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware');

router.get('/', auth, admin, ctrl.getDashboardStats);

module.exports = router;
