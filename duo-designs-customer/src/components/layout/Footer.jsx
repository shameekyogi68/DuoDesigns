/**
 * @file         Footer.jsx
 * @description  Main footer component for Duo Designs.
 *               Includes newsletter subscription, quick links,
 *               social handles, and legal policies.
 *
 * @module       components/layout/Footer
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react (useState)
 *   - react-router-dom (Link)
 *   - react-hot-toast (toast)
 *   - constants/routes (ROUTES)
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import toast from 'react-hot-toast';

/**
 * @component Footer
 * @description Site-wide footer component.
 * @returns {JSX.Element} The rendered footer layout.
 */
export default function Footer() {
    const [email, setEmail] = useState('');

    const handleNewsletter = (e) => {
        e.preventDefault();
        if (email.trim() && email.includes('@')) {
            toast.success('Subscribed! Check your inbox for welcome offer 🎉');
            setEmail('');
        }
    };

    return (
        <footer>
            {/* Newsletter Section */}
            <div className="footer-newsletter">
                <div className="newsletter-max">
                    <div>
                        <h3 className="newsletter-title">JOIN THE <span style={{ color: 'var(--accent)' }}>TRIBE</span></h3>
                        <p className="newsletter-text">Get exclusive offers, new arrivals, and design inspiration. Join 10,000+ creators.</p>
                    </div>
                    <form onSubmit={handleNewsletter} className="newsletter-form">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="YOUR EMAIL"
                            className="newsletter-input"
                        />
                        <button type="submit" className="newsletter-btn">SUBSCRIBE →</button>
                    </form>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="footer-inner">
                <div className="footer-brand">
                    <Link to={ROUTES.HOME} className="logo">DUO<span>DESIGNS</span></Link>
                    <p>India's premium custom printing platform. Upload your design, pick your product, and wear your imagination.</p>
                    <div className="social-icons">
                        <a href="https://instagram.com" className="social-link" title="Instagram">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        </a>
                        <a href="https://facebook.com" className="social-link" title="Facebook">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        </a>
                        <a href="https://youtube.com" className="social-link" title="YouTube">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                        </a>
                    </div>
                </div>
                <div className="footer-col">
                    <h4>Shop</h4>
                    <Link to={ROUTES.SHOP}>T-Shirts</Link>
                    <Link to={ROUTES.SHOP}>Oversized</Link>
                    <Link to={ROUTES.SHOP}>Trackpants</Link>
                    <Link to={ROUTES.SHOP}>Mugs</Link>
                    <Link to={ROUTES.SHOP}>Keychains</Link>
                </div>
                <div className="footer-col">
                    <h4>Support</h4>
                    <Link to={ROUTES.TRACK_ORDER}>Track Order</Link>
                    <Link to={ROUTES.HELP}>FAQ</Link>
                    <Link to={ROUTES.HELP}>Contact Us</Link>
                    <Link to={ROUTES.HELP}>Shipping Policy</Link>
                    <Link to={ROUTES.HELP}>Refund Policy</Link>
                </div>
                <div className="footer-col">
                    <h4>Company</h4>
                    <Link to={ROUTES.HELP}>About Us</Link>
                    <Link to={ROUTES.HELP}>Privacy Policy</Link>
                    <Link to={ROUTES.HELP}>Terms & Conditions</Link>
                    <Link to={ROUTES.HELP}>GST Info</Link>

                    {/* Trust badges */}
                    <div style={{ display: 'flex', gap: '6px', marginTop: '16px', flexWrap: 'wrap' }}>
                        {['🔒 SSL', '✅ GST', '🇮🇳 India'].map((badge, i) => (
                            <span key={i} style={{
                                background: 'rgba(255,255,255,0.06)',
                                padding: '4px 10px',
                                fontSize: '10px',
                                fontWeight: '700',
                                letterSpacing: '0.5px',
                                color: 'rgba(255,255,255,0.5)',
                                borderRadius: '4px',
                                fontFamily: '"Inter", sans-serif'
                            }}>
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Duo Designs. All rights reserved. · GST Compliant · Handcrafted in India 🇮🇳</p>
                <div className="payment-icons">
                    <span className="payment-icon">UPI</span>
                    <span className="payment-icon">VISA</span>
                    <span className="payment-icon">MC</span>
                    <span className="payment-icon">RAZORPAY</span>
                </div>
            </div>
        </footer>
    );
}
