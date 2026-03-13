/**
 * @file         upload.routes.js
 * @module       routes/upload
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const router = require('express').Router();
const ctrl = require('../controllers/upload.controller');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const { designUpload, productUpload, premadeUpload } = require('../middleware/upload.middleware');

// Public upload for customer custom designs
router.post('/design',  designUpload.single('file'), ctrl.uploadDesign);

// Admin uploads
router.post('/product', auth, admin, productUpload.single('file'), ctrl.uploadProduct);
router.post('/premade', auth, admin, premadeUpload.single('file'), ctrl.uploadPremade);

module.exports = router;
