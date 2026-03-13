/**
 * @file         payment.routes.js
 * @module       routes/payment
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const router = require('express').Router();
const ctrl = require('../controllers/payment.controller');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

router.post('/create-order', auth, ctrl.createPaymentOrder);
router.post('/verify',       auth, ctrl.verifyPayment);
router.get('/',              auth, admin, ctrl.getPayments);

module.exports = router;
