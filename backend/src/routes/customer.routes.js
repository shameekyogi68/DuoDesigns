/**
 * @file         customer.routes.js
 * @module       routes/customer
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const router = require('express').Router();
const ctrl = require('../controllers/customer.controller');
const { protect: auth } = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware');

router.use(auth, admin); // All routes admin only

router.get('/',           ctrl.getAllCustomers);
router.get('/:id',        ctrl.getCustomer);
router.get('/:id/orders', ctrl.getCustomerOrders);

module.exports = router;
