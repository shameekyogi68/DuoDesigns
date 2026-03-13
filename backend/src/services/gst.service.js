/**
 * @file         gst.service.js
 * @description  GST calculation service for Duo Designs.
 *               Handles CGST+SGST (intrastate) and IGST (interstate).
 *               Seller state: Karnataka.
 *
 * @module       services/gst
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const SELLER_STATE = 'Karnataka';
const GST_RATE = 0.18; // 18% total

/**
 * @function calculateGST
 * @description Computes GST breakdown based on buyer state.
 *
 * @param {number} subtotal       - Pre-tax item total
 * @param {number} shippingCharge - Delivery cost
 * @param {number} discount       - Coupon/discount amount
 * @param {string} customerState  - Buyer's state name
 *
 * @returns {Object} GST breakdown
 * @returns {string} .type       - 'intrastate' | 'interstate'
 * @returns {number} .cgst       - Central GST (9%)
 * @returns {number} .sgst       - State GST (9%)
 * @returns {number} .igst       - Integrated GST (18%)
 * @returns {number} .totalGst   - Total tax amount
 * @returns {number} .taxable    - Taxable amount
 */
const calculateGST = (subtotal, shippingCharge = 0, discount = 0, customerState = '') => {
    const taxable = subtotal + shippingCharge - discount;

    if (taxable <= 0) {
        return { type: 'intrastate', cgst: 0, sgst: 0, igst: 0, totalGst: 0, taxable: 0 };
    }

    const isIntrastate = customerState.toLowerCase() === SELLER_STATE.toLowerCase();

    if (isIntrastate) {
        const halfRate = GST_RATE / 2;
        const cgst = Math.round(taxable * halfRate * 100) / 100;
        const sgst = Math.round(taxable * halfRate * 100) / 100;
        return {
            type: 'intrastate',
            cgst,
            sgst,
            igst: 0,
            totalGst: cgst + sgst,
            taxable,
        };
    }

    const igst = Math.round(taxable * GST_RATE * 100) / 100;
    return {
        type: 'interstate',
        cgst: 0,
        sgst: 0,
        igst,
        totalGst: igst,
        taxable,
    };
};

module.exports = { calculateGST, SELLER_STATE, GST_RATE };
