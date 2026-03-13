/**
 * @file         shiprocket.service.js
 * @description  Integration with Shiprocket for auto-tracking and label generation.
 * @module       services/shiprocket
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const axios = require('axios');
const logger = require('../config/logger');

let SR_TOKEN = null;

/**
 * Authenticate with Shiprocket
 */
const authenticate = async () => {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email:    process.env.SHIPROCKET_EMAIL,
            password: process.env.SHIPROCKET_PASSWORD,
        });
        SR_TOKEN = response.data.token;
        return SR_TOKEN;
    } catch (error) {
        logger.error(`Shiprocket Auth Error: ${error.message}`);
        return null;
    }
};

/**
 * Get tracking status for a shipment
 * @param {string} trackingId - Courier tracking ID
 */
exports.getTrackingStatus = async (trackingId) => {
    try {
        if (!SR_TOKEN) await authenticate();
        
        const response = await axios.get(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${trackingId}`, {
            headers: { Authorization: `Bearer ${SR_TOKEN}` },
        });

        return response.data;
    } catch (error) {
        // If token expired, retry once
        if (error.response?.status === 401) {
            await authenticate();
            return this.getTrackingStatus(trackingId);
        }
        logger.error(`Shiprocket Tracking Error: ${error.message}`);
        return null;
    }
};
