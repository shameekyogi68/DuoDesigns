import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

export default function Cart() {
    const navigate = useNavigate();
    const {
        items,
        removeItem,
        updateQuantity,
        subtotal,
        taxableAmount,
        cgst,
        sgst,
        total,
        shippingCharge,
        coupon,
        applyCoupon,
        removeCoupon
    } = useCartStore();

    const [currentStep, setCurrentStep] = useState(1);
    const [couponInput, setCouponInput] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [selectedAddress, setSelectedAddress] = useState(null);

    const testAddresses = [
        { id: 1, name: 'Arjun Kumar · Home', address: '42, 3rd Cross, Indiranagar, Bengaluru, Karnataka — 560038', phone: '+91 98765 43210', state: 'Karnataka' },
        { id: 2, name: 'Arjun Kumar · Office', address: '10, Whitefield Main Road, Bengaluru, Karnataka — 560066', phone: '+91 98765 43210', state: 'Karnataka' }
    ];

    const handleApplyCoupon = () => {
        if (!couponInput.trim()) return;
        const isMockValid = couponInput.toUpperCase() === 'FIRST10' || couponInput.toUpperCase() === 'SAVE100';

        if (isMockValid) {
            applyCoupon({ code: couponInput.toUpperCase(), discountAmount: 144, label: 'New User Discount' });
            toast.success('Coupon applied!');
        } else {
            toast.error('Invalid or expired coupon code');
        }
    };

    const proceedToDelivery = () => {
        if (items.length === 0) {
            toast.error('Your cart is empty');
            return;
        }
        setCurrentStep(2);
        window.scrollTo(0, 0);
    };

    const proceedToPayment = () => {
        if (!selectedAddress) {
            toast.error('Please select a delivery address');
            return;
        }
        setCurrentStep(3);
        window.scrollTo(0, 0);
    };

    const handlePayment = () => {
        // Mock successful payment
        toast.success('Payment processing...');
        setTimeout(() => {
            setCurrentStep(4);
            useCartStore.setState({ items: [], coupon: null });
            window.scrollTo(0, 0);
        }, 1500);
    };

    return (
        <>
            <style>{`
    .steps { max-width: 1400px; margin: 0 auto; padding: 24px 40px; display: flex; align-items: center; gap: 0; border-bottom: 1.5px solid var(--black); }
    .step { display: flex; align-items: center; gap: 10px; padding: 0 24px; cursor: pointer; }
    .step:first-child { padding-left: 0; }
    .step-circle { width: 32px; height: 32px; border: 2px solid var(--light-gray); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; transition: all 0.2s; flex-shrink: 0; }
    .step-circle.active { background: var(--black); color: var(--white); border-color: var(--black); }
    .step-circle.done { background: var(--accent); color: var(--black); border-color: var(--accent); }
    .step-label { font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: var(--gray); }
    .step-label.active { color: var(--black); }
    .step-divider { flex: 1; height: 1.5px; background: var(--light-gray); max-width: 60px; }
    .step-divider.done { background: var(--black); }
    .page-layout { max-width: 1400px; margin: 0 auto; padding: 40px 40px; display: grid; grid-template-columns: 1fr 400px; gap: 48px; align-items: start; }
    .panel-title { font-family: 'Bebas Neue', sans-serif; font-size: 42px; letter-spacing: 2px; margin-bottom: 4px; }
    .panel-subtitle { font-size: 14px; color: var(--gray); margin-bottom: 28px; }
    .cart-item { display: grid; grid-template-columns: 80px 1fr auto; gap: 20px; padding: 24px 0; border-bottom: 1.5px solid var(--light-gray); align-items: start; }
    .cart-item:last-child { border-bottom: none; }
    .cart-img { width: 80px; height: 80px; background: var(--card-bg); border: 1.5px solid var(--black); display: flex; align-items: center; justify-content: center; font-size: 32px; flex-shrink: 0; }
    .cart-item-name { font-weight: 800; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .cart-item-meta { font-size: 13px; color: var(--gray); margin-bottom: 8px; }
    .cart-design-thumb { display: inline-flex; align-items: center; gap: 6px; background: var(--card-bg); padding: 4px 10px; font-size: 12px; font-weight: 600; margin-bottom: 12px; border: 1px solid var(--light-gray); }
    .cart-qty { display: flex; align-items: center; border: 1.5px solid var(--black); width: fit-content; }
    .cart-qty-btn { width: 32px; height: 32px; background: none; border: none; font-size: 16px; cursor: pointer; font-weight: 700; }
    .cart-qty-btn:hover { background: var(--card-bg); }
    .cart-qty-num { width: 36px; text-align: center; font-weight: 700; font-size: 14px; border-left: 1.5px solid var(--black); border-right: 1.5px solid var(--black); line-height: 32px; }
    .cart-item-price { font-family: 'Barlow Condensed', sans-serif; font-size: 24px; font-weight: 700; text-align: right; }
    .remove-btn { background: none; border: none; cursor: pointer; font-size: 12px; font-weight: 700; color: var(--error); text-transform: uppercase; letter-spacing: 1px; margin-top: 8px; padding: 0; display: block; }
    .coupon-row { display: flex; gap: 0; border: 1.5px solid var(--black); margin: 24px 0; }
    .coupon-input { flex: 1; padding: 12px 16px; border: none; font-family: 'Barlow', sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; outline: none; background: var(--white); }
    .coupon-btn { padding: 12px 24px; background: var(--black); color: var(--white); border: none; font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
    .coupon-btn:hover { background: var(--accent); color: var(--black); }
    .summary-card { border: 1.5px solid var(--black); position: sticky; top: 80px; }
    .summary-header { background: var(--black); color: var(--white); padding: 16px 24px; font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 2px; }
    .summary-body { padding: 24px; }
    .summary-row { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 14px; }
    .summary-row .label { color: var(--gray); }
    .summary-row .value { font-weight: 700; }
    .summary-row.discount .value { color: var(--success); }
    .summary-row.tax { font-size: 12px; }
    .summary-row.tax .label { color: #aaa; padding-left: 12px; }
    .summary-divider { height: 1.5px; background: var(--light-gray); margin: 16px 0; }
    .summary-total { display: flex; justify-content: space-between; align-items: baseline; }
    .summary-total .label { font-weight: 800; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; }
    .summary-total .value { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 1px; }
    .summary-note { font-size: 12px; color: var(--gray); margin-top: 8px; margin-bottom: 20px; }
    .btn-proceed { width: 100%; padding: 16px; background: var(--black); color: var(--white); border: 2px solid var(--black); font-family: 'Barlow', sans-serif; font-weight: 900; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; margin-bottom: 12px; }
    .btn-proceed:hover { background: var(--accent); color: var(--black); border-color: var(--accent); }
    .secure-note { text-align: center; font-size: 12px; color: var(--gray); display: flex; align-items: center; justify-content: center; gap: 6px; }
    .summary-items { margin-bottom: 20px; }
    .summary-item { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; }
    .summary-item-img { width: 48px; height: 48px; background: var(--card-bg); border: 1px solid var(--black); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
    .summary-item-info { flex: 1; }
    .summary-item-name { font-size: 13px; font-weight: 700; text-transform: uppercase; }
    .summary-item-meta { font-size: 11px; color: var(--gray); }
    .summary-item-price { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 700; }
    .form-section { margin-bottom: 32px; }
    .form-section-title { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 12px; border-bottom: 1.5px solid var(--black); margin-bottom: 20px; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-group { margin-bottom: 0; }
    .form-group.full { grid-column: span 2; }
    .form-label { display: block; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
    .form-input { width: 100%; padding: 12px 14px; border: 1.5px solid var(--black); background: var(--white); font-family: 'Barlow', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; }
    .form-input:focus { border-color: var(--accent); background: #fffff8; }
    .form-input.error { border-color: var(--error); }
    select.form-input { cursor: pointer; }
    .saved-address { border: 1.5px solid var(--light-gray); padding: 16px 20px; margin-bottom: 12px; cursor: pointer; display: flex; align-items: flex-start; gap: 12px; transition: border-color 0.2s; }
    .saved-address:hover, .saved-address.selected { border-color: var(--black); border-width: 2px; }
    .saved-address.selected { background: var(--card-bg); }
    .saved-address input[type="radio"] { margin-top: 3px; accent-color: var(--black); }
    .saved-address-name { font-weight: 800; font-size: 14px; text-transform: uppercase; }
    .saved-address-text { font-size: 13px; color: #444; line-height: 1.6; }
    .success-page { text-align: center; padding: 60px 40px; }
    .success-icon { font-size: 72px; margin-bottom: 20px; }
    .success-title { font-family: 'Bebas Neue', sans-serif; font-size: 64px; letter-spacing: 2px; margin-bottom: 8px; }
    .success-subtitle { font-size: 16px; color: var(--gray); margin-bottom: 8px; }
    .order-id-box { display: inline-block; background: var(--card-bg); border: 1.5px solid var(--black); padding: 12px 28px; font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 3px; margin: 16px 0 32px; }
    .success-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .btn-primary { padding: 14px 36px; background: var(--black); color: var(--white); border: 2px solid var(--black); font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; text-decoration: none; }
    .btn-primary:hover { background: var(--accent); color: var(--black); border-color: var(--accent); }
    .btn-outline { padding: 14px 36px; background: transparent; color: var(--black); border: 2px solid var(--black); font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; text-decoration: none; }
    .btn-outline:hover { background: var(--black); color: var(--white); }

    @media (max-width: 1024px) { .page-layout { grid-template-columns: 1fr; } .summary-card { position: static; } }
    @media (max-width: 768px) { .header-inner { padding: 0 20px; } nav { display: none; } .page-layout { padding: 24px 20px; } .steps { padding: 16px 20px; } .step-label { display: none; } .form-grid { grid-template-columns: 1fr; } .form-group.full { grid-column: span 1; } .cart-item { grid-template-columns: 64px 1fr; } .cart-item-price { display: none; } }
      `}</style>

            {/* STEP INDICATOR */}
            <div className="steps">
                <div className="step" onClick={() => currentStep > 1 && setCurrentStep(1)}>
                    <div className={`step-circle ${currentStep > 1 ? 'done' : 'active'}`}>
                        {currentStep > 1 ? '✓' : '1'}
                    </div>
                    <span className={`step-label ${currentStep >= 1 ? 'active' : ''}`}>Cart</span>
                </div>
                <div className={`step-divider ${currentStep > 1 ? 'done' : ''}`}></div>
                <div className="step" onClick={() => currentStep > 2 && setCurrentStep(2)}>
                    <div className={`step-circle ${currentStep > 2 ? 'done' : currentStep === 2 ? 'active' : ''}`}>
                        {currentStep > 2 ? '✓' : '2'}
                    </div>
                    <span className={`step-label ${currentStep >= 2 ? 'active' : ''}`}>Delivery</span>
                </div>
                <div className={`step-divider ${currentStep > 2 ? 'done' : ''}`}></div>
                <div className="step">
                    <div className={`step-circle ${currentStep > 3 ? 'done' : currentStep === 3 ? 'active' : ''}`}>
                        {currentStep > 3 ? '✓' : '3'}
                    </div>
                    <span className={`step-label ${currentStep >= 3 ? 'active' : ''}`}>Payment</span>
                </div>
                <div className={`step-divider ${currentStep > 3 ? 'done' : ''}`}></div>
                <div className="step">
                    <div className={`step-circle ${currentStep === 4 ? 'active' : ''}`}>
                        {currentStep === 4 ? '✓' : '4'}
                    </div>
                    <span className={`step-label ${currentStep === 4 ? 'active' : ''}`}>Confirm</span>
                </div>
            </div>

            <div className="page-layout">
                <div>

                    {/* ── CART PANEL ── */}
                    {currentStep === 1 && (
                        <div>
                            <div className="panel-title">YOUR CART</div>
                            <div className="panel-subtitle">{items.length} items · Review before checkout</div>

                            {items.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
                                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px' }}>YOUR CART IS EMPTY</h3>
                                    <p style={{ color: 'var(--gray)', marginBottom: '24px' }}>Looks like you haven't added anything yet.</p>
                                    <Link to={ROUTES.SHOP} className="btn-proceed" style={{ display: 'inline-block', width: 'auto', padding: '12px 32px', textDecoration: 'none' }}>Start Shopping</Link>
                                </div>
                            ) : (
                                <>
                                    {items.map(item => (
                                        <div className="cart-item" key={item.variant.id}>
                                            <div className="cart-img">{item.product.image}</div>
                                            <div>
                                                <div className="cart-item-name">{item.product.name}</div>
                                                <div className="cart-item-meta">{item.variant.color} · Size {item.variant.size}</div>
                                                {item.design && (
                                                    <div className="cart-design-thumb">
                                                        {item.design.type === 'premade' ? item.design.icon : '🖼️'}
                                                        {item.design.type === 'premade' ? ' Pre-made Design' : ' Custom Upload'}
                                                    </div>
                                                )}
                                                <div className="cart-qty">
                                                    <button className="cart-qty-btn" onClick={() => updateQuantity(item.variant.id, -1)}>−</button>
                                                    <div className="cart-qty-num">{item.qty}</div>
                                                    <button className="cart-qty-btn" onClick={() => updateQuantity(item.variant.id, 1)}>+</button>
                                                </div>
                                                <button className="remove-btn" onClick={() => removeItem(item.variant.id)}>✕ Remove</button>
                                            </div>
                                            <div>
                                                <div className="cart-item-price">₹{item.product.price}</div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* COUPON */}
                                    <div style={{ marginTop: '24px' }}>
                                        <div style={{ fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>🏷️ Have a Coupon?</div>

                                        {!coupon ? (
                                            <div className="coupon-row">
                                                <input
                                                    type="text"
                                                    className="coupon-input"
                                                    placeholder="ENTER CODE"
                                                    value={couponInput}
                                                    onChange={(e) => setCouponInput(e.target.value)}
                                                />
                                                <button className="coupon-btn" onClick={handleApplyCoupon}>Apply</button>
                                            </div>
                                        ) : (
                                            <div className="coupon-row" style={{ background: 'var(--card-bg)' }}>
                                                <div style={{ flex: 1, padding: '12px 16px', fontWeight: '800', color: 'var(--success)' }}>
                                                    ✅ {coupon.code} APPLIED (-₹{coupon.discountAmount})
                                                </div>
                                                <button className="remove-btn" style={{ margin: 0, padding: '0 20px' }} onClick={removeCoupon}>REMOVE</button>
                                            </div>
                                        )}
                                    </div>

                                    <button className="btn-proceed" style={{ marginTop: '24px' }} onClick={proceedToDelivery}>Proceed to Delivery →</button>
                                </>
                            )}
                        </div>
                    )}

                    {/* ── DELIVERY PANEL ── */}
                    {currentStep === 2 && (
                        <div>
                            <div className="panel-title">DELIVERY</div>
                            <div className="panel-subtitle">Where should we send your order?</div>

                            <div className="form-section">
                                <div className="form-section-title">Saved Addresses</div>
                                {testAddresses.map(addr => (
                                    <div
                                        key={addr.id}
                                        className={`saved-address ${selectedAddress?.id === addr.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedAddress(addr)}
                                    >
                                        <input type="radio" name="address" checked={selectedAddress?.id === addr.id} readOnly />
                                        <div>
                                            <div className="saved-address-name">{addr.name}</div>
                                            <div className="saved-address-text">{addr.address}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '4px' }}>📞 {addr.phone}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="form-section">
                                <div className="form-section-title">+ Add New Address</div>
                                <div className="form-grid">
                                    <div className="form-group"><label className="form-label">Full Name</label><input type="text" className="form-input" placeholder="Full name" /></div>
                                    <div className="form-group"><label className="form-label">Phone</label><input type="tel" className="form-input" placeholder="+91 XXXXX XXXXX" /></div>
                                    <div className="form-group full"><label className="form-label">Address Line 1</label><input type="text" className="form-input" placeholder="House / Flat / Block No." /></div>
                                    <div className="form-group full"><label className="form-label">Address Line 2</label><input type="text" className="form-input" placeholder="Street, Area, Landmark" /></div>
                                    <div className="form-group"><label className="form-label">City</label><input type="text" className="form-input" placeholder="City" /></div>
                                    <div className="form-group"><label className="form-label">Pincode</label><input type="text" className="form-input" placeholder="6-digit pincode" maxLength="6" /></div>
                                    <div className="form-group full"><label className="form-label">State</label>
                                        <select className="form-input">
                                            <option>Karnataka</option><option>Maharashtra</option><option>Delhi</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button className="btn-proceed" onClick={proceedToPayment}>Proceed to Payment →</button>
                        </div>
                    )}

                    {/* ── PAYMENT PANEL ── */}
                    {currentStep === 3 && (
                        <div>
                            <div className="panel-title">PAYMENT</div>
                            <div className="panel-subtitle">100% secure · Powered by Razorpay · Prepaid only</div>

                            <div className="form-section">
                                <div className="form-section-title">Delivering To</div>
                                <div style={{ background: 'var(--card-bg)', padding: '16px 20px', border: '1.5px solid var(--black)', marginBottom: '0', fontSize: '14px', lineHeight: '1.7' }}>
                                    <strong>{selectedAddress?.name}</strong> · {selectedAddress?.phone}<br />
                                    {selectedAddress?.address}
                                    <button onClick={() => setCurrentStep(2)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '700', color: 'var(--black)', borderBottom: '1.5px solid var(--accent)', marginLeft: '12px', padding: '0' }}>Change</button>
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="form-section-title">Order Summary</div>
                                <div style={{ border: '1.5px solid var(--light-gray)', padding: '20px' }}>
                                    <div className="summary-row"><span className="label">{items.length} Items Subtotal</span><span className="value">₹{subtotal.toFixed(2)}</span></div>
                                    <div className="summary-row"><span className="label">Shipping Charge</span><span className="value">₹{shippingCharge}</span></div>
                                    {coupon && (
                                        <div className="summary-row discount"><span className="label">Coupon {coupon.code}</span><span className="value">− ₹{coupon.discountAmount}</span></div>
                                    )}
                                    <div style={{ height: '1px', background: 'var(--light-gray)', margin: '12px 0' }}></div>
                                    <div className="summary-row"><span className="label">Taxable Amount</span><span className="value">₹{taxableAmount.toFixed(2)}</span></div>
                                    <div className="summary-row tax"><span className="label">CGST @ 9%</span><span className="value">₹{cgst.toFixed(2)}</span></div>
                                    <div className="summary-row tax"><span className="label">SGST @ 9%</span><span className="value">₹{sgst.toFixed(2)}</span></div>
                                    <div style={{ height: '1.5px', background: 'var(--black)', margin: '16px 0' }}></div>
                                    <div className="summary-total"><span className="label">Total Payable</span><span className="value" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '32px' }}>₹{total.toFixed(2)}</span></div>
                                </div>
                            </div>

                            <div style={{ background: 'var(--card-bg)', border: '1.5px solid var(--black)', padding: '20px', marginBottom: '24px' }}>
                                <div style={{ fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>🔒 No COD · Prepaid Only</div>
                                <div style={{ fontSize: '14px', color: '#444', lineHeight: '1.6' }}>We accept UPI, Credit/Debit Cards, Net Banking and Wallets via Razorpay. Your payment is 100% secure and encrypted.</div>
                            </div>

                            <button className="btn-proceed" onClick={handlePayment}>Pay ₹{total.toFixed(2)} via Razorpay →</button>
                            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: 'var(--gray)' }}>🔒 256-bit SSL Encryption · GST Invoice included</div>
                        </div>
                    )}

                    {/* ── SUCCESS PANEL ── */}
                    {currentStep === 4 && (
                        <div>
                            <div className="success-page">
                                <div className="success-icon">🎉</div>
                                <div className="success-title">ORDER PLACED!</div>
                                <div className="success-subtitle">Thank you! Your order has been confirmed.</div>
                                <div className="order-id-box">#DD-{Math.floor(Math.random() * 100000)}</div>
                                <div style={{ background: 'var(--card-bg)', border: '1.5px solid var(--black)', padding: '16px 24px', maxWidth: '400px', margin: '0 auto 32px', fontSize: '14px', lineHeight: '1.8' }}>
                                    <strong>What's next?</strong><br />
                                    We'll prepare your custom print in 1–2 days.<br />
                                    You'll get an email with tracking info once dispatched.
                                </div>
                                <div className="success-btns">
                                    <Link to={ROUTES.SHOP} className="btn-outline">Continue Shopping</Link>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* ORDER SUMMARY SIDEBAR */}
                {currentStep < 4 && (
                    <div className="summary-card" id="summary-sidebar">
                        <div className="summary-header">ORDER SUMMARY</div>
                        <div className="summary-body">
                            <div className="summary-items">
                                {items.length === 0 ? (
                                    <div style={{ fontSize: '13px', color: 'var(--gray)', padding: '12px 0' }}>Your cart is empty.</div>
                                ) : (
                                    items.map(item => (
                                        <div className="summary-item" key={item.variant.id}>
                                            <div className="summary-item-img">{item.product.image}</div>
                                            <div className="summary-item-info">
                                                <div className="summary-item-name">{item.product.name}</div>
                                                <div className="summary-item-meta">{item.variant.color} · {item.variant.size} · Qty {item.qty}</div>
                                            </div>
                                            <div className="summary-item-price">₹{item.product.price}</div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="summary-divider"></div>
                            <div className="summary-row"><span className="label">Subtotal</span><span className="value">₹{subtotal.toFixed(2)}</span></div>
                            <div className="summary-row"><span className="label">Shipping</span><span className="value">₹{shippingCharge.toFixed(2)}</span></div>
                            {coupon && (
                                <div className="summary-row discount"><span className="label">Discount</span><span className="value">− ₹{coupon.discountAmount.toFixed(2)}</span></div>
                            )}

                            <div className="summary-divider"></div>
                            <div className="summary-row tax"><span className="label">CGST (9%)</span><span className="value">₹{cgst.toFixed(2)}</span></div>
                            <div className="summary-row tax"><span className="label">SGST (9%)</span><span className="value">₹{sgst.toFixed(2)}</span></div>

                            <div className="summary-divider"></div>
                            <div className="summary-total"><span className="label">Total</span><span className="value">₹{total.toFixed(2)}</span></div>
                            <div className="summary-note">Incl. all taxes · GST Invoice included</div>
                            <div className="secure-note">🔒 Secure payment via Razorpay</div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
