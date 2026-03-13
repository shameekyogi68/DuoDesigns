/**
 * @file         product.routes.js
 * @module       routes/product
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const router = require('express').Router();
const ctrl = require('../controllers/product.controller');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const validate = require('../middleware/validate.middleware');
const { createProductRules, updateProductRules } = require('../validators/product.validator');

// Public
router.get('/',    ctrl.getProducts);
router.get('/:id', ctrl.getProduct);

// Admin
router.post('/',           auth, admin, createProductRules, validate, ctrl.createProduct);
router.put('/:id',         auth, admin, updateProductRules, validate, ctrl.updateProduct);
router.delete('/:id',      auth, admin, ctrl.deleteProduct);
router.put('/stock/bulk',  auth, admin, ctrl.updateBulkStock);
router.put('/:id/stock',   auth, admin, ctrl.updateStock);
router.get('/admin/low-stock', auth, admin, ctrl.getLowStock);

module.exports = router;
