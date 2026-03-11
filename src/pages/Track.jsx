import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import toast from 'react-hot-toast';

export default function Track() {
    const [orderId, setOrderId] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(false);

    const mockOrder = {
        id: 'ORD-2025-00042',
        status: 'printing',
        items: [
            { name: 'Classic Custom Tee — Black / M', qty: 2, price: 499, icon: '👕' },
            { name: 'Custom Photo Mug', qty: 1, price: 349, icon: '☕' },
        ],
        timeline: [
            { step: 'Order Placed', date: '26 Mar 2025, 11:42 AM', done: true, icon: '✓' },
            { step: 'Payment Confirmed', date: '26 Mar 2025, 11:43 AM', done: true, icon: '✓' },
            { step: 'Design Approved', date: '26 Mar 2025, 3:15 PM', done: true, icon: '✓' },
            { step: 'Printing in Progress', date: 'Estimated: 28 Mar 2025', done: false, icon: '🖨️', active: true },
            { step: 'Quality Check', date: '', done: false, icon: '🔍' },
            { step: 'Shipped', date: '', done: false, icon: '📦' },
            { step: 'Delivered', date: '', done: false, icon: '🏠' },
        ],
        courier: 'BlueDart',
        tracking: 'BD1234567890',
        estimated: '31 Mar - 2 Apr 2025',
    };

    const handleTrack = (e) => {
        e.preventDefault();
        if (!orderId.trim()) {
            toast.error('Please enter an order ID');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setOrderData(mockOrder);
            setLoading(false);
            toast.success('Order found!');
        }, 800);
    };

    const getStatusLabel = (status) => {
        const map = {
            'placed': 'Order Placed',
            'confirmed': 'Confirmed',
            'printing': 'Printing',
            'shipped': 'Shipped',
            'delivered': 'Delivered',
        };
        return map[status] || status;
    };

    const getStatusColor = (status) => {
        if (status === 'delivered') return 'var(--success)';
        if (status === 'shipped') return 'var(--info)';
        return 'var(--accent)';
    };

    return (
        <>
            <style>{`
                .track-hero {
                    background: var(--black);
                    color: var(--white);
                    text-align: center;
                    padding: 72px 40px;
                    position: relative;
                    overflow: hidden;
                }
                .track-hero::before {
                    content: 'TRACK';
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 300px;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    color: rgba(255,255,255,0.02);
                    pointer-events: none;
                    white-space: nowrap;
                }
                .track-hero h1 {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(48px, 6vw, 80px);
                    letter-spacing: 3px;
                    position: relative;
                }
                .track-hero h1 span { color: var(--accent); }
                .track-hero p {
                    font-size: 15px;
                    color: rgba(255,255,255,0.4);
                    margin-top: 12px;
                    position: relative;
                    font-family: 'Inter', sans-serif;
                }
                .track-form-wrap {
                    max-width: 600px;
                    margin: -32px auto 0;
                    padding: 0 40px;
                    position: relative;
                    z-index: 2;
                }
                .track-form {
                    background: var(--white);
                    border: 1.5px solid var(--light-gray);
                    border-radius: var(--radius-md);
                    display: flex;
                    overflow: hidden;
                    box-shadow: var(--shadow-lg);
                }
                .track-form input {
                    flex: 1;
                    padding: 18px 24px;
                    border: none;
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    outline: none;
                    background: transparent;
                }
                .track-form input::placeholder { color: var(--muted); }
                .track-form button {
                    padding: 18px 36px;
                    background: var(--black);
                    color: var(--white);
                    border: none;
                    font-family: 'Inter', sans-serif;
                    font-weight: 700;
                    font-size: 13px;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.3s var(--ease-out);
                    white-space: nowrap;
                }
                .track-form button:hover {
                    background: var(--accent);
                    color: var(--black);
                }
                .track-result {
                    max-width: 720px;
                    margin: 48px auto;
                    padding: 0 40px;
                }
                .status-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 24px;
                    background: var(--card-bg);
                    border-radius: var(--radius-md);
                    margin-bottom: 32px;
                    flex-wrap: wrap;
                    gap: 16px;
                }
                .status-bar-left h3 {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 28px;
                    letter-spacing: 2px;
                }
                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 16px;
                    border-radius: 20px;
                    font-family: 'Inter', sans-serif;
                    font-weight: 700;
                    font-size: 12px;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }
                .status-bar-right {
                    text-align: right;
                    font-family: 'Inter', sans-serif;
                }
                .status-bar-right .est-label {
                    font-size: 12px;
                    color: var(--muted);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-weight: 600;
                }
                .status-bar-right .est-date {
                    font-weight: 700;
                    font-size: 14px;
                    margin-top: 2px;
                }
                .timeline {
                    position: relative;
                    padding-left: 32px;
                    margin-bottom: 40px;
                }
                .timeline::before {
                    content: '';
                    position: absolute;
                    left: 11px;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: var(--light-gray);
                }
                .timeline-item {
                    position: relative;
                    padding: 0 0 28px 24px;
                }
                .timeline-item:last-child { padding-bottom: 0; }
                .timeline-dot {
                    position: absolute;
                    left: -28px;
                    top: 2px;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: var(--light-gray);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                    z-index: 1;
                    border: 2px solid var(--white);
                }
                .timeline-dot.done {
                    background: var(--accent);
                    color: var(--black);
                    font-weight: 900;
                }
                .timeline-dot.active {
                    background: var(--black);
                    color: var(--white);
                    box-shadow: 0 0 0 4px rgba(200,255,0,0.2);
                    animation: timelinePulse 2s ease-in-out infinite;
                }
                @keyframes timelinePulse {
                    0%, 100% { box-shadow: 0 0 0 4px rgba(200,255,0,0.2); }
                    50% { box-shadow: 0 0 0 8px rgba(200,255,0,0.1); }
                }
                .timeline-step {
                    font-family: 'Inter', sans-serif;
                    font-weight: 700;
                    font-size: 14px;
                }
                .timeline-step.pending { color: var(--muted); }
                .timeline-date {
                    font-size: 12px;
                    color: var(--muted);
                    margin-top: 2px;
                    font-family: 'Inter', sans-serif;
                }
                .order-items-card {
                    background: var(--card-bg);
                    border-radius: var(--radius-md);
                    padding: 24px;
                    margin-bottom: 24px;
                }
                .order-items-card h4 {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 18px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 16px;
                }
                .order-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 0;
                    border-bottom: 1px solid var(--light-gray);
                    font-family: 'Inter', sans-serif;
                }
                .order-item:last-child { border-bottom: none; }
                .order-item-icon {
                    font-size: 28px;
                    margin-right: 12px;
                }
                .order-item-name {
                    font-weight: 600;
                    font-size: 14px;
                }
                .order-item-qty {
                    font-size: 12px;
                    color: var(--muted);
                }
                .order-item-price {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 18px;
                    font-weight: 700;
                }
                .courier-info {
                    display: flex;
                    gap: 12px;
                    margin-top: 16px;
                }
                .courier-info a,
                .courier-info span {
                    flex: 1;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                @media (max-width: 768px) {
                    .track-hero { padding: 48px 20px; }
                    .track-form-wrap { padding: 0 20px; }
                    .track-result { padding: 0 20px; }
                    .track-form { flex-direction: column; }
                    .track-form button { padding: 14px; }
                    .status-bar { flex-direction: column; text-align: center; }
                    .status-bar-right { text-align: center; }
                }
            `}</style>

            {/* Hero */}
            <div className="track-hero">
                <h1>TRACK YOUR <span>ORDER</span></h1>
                <p>Enter your order ID to see real-time status and delivery updates</p>
            </div>

            {/* Search Form */}
            <div className="track-form-wrap">
                <form className="track-form" onSubmit={handleTrack}>
                    <input
                        type="text"
                        placeholder="Enter order ID (e.g. ORD-2025-00042)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        autoFocus
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Searching...' : 'Track →'}
                    </button>
                </form>
            </div>

            {/* Result */}
            {orderData && (
                <div className="track-result">
                    {/* Status Bar */}
                    <div className="status-bar">
                        <div className="status-bar-left">
                            <h3>{orderData.id}</h3>
                            <span
                                className="status-badge"
                                style={{
                                    background: `${getStatusColor(orderData.status)}20`,
                                    color: getStatusColor(orderData.status)
                                }}
                            >
                                ● {getStatusLabel(orderData.status)}
                            </span>
                        </div>
                        <div className="status-bar-right">
                            <div className="est-label">Estimated Delivery</div>
                            <div className="est-date">{orderData.estimated}</div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="timeline">
                        {orderData.timeline.map((t, i) => (
                            <div className="timeline-item" key={i}>
                                <div className={`timeline-dot ${t.done ? 'done' : ''} ${t.active ? 'active' : ''}`}>
                                    {t.done ? '✓' : t.icon}
                                </div>
                                <div className={`timeline-step ${!t.done && !t.active ? 'pending' : ''}`}>
                                    {t.step}
                                </div>
                                {t.date && <div className="timeline-date">{t.date}</div>}
                            </div>
                        ))}
                    </div>

                    {/* Order Items */}
                    <div className="order-items-card">
                        <h4>Items in this Order</h4>
                        {orderData.items.map((item, i) => (
                            <div className="order-item" key={i}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span className="order-item-icon">{item.icon}</span>
                                    <div>
                                        <div className="order-item-name">{item.name}</div>
                                        <div className="order-item-qty">Qty: {item.qty}</div>
                                    </div>
                                </div>
                                <span className="order-item-price">₹{item.price * item.qty}</span>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="courier-info">
                        <Link to={ROUTES.HELP} className="btn-outline" style={{ justifyContent: 'center' }}>
                            Need Help?
                        </Link>
                        <Link to={ROUTES.SHOP} className="btn-primary" style={{ justifyContent: 'center' }}>
                            Shop More →
                        </Link>
                    </div>
                </div>
            )}

            {/* Empty state when no search */}
            {!orderData && !loading && (
                <div style={{
                    textAlign: 'center',
                    padding: '64px 20px',
                    color: 'var(--muted)',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '14px'
                }}>
                    Try: ORD-2025-00042
                </div>
            )}
        </>
    );
}
