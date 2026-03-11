import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useCartStore } from '../../store/cartStore';

export default function Header() {
    const items = useCartStore((state) => state.items);
    const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const navLinks = [
        { to: ROUTES.SHOP, label: 'Shop', icon: '🛍️' },
        { to: ROUTES.CATEGORIES, label: 'Categories', icon: '📂' },
        { to: ROUTES.CUSTOM_DESIGN, label: 'Custom Design', icon: '🎨' },
        { to: ROUTES.OFFERS, label: 'Offers', icon: '🏷️' },
        { to: ROUTES.TRACK_ORDER, label: 'Track Order', icon: '📦' },
        { to: ROUTES.HELP, label: 'Help', icon: '❓' },
    ];

    return (
        <>
            {/* Announcement Bar */}
            <div className="announce" role="banner">
                🎉 First order? Use code <span>FIRST10</span> for 10% off! &nbsp;|&nbsp; Free shipping above ₹999 &nbsp;|&nbsp; 100% Prepaid · No COD
            </div>

            {/* Header */}
            <header className={isScrolled ? 'scrolled' : ''} role="navigation" aria-label="Main Navigation">
                <div className="header-inner">
                    <Link to={ROUTES.HOME} className="logo" aria-label="Duo Designs Home">
                        DUO<span>DESIGNS</span>
                    </Link>

                    <nav aria-label="Primary Navigation">
                        <Link to={ROUTES.SHOP}>Shop</Link>
                        <Link to={ROUTES.CATEGORIES}>Categories</Link>
                        <Link to={ROUTES.CUSTOM_DESIGN}>Custom Design</Link>
                        <Link to={ROUTES.OFFERS}>Offers</Link>
                        <Link to={ROUTES.TRACK_ORDER}>Track Order</Link>
                    </nav>

                    <div className="header-actions">
                        <button title="Search" aria-label="Search products">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </button>
                        <Link to={ROUTES.ACCOUNT} title="Account" aria-label="My Account">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </Link>
                        <Link to={ROUTES.CART} aria-label="Shopping Cart">
                            <button className="cart-btn" title="Cart">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                                Cart
                                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                            </button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className={`mobile-menu-btn ${mobileOpen ? 'active' : ''}`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle mobile menu"
                            aria-expanded={mobileOpen}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Nav Overlay */}
            <div
                className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`}
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Nav Drawer */}
            <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
                <div className="mobile-nav-header">
                    <Link to={ROUTES.HOME} className="logo" onClick={() => setMobileOpen(false)}>
                        DUO<span>DESIGNS</span>
                    </Link>
                    <button
                        className="mobile-nav-close"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>
                <div className="mobile-nav-links">
                    {navLinks.map((link, i) => (
                        <Link key={i} to={link.to} onClick={() => setMobileOpen(false)}>
                            <span className="nav-icon">{link.icon}</span>
                            {link.label}
                        </Link>
                    ))}
                    <Link to={ROUTES.ACCOUNT} onClick={() => setMobileOpen(false)}>
                        <span className="nav-icon">👤</span>
                        My Account
                    </Link>
                    <Link to={ROUTES.CART} onClick={() => setMobileOpen(false)}>
                        <span className="nav-icon">🛒</span>
                        Cart {totalItems > 0 && `(${totalItems})`}
                    </Link>
                </div>
            </nav>
        </>
    );
}
