/**
 * @file         Header.jsx
 * @description  Main navigation header for Duo Designs.
 *               Features multi-level navigation, announcement bar, 
 *               global product search, and state-aware links for 
 *               Cart, Wishlist, and User Account.
 *
 * @module       components/layout/Header
 * @author       Duo Designs Dev Team
 * @version      1.0.1
 * @created      2025-03-09
 *
 * @dependencies
 *   - react (useState, useEffect)
 *   - react-router-dom (Link, useLocation, useNavigate)
 *   - store/cartStore (useCartStore)
 *   - store/authStore (useAuthStore)
 *   - store/wishlistStore (useWishlistStore)
 *   - data/products (DUO_PRODUCTS)
 *
 * @notes
 *   - Announcement bar cycles through multiple global offers.
 *   - Header transparency changes based on scroll position.
 *   - Search results include real-time product matching.
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { DUO_PRODUCTS } from '../../data/products';

/**
 * @component Header
 * @description Top navigation bar component.
 * @returns {JSX.Element} The sticky header with navigation and search.
 */
export default function Header() {
    const items = useCartStore((state) => state.addItem ? state.items : []); // safety check
    const cartItems = useCartStore((state) => state.items);
    const wishlistItems = useWishlistStore((state) => state.items);
    const totalCartItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
    const totalWishlistItems = wishlistItems.length;
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [animateCart, setAnimateCart] = useState(false);
    const [animateWishlist, setAnimateWishlist] = useState(false);
    const location = useLocation();

    const filteredSearch = DUO_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.cat.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close overlays on route change
    useEffect(() => {
        setMobileOpen(false);
        setSearchOpen(false);
        setShowUserMenu(false);
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

    // Animate cart badge
    useEffect(() => {
        if (totalCartItems > 0) {
            setAnimateCart(true);
            const t = setTimeout(() => setAnimateCart(false), 300);
            return () => clearTimeout(t);
        }
    }, [totalCartItems]);

    // Animate wishlist badge
    useEffect(() => {
        if (totalWishlistItems > 0) {
            setAnimateWishlist(true);
            const t = setTimeout(() => setAnimateWishlist(false), 300);
            return () => clearTimeout(t);
        }
    }, [totalWishlistItems]);

    const navLinks = [
        { to: ROUTES.SHOP, label: 'Shop', icon: '🛍️' },
        { to: ROUTES.CATEGORIES, label: 'Categories', icon: '📂' },
        { to: ROUTES.CUSTOM_DESIGN, label: 'Custom Design', icon: '🎨' },
        { to: ROUTES.OFFERS, label: 'Offers', icon: '🏷️' },
        { to: ROUTES.WISHLIST, label: 'Wishlist', icon: '♥' },
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
                        <button 
                            className="hide-mobile" 
                            title="Search" 
                            aria-label="Search products"
                            onClick={() => setSearchOpen(true)}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </button>
                        
                        <div className="user-menu-wrap hide-mobile" onMouseEnter={() => setShowUserMenu(true)} onMouseLeave={() => setShowUserMenu(false)}>
                            <Link to={ROUTES.ACCOUNT} title="Account" aria-label="My Account">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </Link>
                            {showUserMenu && (
                                <div className="user-dropdown">
                                    <Link to={ROUTES.LOGIN}>Login / Sign Up</Link>
                                    <Link to={ROUTES.ACCOUNT}>My Profile</Link>
                                    <Link to={ROUTES.ORDERS}>My Orders</Link>
                                    <Link to={ROUTES.WISHLIST}>My Wishlist</Link>
                                </div>
                            )}
                        </div>
                        <Link to={ROUTES.WISHLIST} className="hide-mobile" title="Wishlist" aria-label="My Wishlist" style={{ position: 'relative' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.89-8.89 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                            {totalWishlistItems > 0 && <span className={`cart-count ${animateWishlist ? 'animate' : ''}`} style={{ top: '-8px', right: '-8px' }}>{totalWishlistItems}</span>}
                        </Link>
                        <Link to={ROUTES.CART} aria-label="Shopping Cart">
                            <button className="cart-btn" title="Cart">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                                <span className="hide-mobile">Cart</span>
                                {totalCartItems > 0 && <span className={`cart-count ${animateCart ? 'animate' : ''}`}>{totalCartItems}</span>}
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
                    <button 
                        className="mobile-search-btn" 
                        onClick={() => { setSearchOpen(true); setMobileOpen(false); }}
                        style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '20px', background: 'none', border: 'none', width: '100%', textAlign: 'left', font: 'inherit', fontWeight: 'inherit', textTransform: 'inherit' }}
                    >
                        <span className="nav-icon">🔍</span>
                        Search
                    </button>
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
                    <Link to={ROUTES.WISHLIST} onClick={() => setMobileOpen(false)}>
                        <span className="nav-icon">♥</span>
                        Wishlist {totalWishlistItems > 0 && `(${totalWishlistItems})`}
                    </Link>
                    <Link to={ROUTES.CART} onClick={() => setMobileOpen(false)}>
                        <span className="nav-icon">🛒</span>
                        Cart {totalCartItems > 0 && `(${totalCartItems})`}
                    </Link>
                </div>
            </nav>

            {/* Search Overlay */}
            {searchOpen && (
                <div className="search-overlay">
                    <div className="search-container">
                        <div className="search-input-wrap">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            <input 
                                type="text" 
                                placeholder="Search for products, categories..." 
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="close-search" onClick={() => setSearchOpen(false)}>✕</button>
                        </div>
                        
                        <div className="search-results">
                            {searchQuery.length > 0 && (
                                <>
                                    <div className="results-label">Searching for "{searchQuery}"</div>
                                    <div className="results-list">
                                        {filteredSearch.map(p => (
                                            <Link to={ROUTES.PRODUCT.replace(':id', p.id)} key={p.id} className="search-result-item" onClick={() => setSearchOpen(false)}>
                                                <span className="res-icon">{p.icon}</span>
                                                <div className="res-info">
                                                    <div className="res-name">{p.name}</div>
                                                    <div className="res-cat">{p.cat}</div>
                                                </div>
                                                <div className="res-price">₹{p.price}</div>
                                            </Link>
                                        ))}
                                        {filteredSearch.length === 0 && (
                                            <div className="no-results">No products found for your search.</div>
                                        )}
                                    </div>
                                    <Link to={ROUTES.SHOP} className="view-all-search" onClick={() => setSearchOpen(false)}>View All Products →</Link>
                                </>
                            )}
                            {searchQuery.length === 0 && (
                                <div className="popular-searches">
                                    <div className="results-label">Popular Categories</div>
                                    <div className="popular-tags">
                                        <Link to="/shop/tshirt" onClick={() => setSearchOpen(false)}>T-Shirts</Link>
                                        <Link to="/shop/oversized" onClick={() => setSearchOpen(false)}>Oversized</Link>
                                        <Link to="/shop/mugs" onClick={() => setSearchOpen(false)}>Custom Mugs</Link>
                                        <Link to="/shop/trackpants" onClick={() => setSearchOpen(false)}>Trackpants</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
