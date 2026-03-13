/**
 * @file         reports.controller.js
 * @description  Controller for generating business reports (GST, Revenue) for Admin.
 * @module       controllers/reports
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const Order = require('../models/Order.model');
const ExcelJS = require('exceljs');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Export GST Report for a specific month/year
 * @route   GET /api/admin/reports/gst
 * @access  Private (Admin)
 */
exports.exportGSTReport = asyncHandler(async (req, res) => {
    const { month, year } = req.query;

    if (!month || !year) {
        return sendError(res, 'Month and Year parameters are required', 400);
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const orders = await Order.find({
        createdAt: { $gte: startDate, $lte: endDate },
        status: { $ne: 'cancelled' },
        'payment.status': 'paid'
    }).sort('createdAt');

    // Setup Excel Workbook
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(`GST Report ${month}-${year}`);

    // Define Columns
    sheet.columns = [
        { header: 'Date', key: 'date', width: 12 },
        { header: 'Order ID', key: 'id', width: 20 },
        { header: 'Customer', key: 'customer', width: 25 },
        { header: 'Taxable Amt', key: 'taxable', width: 15 },
        { header: 'CGST (9%)', key: 'cgst', width: 15 },
        { header: 'SGST (9%)', key: 'sgst', width: 15 },
        { header: 'IGST (18%)', key: 'igst', width: 15 },
        { header: 'Total', key: 'total', width: 15 },
        { header: 'State', key: 'state', width: 15 },
    ];

    // Add Rows
    orders.forEach(order => {
        sheet.addRow({
            date:     order.createdAt.toLocaleDateString(),
            id:       order.orderNumber,
            customer: order.address.name,
            taxable:  order.pricing.taxableAmount,
            cgst:     order.pricing.cgst,
            sgst:     order.pricing.sgst,
            igst:     order.pricing.igst,
            total:    order.pricing.total,
            state:    order.address.state
        });
    });

    // Formatting
    sheet.getRow(1).font = { bold: true };

    // Stream response
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=GST_Report_${month}_${year}.xlsx`);

    await workbook.xlsx.write(res);
    res.end();
});
