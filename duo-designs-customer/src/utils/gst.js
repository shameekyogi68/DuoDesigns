/**
 * @file         gst.js
 * @description  GST calculation utility for India.
 *               Handles Inter-state (IGST) vs Intra-state (CGST + SGST) logic.
 *
 * @module       utils/gst
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @notes
 *   - Current GST Rate: 18% (split into 9+9 for Intra-state)
 *   - Seller State: Karnataka (base for calculation)
 */

export const SELLER_STATE = 'Karnataka';
export const GST_RATE = 0.18; // 18% GST

/**
 * @function calculateGST
 * @description Calculates GST based on customer delivery state.
 *              Applies CGST+SGST for Karnataka (intrastate)
 *              and IGST for all other states (interstate).
 *
 * @param {number} subtotal        - Products total price
 * @param {number} shipping        - Shipping charge from pincode
 * @param {number} discount        - Coupon discount amount
 * @param {string} customerState   - Customer's delivery state
 *
 * @returns {Object} GST breakdown
 * @returns {number} returns.cgst       - CGST amount (intrastate only)
 * @returns {number} returns.sgst       - SGST amount (intrastate only)
 * @returns {number} returns.igst       - IGST amount (interstate only)
 * @returns {number} returns.totalGst   - Total tax amount
 * @returns {string} returns.type       - "intrastate" or "interstate"
 *
 * @example
 *   calculateGST(1000, 50, 0, "Karnataka")
 *   // returns { cgst: 94.5, sgst: 94.5, igst: 0, totalGst: 189 }
 */
export const calculateGST = (subtotal, shipping, discount, customerState) => {
    const taxableAmount = Math.max(0, subtotal + shipping - discount);
    let igst = 0;
    let cgst = 0;
    let sgst = 0;

    if (!customerState) {
        // Default to IGST if state is not provided yet
        igst = taxableAmount * GST_RATE;
    } else if (customerState.trim().toLowerCase() === SELLER_STATE.toLowerCase()) {
        // Intra-state sale (Karnataka)
        cgst = taxableAmount * (GST_RATE / 2);
        sgst = taxableAmount * (GST_RATE / 2);
    } else {
        // Inter-state sale
        igst = taxableAmount * GST_RATE;
    }

    return {
        igst: Math.round(igst * 100) / 100,
        cgst: Math.round(cgst * 100) / 100,
        sgst: Math.round(sgst * 100) / 100,
        totalGst: Math.round((igst + cgst + sgst) * 100) / 100,
    };
};
