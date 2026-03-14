/**
 * @file         return.routes.js
 * @module       routes/return
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const router = require('express').Router();
const ctrl = require('../controllers/return.controller');
const { protect } = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');;

router.use(protect);

// Customer
router.post('/', ctrl.submitReturnRequest);
router.get('/my', ctrl.getMyReturns);

// Admin
router.put('/:id', admin, ctrl.updateReturnStatus);

module.exports = router;
