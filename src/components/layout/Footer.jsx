import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import toast from 'react-hot-toast';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleNewsletter = (e) => {
        e.preventDefault();
        if (email.trim() && email.includes('@')) {
            toast.success('Subscribed! Check your inbox for welcome offer 🎉');
            setEmail('');
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer role="contentinfo">
            {/* Newsletter Section */}
            <div style={{
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                position: 'relative'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '56px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '32px',
                    flexWrap: 'wrap',
                    position: 'relative'
                }}>
                    <div>
                        <h3 style={{
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: '36px',
                            letterSpacing: '2px',
                            color: 'var(--white)',
                            marginBottom: '6px'
                        }}>
                            JOIN THE <span style={{ color: 'var(--accent)' }}>TRIBE</span>
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: 'rgba(255,255,255,0.4)',
                            fontFamily: '"Inter", sans-serif'
                        }}>
                            Get exclusive offers, new arrivals, and design inspiration. No spam, ever.
                        </p>
                    </div>
                    <form onSubmit={handleNewsletter} style={{
                        display: 'flex',
                        gap: '0',
                        maxWidth: '420px',
                        width: '100%'
                    }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            aria-label="Email for newsletter"
                            style={{
                                flex: '1',
                                padding: '14px 18px',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRight: 'none',
                                color: 'var(--white)',
                                fontFamily: '"Inter", sans-serif',
                                fontSize: '14px',
                                outline: 'none',
                                borderRadius: '4px 0 0 4px'
                            }}
                        />
                        <button type="submit" style={{
                            padding: '14px 28px',
                            background: 'var(--accent)',
                            color: 'var(--black)',
                            border: 'none',
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: '700',
                            fontSize: '12px',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            borderRadius: '0 4px 4px 0',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.3s ease'
                        }}>
                            Subscribe →
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="footer-inner">
                <div className="footer-brand">
                    <Link to={ROUTES.HOME} className="logo">DUO<span>DESIGNS</span></Link>
                    <p>India's premium custom printing platform. Upload your design, pick your product, and wear your imagination.</p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        {/* Social Icons */}
                        {['Instagram', 'X (Twitter)', 'YouTube'].map((social, i) => (
                            <a key={i} href="#" aria-label={social} style={{
                                width: '36px',
                                height: '36px',
                                background: 'rgba(255,255,255,0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '6px',
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: '14px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}>
                                {i === 0 ? '📷' : i === 1 ? '✖️' : '▶️'}
                            </a>
                        ))}
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
