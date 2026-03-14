/**
 * @file         shipping.routes.js
 * @module       routes/shipping
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const router = require('express').Router();
const ctrl = require('../controllers/shipping.controller');
const { protect: auth } = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware');
const multer = require('multer');

// Store CSVs temporarily in /tmp
const upload = multer({ dest: '/tmp/csv-uploads/' });

// Public
router.get('/:pincode',   ctrl.checkPincode);

// Admin
router.post('/bulk-import', auth, admin, upload.single('file'), ctrl.bulkImportPincodes);
router.get('/',           auth, admin, ctrl.getAllPincodes);
router.post('/',          auth, admin, ctrl.addPincode);
router.put('/:id',        auth, admin, ctrl.updatePincode);
router.delete('/:id',     auth, admin, ctrl.deletePincode);

module.exports = router;
