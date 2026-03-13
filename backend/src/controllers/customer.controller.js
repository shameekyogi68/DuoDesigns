/**
 * @file         customer.controller.js
 * @description  Customer management for admin dashboard.
 * @module       controllers/customer
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const User = require('../models/User.model');
const Order = require('../models/Order.model');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/** GET /api/customers — All customers */
exports.getAllCustomers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = { role: 'customer' };
    const [customers, total] = await Promise.all([
        User.find(filter).select('-otp').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
        User.countDocuments(filter),
    ]);

    sendSuccess(res, 200, 'Customers fetched', {
        customers,
        pagination: { page: parseInt(page), total, pages: Math.ceil(total / parseInt(limit)) },
    });
});

/** GET /api/customers/:id — Single customer */
exports.getCustomer = asyncHandler(async (req, res) => {
    const customer = await User.findById(req.params.id).select('-otp');
    if (!customer) return sendError(res, 404, 'Customer not found');
    sendSuccess(res, 200, 'Customer details', customer);
});

/** GET /api/customers/:id/orders — Single customer orders */
exports.getCustomerOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.params.id }).sort({ createdAt: -1 });
    sendSuccess(res, 200, 'Customer orders', orders);
});
