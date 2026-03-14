/**
 * @file         keepAlive.job.js
 * @description  Self-ping cron job to prevent Render free-tier from sleeping.
 *               Runs every 14 minutes to keep the server warm.
 *               Only active in production when KEEP_ALIVE_URL is set.
 *
 * @module       jobs/keepAlive
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-14
 */

const cron = require('node-cron');
const logger = require('../config/logger');

const KEEP_ALIVE_URL = process.env.KEEP_ALIVE_URL || process.env.RENDER_EXTERNAL_URL;

if (KEEP_ALIVE_URL && process.env.NODE_ENV === 'production') {
    // Ping health endpoint every 14 minutes to prevent Render free-tier sleep
    cron.schedule('*/14 * * * *', async () => {
        try {
            const healthUrl = `${KEEP_ALIVE_URL}/health`;
            const response = await fetch(healthUrl);
            if (response.ok) {
                logger.info(`Keep-alive ping successful → ${healthUrl}`);
            } else {
                logger.warn(`Keep-alive ping returned ${response.status}`);
            }
        } catch (error) {
            logger.error(`Keep-alive ping failed: ${error.message}`);
        }
    });

    logger.info(`Keep-alive cron registered → pinging ${KEEP_ALIVE_URL}/health every 14 mins`);
} else {
    logger.info('Keep-alive cron skipped (not in production or KEEP_ALIVE_URL not set)');
}
