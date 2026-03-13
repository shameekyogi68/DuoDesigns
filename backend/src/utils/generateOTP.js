/**
 * @file         generateOTP.js
 * @description  Generates a cryptographically random 6-digit OTP.
 *
 * @module       utils/generateOTP
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 *
 * @returns {string} 6-digit OTP string
 */
const crypto = require('crypto');

const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

module.exports = generateOTP;
