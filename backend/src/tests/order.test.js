/**
 * @file         order.test.js
 * @description  Jest tests for order placement & GST logic.
 * @module       tests/order
 */
const { calculateGST } = require('../src/services/gst.service');

describe('Order API & GST Service', () => {
    it('should calculate IGST for interstate correctly', () => {
        const result = calculateGST(1000, 0, 0, 'Delhi');
        expect(result.type).toBe('interstate');
        expect(result.igst).toBe(180);
        expect(result.totalGst).toBe(180);
    });

    it('should calculate CGST+SGST for intrastate correctly', () => {
        const result = calculateGST(1000, 0, 0, 'Karnataka');
        expect(result.type).toBe('intrastate');
        expect(result.cgst).toBe(90);
        expect(result.sgst).toBe(90);
    });
});
