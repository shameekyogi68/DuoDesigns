/**
 * @file         auth.routes.js
 * @module       routes/auth
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const twoFactorCtrl = require('../controllers/twoFactor.controller');
const validate = require('../middleware/validate.middleware');
const { authLimiter } = require('../middleware/rateLimit.middleware');
const { sendOTPRules, verifyOTPRules, updateProfileRules, addAddressRules } = require('../validators/auth.validator');

// Public
router.post('/send-otp',       authLimiter, sendOTPRules, validate, ctrl.sendOTP);
router.post('/verify-otp',     authLimiter, verifyOTPRules, validate, ctrl.verifyOTPHandler);
router.post('/refresh-token',  ctrl.refreshToken);
router.post('/logout',         protect, ctrl.logout);

// Protected
router.get('/me',            protect, ctrl.getMe);
router.put('/profile',       protect, updateProfileRules, validate, ctrl.updateProfile);
router.post('/address',      protect, addAddressRules, validate, ctrl.addAddress);
router.put('/address/:id',   protect, addAddressRules, validate, ctrl.updateAddress);
router.delete('/address/:id', protect, ctrl.deleteAddress);

// 2FA (Admin Only)
router.post('/2fa/setup',   protect, admin, twoFactorCtrl.setup2FA);
router.post('/2fa/verify',  protect, admin, twoFactorCtrl.verifyAndEnable2FA);
router.post('/2fa/disable', protect, admin, twoFactorCtrl.disable2FA);

module.exports = router;
