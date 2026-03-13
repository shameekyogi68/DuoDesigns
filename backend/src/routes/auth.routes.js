/**
 * @file         auth.routes.js
 * @module       routes/auth
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { authLimiter } = require('../middleware/rateLimit.middleware');
const { sendOTPRules, verifyOTPRules, updateProfileRules, addAddressRules } = require('../validators/auth.validator');

// Public
router.post('/send-otp',       authLimiter, sendOTPRules, validate, ctrl.sendOTP);
router.post('/verify-otp',     authLimiter, verifyOTPRules, validate, ctrl.verifyOTPHandler);
router.post('/refresh-token',  ctrl.refreshToken);
router.post('/logout',         auth, ctrl.logout);

// Protected
router.get('/me',            auth, ctrl.getMe);
router.put('/profile',       auth, updateProfileRules, validate, ctrl.updateProfile);
router.post('/address',      auth, addAddressRules, validate, ctrl.addAddress);
router.put('/address/:id',   auth, addAddressRules, validate, ctrl.updateAddress);
router.delete('/address/:id', auth, ctrl.deleteAddress);

module.exports = router;
