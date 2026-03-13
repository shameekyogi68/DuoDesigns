/**
 * @file         generateOrderId.js
 * @description  Generates unique order IDs in DD-YYYY-XXXX format.
 *
 * @module       utils/generateOrderId
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const Order = require('../models/Order.model');

/**
 * @function generateOrderId
 * @description Creates a sequential order number: DD-YYYY-XXXX
 * @returns {Promise<string>} Unique order number
 *
 * @example
 *   const orderId = await generateOrderId(); // "DD-2025-0001"
 */
const generateOrderId = async () => {
    const year = new Date().getFullYear();
    const lastOrder = await Order.findOne({
        orderNumber: new RegExp(`^DD-${year}-`)
    }).sort({ createdAt: -1 });

    let nextNum = 1;
    if (lastOrder && lastOrder.orderNumber) {
        const parts = lastOrder.orderNumber.split('-');
        nextNum = parseInt(parts[2], 10) + 1;
    }

    return `DD-${year}-${String(nextNum).padStart(4, '0')}`;
};

module.exports = generateOrderId;
