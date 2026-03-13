/**
 * @file         cleanExpiredOTPs.job.js
 * @description  Cron job to clear expired OTPs from user documents every hour.
 * @module       jobs/cleanExpiredOTPs
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const cron = require('node-cron');
const User = require('../models/User.model');
const logger = require('../config/logger');

// Run every hour at minute 0
cron.schedule('0 * * * *', async () => {
    try {
        const result = await User.updateMany(
            { 'otp.expiresAt': { $lt: new Date() } },
            { 
                $set: { 
                    'otp.code': null, 
                    'otp.expiresAt': null, 
                    'otp.attempts': 0 
                } 
            }
        );
        
        if (result.modifiedCount > 0) {
            logger.info(`Cleanup Job: Cleared ${result.modifiedCount} expired OTPs`);
        }
    } catch (error) {
        logger.error(`Cleanup Job Error (OTP): ${error.message}`);
    }
});
