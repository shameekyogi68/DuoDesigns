export const SELLER_STATE = 'Karnataka';
export const GST_RATE = 0.18; // 18% GST

/**
 * Calculates GST components based on the customer's state.
 * @param {number} subtotal - The subtotal amount
 * @param {number} shipping - The shipping charge
 * @param {number} discount - The discount amount applied
 * @param {string} customerState - The state from the delivery address
 * @returns {object} GST breakdown { igst, cgst, sgst, totalGst }
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
