/** @file gst.js — GST calculation (copied from customer app logic) */
import { GST_RATE, SELLER_STATE } from '@/constants/app';

export const getGSTType = (customerState) => {
  if (!customerState) return 'igst';
  return customerState.toLowerCase() === SELLER_STATE.toLowerCase() ? 'intra' : 'igst';
};

export const calculateGST = (subtotal, shipping = 0, discount = 0, customerState = '') => {
  const taxable = subtotal + shipping - discount;
  const type = getGSTType(customerState);
  const totalGst = +(taxable * GST_RATE).toFixed(2);

  if (type === 'intra') {
    const half = +(totalGst / 2).toFixed(2);
    return { type: 'intra', taxable, cgst: half, sgst: half, igst: 0, totalGst };
  }
  return { type: 'igst', taxable, cgst: 0, sgst: 0, igst: totalGst, totalGst };
};

export const formatGSTBreakdown = (gstData) => {
  if (!gstData) return '';
  if (gstData.type === 'intra') return `CGST ₹${gstData.cgst} + SGST ₹${gstData.sgst}`;
  return `IGST ₹${gstData.igst}`;
};
