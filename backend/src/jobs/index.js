/**
 * @file         index.js
 * @description  Master registration for scheduled cron jobs.
 * @module       jobs
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const logger = require('../config/logger');

// Import jobs
require('./cleanExpiredOTPs.job');
require('./lowStockAlert.job');
require('./dailyReport.job');

logger.info('Cron Jobs initialized successfully.');
