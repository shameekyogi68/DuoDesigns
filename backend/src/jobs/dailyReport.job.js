/**
 * @file         dailyReport.job.js
 * @description  Generates a summarized daily performance report for the admin.
 * @module       jobs/dailyReport
 */

const cron = require('node-cron');
const Order = require('../models/Order.model');
const BulkEnquiry = require('../models/BulkEnquiry.model');
const logger = require('../config/logger');

// Run every day at 11:59 PM
cron.schedule('59 23 * * *', async () => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const [orders, enquiries] = await Promise.all([
            Order.find({ createdAt: { $gte: startOfDay } }),
            BulkEnquiry.countDocuments({ createdAt: { $gte: startOfDay } })
        ]);

        const totalRevenue = orders.reduce((sum, o) => sum + o.pricing.total, 0);
        
        logger.info(`[DAILY REPORT] Orders: ${orders.length}, Revenue: ₹${totalRevenue}, Bulk Enquiries: ${enquiries}`);
        
        // FUTURE: Send email to Admin with detailed breakdown
    } catch (error) {
        logger.error(`Daily Report Job Failed: ${error.message}`);
    }
});
