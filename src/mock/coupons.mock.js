/**
 * @file         coupons.mock.js
 * @description  Mock coupons and promotional codes.
 *
 * @module       mock/coupons
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

export const MOCK_COUPONS = [
    {
        code: 'FIRST10',
        discount: 10,
        type: 'percentage',
        desc: '10% off on your first order. No minimum purchase.',
        expiry: '2025-03-31',
        isExpired: false
    },
    {
        code: 'SAVE100',
        discount: 100,
        type: 'fixed',
        desc: '₹100 flat discount on orders above ₹799.',
        expiry: '2025-03-15',
        isExpired: false
    },
    {
        code: 'LAUNCH20',
        discount: 20,
        type: 'percentage',
        desc: 'Grand launch offer sitewide.',
        expiry: '2025-02-28',
        isExpired: true
    }
];
