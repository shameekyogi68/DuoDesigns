/**
 * @file         partner.controller.js
 * @description  Partner/reseller commission management.
 * @module       controllers/partner
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const Partner = require('../models/Partner.model');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/** GET /api/partners — Admin gets all */
exports.getAllPartners = asyncHandler(async (req, res) => {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [entries, total] = await Promise.all([
        Partner.find(filter).sort({ saleDate: -1 }).skip(skip).limit(parseInt(limit)),
        Partner.countDocuments(filter),
    ]);

    sendSuccess(res, 200, 'Partner entries', {
        entries,
        pagination: { page: parseInt(page), total, pages: Math.ceil(total / parseInt(limit)) },
    });
});

/** POST /api/partners — Admin logs sale manually */
exports.addPartnerSale = asyncHandler(async (req, res) => {
    const { companyName, saleAmount, notes, saleDate } = req.body;
    if (!companyName || !saleAmount) return sendError(res, 400, 'Company and amount required');

    const entry = await Partner.create({ companyName, saleAmount, notes, saleDate });
    sendSuccess(res, 201, 'Partner sale logged', entry);
});

/** PUT /api/partners/:id/paid — Admin mark commission paid */
exports.markPaid = asyncHandler(async (req, res) => {
    const entry = await Partner.findByIdAndUpdate(req.params.id, {
        status: 'paid',
        paidAt: new Date(),
    }, { new: true });

    if (!entry) return sendError(res, 404, 'Entry not found');
    sendSuccess(res, 200, 'Commission marked as paid', entry);
});

/** DELETE /api/partners/:id — Admin delete */
exports.deletePartnerEntry = asyncHandler(async (req, res) => {
    const entry = await Partner.findByIdAndDelete(req.params.id);
    if (!entry) return sendError(res, 404, 'Entry not found');
    sendSuccess(res, 200, 'Partner entry deleted');
});

/** GET /api/partners/summary — Monthly rollup */
exports.getSummary = asyncHandler(async (req, res) => {
    // Current month aggregator
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const totalStats = await Partner.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: '$saleAmount' },
                totalCommissionInfo: { $sum: '$commission' },
                unpaid: {
                    $sum: { $cond: [{ $eq: ['$status', 'pending'] }, '$commission', 0] }
                }
            }
        }
    ]);

    const stats = totalStats.length > 0 ? totalStats[0] : { totalSales: 0, totalCommissionInfo: 0, unpaid: 0 };
    delete stats._id;

    sendSuccess(res, 200, 'Partner summary', stats);
});
