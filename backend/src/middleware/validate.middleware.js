/**
 * @file         validate.middleware.js
 * @description  Express-validator result handler.
 *
 * @module       middleware/validate
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const { validationResult } = require('express-validator');
const { sendError } = require('../utils/apiResponse');

/**
 * @function validate
 * @description Checks for validation errors and returns 400 if any.
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map(e => e.msg);
        return sendError(res, 400, messages[0], messages);
    }
    next();
};

module.exports = validate;
