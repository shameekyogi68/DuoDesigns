/**
 * @file         auth.validator.js
 * @description  Input validation rules for auth endpoints.
 * @module       validators/auth
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const { body } = require('express-validator');

const sendOTPRules = [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
];

const verifyOTPRules = [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
];

const updateProfileRules = [
    body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('phone').optional().trim().isMobilePhone('en-IN').withMessage('Invalid Indian phone number'),
];

const addAddressRules = [
    body('line1').notEmpty().withMessage('Address line 1 is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('pincode').isLength({ min: 6, max: 6 }).withMessage('Valid 6-digit pincode is required'),
];

module.exports = { sendOTPRules, verifyOTPRules, updateProfileRules, addAddressRules };
