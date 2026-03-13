/**
 * @file         order.routes.js
 * @module       routes/order
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const router = require('express').Router();
const ctrl = require('../controllers/order.controller');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const validate = require('../middleware/validate.middleware');
const { placeOrderRules, dispatchRules } = require('../validators/order.validator');

// Protected
router.post('/',            auth, placeOrderRules, validate, ctrl.placeOrder);
router.get('/my',           auth, ctrl.getMyOrders);
router.get('/:id/invoice',  auth, ctrl.downloadInvoice);

// Public
router.get('/track/:num',   ctrl.trackOrder);

// Admin
router.get('/',             auth, admin, ctrl.getAllOrders);
router.put('/:id/confirm',  auth, admin, ctrl.confirmOrder);
router.put('/:id/dispatch', auth, admin, dispatchRules, validate, ctrl.dispatchOrder);
router.put('/:id/deliver',  auth, admin, ctrl.deliverOrder);

module.exports = router;
