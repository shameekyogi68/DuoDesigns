/**
 * @file         partner.routes.js
 * @module       routes/partner
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const router = require('express').Router();
const ctrl = require('../controllers/partner.controller');
const { protect: auth } = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware');

router.use(auth, admin);

router.get('/',               ctrl.getAllPartners);
router.post('/',              ctrl.addPartnerSale);
router.put('/:id/paid',       ctrl.markPaid);
router.delete('/:id',         ctrl.deletePartnerEntry);
router.get('/config/summary', ctrl.getSummary);

module.exports = router;
