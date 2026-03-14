/**
 * @file         review.routes.js
 * @module       routes/review
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const router = require('express').Router();
const ctrl = require('../controllers/review.controller');
const { protect } = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

// Public
router.get('/:productId', ctrl.getProductReviews);

// Private (Customer)
router.post('/', protect, ctrl.submitReview);

// Private (Admin)
router.delete('/:id', protect, admin, ctrl.deleteReview);

module.exports = router;
