import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import toast from 'react-hot-toast';

export default function Offers() {
    const [timeLeft, setTimeLeft] = useState({ hours: 23, mins: 45, secs: 12 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let total = prev.hours * 3600 + prev.mins * 60 + prev.secs - 1;
                if (total < 0) total = 0;
                return {
                    hours: Math.floor(total / 3600),
                    mins: Math.floor((total % 3600) / 60),
                    secs: total % 60
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        toast.success('Coupon code copied!');
    };

    return (
        <>
            <style>{`
    .offers-hero { background: var(--black); color: var(--white); text-align: center; padding: 72px 40px; position: relative; overflow: hidden; }
    .offers-hero::before { content: 'SALE'; font-family: 'Bebas Neue', sans-serif; font-size: 400px; color: #111; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); line-height: 1; pointer-events: none; white-space: nowrap; }
    .offers-hero h1 { font-family: 'Bebas Neue', sans-serif; font-size: 96px; letter-spacing: 3px; line-height: 0.9; position: relative; }
    .offers-hero h1 span { color: var(--accent); }
    .offers-hero p { font-size: 16px; color: #888; margin-top: 16px; position: relative; }
    .countdown-bar { background: var(--accent); color: var(--black); text-align: center; padding: 16px 40px; border-bottom: 1.5px solid var(--black); }
    .countdown-inner { display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap; }
    .countdown-label { font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
    .countdown-timer { display: flex; gap: 12px; align-items: center; }
    .time-block { text-align: center; }
    .time-num { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 1px; background: var(--black); color: var(--white); padding: 4px 12px; display: block; min-width: 54px; }
    .time-unit { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
    .time-sep { font-family: 'Bebas Neue', sans-serif; font-size: 32px; margin-bottom: 16px; }
    .section { max-width: 1400px; margin: 0 auto; padding: 64px 40px; }
    .section-title { font-family: 'Bebas Neue', sans-serif; font-size: 56px; letter-spacing: 2px; margin-bottom: 8px; }
    .section-title span { -webkit-text-stroke: 2px var(--black); color: transparent; }
    .section-subtitle { font-size: 15px; color: var(--gray); margin-bottom: 40px; }
    .coupons-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
    .coupon-card { border: 1.5px solid var(--black); border-right: none; position: relative; overflow: hidden; }
    .coupon-card:last-child { border-right: 1.5px solid var(--black); }
    .coupon-card::before { content: ''; position: absolute; left: -12px; top: 50%; transform: translateY(-50%); width: 24px; height: 24px; border-radius: 50%; background: var(--white); border: 1.5px solid var(--black); z-index: 1; }
    .coupon-card::after { content: ''; position: absolute; right: -12px; top: 50%; transform: translateY(-50%); width: 24px; height: 24px; border-radius: 50%; background: var(--white); border: 1.5px solid var(--black); z-index: 1; }
    .coupon-left { background: var(--black); color: var(--white); padding: 32px 28px; }
    .coupon-discount { font-family: 'Bebas Neue', sans-serif; font-size: 64px; letter-spacing: 2px; line-height: 1; color: var(--accent); }
    .coupon-type { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #888; }
    .coupon-right { padding: 28px; border-left: 2px dashed var(--light-gray); }
    .coupon-name { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 2px; margin-bottom: 8px; }
    .coupon-desc { font-size: 13px; color: var(--gray); line-height: 1.6; margin-bottom: 16px; }
    .coupon-code-box { display: flex; align-items: center; gap: 8px; border: 2px dashed var(--black); padding: 10px 14px; background: var(--card-bg); }
    .coupon-code { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; flex: 1; }
    .copy-btn { background: var(--black); color: var(--white); border: none; padding: 6px 14px; font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
    .copy-btn:hover { background: var(--accent); color: var(--black); }
    .coupon-expiry { font-size: 11px; color: var(--gray); margin-top: 10px; }
    .coupon-expiry span { font-weight: 700; color: #e05050; }
    .coupon-card.expired .coupon-left { background: #888; }
    .coupon-card.expired .coupon-discount { color: var(--white); }
    .expired-tag { position: absolute; top: 16px; right: 16px; background: #e05050; color: var(--white); font-size: 10px; font-weight: 800; padding: 4px 10px; text-transform: uppercase; letter-spacing: 1px; }
    .offers-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; margin-top: 0; }
    .offer-card { border: 1.5px solid var(--black); border-right: none; border-top: none; padding: 36px; position: relative; overflow: hidden; }
    .offer-card:nth-child(even) { border-right: 1.5px solid var(--black); }
    .offer-card:nth-child(1), .offer-card:nth-child(2) { border-top: 1.5px solid var(--black); }
    .offer-card.featured { background: var(--black); color: var(--white); }
    .offer-tag { display: inline-block; background: var(--accent); color: var(--black); font-weight: 800; font-size: 10px; padding: 4px 12px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
    .offer-card.featured .offer-tag { background: var(--white); }
    .offer-title { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 2px; line-height: 1; margin-bottom: 10px; }
    .offer-desc { font-size: 14px; color: var(--gray); line-height: 1.7; margin-bottom: 20px; }
    .offer-card.featured .offer-desc { color: #888; }
    .offer-cta { display: inline-block; padding: 10px 24px; background: var(--black); color: var(--white); font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none; border: 2px solid var(--black); cursor: pointer; transition: all 0.2s; }
    .offer-cta:hover { background: var(--accent); color: var(--black); border-color: var(--accent); }
    .offer-card.featured .offer-cta { background: var(--accent); color: var(--black); border-color: var(--accent); }
    .offer-card.featured .offer-cta:hover { background: var(--white); }
    .offer-bg-text { position: absolute; bottom: -20px; right: -10px; font-family: 'Bebas Neue', sans-serif; font-size: 120px; opacity: 0.05; line-height: 1; pointer-events: none; }
    @media (max-width: 1024px) { .coupons-grid { grid-template-columns: 1fr; } .coupon-card { border-right: 1.5px solid var(--black); border-bottom: none; } .coupon-card:last-child { border-bottom: 1.5px solid var(--black); } }
    @media (max-width: 768px) { .header-inner { padding: 0 20px; } .offers-hero h1 { font-size: 56px; } .section { padding: 40px 20px; } .offers-grid { grid-template-columns: 1fr; } .offer-card:nth-child(even) { border-right: none; } }
      `}</style>

            <div className="offers-hero">
                <h1>DEALS &<br /><span>OFFERS</span></h1>
                <p>Exclusive discounts on custom prints — limited time only!</p>
            </div>

            <div className="countdown-bar">
                <div className="countdown-inner">
                    <div className="countdown-label">🔥 Sale ends in:</div>
                    <div className="countdown-timer">
                        <div className="time-block">
                            <span className="time-num">{String(timeLeft.hours).padStart(2, '0')}</span>
                            <div className="time-unit">Hours</div>
                        </div>
                        <div className="time-sep">:</div>
                        <div className="time-block">
                            <span className="time-num">{String(timeLeft.mins).padStart(2, '0')}</span>
                            <div className="time-unit">Mins</div>
                        </div>
                        <div className="time-sep">:</div>
                        <div className="time-block">
                            <span className="time-num">{String(timeLeft.secs).padStart(2, '0')}</span>
                            <div className="time-unit">Secs</div>
                        </div>
                    </div>
                    <div style={{ fontWeight: '800', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Don't miss out!</div>
                </div>
            </div>

            {/* COUPON CODES */}
            <div className="section" style={{ paddingBottom: '0' }}>
                <div className="section-title">COUPON <span>CODES</span></div>
                <div className="section-subtitle">Copy and apply these codes at checkout</div>
                <div className="coupons-grid">

                    <div className="coupon-card">
                        <div className="coupon-left">
                            <div className="coupon-discount">10%</div>
                            <div className="coupon-type">Percentage Off</div>
                        </div>
                        <div className="coupon-right">
                            <div className="coupon-name">FIRST ORDER</div>
                            <div className="coupon-desc">Get 10% off on your first order. No minimum purchase required. Valid once per account.</div>
                            <div className="coupon-code-box">
                                <span className="coupon-code">FIRST10</span>
                                <button className="copy-btn" onClick={() => copyCode('FIRST10')}>Copy</button>
                            </div>
                            <div className="coupon-expiry">Valid till <span>31 March 2025</span></div>
                        </div>
                    </div>

                    <div className="coupon-card">
                        <div className="coupon-left">
                            <div className="coupon-discount">₹100</div>
                            <div className="coupon-type">Flat Discount</div>
                        </div>
                        <div className="coupon-right">
                            <div className="coupon-name">FLAT 100 OFF</div>
                            <div className="coupon-desc">₹100 flat discount on orders above ₹799. Applicable on all products including custom designs.</div>
                            <div className="coupon-code-box">
                                <span className="coupon-code">SAVE100</span>
                                <button className="copy-btn" onClick={() => copyCode('SAVE100')}>Copy</button>
                            </div>
                            <div className="coupon-expiry">Valid till <span>15 March 2025</span></div>
                        </div>
                    </div>

                    <div className="coupon-card expired">
                        <span className="expired-tag">Expired</span>
                        <div className="coupon-left">
                            <div className="coupon-discount">20%</div>
                            <div className="coupon-type">Percentage Off</div>
                        </div>
                        <div className="coupon-right">
                            <div className="coupon-name">LAUNCH OFFER</div>
                            <div className="coupon-desc">Launch day offer — 20% off sitewide. This offer has expired.</div>
                            <div className="coupon-code-box" style={{ opacity: '0.5' }}>
                                <span className="coupon-code">LAUNCH20</span>
                                <button className="copy-btn" disabled style={{ background: '#ccc', cursor: 'not-allowed' }}>Expired</button>
                            </div>
                            <div className="coupon-expiry">Expired on <span>28 Feb 2025</span></div>
                        </div>
                    </div>

                </div>
            </div>

            {/* CURRENT OFFERS */}
            <div className="section">
                <div className="section-title">CURRENT <span>OFFERS</span></div>
                <div className="section-subtitle">Special deals on select products and categories</div>
                <div className="offers-grid">

                    <div className="offer-card featured">
                        <span className="offer-tag">🔥 Limited Time</span>
                        <div className="offer-title">OVERSIZED TEES — 30% OFF</div>
                        <div className="offer-desc">Our bestselling oversized collection is on sale. Upload your design and save big. Offer valid while stock lasts.</div>
                        <Link to={ROUTES.SHOP} className="offer-cta">Shop Oversized →</Link>
                        <div className="offer-bg-text">30%</div>
                    </div>

                    <div className="offer-card">
                        <span className="offer-tag">🎁 Bundle Deal</span>
                        <div className="offer-title">BUY 2 MUGS, GET 1 FREE</div>
                        <div className="offer-desc">Order any 2 custom mugs and get a third one absolutely free. Great for gifting! Auto-applied in cart.</div>
                        <Link to={ROUTES.SHOP} className="offer-cta">Shop Mugs →</Link>
                        <div className="offer-bg-text">B2G1</div>
                    </div>

                    <div className="offer-card">
                        <span className="offer-tag">🚚 Shipping Offer</span>
                        <div className="offer-title">FREE SHIPPING ABOVE ₹999</div>
                        <div className="offer-desc">Get free standard delivery on all orders above ₹999. Automatically applied — no coupon needed.</div>
                        <Link to={ROUTES.SHOP} className="offer-cta">Shop Now →</Link>
                        <div className="offer-bg-text">FREE</div>
                    </div>

                    <div className="offer-card">
                        <span className="offer-tag">🔑 New Arrivals</span>
                        <div className="offer-title">KEYCHAINS FROM ₹149</div>
                        <div className="offer-desc">Single and double-side print keychains starting at just ₹149. Custom designs welcome!</div>
                        <Link to={ROUTES.SHOP} className="offer-cta">Shop Keychains →</Link>
                        <div className="offer-bg-text">₹149</div>
                    </div>

                </div>
            </div>
        </>
    );
}
