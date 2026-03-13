/**
 * @file         order.validator.js
 * @module       validators/order
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const { body } = require('express-validator');

const placeOrderRules = [
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('items.*.product').notEmpty().withMessage('Product ID is required'),
    body('items.*.qty').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('address.name').notEmpty().withMessage('Recipient name is required'),
    body('address.phone').notEmpty().withMessage('Phone number is required'),
    body('address.line1').notEmpty().withMessage('Address line 1 is required'),
    body('address.city').notEmpty().withMessage('City is required'),
    body('address.state').notEmpty().withMessage('State is required'),
    body('address.pincode').isLength({ min: 6, max: 6 }).withMessage('Valid pincode is required'),
];

const dispatchRules = [
    body('courier').notEmpty().withMessage('Courier name is required'),
    body('trackingNumber').notEmpty().withMessage('Tracking number is required'),
];

module.exports = { placeOrderRules, dispatchRules };
