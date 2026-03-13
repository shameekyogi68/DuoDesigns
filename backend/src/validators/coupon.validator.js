/**
 * @file         coupon.validator.js
 * @module       validators/coupon
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const { body } = require('express-validator');

const createCouponRules = [
    body('code').notEmpty().withMessage('Coupon code is required').trim().toUpperCase(),
    body('type').isIn(['flat', 'percentage']).withMessage('Type must be flat or percentage'),
    body('value').isFloat({ min: 0 }).withMessage('Value must be a positive number'),
];

const validateCouponRules = [
    body('code').notEmpty().withMessage('Coupon code is required').trim().toUpperCase(),
    body('cartTotal').isFloat({ min: 0 }).withMessage('Cart total is required'),
];

module.exports = { createCouponRules, validateCouponRules };
