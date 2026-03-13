/**
 * @file         dashboard.controller.js
 * @description  Dashboard analytics and stats endpoint for Admin.
 * @module       controllers/dashboard
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const Order = require('../models/Order.model');
const User = require('../models/User.model');
const Product = require('../models/Product.model');
const Partner = require('../models/Partner.model');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');

/** GET /api/admin/dashboard */
exports.getDashboardStats = asyncHandler(async (req, res) => {
    // Basic Counts
    const [totalOrders, totalCustomers, totalProducts] = await Promise.all([
        Order.countDocuments(),
        User.countDocuments({ role: 'customer' }),
        Product.countDocuments({ isActive: true })
    ]);

    // Order status breakdown
    const ordersByStatus = await Order.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const orderCounts = {
        placed: 0,
        confirmed: 0,
        dispatched: 0,
        delivered: 0
    };
    ordersByStatus.forEach(item => {
        if (orderCounts[item._id] !== undefined) {
             orderCounts[item._id] = item.count;
        }
    });

    // Revenue
    const revenueAgg = await Order.aggregate([
        { $match: { 'payment.status': 'paid' } },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$pricing.total' }
            }
        }
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].totalRevenue : 0;

    // Recent orders (last 5)
    const recentOrders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'name email address');

    // Commission summary
    const partnerStats = await Partner.aggregate([
        { $group: { _id: '$status', totalCommissionInfo: { $sum: '$commission' } } }
    ]);
    
    let pendingCommission = 0;
    partnerStats.forEach(item => {
        if (item._id === 'pending') {
            pendingCommission = item.totalCommissionInfo;
        }
    });

    sendSuccess(res, 200, 'Dashboard statistics fetched', {
       totalOrders,
       orderCounts,
       totalCustomers,
       totalProducts,
       totalRevenue,
       recentOrders,
       pendingCommission
    });
});
