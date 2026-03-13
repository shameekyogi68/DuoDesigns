/**
 * @file         product.validator.js
 * @module       validators/product
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const { body } = require('express-validator');

const createProductRules = [
    body('name').notEmpty().withMessage('Product name is required'),
    body('category').isIn(['tshirt', 'oversized', 'trackpants', 'mug', 'keychain']).withMessage('Invalid category'),
    body('basePrice').isFloat({ min: 0 }).withMessage('Base price must be a positive number'),
];

const updateProductRules = [
    body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
    body('category').optional().isIn(['tshirt', 'oversized', 'trackpants', 'mug', 'keychain']).withMessage('Invalid category'),
    body('basePrice').optional().isFloat({ min: 0 }).withMessage('Price must be positive'),
];

module.exports = { createProductRules, updateProductRules };
