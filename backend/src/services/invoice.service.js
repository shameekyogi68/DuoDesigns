/**
 * @file         invoice.service.js
 * @description  PDF invoice generation using pdf-lib.
 *
 * @module       services/invoice
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

/**
 * @function generateInvoice
 * @description Creates a professional PDF invoice for a given order.
 * @param {Object} order - Populated order document
 * @returns {Promise<Buffer>} PDF file buffer
 */
const generateInvoice = async (order) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = 790;
    const black = rgb(0.04, 0.04, 0.04);
    const gray = rgb(0.5, 0.5, 0.5);

    // ── Header ─────────────────────────
    page.drawText('DUO DESIGNS', { x: 50, y, size: 24, font, color: black });
    y -= 18;
    page.drawText('TAX INVOICE', { x: 50, y, size: 10, font: fontNormal, color: gray });
    y -= 30;

    // ── Order Info ──────────────────────
    page.drawText(`Invoice #: ${order.orderNumber}`, { x: 50, y, size: 10, font, color: black });
    page.drawText(`Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}`, { x: 350, y, size: 10, font: fontNormal, color: gray });
    y -= 20;

    // ── Ship To ────────────────────────
    page.drawText('SHIP TO:', { x: 50, y, size: 9, font, color: gray });
    y -= 14;
    page.drawText(`${order.address.name}`, { x: 50, y, size: 10, font, color: black });
    y -= 14;
    page.drawText(`${order.address.line1}, ${order.address.line2 || ''}`, { x: 50, y, size: 9, font: fontNormal, color: black });
    y -= 14;
    page.drawText(`${order.address.city}, ${order.address.state} — ${order.address.pincode}`, { x: 50, y, size: 9, font: fontNormal, color: black });
    y -= 14;
    page.drawText(`Phone: ${order.address.phone}`, { x: 50, y, size: 9, font: fontNormal, color: gray });
    y -= 30;

    // ── Line ───────────────────────────
    page.drawLine({ start: { x: 50, y }, end: { x: 545, y }, thickness: 1, color: black });
    y -= 20;

    // ── Table Header ───────────────────
    page.drawText('Item', { x: 50, y, size: 9, font, color: black });
    page.drawText('Variant', { x: 250, y, size: 9, font, color: black });
    page.drawText('Qty', { x: 360, y, size: 9, font, color: black });
    page.drawText('Price', { x: 420, y, size: 9, font, color: black });
    page.drawText('Total', { x: 490, y, size: 9, font, color: black });
    y -= 16;

    // ── Items ──────────────────────────
    for (const item of order.items) {
        page.drawText(item.name.substring(0, 30), { x: 50, y, size: 9, font: fontNormal, color: black });
        page.drawText(`${item.variant || '-'} / ${item.size || '-'}`, { x: 250, y, size: 9, font: fontNormal, color: gray });
        page.drawText(`${item.qty}`, { x: 365, y, size: 9, font: fontNormal, color: black });
        page.drawText(`₹${item.price}`, { x: 420, y, size: 9, font: fontNormal, color: black });
        page.drawText(`₹${item.price * item.qty}`, { x: 490, y, size: 9, font: fontNormal, color: black });
        y -= 16;
    }
    y -= 10;

    // ── Line ───────────────────────────
    page.drawLine({ start: { x: 50, y }, end: { x: 545, y }, thickness: 0.5, color: gray });
    y -= 20;

    // ── Totals ─────────────────────────
    const drawRow = (label, value, bold = false) => {
        page.drawText(label, { x: 350, y, size: 9, font: bold ? font : fontNormal, color: black });
        page.drawText(`₹${value.toFixed(2)}`, { x: 490, y, size: 9, font: bold ? font : fontNormal, color: black });
        y -= 16;
    };

    drawRow('Subtotal', order.pricing.subtotal);
    drawRow('Shipping', order.pricing.shipping);
    if (order.pricing.discount > 0) drawRow('Discount', -order.pricing.discount);
    if (order.pricing.cgst > 0) drawRow('CGST (9%)', order.pricing.cgst);
    if (order.pricing.sgst > 0) drawRow('SGST (9%)', order.pricing.sgst);
    if (order.pricing.igst > 0) drawRow('IGST (18%)', order.pricing.igst);

    y -= 6;
    page.drawLine({ start: { x: 350, y }, end: { x: 545, y }, thickness: 1.5, color: black });
    y -= 18;
    drawRow('TOTAL', order.pricing.total, true);

    // ── Footer ─────────────────────────
    y = 60;
    page.drawText('Thank you for shopping with Duo Designs!', { x: 50, y, size: 9, font: fontNormal, color: gray });
    page.drawText('support@duodesigns.in', { x: 50, y: y - 14, size: 8, font: fontNormal, color: gray });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
};

module.exports = { generateInvoice };
