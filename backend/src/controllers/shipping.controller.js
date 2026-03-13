/**
 * @file         shipping.controller.js
 * @description  Shipping & pincode controller.
 * @module       controllers/shipping
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const Pincode = require('../models/Pincode.model');
const Settings = require('../models/Settings.model');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/** GET /api/shipping/:pincode — Public delivery check */
exports.checkPincode = asyncHandler(async (req, res) => {
    const { pincode } = req.params;
    if (pincode.length !== 6) return sendError(res, 400, 'Invalid pincode format');

    const result = await Pincode.findOne({ pincode });
    const settings = await Settings.findOne() || { defaultShipping: 80 };

    if (!result) {
        // Assume standard shipping if not in DB, unless explicitly non-deliverable
        return sendSuccess(res, 200, 'Pincode serviceable', {
            isDeliverable: true,
            shippingCharge: settings.defaultShipping,
            message: 'Standard delivery available',
        });
    }

    if (!result.isDeliverable) {
        return sendError(res, 400, 'Sorry, we do not deliver to this pincode yet', { isDeliverable: false });
    }

    sendSuccess(res, 200, 'Delivery available', {
        isDeliverable: true,
        shippingCharge: result.shippingCharge,
        area: result.area,
        city: result.city,
        state: result.state,
    });
});

/** GET /api/shipping — Admin get all */
exports.getAllPincodes = asyncHandler(async (req, res) => {
    const pincodes = await Pincode.find().sort({ state: 1, city: 1 });
    sendSuccess(res, 200, 'All service areas', pincodes);
});

/** POST /api/shipping — Admin add pincode */
exports.addPincode = asyncHandler(async (req, res) => {
    const pincode = await Pincode.create(req.body);
    sendSuccess(res, 201, 'Pincode rule added', pincode);
});

/** PUT /api/shipping/:id — Admin update */
exports.updatePincode = asyncHandler(async (req, res) => {
    const pincode = await Pincode.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pincode) return sendError(res, 404, 'Pincode not found');
    sendSuccess(res, 200, 'Pincode updated', pincode);
});

/** DELETE /api/shipping/:id — Admin delete */
exports.deletePincode = asyncHandler(async (req, res) => {
    const pincode = await Pincode.findByIdAndDelete(req.params.id);
    if (!pincode) return sendError(res, 404, 'Pincode not found');
    sendSuccess(res, 200, 'Pincode rule deleted');
});

/** POST /api/shipping/bulk-import — Admin CSV Bulk Upload */
exports.bulkImportPincodes = asyncHandler(async (req, res) => {
    if (!req.file || !req.file.path) {
        return sendError(res, 400, 'Please upload a valid CSV file');
    }

    const results = [];
    const errors = [];
    const fs = require('fs');
    const csv = require('csv-parser');

    let successCount = 0;

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            for (let i = 0; i < results.length; i++) {
                const row = results[i];
                try {
                    await Pincode.findOneAndUpdate(
                        { pincode: row.pincode },
                        { ...row, isDeliverable: row.isDeliverable === 'true' || row.isDeliverable === true },
                        { upsert: true, new: true, runValidators: true }
                    );
                    successCount++;
                } catch (err) {
                    errors.push(`Row ${i + 1} (${row.pincode}): ${err.message}`);
                }
            }

            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Error deleting temp file:", err);
            });

            sendSuccess(res, 200, 'Bulk import completed', {
                totalRows: results.length,
                successCount,
                errorCount: errors.length,
                errors: errors.slice(0, 10)
            });
        });
});
