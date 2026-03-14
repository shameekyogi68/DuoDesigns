/**
 * @file         report.routes.js
 * @module       routes/report
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const router = require('express').Router();
const ctrl = require('../controllers/reports.controller');
const { protect } = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');;

router.use(protect, admin);

router.get('/gst', ctrl.exportGSTReport);

module.exports = router;
