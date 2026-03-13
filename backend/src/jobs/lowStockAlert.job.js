/**
 * @file         lowStockAlert.job.js
 * @description  Daily job to audit inventory and email Admin if items are low.
 * @module       jobs/lowStockAlert
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const cron = require('node-cron');
const Product = require('../models/Product.model');
const emailService = require('../services/email.service');
const logger = require('../config/logger');

// Run every day at 9:00 AM
cron.schedule('0 9 * * *', async () => {
    try {
        const LOW_STOCK_THRESHOLD = 5;

        // Find products where any variant has stock below threshold
        const lowStockProducts = await Product.find({
            'variants.stock': { $lte: LOW_STOCK_THRESHOLD },
            isActive: true
        });

        if (lowStockProducts.length > 0) {
            // In a real app, you would format a nice list and call emailService
            logger.warn(`Inventory Job: ${lowStockProducts.length} items are low on stock.`);
            
            // To be implemented: emailService.sendLowStockAlert(lowStockProducts);
        }
    } catch (error) {
        logger.error(`Inventory Job Error: ${error.message}`);
    }
});
