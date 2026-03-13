/**
 * @file         whatsapp.service.js
 * @description  Service for sending WhatsApp notifications (OTP, Order Success, Dispatch).
 *               Uses WhatsApp Business API or Twilio.
 * @module       services/whatsapp
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const axios = require('axios');
const logger = require('../config/logger');

/**
 * Send template-based message
 * @param {string} to - Recipient phone number with country code
 * @param {string} templateName - Approved template name
 * @param {Array} parameters - Variables for the template
 */
exports.sendTemplateMessage = async (to, templateName, parameters = []) => {
    try {
        if (!process.env.WHATSAPP_API_KEY) {
            logger.warn(`WhatsApp service: API Key missing. Skipping notification to ${to}`);
            return null;
        }

        // Configuration for WhatsApp Provider (Example: Meta Graph API)
        const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`;
        
        const payload = {
            messaging_product: 'whatsapp',
            to,
            type: 'template',
            template: {
                name: templateName,
                language: { code: 'en_US' },
                components: [
                    {
                        type: 'body',
                        parameters: parameters.map(p => ({ type: 'text', text: p })),
                    },
                ],
            },
        };

        const response = await axios.post(url, payload, {
            headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        logger.info(`WhatsApp sent to ${to}: ${templateName}`);
        return response.data;
    } catch (error) {
        logger.error(`WhatsApp Error: ${error.response?.data?.error?.message || error.message}`);
        return null;
    }
};

/**
 * Predefined Notification: Order Confirmation
 */
exports.sendOrderConfirmed = async (to, customerName, orderNumber) => {
    return this.sendTemplateMessage(to, 'order_confirmed_v1', [customerName, orderNumber]);
};

/**
 * Predefined Notification: Order Dispatch
 */
exports.sendOrderDispatched = async (to, orderNumber, trackingLink) => {
    return this.sendTemplateMessage(to, 'order_dispatched_v1', [orderNumber, trackingLink]);
};
