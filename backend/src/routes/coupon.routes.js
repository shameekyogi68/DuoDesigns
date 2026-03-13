/**
 * @file         coupon.routes.js
 * @module       routes/coupon
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const router = require('express').Router();
const ctrl = require('../controllers/coupon.controller');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const validate = require('../middleware/validate.middleware');
const { createCouponRules, validateCouponRules } = require('../validators/coupon.validator');

// Public
router.post('/validate', validateCouponRules, validate, ctrl.validateCoupon);
router.get('/active',    ctrl.getActiveCoupons);

// Admin
router.get('/',      auth, admin, ctrl.getAllCoupons);
router.post('/',     auth, admin, createCouponRules, validate, ctrl.createCoupon);
router.delete('/:id', auth, admin, ctrl.deleteCoupon);

module.exports = router;
