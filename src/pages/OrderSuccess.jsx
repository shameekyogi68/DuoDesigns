import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export default function OrderSuccess() {
    const location = useLocation();
    const order = location.state?.order || {
        id: 'ORD-2025-00042',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        payment: 'Razorpay (Prepaid)',
        address: '42, MG Road, Koramangala, Bangalore - 560034',
        items: [
            { name: 'Classic Custom Tee — Black / M', qty: 2, price: 499 },
            { name: 'Custom Photo Mug', qty: 1, price: 349 },
        ],
        subtotal: 1347,
        shipping: 0,
        discount: 135,
        gst: 242,
        total: 1454,
    };

    return (
        <>
            <style>{`
                .success-page {
                    max-width: 720px;
                    margin: 0 auto;
                    padding: 80px 40px;
                }
                .success-icon {
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, var(--accent), #a8e600);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 36px;
                    margin: 0 auto 24px;
                    box-shadow: 0 8px 32px rgba(200,255,0,0.3);
                    animation: successPop 0.6s var(--ease-spring);
                }
                @keyframes successPop {
                    0% { transform: scale(0); opacity: 0; }
                    60% { transform: scale(1.15); }
                    100% { transform: scale(1); opacity: 1; }
                }
                .success-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 48px;
                    letter-spacing: 2px;
                    text-align: center;
                    margin-bottom: 8px;
                }
                .success-subtitle {
                    text-align: center;
                    font-size: 15px;
                    color: var(--gray);
                    margin-bottom: 48px;
                    font-family: 'Inter', sans-serif;
                }
                .success-subtitle strong { color: var(--black); }
                .order-card {
                    background: var(--card-bg);
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    margin-bottom: 24px;
                }
                .order-card-header {
                    background: var(--black);
                    color: var(--white);
                    padding: 20px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .order-card-header h3 {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 22px;
                    letter-spacing: 2px;
                }
                .order-card-header .order-id {
                    font-family: 'Inter', sans-serif;
                    font-size: 13px;
                    color: var(--accent);
                    font-weight: 700;
                }
                .order-card-body {
                    padding: 24px;
                }
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding: 12px 0;
                    border-bottom: 1px solid var(--light-gray);
                    font-size: 14px;
                    font-family: 'Inter', sans-serif;
                }
                .detail-row:last-child { border-bottom: none; }
                .detail-label {
                    color: var(--muted);
                    font-weight: 500;
                }
                .detail-value {
                    font-weight: 600;
                    text-align: right;
                    max-width: 300px;
                }
                .items-list {
                    list-style: none;
                    padding: 0;
                }
                .items-list li {
                    display: flex;
                    justify-content: space-between;
                    padding: 12px 0;
                    border-bottom: 1px solid var(--light-gray);
                    font-size: 14px;
                    font-family: 'Inter', sans-serif;
                }
                .items-list li:last-child { border-bottom: none; }
                .item-name {
                    font-weight: 600;
                }
                .item-meta {
                    color: var(--muted);
                    font-size: 12px;
                }
                .item-price {
                    font-weight: 700;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 16px;
                }
                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;
                    font-size: 14px;
                    font-family: 'Inter', sans-serif;
                }
                .summary-row.total {
                    border-top: 2px solid var(--black);
                    padding-top: 16px;
                    margin-top: 8px;
                    font-weight: 800;
                    font-size: 18px;
                }
                .summary-row .discount {
                    color: var(--success);
                    font-weight: 600;
                }
                .success-actions {
                    display: flex;
                    gap: 12px;
                    margin-top: 32px;
                }
                .timeline-note {
                    text-align: center;
                    padding: 24px;
                    background: rgba(200,255,0,0.08);
                    border-radius: var(--radius-md);
                    margin-top: 24px;
                    font-size: 14px;
                    font-family: 'Inter', sans-serif;
                    color: var(--gray);
                }
                .timeline-note strong { color: var(--black); }
                @media (max-width: 768px) {
                    .success-page { padding: 40px 20px; }
                    .success-title { font-size: 36px; }
                    .success-actions { flex-direction: column; }
                }
            `}</style>

            <div className="success-page">
                <div className="success-icon">✓</div>
                <h1 className="success-title">ORDER CONFIRMED!</h1>
                <p className="success-subtitle">
                    Thank you for your order. We'll start printing your custom products right away!<br />
                    Order ID: <strong>{order.id}</strong>
                </p>

                {/* Order Details */}
                <div className="order-card">
                    <div className="order-card-header">
                        <h3>ORDER DETAILS</h3>
                        <span className="order-id">{order.id}</span>
                    </div>
                    <div className="order-card-body">
                        <div className="detail-row">
                            <span className="detail-label">Order Date</span>
                            <span className="detail-value">{order.date}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Payment</span>
                            <span className="detail-value">{order.payment}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Delivery Address</span>
                            <span className="detail-value">{order.address}</span>
                        </div>
                    </div>
                </div>

                {/* Items */}
                <div className="order-card">
                    <div className="order-card-header">
                        <h3>ITEMS ORDERED</h3>
                        <span className="order-id">{order.items.length} items</span>
                    </div>
                    <div className="order-card-body">
                        <ul className="items-list">
                            {order.items.map((item, i) => (
                                <li key={i}>
                                    <div>
                                        <div className="item-name">{item.name}</div>
                                        <div className="item-meta">Qty: {item.qty}</div>
                                    </div>
                                    <span className="item-price">₹{item.price * item.qty}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Price Summary */}
                <div className="order-card">
                    <div className="order-card-body">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{order.subtotal}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
                        </div>
                        {order.discount > 0 && (
                            <div className="summary-row">
                                <span>Discount</span>
                                <span className="discount">−₹{order.discount}</span>
                            </div>
                        )}
                        <div className="summary-row">
                            <span>GST (18%)</span>
                            <span>₹{order.gst}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total Paid</span>
                            <span>₹{order.total}</span>
                        </div>
                    </div>
                </div>

                <div className="success-actions">
                    <Link to={ROUTES.TRACK_ORDER} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                        Track Order →
                    </Link>
                    <Link to={ROUTES.SHOP} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                        Continue Shopping
                    </Link>
                </div>

                <div className="timeline-note">
                    📦 Your order will be printed, quality-checked, and shipped within <strong>5-7 business days</strong>.
                    You'll receive tracking updates via email.
                </div>
            </div>
        </>
    );
}
