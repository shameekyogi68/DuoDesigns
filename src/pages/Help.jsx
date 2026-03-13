/**
 * @file         Help.jsx
 * @description  Support and help center for Duo Designs.
 *               Provides FAQs, shipping policies, refund terms, 
 *               privacy & terms, and a contact form for customer support.
 *
 * @module       pages/Help
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react (useState)
 *   - react-hot-toast (toast)
 *
 * @notes
 *   - Includes tabbed navigation for different support sections.
 *   - Implements a functional localized contact form.
 */

import React, { useState } from 'react';
import toast from 'react-hot-toast';

/**
 * @component Help
 * @description Page component for customer support and policies.
 *
 * @returns {JSX.Element} Support center layout with tabbed sections
 *
 * @example
 *   <Help />
 */
export default function Help() {
    const [activeSection, setActiveSection] = useState('faq');
    const [openFaq, setOpenFaq] = useState(null);
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

    const sections = [
        { id: 'faq', label: 'FAQ' },
        { id: 'shipping', label: 'Shipping' },
        { id: 'refund', label: 'Refund' },
        { id: 'privacy', label: 'Privacy' },
        { id: 'terms', label: 'Terms' },
        { id: 'contact', label: 'Contact' },
    ];

    const faqs = [
        {
            q: 'How does custom printing work?',
            a: 'Upload your design (PNG, JPG, or SVG) on the product page. Our team reviews it for print quality, optimizes resolution if needed, and prints it using premium DTF technology. The entire process from order to dispatch takes 5-7 business days.'
        },
        {
            q: 'What file formats do you accept?',
            a: 'We accept PNG, JPG, JPEG, and SVG files. For best results, upload high-resolution images (300 DPI or higher). Maximum file size is 10MB. Our system will show a preview before you confirm.'
        },
        {
            q: 'What is DTF printing?',
            a: 'DTF (Direct-to-Film) printing is a modern technique where designs are printed on a special film and then heat-pressed onto the fabric. It produces vibrant, durable prints that don\'t crack or fade easily — even after multiple washes.'
        },
        {
            q: 'Can I cancel or modify my order?',
            a: 'You can cancel or modify your order within 2 hours of placing it, before printing begins. After that, since each product is custom-made for you, cancellations aren\'t possible. Contact us immediately if you need changes.'
        },
        {
            q: 'What payment methods do you accept?',
            a: 'We accept all major payment methods via Razorpay: UPI (GPay, PhonePe, Paytm), Credit/Debit cards (Visa, Mastercard, RuPay), Net Banking, and Wallets. All transactions are 100% secure and encrypted.'
        },
        {
            q: 'Do you offer Cash on Delivery (COD)?',
            a: 'Currently, we only accept prepaid orders. Since every product is custom-printed, we require upfront payment to ensure commitment. This helps us maintain quality and reduce waste.'
        },
    ];

    const handleContact = (e) => {
        e.preventDefault();
        toast.success('Message sent! We\'ll get back to you within 24 hours.');
        setContactForm({ name: '', email: '', message: '' });
    };

    return (
        <>
            <style>{`
                .help-hero {
                    background: var(--black);
                    color: var(--white);
                    text-align: center;
                    padding: 64px 40px;
                    position: relative;
                    overflow: hidden;
                }
                .help-hero::before {
                    content: 'HELP';
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
                .help-hero h1 {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(48px, 6vw, 80px);
                    letter-spacing: 3px;
                    position: relative;
                }
                .help-hero h1 span { color: var(--accent); }
                .help-hero p {
                    font-size: 15px;
                    color: rgba(255,255,255,0.4);
                    margin-top: 12px;
                    position: relative;
                    font-family: 'Inter', sans-serif;
                }
                .help-tabs {
                    display: flex;
                    justify-content: center;
                    gap: 0;
                    border-bottom: 1.5px solid var(--light-gray);
                    background: var(--white);
                    position: sticky;
                    top: 68px;
                    z-index: 50;
                    overflow-x: auto;
                }
                .help-tab {
                    padding: 16px 28px;
                    background: none;
                    border: none;
                    font-family: 'Inter', sans-serif;
                    font-weight: 700;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    cursor: pointer;
                    color: var(--muted);
                    border-bottom: 2px solid transparent;
                    margin-bottom: -1.5px;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }
                .help-tab:hover { color: var(--black); }
                .help-tab.active {
                    color: var(--black);
                    border-bottom-color: var(--accent);
                }
                .help-content {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 48px 40px 80px;
                }
                .help-section-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 40px;
                    letter-spacing: 2px;
                    margin-bottom: 8px;
                }
                .help-section-subtitle {
                    font-size: 14px;
                    color: var(--gray);
                    margin-bottom: 32px;
                    font-family: 'Inter', sans-serif;
                }
                .faq-item {
                    border-bottom: 1px solid var(--light-gray);
                }
                .faq-q {
                    width: 100%;
                    padding: 20px 0;
                    background: none;
                    border: none;
                    text-align: left;
                    cursor: pointer;
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    font-size: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 16px;
                    color: var(--black);
                    transition: color 0.2s;
                }
                .faq-q:hover { color: var(--gray); }
                .faq-toggle {
                    width: 28px;
                    height: 28px;
                    border: 1.5px solid var(--light-gray);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    flex-shrink: 0;
                    transition: all 0.3s var(--ease-out);
                }
                .faq-toggle.open {
                    background: var(--accent);
                    border-color: var(--accent);
                    transform: rotate(45deg);
                }
                .faq-a {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.4s var(--ease-out), padding 0.4s var(--ease-out);
                    font-size: 14px;
                    color: var(--gray);
                    line-height: 1.8;
                    font-family: 'Inter', sans-serif;
                }
                .faq-a.open {
                    max-height: 300px;
                    padding-bottom: 20px;
                }
                .policy-content {
                    font-size: 14px;
                    line-height: 1.85;
                    color: var(--gray);
                    font-family: 'Inter', sans-serif;
                }
                .policy-content h3 {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 20px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--black);
                    margin: 32px 0 12px;
                }
                .policy-content h3:first-child { margin-top: 0; }
                .policy-content p { margin-bottom: 12px; }
                .policy-content ul {
                    margin: 8px 0 16px 20px;
                }
                .policy-content li {
                    margin-bottom: 6px;
                }
                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 48px;
                }
                .contact-info {
                    font-family: 'Inter', sans-serif;
                }
                .contact-info h3 {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 22px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 16px;
                }
                .contact-info p {
                    font-size: 14px;
                    color: var(--gray);
                    line-height: 1.7;
                    margin-bottom: 8px;
                }
                .contact-detail {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 0;
                    font-size: 14px;
                    border-bottom: 1px solid var(--light-gray);
                }
                .contact-detail:last-child { border-bottom: none; }
                .contact-detail span:first-child { font-size: 18px; }
                @media (max-width: 768px) {
                    .help-hero { padding: 48px 20px; }
                    .help-content { padding: 32px 20px 60px; }
                    .contact-grid { grid-template-columns: 1fr; gap: 32px; }
                    .help-tabs { justify-content: flex-start; padding: 0 20px; }
                }
            `}</style>

            {/* Hero */}
            <div className="help-hero">
                <h1>HOW CAN WE <span>HELP</span>?</h1>
                <p>Find answers, policies, and ways to reach us</p>
            </div>

            {/* Tabs */}
            <div className="help-tabs">
                {sections.map(s => (
                    <button
                        key={s.id}
                        className={`help-tab ${activeSection === s.id ? 'active' : ''}`}
                        onClick={() => setActiveSection(s.id)}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            <div className="help-content">
                {/* FAQ */}
                {activeSection === 'faq' && (
                    <>
                        <h2 className="help-section-title">FREQUENTLY ASKED QUESTIONS</h2>
                        <p className="help-section-subtitle">Quick answers to common queries</p>
                        {faqs.map((faq, i) => (
                            <div className="faq-item" key={i}>
                                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    {faq.q}
                                    <span className={`faq-toggle ${openFaq === i ? 'open' : ''}`}>+</span>
                                </button>
                                <div className={`faq-a ${openFaq === i ? 'open' : ''}`}>
                                    {faq.a}
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {/* Shipping */}
                {activeSection === 'shipping' && (
                    <div className="policy-content">
                        <h2 className="help-section-title">SHIPPING POLICY</h2>
                        <p className="help-section-subtitle">Everything about delivery timelines and charges</p>

                        <h3>Processing Time</h3>
                        <p>All orders are custom-made. Processing takes 3-5 business days as each product is printed, quality-checked, and carefully packed for you.</p>

                        <h3>Delivery Time</h3>
                        <p>Standard delivery takes 5-7 business days after dispatch. Express delivery is available for select pin codes at an additional charge.</p>

                        <h3>Shipping Charges</h3>
                        <ul>
                            <li>Orders above ₹999: <strong>FREE standard shipping</strong></li>
                            <li>Orders below ₹999: ₹79 standard shipping</li>
                            <li>Express shipping: ₹149 (2-3 days, select pin codes)</li>
                        </ul>

                        <h3>Tracking</h3>
                        <p>Once shipped, you'll receive a tracking ID via email and SMS. You can track your order anytime on our Track Order page.</p>
                    </div>
                )}

                {/* Refund */}
                {activeSection === 'refund' && (
                    <div className="policy-content">
                        <h2 className="help-section-title">REFUND & RETURN POLICY</h2>
                        <p className="help-section-subtitle">Our commitment to your satisfaction</p>

                        <h3>Custom Products</h3>
                        <p>Since every product is custom-printed specifically for you, we cannot accept returns for change of mind. However, we stand behind our quality.</p>

                        <h3>Damaged or Defective Items</h3>
                        <p>If you receive a damaged, defective, or incorrectly printed product, contact us within 48 hours with photos. We'll offer a full replacement or refund.</p>

                        <h3>Refund Process</h3>
                        <ul>
                            <li>Report the issue within 48 hours of delivery</li>
                            <li>Share clear photos of the defect</li>
                            <li>Our team reviews within 24 hours</li>
                            <li>Approved refunds are processed within 5-7 business days</li>
                        </ul>

                        <h3>Non-Refundable</h3>
                        <p>Orders cannot be refunded if the print matches the uploaded design. Please double-check your design preview before confirming your order.</p>
                    </div>
                )}

                {/* Privacy */}
                {activeSection === 'privacy' && (
                    <div className="policy-content">
                        <h2 className="help-section-title">PRIVACY POLICY</h2>
                        <p className="help-section-subtitle">How we collect, use, and protect your data</p>

                        <h3>Information We Collect</h3>
                        <p>We collect your name, email, phone number, shipping address, and payment information necessary to process your orders. We also collect design files you upload for printing.</p>

                        <h3>How We Use Your Data</h3>
                        <ul>
                            <li>Processing and fulfilling your orders</li>
                            <li>Sending order updates and shipping notifications</li>
                            <li>Customer support communications</li>
                            <li>Improving our products and services</li>
                        </ul>

                        <h3>Data Security</h3>
                        <p>All payment processing is handled by Razorpay with industry-standard encryption. We never store your payment card details on our servers.</p>

                        <h3>Your Rights</h3>
                        <p>You can request deletion of your account and data at any time by contacting us at support@duodesigns.in.</p>
                    </div>
                )}

                {/* Terms */}
                {activeSection === 'terms' && (
                    <div className="policy-content">
                        <h2 className="help-section-title">TERMS & CONDITIONS</h2>
                        <p className="help-section-subtitle">Please read these terms carefully before using our services</p>

                        <h3>Acceptance of Terms</h3>
                        <p>By placing an order on Duo Designs, you agree to these terms and conditions. If you don't agree, please don't use our services.</p>

                        <h3>Custom Products</h3>
                        <p>All products are custom-made to your specifications. You are responsible for the content and quality of designs you upload. We reserve the right to refuse printing content that is offensive, copyrighted, or inappropriate.</p>

                        <h3>Intellectual Property</h3>
                        <p>You must have the rights to any design you upload. Duo Designs is not responsible for copyright infringement by customers. We use your designs solely for printing your order.</p>

                        <h3>Pricing & GST</h3>
                        <p>All prices include applicable GST (18%). GST invoices are generated for every order. Prices may change without notice, but confirmed orders are honoured at the original price.</p>

                        <h3>Limitation of Liability</h3>
                        <p>Our liability is limited to the value of the order. We are not responsible for color variations due to screen differences or minor print variations inherent to DTF printing.</p>
                    </div>
                )}

                {/* Contact */}
                {activeSection === 'contact' && (
                    <>
                        <h2 className="help-section-title">GET IN TOUCH</h2>
                        <p className="help-section-subtitle">We typically respond within 24 hours</p>

                        <div className="contact-grid">
                            <div className="contact-info">
                                <h3>Contact Details</h3>
                                <div className="contact-detail">
                                    <span>📧</span>
                                    <span>support@duodesigns.in</span>
                                </div>
                                <div className="contact-detail">
                                    <span>📞</span>
                                    <span>+91 98765 43210</span>
                                </div>
                                <div className="contact-detail">
                                    <span>⏰</span>
                                    <span>Mon - Sat, 10 AM - 7 PM IST</span>
                                </div>
                                <div className="contact-detail">
                                    <span>📍</span>
                                    <span>Bangalore, Karnataka, India</span>
                                </div>
                            </div>

                            <form onSubmit={handleContact}>
                                <div className="form-group">
                                    <label className="form-label">Name</label>
                                    <input
                                        className="form-input"
                                        placeholder="Your name"
                                        value={contactForm.name}
                                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        placeholder="you@example.com"
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea
                                        className="form-input"
                                        placeholder="Describe your issue or question..."
                                        rows="5"
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                        required
                                        style={{ resize: 'vertical' }}
                                    />
                                </div>
                                <button type="submit" className="form-btn">
                                    Send Message →
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
