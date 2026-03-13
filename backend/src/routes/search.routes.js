/**
 * @file         search.routes.js
 * @module       routes/search
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/search.controller');

router.get('/', ctrl.searchProducts);

module.exports = router;
