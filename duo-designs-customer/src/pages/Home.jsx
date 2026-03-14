/**
 * @file         Home.jsx
 * @description  Homepage of Duo Designs customer app.
 *               Displays hero section with animated counters, category showcase,
 *               best sellers, how-it-works guide, and customer testimonials.
 *
 * @module       pages/Home
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react (useEffect, useState, useRef)
 *   - react-router-dom (Link)
 *   - react-hot-toast (toast)
 *   - constants/routes (ROUTES)
 *   - data/products (DUO_PRODUCTS)
 *   - store/cartStore (useCartStore)
 *
 * @notes
 *   - Uses IntersectionObserver to trigger statistics counters and scroll reveal animations.
 *   - Best sellers are currently sliced from local DUO_PRODUCTS data.
 */

import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { DUO_PRODUCTS } from '../data/products';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

/**
 * @function useCounter
 * @description Custom hook that increments a number from 0 to 'end' 
 *              when the element enters the viewport.
 *
 * @param {number} end       - Target number to count up to
 * @param {number} duration  - Total animation time in ms (default: 2000)
 *
 * @returns {Array} [count, ref]
 * @returns {number} returns[0] - Current animated count
 * @returns {Object} returns[1] - React ref to attach to the observed element
 */
function useCounter(end, duration = 2000) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    let start = 0;
                    const step = end / (duration / 16);
                    const timer = setInterval(() => {
                        start += step;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 16);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration]);

    return [count, ref];
}

/**
 * @component Home
 * @description Main landing page component.
 * @returns {JSX.Element} Full homepage layout
 */
export default function Home() {
    useDocumentTitle('Premium Custom Prints');
    const [customersCount, customersRef] = useCounter(5000, 2000);
    const [designsCount, designsRef] = useCounter(10000, 2500);
    const [ratingsCount, ratingsRef] = useCounter(4, 1500);
    const addItem = useCartStore((state) => state.addItem);

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        toast.success('Coupon code copied!');
    };

    const categories = [
        { name: 'T-Shirts', icon: '👕', count: '24 Products', featured: false },
        { name: 'Oversized', icon: '🧥', count: '18 Products', featured: true },
        { name: 'Trackpants', icon: '👖', count: '12 Products', featured: false },
        { name: 'Mugs', icon: '☕', count: '8 Products', featured: false },
        { name: 'Keychains', icon: '🔑', count: '6 Products', featured: false },
    ];

    const bestSellers = DUO_PRODUCTS.slice(0, 4);

    const handleAddToCart = (p) => {
        addItem({
            product: { id: p.id, name: p.name, price: p.price, image: p.icon },
            variant: { 
                id: `${p.colors[0]?.id || 'def'}-${p.sizes?.[0]?.id || 'def'}`, 
                color: p.colors[0]?.name || 'Standard', 
                size: p.sizes?.[0]?.name || 'Standard' 
            },
            qty: 1
        });
        toast.success('Added to Cart');
    };

    const testimonials = [
        { name: 'Arjun Mehta', product: 'Custom Oversized Tee', text: "The quality blew me away. The DTF print is razor-sharp and the fabric feels premium. Already ordered 3 more for my friends!", rating: 5 },
        { name: 'Priya Sharma', product: 'Photo Mug — Customized', text: "Perfect gift for my partner's birthday. The colors are vibrant, it arrived safely packaged, and the delivery was faster than expected.", rating: 5 },
        { name: 'Rahul Verma', product: 'Keychain — Double Print', text: "Such a cool product at this price! Got matching keychains for our friend group. The print quality on both sides is impressive.", rating: 4 },
    ];

    const marqueeItems = ['CUSTOM PRINTS', '•', 'DTF TECHNOLOGY', '•', 'FREE SHIPPING ABOVE ₹999', '•', 'PREMIUM QUALITY', '•', 'MADE IN INDIA', '•', 'DESIGN YOUR OWN', '•', '100% SATISFACTION', '•'];

    return (
        <>
            {/* HERO */}
            <section className="hero">
                <div className="hero-text">
                    <div className="hero-tag">🎨 Custom Printing Platform</div>
                    <h1>
                        DESIGN IT.<br />
                        <span className="outline">PRINT IT.</span><br />
                        WEAR IT.
                    </h1>
                    <p>
                        Upload your design, pick your product, and let us handle the rest.
                        Premium DTF printing on t-shirts, mugs, keychains, and more.
                    </p>
                    <div className="hero-btns">
                        <Link to={ROUTES.SHOP} className="btn-primary">
                            Shop Now
                            <span>→</span>
                        </Link>
                        <Link to={ROUTES.SHOP} className="btn-outline">
                            Upload Design
                        </Link>
                    </div>
                    <div className="hero-stats" ref={customersRef}>
                        <div>
                            <div className="stat-num" ref={customersRef}>{customersCount.toLocaleString()}+</div>
                            <div className="stat-label">Happy Customers</div>
                        </div>
                        <div>
                            <div className="stat-num" ref={designsRef}>{designsCount.toLocaleString()}+</div>
                            <div className="stat-label">Designs Printed</div>
                        </div>
                        <div>
                            <div className="stat-num">{ratingsCount}.9★</div>
                            <div className="stat-label" ref={ratingsRef}>Average Rating</div>
                        </div>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="hero-image-placeholder">
                        <span className="big-text">DUO</span>
                        <p>Premium Custom Prints</p>
                    </div>
                    <div className="hero-badge">
                        NEW<br />ARRIVALS<br />2025
                    </div>
                </div>
            </section>

            {/* MARQUEE */}
            <div className="marquee-wrap">
                <div className="marquee-track">
                    {[...marqueeItems, ...marqueeItems].map((item, i) => (
                        <span key={i} className={item === '•' ? 'dot' : ''}>
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* CATEGORIES */}
            <section className="section reveal">
                <div className="section-header">
                    <h2 className="section-title">
                        BROWSE <span className="outline">CATEGORIES</span>
                    </h2>
                    <Link to={ROUTES.SHOP} className="see-all">View All →</Link>
                </div>
                <div className="categories-grid">
                    {categories.map((cat, i) => (
                        <Link
                            to={ROUTES.SHOP}
                            key={i}
                            className={`cat-card ${cat.featured ? 'featured' : ''} reveal reveal-delay-${i + 1}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <span className="cat-icon">{cat.icon}</span>
                            <div className="cat-name">{cat.name}</div>
                            <div className="cat-count">{cat.count}</div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* BEST SELLERS */}
            <section className="section products-section reveal">
                <div className="section-header">
                    <h2 className="section-title">
                        BEST <span className="outline">SELLERS</span>
                    </h2>
                    <Link to={ROUTES.SHOP} className="see-all">Shop All →</Link>
                </div>
                <div className="products-grid">
                    {bestSellers.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="how-section">
                <div className="how-inner reveal">
                    <h2 className="how-title">
                        HOW IT <span>WORKS</span>
                    </h2>
                    <div className="how-steps">
                        <div className="how-step reveal reveal-delay-1">
                            <div className="step-num">01</div>
                            <span className="step-icon">🎨</span>
                            <h3 className="step-title">Upload Your Design</h3>
                            <p className="step-desc">
                                Upload any image, illustration, or photo. Our system optimizes it for high-resolution DTF printing automatically.
                            </p>
                        </div>
                        <div className="how-step reveal reveal-delay-2">
                            <div className="step-num">02</div>
                            <span className="step-icon">👕</span>
                            <h3 className="step-title">Pick Your Product</h3>
                            <p className="step-desc">
                                Choose from t-shirts, oversized tees, trackpants, mugs, keychains, and more. Select size, color, and quantity.
                            </p>
                        </div>
                        <div className="how-step reveal reveal-delay-3">
                            <div className="step-num">03</div>
                            <span className="step-icon">📦</span>
                            <h3 className="step-title">We Print & Ship</h3>
                            <p className="step-desc">
                                Your custom product is printed, quality-checked, and shipped within 5-7 business days. Free shipping above ₹999.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* OFFER BANNER */}
            <section className="offer-banner reveal">
                <div className="offer-inner">
                    <div className="offer-text">
                        <h2>FIRST ORDER? GET 10% OFF</h2>
                        <p>Use this code at checkout — valid once per account</p>
                    </div>
                    <div className="coupon-box">
                        <span className="coupon-code">FIRST10</span>
                        <button className="copy-btn" onClick={() => copyCode('FIRST10')}>
                            Copy Code
                        </button>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="section testimonials-section reveal">
                <div className="section-header">
                    <h2 className="section-title">
                        WHAT OUR <span className="outline">CUSTOMERS SAY</span>
                    </h2>
                </div>
                <div className="testimonials-grid">
                    {testimonials.map((t, i) => (
                        <div className={`testimonial-card reveal reveal-delay-${i + 1}`} key={i}>
                            <div className="stars">
                                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                            </div>
                            <p className="testimonial-text">"{t.text}"</p>
                            <div className="testimonial-author">{t.name}</div>
                            <div className="testimonial-product">{t.product}</div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
