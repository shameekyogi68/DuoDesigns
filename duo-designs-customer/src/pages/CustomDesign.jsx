/**
 * @file         CustomDesign.jsx
 * @description  Custom Design landing page for Duo Designs.
 *               Explains the custom printing process, illustrates steps,
 *               showcases premade designs, and lists printing specifications.
 *
 * @module       pages/CustomDesign
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react (useState)
 *   - react-router-dom (Link)
 *   - constants/routes (ROUTES)
 *
 * @notes
 *   - Focuses on the "Your Design, Our Print" value proposition.
 *   - Includes technical specifications for printing (DPI, formats, etc.).
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

/**
 * @component CustomDesign
 * @description Page component for custom design education and onboarding.
 *
 * @returns {JSX.Element} Landing page with process overview and technical specs
 *
 * @example
 *   <CustomDesign />
 */
export default function CustomDesign() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { num: '01', icon: '🎨', title: 'Pick Your Product', desc: 'Choose from our range — t-shirts, mugs, keychains, trackpants, and more. Each product has specific print areas and specs.' },
        { num: '02', icon: '📤', title: 'Upload Your Design', desc: 'Upload a PNG or JPG file (max 10MB). Our system checks resolution and print compatibility instantly.' },
        { num: '03', icon: '🖨️', title: 'We Print It', desc: 'We use premium DTF (Direct to Film) printing for vivid, wash-resistant results. No fading, no cracking.' },
        { num: '04', icon: '📦', title: 'Delivered to You', desc: 'Dispatched in 2–3 business days. Track your order in real-time. Quality checked before shipping.' },
    ];

    const premadeDesigns = [
        { id: 1, icon: '🔥', name: 'Fire Skull', category: 'Graphic' },
        { id: 2, icon: '🌊', name: 'Wave Art', category: 'Abstract' },
        { id: 3, icon: '🐉', name: 'Dragon Ink', category: 'Illustration' },
        { id: 4, icon: '🌸', name: 'Cherry Bloom', category: 'Floral' },
        { id: 5, icon: '⚡', name: 'Electric Bolt', category: 'Minimal' },
        { id: 6, icon: '🎭', name: 'Two Face', category: 'Graphic' },
        { id: 7, icon: '🌌', name: 'Cosmos', category: 'Abstract' },
        { id: 8, icon: '🦁', name: 'Lion King', category: 'Illustration' },
    ];

    const specs = [
        { label: 'Print Technology', value: 'DTF (Direct to Film)' },
        { label: 'Max File Size', value: '10 MB' },
        { label: 'Supported Formats', value: 'PNG, JPG, JPEG' },
        { label: 'Print Area (T-Shirts)', value: '12" × 14" (Front Center)' },
        { label: 'Color Profile', value: 'CMYK (Auto-converted)' },
        { label: 'Min Resolution', value: '300 DPI recommended' },
    ];

    return (
        <>
            <style>{`
    .cd-hero { background: var(--black); color: var(--white); position: relative; overflow: hidden; }
    .cd-hero::before { content: 'CREATE'; font-family: 'Bebas Neue', sans-serif; font-size: clamp(100px, 20vw, 280px); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: rgba(255,255,255,0.02); white-space: nowrap; pointer-events: none; letter-spacing: 10px; }
    .cd-hero-inner { max-width: 1400px; margin: 0 auto; padding: 80px 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; position: relative; z-index: 1; }
    .cd-hero h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(52px, 7vw, 96px); line-height: 0.92; letter-spacing: 3px; margin-bottom: 20px; }
    .cd-hero h1 span { color: var(--accent); }
    .cd-hero-desc { font-size: 16px; color: rgba(255,255,255,0.5); line-height: 1.8; max-width: 480px; margin-bottom: 32px; }
    .cd-hero-visual { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 48px; text-align: center; position: relative; border-radius: var(--radius-md); }
    .cd-hero-visual-icon { font-size: 96px; display: block; margin-bottom: 20px; animation: float 4s ease-in-out infinite; }
    .cd-hero-visual p { color: rgba(255,255,255,0.3); font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
    .cd-process { max-width: 1400px; margin: 0 auto; padding: 80px 40px; }
    .cd-process-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px, 5vw, 64px); letter-spacing: 3px; text-align: center; margin-bottom: 64px; }
    .cd-process-title span { color: var(--accent); background: var(--black); padding: 0 8px; }
    .cd-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 1.5px solid var(--black); }
    .cd-step { padding: 40px 28px; border-right: 1.5px solid var(--black); cursor: pointer; transition: all 0.4s var(--ease-out); position: relative; }
    .cd-step:last-child { border-right: none; }
    .cd-step:hover, .cd-step.active { background: var(--black); color: var(--white); }
    .cd-step-num { font-family: 'Bebas Neue', sans-serif; font-size: 64px; color: var(--light-gray); line-height: 1; margin-bottom: 8px; transition: color 0.4s var(--ease-out); }
    .cd-step:hover .cd-step-num, .cd-step.active .cd-step-num { color: var(--accent); }
    .cd-step-icon { font-size: 32px; margin-bottom: 12px; }
    .cd-step-title { font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
    .cd-step-desc { font-size: 13px; color: var(--gray); line-height: 1.7; transition: color 0.4s; }
    .cd-step:hover .cd-step-desc, .cd-step.active .cd-step-desc { color: rgba(255,255,255,0.5); }

    .cd-premade { background: var(--card-bg); padding: 80px 0; }
    .cd-premade-inner { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
    .cd-premade-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
    .cd-premade-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px, 5vw, 64px); letter-spacing: 3px; line-height: 1; }
    .cd-premade-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .cd-premade-card { background: var(--white); border: 1.5px solid var(--light-gray); padding: 32px 20px; text-align: center; transition: all 0.35s var(--ease-out); cursor: pointer; }
    .cd-premade-card:hover { border-color: var(--black); transform: translateY(-4px); box-shadow: var(--shadow-md); }
    .cd-premade-icon { font-size: 48px; margin-bottom: 12px; display: block; }
    .cd-premade-name { font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .cd-premade-cat { font-size: 12px; color: var(--muted); }

    .cd-specs { max-width: 1400px; margin: 0 auto; padding: 80px 40px; }
    .cd-specs-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px, 5vw, 64px); letter-spacing: 3px; margin-bottom: 40px; }
    .cd-specs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1.5px solid var(--black); }
    .cd-spec-item { padding: 28px 24px; border-right: 1px solid var(--black); border-bottom: 1px solid var(--black); }
    .cd-spec-item:nth-child(3n) { border-right: none; }
    .cd-spec-item:nth-last-child(-n+3) { border-bottom: none; }
    .cd-spec-label { font-size: 12px; color: var(--gray); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; font-weight: 600; }
    .cd-spec-value { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }

    .cd-cta { background: var(--accent); padding: 64px 40px; text-align: center; position: relative; overflow: hidden; }
    .cd-cta::before { content: 'PRINT'; font-family: 'Bebas Neue', sans-serif; font-size: 200px; position: absolute; right: -20px; top: 50%; transform: translateY(-50%); color: rgba(0,0,0,0.04); letter-spacing: 10px; pointer-events: none; }
    .cd-cta h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 5vw, 56px); letter-spacing: 3px; margin-bottom: 12px; position: relative; }
    .cd-cta p { font-size: 16px; color: rgba(0,0,0,0.6); margin-bottom: 28px; font-weight: 500; position: relative; }
    .cd-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; position: relative; }

    @media (max-width: 1024px) { .cd-hero-inner { grid-template-columns: 1fr; } .cd-hero-visual { display: none; } .cd-steps { grid-template-columns: repeat(2, 1fr); } .cd-step:nth-child(2) { border-right: none; } .cd-premade-grid { grid-template-columns: repeat(2, 1fr); } .cd-specs-grid { grid-template-columns: repeat(2, 1fr); } .cd-spec-item:nth-child(3n) { border-right: 1px solid var(--black); } .cd-spec-item:nth-child(2n) { border-right: none; } }
    @media (max-width: 768px) { .cd-hero-inner { padding: 48px 20px; } .cd-process, .cd-specs { padding: 48px 20px; } .cd-steps { grid-template-columns: 1fr; } .cd-step { border-right: none; border-bottom: 1.5px solid var(--black); } .cd-step:last-child { border-bottom: none; } .cd-premade-grid { grid-template-columns: repeat(2, 1fr); } .cd-specs-grid { grid-template-columns: 1fr; } .cd-spec-item { border-right: none !important; } .cd-spec-item:nth-last-child(-n+3) { border-bottom: 1px solid var(--black); } .cd-spec-item:last-child { border-bottom: none; } .cd-cta { padding: 48px 20px; } }
            `}</style>

            {/* HERO */}
            <section className="cd-hero">
                <div className="cd-hero-inner">
                    <div>
                        <h1>YOUR <span>DESIGN.</span><br />OUR PRINT.</h1>
                        <p className="cd-hero-desc">Upload any image and we'll print it on premium products using DTF technology. Vibrant colors, lasting quality — your creativity, our craft.</p>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <Link to={ROUTES.SHOP} className="btn-primary">Start Designing →</Link>
                            <a href="#how-it-works" className="btn-outline" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.2)' }}>How It Works ↓</a>
                        </div>
                    </div>
                    <div className="cd-hero-visual">
                        <span className="cd-hero-visual-icon">🎨</span>
                        <p>Upload · Customize · Print</p>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="cd-process reveal" id="how-it-works">
                <div className="cd-process-title">HOW CUSTOM <span>PRINTING</span> WORKS</div>
                <div className="cd-steps">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className={`cd-step ${activeStep === i ? 'active' : ''}`}
                            onMouseEnter={() => setActiveStep(i)}
                        >
                            <div className="cd-step-num">{step.num}</div>
                            <div className="cd-step-icon">{step.icon}</div>
                            <div className="cd-step-title">{step.title}</div>
                            <div className="cd-step-desc">{step.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PRE-MADE DESIGNS */}
            <section className="cd-premade reveal">
                <div className="cd-premade-inner">
                    <div className="cd-premade-header">
                        <div className="cd-premade-title">PRE-MADE DESIGNS</div>
                        <Link to={ROUTES.SHOP} className="see-all">View All →</Link>
                    </div>
                    <div className="cd-premade-grid">
                        {premadeDesigns.map(design => (
                            <div className="cd-premade-card" key={design.id}>
                                <span className="cd-premade-icon">{design.icon}</span>
                                <div className="cd-premade-name">{design.name}</div>
                                <div className="cd-premade-cat">{design.category}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRINT SPECS */}
            <section className="cd-specs reveal">
                <div className="cd-specs-title">PRINT SPECIFICATIONS</div>
                <div className="cd-specs-grid">
                    {specs.map((spec, i) => (
                        <div className="cd-spec-item" key={i}>
                            <div className="cd-spec-label">{spec.label}</div>
                            <div className="cd-spec-value">{spec.value}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="cd-cta reveal">
                <h2>READY TO CREATE?</h2>
                <p>Pick a product, upload your design, and let us handle the rest.</p>
                <div className="cd-cta-btns">
                    <Link to={ROUTES.SHOP} className="btn-primary">Shop Products</Link>
                    <Link to={ROUTES.HELP} className="btn-outline">Need Help?</Link>
                </div>
            </section>
        </>
    );
}
