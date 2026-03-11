import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import toast from 'react-hot-toast';

export default function Account() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [activePanel, setActivePanel] = useState('orders');

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate(ROUTES.LOGIN);
    };

    return (
        <>
            <style>{`
    .account-layout { max-width: 1400px; margin: 0 auto; padding: 48px 40px; display: grid; grid-template-columns: 280px 1fr; gap: 40px; }
    .sidebar { position: sticky; top: 80px; height: fit-content; }
    .user-card { background: var(--black); color: var(--white); padding: 28px; margin-bottom: 2px; }
    .user-avatar { width: 56px; height: 56px; background: var(--accent); display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--black); margin-bottom: 14px; }
    .user-name { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
    .user-email { font-size: 13px; color: #888; margin-top: 4px; }
    .user-since { font-size: 11px; color: #555; margin-top: 8px; text-transform: uppercase; letter-spacing: 1px; }
    .sidebar-nav { border: 1.5px solid var(--black); }
    .sidebar-link { display: flex; align-items: center; gap: 12px; padding: 16px 20px; text-decoration: none; color: var(--black); font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--light-gray); transition: all 0.2s; cursor: pointer; background: none; border-right: none; border-left: none; width: 100%; font-family: 'Barlow', sans-serif; }
    .sidebar-link:last-child { border-bottom: none; }
    .sidebar-link:hover { background: var(--card-bg); }
    .sidebar-link.active { background: var(--black); color: var(--white); }
    .sidebar-link .icon { font-size: 16px; }
    .sidebar-link .badge { margin-left: auto; background: var(--accent); color: var(--black); font-size: 10px; font-weight: 900; padding: 2px 8px; }
    .content-panel { display: none; }
    .content-panel.active { display: block; }
    .panel-title { font-family: 'Bebas Neue', sans-serif; font-size: 48px; letter-spacing: 2px; margin-bottom: 4px; }
    .panel-subtitle { font-size: 14px; color: var(--gray); margin-bottom: 32px; }
    .orders-filter { display: flex; gap: 0; margin-bottom: 28px; border: 1.5px solid var(--black); width: fit-content; }
    .filter-btn { padding: 10px 20px; background: none; border: none; font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; border-right: 1px solid var(--black); transition: all 0.2s; }
    .filter-btn:last-child { border-right: none; }
    .filter-btn.active { background: var(--black); color: var(--white); }
    .order-card { border: 1.5px solid var(--black); margin-bottom: 20px; }
    .order-header { background: var(--card-bg); padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1.5px solid var(--black); flex-wrap: wrap; gap: 12px; }
    .order-id { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 1px; }
    .order-date { font-size: 13px; color: var(--gray); }
    .order-status { padding: 6px 14px; font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
    .status-placed { background: #fff3cd; color: #856404; }
    .status-confirmed { background: #cfe2ff; color: #084298; }
    .status-dispatched { background: #d1ecf1; color: #0c5460; }
    .status-delivered { background: #d4edda; color: #155724; }
    .order-body { padding: 24px; }
    .order-items { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }
    .order-item { display: flex; align-items: center; gap: 16px; }
    .order-item-img { width: 64px; height: 64px; background: var(--card-bg); border: 1.5px solid var(--black); display: flex; align-items: center; justify-content: center; font-size: 28px; flex-shrink: 0; }
    .order-item-info { flex: 1; }
    .order-item-name { font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .order-item-meta { font-size: 12px; color: var(--gray); margin-top: 3px; }
    .order-item-price { font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 700; }
    .order-timeline { padding: 20px 0; border-top: 1px solid var(--light-gray); border-bottom: 1px solid var(--light-gray); margin-bottom: 20px; }
    .timeline { display: flex; align-items: center; position: relative; }
    .timeline-step { display: flex; flex-direction: column; align-items: center; flex: 1; }
    .timeline-dot { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--light-gray); background: var(--white); display: flex; align-items: center; justify-content: center; font-size: 14px; z-index: 1; position: relative; }
    .timeline-dot.done { background: var(--black); border-color: var(--black); color: var(--white); }
    .timeline-dot.current { background: var(--accent); border-color: var(--black); }
    .timeline-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 8px; text-align: center; color: var(--gray); }
    .timeline-label.done, .timeline-label.current { color: var(--black); }
    .timeline-line { flex: 1; height: 2px; background: var(--light-gray); margin: 0 -1px; margin-bottom: 24px; }
    .timeline-line.done { background: var(--black); }
    .order-footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    .order-total { font-family: 'Barlow Condensed', sans-serif; font-size: 24px; font-weight: 700; }
    .order-total span { font-size: 13px; color: var(--gray); font-family: 'Barlow', sans-serif; font-weight: 400; margin-right: 6px; }
    .order-actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .btn-sm { padding: 10px 18px; font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; border: 1.5px solid var(--black); }
    .btn-sm-primary { background: var(--black); color: var(--white); }
    .btn-sm-primary:hover { background: var(--accent); color: var(--black); border-color: var(--accent); }
    .btn-sm-outline { background: none; color: var(--black); }
    .btn-sm-outline:hover { background: var(--black); color: var(--white); }
    .tracking-info { background: var(--card-bg); padding: 14px 20px; border: 1px solid var(--light-gray); margin-bottom: 16px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    .tracking-info .courier { font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
    .tracking-info .tracking-num { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 2px; color: var(--black); }
    .track-link { font-size: 12px; font-weight: 700; color: var(--black); border-bottom: 2px solid var(--accent); text-decoration: none; }
    .profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .form-group { margin-bottom: 20px; }
    .form-label { display: block; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
    .form-input { width: 100%; padding: 14px 16px; border: 1.5px solid var(--black); background: var(--white); font-family: 'Barlow', sans-serif; font-size: 15px; outline: none; transition: border-color 0.2s; }
    .form-input:focus { border-color: var(--accent); }
    .form-input:disabled { background: var(--card-bg); color: var(--gray); cursor: not-allowed; }
    .btn-save { background: var(--black); color: var(--white); border: 2px solid var(--black); padding: 14px 36px; font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
    .btn-save:hover { background: var(--accent); color: var(--black); border-color: var(--accent); }
    .addresses-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .address-card { border: 1.5px solid var(--black); padding: 20px; position: relative; }
    .address-card.default { border-color: var(--accent); border-width: 2px; }
    .address-default-badge { position: absolute; top: 12px; right: 12px; background: var(--accent); color: var(--black); font-size: 10px; font-weight: 800; padding: 3px 8px; text-transform: uppercase; letter-spacing: 1px; }
    .address-name { font-weight: 800; font-size: 15px; text-transform: uppercase; margin-bottom: 6px; }
    .address-text { font-size: 14px; color: #444; line-height: 1.6; margin-bottom: 12px; }
    .address-phone { font-size: 13px; font-weight: 600; color: var(--gray); margin-bottom: 16px; }
    .add-address { border: 2px dashed var(--black); padding: 40px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; cursor: pointer; background: none; width: 100%; font-family: 'Barlow', sans-serif; transition: background 0.2s; }
    .add-address:hover { background: var(--card-bg); }
    .add-address-icon { font-size: 32px; }
    .add-address-text { font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-bottom: 40px; border: 1.5px solid var(--black); }
    .stat-card { padding: 24px; border-right: 1px solid var(--black); text-align: center; }
    .stat-card:last-child { border-right: none; }
    .stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 42px; letter-spacing: 1px; }
    .stat-label { font-size: 12px; color: var(--gray); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }
    @media (max-width: 1024px) { .account-layout { grid-template-columns: 1fr; } .sidebar { position: static; } .stats-row { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) { .account-layout { padding: 24px 20px; } .profile-grid { grid-template-columns: 1fr; } .addresses-grid { grid-template-columns: 1fr; } .stats-row { grid-template-columns: repeat(2, 1fr); } }
      `}</style>

            <div className="account-layout">

                {/* SIDEBAR */}
                <aside className="sidebar">
                    <div className="user-card">
                        <div className="user-avatar">{user?.name ? user.name.charAt(0).toUpperCase() : 'U'}</div>
                        <div className="user-name">{user?.name || 'User Name'}</div>
                        <div className="user-email">{user?.email || 'user@email.com'}</div>
                        <div className="user-since">Member since {new Date().getFullYear()}</div>
                    </div>
                    <div className="sidebar-nav">
                        <button className={`sidebar-link ${activePanel === 'orders' ? 'active' : ''}`} onClick={() => setActivePanel('orders')}><span className="icon">📦</span> My Orders <span className="badge">4</span></button>
                        <button className={`sidebar-link ${activePanel === 'profile' ? 'active' : ''}`} onClick={() => setActivePanel('profile')}><span className="icon">👤</span> My Profile</button>
                        <button className={`sidebar-link ${activePanel === 'addresses' ? 'active' : ''}`} onClick={() => setActivePanel('addresses')}><span className="icon">📍</span> Saved Addresses</button>
                        <button className={`sidebar-link ${activePanel === 'password' ? 'active' : ''}`} onClick={() => setActivePanel('password')}><span className="icon">🔒</span> Change Password</button>
                        <button className="sidebar-link" style={{ color: '#e05050' }} onClick={handleLogout}><span className="icon">🚪</span> Logout</button>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main>

                    {/* ── ORDERS PANEL ── */}
                    <div className={`content-panel ${activePanel === 'orders' ? 'active' : ''}`} id="panel-orders">
                        <div className="panel-title">MY ORDERS</div>
                        <div className="panel-subtitle">Track, download invoices, and manage your orders</div>

                        <div className="stats-row">
                            <div className="stat-card"><div className="stat-num">4</div><div className="stat-label">Total Orders</div></div>
                            <div className="stat-card"><div className="stat-num">1</div><div className="stat-label">In Transit</div></div>
                            <div className="stat-card"><div className="stat-num">2</div><div className="stat-label">Delivered</div></div>
                            <div className="stat-card"><div className="stat-num">₹2,840</div><div className="stat-label">Total Spent</div></div>
                        </div>

                        <div className="orders-filter">
                            <button className="filter-btn active">All</button>
                            <button className="filter-btn">Active</button>
                            <button className="filter-btn">Delivered</button>
                        </div>

                        {/* ORDER 1 — DISPATCHED */}
                        <div className="order-card">
                            <div className="order-header">
                                <div>
                                    <div className="order-id">#DD-2025-0042</div>
                                    <div className="order-date">Placed on 6 March 2025</div>
                                </div>
                                <span className="order-status status-dispatched">🚚 Dispatched</span>
                            </div>
                            <div className="order-body">
                                <div className="order-items">
                                    <div className="order-item">
                                        <div className="order-item-img">👕</div>
                                        <div className="order-item-info">
                                            <div className="order-item-name">Oversized Drop Tee</div>
                                            <div className="order-item-meta">Black · Size L · Custom Design Upload · Qty: 1</div>
                                        </div>
                                        <div className="order-item-price">₹699</div>
                                    </div>
                                    <div className="order-item">
                                        <div className="order-item-img">🔑</div>
                                        <div className="order-item-info">
                                            <div className="order-item-name">Keychain — Double Print</div>
                                            <div className="order-item-meta">Silver · Qty: 2</div>
                                        </div>
                                        <div className="order-item-price">₹398</div>
                                    </div>
                                </div>

                                <div className="tracking-info">
                                    <span>🚚</span>
                                    <div>
                                        <div className="courier">Delhivery</div>
                                        <div style={{ fontSize: '12px', color: 'var(--gray)' }}>Tracking Number</div>
                                    </div>
                                    <div className="tracking-num">DL4892736401</div>
                                    <a href="#" className="track-link">Track Package →</a>
                                </div>

                                <div className="order-timeline">
                                    <div className="timeline">
                                        <div className="timeline-step">
                                            <div className="timeline-dot done">✓</div>
                                            <div className="timeline-label done">Placed</div>
                                        </div>
                                        <div className="timeline-line done"></div>
                                        <div className="timeline-step">
                                            <div className="timeline-dot done">✓</div>
                                            <div className="timeline-label done">Confirmed</div>
                                        </div>
                                        <div className="timeline-line done"></div>
                                        <div className="timeline-step">
                                            <div className="timeline-dot current">🚚</div>
                                            <div className="timeline-label current">Dispatched</div>
                                        </div>
                                        <div className="timeline-line"></div>
                                        <div className="timeline-step">
                                            <div className="timeline-dot">📦</div>
                                            <div className="timeline-label">Delivered</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-footer">
                                    <div className="order-total"><span>Total Paid</span>₹1,197</div>
                                    <div className="order-actions">
                                        <button className="btn-sm btn-sm-primary">⬇ Download Invoice</button>
                                        <button className="btn-sm btn-sm-outline">View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ORDER 2 — DELIVERED */}
                        <div className="order-card">
                            <div className="order-header">
                                <div>
                                    <div className="order-id">#DD-2025-0031</div>
                                    <div className="order-date">Placed on 18 February 2025</div>
                                </div>
                                <span className="order-status status-delivered">✅ Delivered</span>
                            </div>
                            <div className="order-body">
                                <div className="order-items">
                                    <div className="order-item">
                                        <div className="order-item-img">☕</div>
                                        <div className="order-item-info">
                                            <div className="order-item-name">Custom Print Mug</div>
                                            <div className="order-item-meta">White · Custom Design Upload · Qty: 2</div>
                                        </div>
                                        <div className="order-item-price">₹698</div>
                                    </div>
                                </div>
                                <div className="order-timeline">
                                    <div className="timeline">
                                        <div className="timeline-step"><div className="timeline-dot done">✓</div><div className="timeline-label done">Placed</div></div>
                                        <div className="timeline-line done"></div>
                                        <div className="timeline-step"><div className="timeline-dot done">✓</div><div className="timeline-label done">Confirmed</div></div>
                                        <div className="timeline-line done"></div>
                                        <div className="timeline-step"><div className="timeline-dot done">✓</div><div className="timeline-label done">Dispatched</div></div>
                                        <div className="timeline-line done"></div>
                                        <div className="timeline-step"><div className="timeline-dot done">✓</div><div className="timeline-label done">Delivered</div></div>
                                    </div>
                                </div>
                                <div className="order-footer">
                                    <div className="order-total"><span>Total Paid</span>₹778</div>
                                    <div className="order-actions">
                                        <button className="btn-sm btn-sm-primary">⬇ Download Invoice</button>
                                        <button className="btn-sm btn-sm-outline">View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ORDER 3 — PLACED */}
                        <div className="order-card">
                            <div className="order-header">
                                <div>
                                    <div className="order-id">#DD-2025-0048</div>
                                    <div className="order-date">Placed on 8 March 2025</div>
                                </div>
                                <span className="order-status status-confirmed">✔ Confirmed</span>
                            </div>
                            <div className="order-body">
                                <div className="order-items">
                                    <div className="order-item">
                                        <div className="order-item-img">👕</div>
                                        <div className="order-item-info">
                                            <div className="order-item-name">Classic Custom Tee</div>
                                            <div className="order-item-meta">White · Size M · Pre-made Design · Qty: 1</div>
                                        </div>
                                        <div className="order-item-price">₹499</div>
                                    </div>
                                </div>
                                <div className="order-timeline">
                                    <div className="timeline">
                                        <div className="timeline-step"><div className="timeline-dot done">✓</div><div className="timeline-label done">Placed</div></div>
                                        <div className="timeline-line done"></div>
                                        <div className="timeline-step"><div className="timeline-dot current">✔</div><div className="timeline-label current">Confirmed</div></div>
                                        <div className="timeline-line"></div>
                                        <div className="timeline-step"><div className="timeline-dot">🚚</div><div className="timeline-label">Dispatched</div></div>
                                        <div className="timeline-line"></div>
                                        <div className="timeline-step"><div className="timeline-dot">📦</div><div className="timeline-label">Delivered</div></div>
                                    </div>
                                </div>
                                <div className="order-footer">
                                    <div className="order-total"><span>Total Paid</span>₹579</div>
                                    <div className="order-actions">
                                        <button className="btn-sm btn-sm-primary">⬇ Download Invoice</button>
                                        <button className="btn-sm btn-sm-outline">View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── PROFILE PANEL ── */}
                    <div className={`content-panel ${activePanel === 'profile' ? 'active' : ''}`} id="panel-profile">
                        <div className="panel-title">MY PROFILE</div>
                        <div className="panel-subtitle">Manage your personal information</div>
                        <div className="profile-grid">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-input" defaultValue={user?.name || ''} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input type="email" className="form-input" value={user?.email || ''} disabled />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <input type="tel" className="form-input" defaultValue="+91 98765 43210" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" className="form-input" defaultValue="1998-05-14" />
                            </div>
                        </div>
                        <div className="form-group" style={{ maxWidth: '50%' }}>
                            <label className="form-label">Gender</label>
                            <select className="form-input">
                                <option>Male</option><option>Female</option><option>Prefer not to say</option>
                            </select>
                        </div>
                        <button className="btn-save" onClick={() => toast.success('Profile updated')}>Save Changes</button>
                    </div>

                    {/* ── ADDRESSES PANEL ── */}
                    <div className={`content-panel ${activePanel === 'addresses' ? 'active' : ''}`} id="panel-addresses">
                        <div className="panel-title">SAVED ADDRESSES</div>
                        <div className="panel-subtitle">Manage your delivery addresses</div>
                        <div className="addresses-grid">
                            <div className="address-card default">
                                <span className="address-default-badge">Default</span>
                                <div className="address-name">{user?.name}</div>
                                <div className="address-text">42, 3rd Cross, Indiranagar<br />Bengaluru, Karnataka — 560038</div>
                                <div className="address-phone">📞 +91 98765 43210</div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="btn-sm btn-sm-outline">Edit</button>
                                    <button className="btn-sm btn-sm-outline" style={{ color: '#e05050', borderColor: '#e05050' }}>Remove</button>
                                </div>
                            </div>
                            <div className="address-card">
                                <div className="address-name">Office</div>
                                <div className="address-text">10, Whitefield Main Road<br />Bengaluru, Karnataka — 560066</div>
                                <div className="address-phone">📞 +91 98765 43210</div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="btn-sm btn-sm-outline">Edit</button>
                                    <button className="btn-sm btn-sm-primary">Set Default</button>
                                    <button className="btn-sm btn-sm-outline" style={{ color: '#e05050', borderColor: '#e05050' }}>Remove</button>
                                </div>
                            </div>
                            <button className="add-address">
                                <span className="add-address-icon">＋</span>
                                <span className="add-address-text">Add New Address</span>
                            </button>
                        </div>
                    </div>

                    {/* ── PASSWORD PANEL ── */}
                    <div className={`content-panel ${activePanel === 'password' ? 'active' : ''}`} id="panel-password">
                        <div className="panel-title">CHANGE PASSWORD</div>
                        <div className="panel-subtitle">We'll send an OTP to your registered email</div>
                        <div style={{ maxWidth: '440px' }}>
                            <div className="form-group">
                                <label className="form-label">Registered Email</label>
                                <input type="email" className="form-input" value={user?.email || ''} disabled />
                            </div>
                            <button className="btn-save" style={{ marginBottom: '20px' }}>Send OTP to Email</button>
                            <div className="form-group">
                                <label className="form-label">Enter OTP</label>
                                <input type="text" className="form-input" placeholder="6-digit OTP" maxLength="6" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">New Password</label>
                                <input type="password" className="form-input" placeholder="Minimum 8 characters" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirm New Password</label>
                                <input type="password" className="form-input" placeholder="Repeat new password" />
                            </div>
                            <button className="btn-save">Update Password</button>
                        </div>
                    </div>

                </main>
            </div>
        </>
    );
}
