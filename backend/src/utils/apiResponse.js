/**
 * @file         apiResponse.js
 * @description  Standard API response format utility.
 *               Ensures all endpoints return consistent JSON structure.
 *
 * @module       utils/apiResponse
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

/**
 * @function sendSuccess
 * @description Sends a standardised success response.
 * @param {Object} res      - Express response object
 * @param {number} status   - HTTP status code (default 200)
 * @param {string} message  - Human-readable message
 * @param {*}      data     - Response payload
 */
const sendSuccess = (res, status = 200, message = 'Success', data = null) => {
    res.status(status).json({
        success: true,
        message,
        data,
    });
};

/**
 * @function sendError
 * @description Sends a standardised error response.
 * @param {Object} res      - Express response object
 * @param {number} status   - HTTP status code (default 500)
 * @param {string} message  - Human-readable error message
 * @param {*}      error    - Error details (only in development)
 */
const sendError = (res, status = 500, message = 'Server Error', error = null) => {
    const response = {
        success: false,
        message,
    };

    if (process.env.NODE_ENV === 'development' && error) {
        response.error = error;
    }

    res.status(status).json(response);
};

module.exports = { sendSuccess, sendError };
