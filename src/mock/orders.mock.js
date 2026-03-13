/**
 * @file         orders.mock.js
 * @description  Mock order history for user account testing.
 *
 * @module       mock/orders
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

export const MOCK_ORDERS = [
    {
        id: 'ORD-2025-00042',
        date: '2025-03-10',
        status: 'Delivered',
        total: 1454,
        items: [
            { name: 'Classic Custom Tee — Black / M', qty: 2, price: 499 },
            { name: 'Custom Photo Mug', qty: 1, price: 349 }
        ],
        timeline: [
            { status: 'Order Placed', date: 'Mar 10, 10:30 AM', desc: 'We have received your order.', completed: true },
            { status: 'Design Verified', date: 'Mar 10, 02:45 PM', desc: 'Our team has approved your custom design.', completed: true },
            { status: 'In Production', date: 'Mar 11, 09:15 AM', desc: 'Your product is being printed.', completed: true },
            { status: 'Shipped', date: 'Mar 12, 11:00 AM', desc: 'Package handed over to BlueDart.', completed: true },
            { status: 'Delivered', date: 'Mar 14, 04:20 PM', desc: 'Handed over to customer.', completed: true }
        ]
    },
    {
        id: 'ORD-2025-00038',
        date: '2025-03-05',
        status: 'Processing',
        total: 899,
        items: [
            { name: 'Custom Trackpants — Navy / L', qty: 1, price: 899 }
        ],
        timeline: [
            { status: 'Order Placed', date: 'Mar 05, 11:20 AM', desc: 'Order received.', completed: true },
            { status: 'Design Verified', date: 'Mar 05, 04:00 PM', desc: 'Design approved.', completed: true },
            { status: 'In Production', date: 'Mar 06, 10:00 AM', desc: 'Printing in progress.', completed: true },
            { status: 'Shipped', date: null, desc: 'Pending courier pickup.', completed: false },
            { status: 'Delivered', date: null, desc: 'Pending delivery.', completed: false }
        ]
    }
];
