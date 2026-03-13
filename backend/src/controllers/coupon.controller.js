/**
 * @file         coupon.controller.js
 * @description  Coupon validation and CRUD.
 * @module       controllers/coupon
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const Coupon = require('../models/Coupon.model');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/** POST /api/coupons/validate */
exports.validateCoupon = asyncHandler(async (req, res) => {
    const { code, cartTotal } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (!coupon) return sendError(res, 404, 'Coupon not found');

    const check = coupon.isValid(cartTotal);
    if (!check.valid) return sendError(res, 400, check.reason);

    const discount = coupon.getDiscount(cartTotal);
    sendSuccess(res, 200, 'Coupon is valid', {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discountAmount: discount,
    });
});

/** GET /api/coupons/active — Public offers page */
exports.getActiveCoupons = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find({ isActive: true, $or: [{ expiresAt: null }, { expiresAt: { $gte: new Date() } }] })
        .select('code type value minOrder expiresAt');
    sendSuccess(res, 200, 'Active coupons', coupons);
});

/** GET /api/coupons — Admin list all */
exports.getAllCoupons = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    sendSuccess(res, 200, 'All coupons', coupons);
});

/** POST /api/coupons — Admin create */
exports.createCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.create(req.body);
    sendSuccess(res, 201, 'Coupon created', coupon);
});

/** DELETE /api/coupons/:id — Admin delete */
exports.deleteCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return sendError(res, 404, 'Coupon not found');
    sendSuccess(res, 200, 'Coupon deleted');
});
