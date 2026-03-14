/**
 * @file         Categories.jsx
 * @description  Categories showcase page for Duo Designs.
 *               Lists all available product categories with icons,
 *               product counts, and descriptive text.
 *
 * @module       pages/Categories
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react
 *   - react-router-dom (Link)
 *
 * @notes
 *   - Serves as a central hub for navigating the product catalog.
 *   - Includes "Coming Soon" status for future category expansions.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CATEGORIES } from '../mock/categories.mock';

/**
 * @component Categories
 * @description Page component for browsing product categories.
 *
 * @returns {JSX.Element} Grid of category cards with navigation links
 *
 * @example
 *   <Categories />
 */
export default function Categories() {
    const categories = MOCK_CATEGORIES;

    return (
        <>
            <style>{`
    .categories-hero { background: var(--black); color: var(--white); padding: 80px 40px 60px; position: relative; overflow: hidden; }
    .categories-hero::before { content: 'CATEGORIES'; font-family: 'Bebas Neue', sans-serif; font-size: clamp(80px, 15vw, 200px); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: rgba(255,255,255,0.03); white-space: nowrap; pointer-events: none; letter-spacing: 10px; }
    .categories-hero-inner { max-width: 1400px; margin: 0 auto; position: relative; z-index: 1; text-align: center; }
    .categories-hero h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(48px, 6vw, 88px); letter-spacing: 4px; line-height: 1; margin-bottom: 12px; }
    .categories-hero h1 span { color: var(--accent); }
    .categories-hero p { font-size: 16px; color: rgba(255,255,255,0.5); max-width: 500px; margin: 0 auto; }
    .categories-main { max-width: 1400px; margin: 0 auto; padding: 64px 40px 80px; }
    .categories-listing { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .cat-listing-card { border: 1.5px solid var(--light-gray); overflow: hidden; transition: all 0.4s var(--ease-out); position: relative; cursor: pointer; text-decoration: none; color: var(--black); display: block; }
    .cat-listing-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
    .cat-listing-visual { height: 200px; display: flex; align-items: center; justify-content: center; font-size: 72px; position: relative; overflow: hidden; transition: all 0.4s var(--ease-out); }
    .cat-listing-card:hover .cat-listing-visual { transform: scale(1.02); }
    .cat-listing-visual::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%); }
    .cat-listing-body { padding: 24px 28px 28px; }
    .cat-listing-name { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 2px; margin-bottom: 4px; display: flex; align-items: center; gap: 12px; }
    .cat-listing-count { background: var(--accent); color: var(--black); font-size: 11px; font-weight: 800; padding: 3px 10px; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; border-radius: var(--radius-sm); }
    .cat-listing-desc { font-size: 14px; color: var(--gray); line-height: 1.7; margin-bottom: 16px; }
    .cat-listing-link { font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--black); border-bottom: 2px solid var(--accent); padding-bottom: 2px; transition: all 0.3s ease; font-family: 'Inter', sans-serif; }
    .cat-listing-card:hover .cat-listing-link { padding-bottom: 4px; }
    .coming-soon-badge { position: absolute; top: 16px; right: 16px; background: var(--accent); color: var(--black); font-weight: 800; font-size: 10px; padding: 5px 14px; letter-spacing: 1.5px; text-transform: uppercase; z-index: 2; border-radius: var(--radius-sm); font-family: 'Inter', sans-serif; }
    .coming-soon-overlay { position: absolute; inset: 0; background: rgba(10,10,10,0.6); z-index: 1; display: flex; align-items: center; justify-content: center; }
    @media (max-width: 1024px) { .categories-listing { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) { .categories-listing { grid-template-columns: 1fr; } .categories-hero { padding: 48px 20px 40px; } .categories-main { padding: 40px 20px 60px; } }
            `}</style>

            <section className="categories-hero reveal">
                <div className="categories-hero-inner">
                    <h1>BROWSE <span>CATEGORIES</span></h1>
                    <p>Explore our full range of custom-printable products — from tees to keychains.</p>
                </div>
            </section>

            <section className="categories-main">
                <div className="categories-listing">
                    {categories.map(cat => (
                        <Link
                            to={cat.comingSoon ? '#' : `/shop/${cat.id}`}
                            className="cat-listing-card reveal"
                            key={cat.id}
                            onClick={cat.comingSoon ? (e) => e.preventDefault() : undefined}
                        >
                            {cat.comingSoon && <span className="coming-soon-badge">Coming Soon</span>}
                            <div className="cat-listing-visual" style={{ background: cat.color }}>
                                <span style={{ position: 'relative', zIndex: 2 }}>{cat.icon}</span>
                                {cat.comingSoon && <div className="coming-soon-overlay" />}
                            </div>
                            <div className="cat-listing-body">
                                <div className="cat-listing-name">
                                    {cat.name}
                                    <span className="cat-listing-count">{cat.comingSoon ? 'Soon' : `${cat.count} Products`}</span>
                                </div>
                                <div className="cat-listing-desc">{cat.desc}</div>
                                {!cat.comingSoon && <span className="cat-listing-link">Shop Now →</span>}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
