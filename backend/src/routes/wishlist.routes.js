/**
 * @file         wishlist.routes.js
 * @module       routes/wishlist
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const router = require('express').Router();
const ctrl = require('../controllers/wishlist.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.get('/', ctrl.getWishlist);
router.post('/:productId', ctrl.addToWishlist);
router.delete('/:productId', ctrl.removeFromWishlist);

module.exports = router;
