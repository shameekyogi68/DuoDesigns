/**
 * @file         Product.jsx
 * @description  Single product detail page for Duo Designs.
 *               Handles image gallery, color/size selection, quantity management,
 *               pincode delivery check, and custom design uploads.
 *
 * @module       pages/Product
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react (useState, useEffect)
 *   - react-router-dom (Link, useNavigate, useParams)
 *   - components/ui/DesignUpload
 *   - constants/routes (ROUTES)
 *   - data/products (DUO_PRODUCTS)
 *   - store/cartStore (useCartStore)
 *   - store/wishlistStore (useWishlistStore)
 *   - react-hot-toast (toast)
 *
 * @notes
 *   - Prices are calculated dynamically based on size addons (XL/XXL).
 *   - Pincode check follows prefix-based logic for availability.
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { 
    useProducts, 
    usePincode, 
    useDesignUpload, 
    useDocumentTitle, 
    useScrollToTop 
} from '../hooks';
import { 
    ProductDetailSkeleton, 
    ProductNotFound, 
    APIError 
} from '../components/ui';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import toast from 'react-hot-toast';

/**
 * @component Product
 * @description Page component for displaying individual product details and managing selections.
 *
 * @returns {JSX.Element} Product detail view with gallery and purchase controls
 *
 * @example
 *   <Product />
 */
export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    useScrollToTop();
    
    const addItem = useCartStore((state) => state.addItem);
    const { items: wishlistItems, toggleItem: toggleWishlist } = useWishlistStore();

    const { data: products, isLoading, isError, refetch } = useProducts();
    const product = products?.find(p => p.id === id);
    
    useDocumentTitle(product ? product.name : 'Product');

    const [activeThumb, setActiveThumb] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    
    const { 
        pincode, 
        setPincode, 
        result: pincodeResult, 
        checkPincode 
    } = usePincode();

    const { 
        preview, 
        handleFileChange, 
        removeDesign, 
        uploading 
    } = useDesignUpload();

    const [accoState, setAccoState] = useState({ details: true, sizing: false, design: false, shipping: false });

    useEffect(() => {
        if (product) {
            setActiveThumb(product.gallery?.[0] || product.icon);
            setSelectedColor(product.colors?.[0]);
            setSelectedSize(product.sizes?.[1] || product.sizes?.[0]);
        }
    }, [id, product]);

    if (isLoading) return <ProductDetailSkeleton />;
    if (isError) return <APIError onRetry={refetch} />;
    if (!product && !isLoading) return <ProductNotFound />;

    const currentPrice = (product.price || product.basePrice) + (selectedSize?.extra || 0);

    const changeQty = (d) => {
        setQuantity(q => Math.max(1, Math.min(10, q + d)));
    };

    const toggleAcc = (key) => setAccoState(prev => ({ ...prev, [key]: !prev[key] }));

    const handleAddToCart = () => {
        addItem({
            product: { id: product.id, name: product.name, price: currentPrice, image: activeThumb },
            variant: { 
                id: `${selectedColor?.id || 'def'}-${selectedSize?.id || 'def'}`, 
                color: selectedColor?.name || 'Standard', 
                size: selectedSize?.name || 'Standard' 
            },
            qty: quantity,
            design: preview
        });
        toast.success('Added to Cart');
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate(ROUTES.CART);
    };

    return (
        <>
            <style>{`
    .breadcrumb { max-width: 1400px; margin: 0 auto; padding: 16px 40px; font-size: 13px; color: var(--gray); display: flex; gap: 8px; align-items: center; border-bottom: 1px solid var(--light-gray); }
    .breadcrumb a { color: var(--gray); text-decoration: none; } .breadcrumb a:hover { color: var(--black); }
    .breadcrumb span { color: var(--black); font-weight: 600; }
    .product-layout { max-width: 1400px; margin: 0 auto; padding: 48px 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
    .gallery { display: grid; grid-template-columns: 80px 1fr; gap: 12px; }
    .thumbs { display: flex; flex-direction: column; gap: 10px; }
    .thumb { width: 80px; height: 80px; border: 1.5px solid var(--light-gray); background: var(--card-bg); display: flex; align-items: center; justify-content: center; font-size: 24px; cursor: pointer; transition: border-color 0.2s; flex-shrink: 0; }
    .thumb.active { border-color: var(--black); border-width: 2px; }
    .main-img { aspect-ratio: 1; background: var(--card-bg); border: 1.5px solid var(--black); display: flex; align-items: center; justify-content: center; font-size: 120px; position: relative; overflow: hidden; }
    .img-badge { position: absolute; top: 16px; left: 16px; background: var(--accent); color: var(--black); font-weight: 800; font-size: 11px; padding: 5px 12px; letter-spacing: 1px; text-transform: uppercase; }
    .product-category { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--gray); margin-bottom: 12px; }
    .product-name { font-family: 'Bebas Neue', sans-serif; font-size: 56px; line-height: 0.95; letter-spacing: 2px; margin-bottom: 16px; }
    .product-rating { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
    .stars { font-size: 16px; letter-spacing: 1px; }
    .rating-count { font-size: 13px; color: var(--gray); border-bottom: 1px solid var(--gray); cursor: pointer; }
    .product-price { display: flex; align-items: baseline; gap: 12px; margin-bottom: 8px; }
    .price-main { font-family: 'Bebas Neue', sans-serif; font-size: 48px; letter-spacing: 1px; }
    .price-old { font-size: 20px; color: var(--gray); text-decoration: line-through; }
    .price-save { background: var(--accent); color: var(--black); font-weight: 800; font-size: 12px; padding: 3px 10px; }
    .price-note { font-size: 12px; color: var(--gray); margin-bottom: 24px; }
    .price-note span { font-weight: 700; color: var(--black); }
    .divider-line { height: 1.5px; background: var(--light-gray); margin: 24px 0; }
    .option-label { font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; }
    .option-label span, .option-label button { font-size: 11px; color: var(--black); border-bottom: 1.5px solid var(--accent); text-decoration: none; cursor: pointer; background: none; border: none; padding: 0; }
    .color-options { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; }
    .color-swatch { width: 36px; height: 36px; border: 2px solid transparent; cursor: pointer; transition: all 0.2s; position: relative; }
    .color-swatch.active { border-color: var(--black); }
    .color-swatch:hover { transform: scale(1.1); }
    .size-options { display: flex; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }
    .size-btn { padding: 10px 18px; border: 1.5px solid var(--black); background: var(--white); font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.2s; text-transform: uppercase; }
    .size-btn:hover { background: var(--card-bg); }
    .size-btn.active { background: var(--black); color: var(--white); }
    .size-btn.out { border-color: var(--light-gray); color: var(--light-gray); cursor: not-allowed; text-decoration: line-through; }
    .stock-msg { font-size: 12px; font-weight: 700; color: var(--error); margin-bottom: 24px; }
    .qty-row { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
    .qty-label { font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; }
    .qty-control { display: flex; align-items: center; border: 1.5px solid var(--black); }
    .qty-btn { width: 40px; height: 40px; background: none; border: none; font-size: 20px; cursor: pointer; font-weight: 700; transition: background 0.2s; }
    .qty-btn:hover { background: var(--card-bg); }
    .qty-num { width: 48px; text-align: center; font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 700; border-left: 1.5px solid var(--black); border-right: 1.5px solid var(--black); line-height: 40px; }
    .cta-row { display: flex; gap: 12px; margin-bottom: 20px; }
    .btn-cart { flex: 1; padding: 16px; background: var(--black); color: var(--white); border: 2px solid var(--black); font-family: 'Barlow', sans-serif; font-weight: 900; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
    .btn-cart:hover { background: var(--accent); color: var(--black); border-color: var(--accent); }
    .btn-buy { flex: 1; padding: 16px; background: var(--accent); color: var(--black); border: 2px solid var(--black); font-family: 'Barlow', sans-serif; font-weight: 900; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
    .btn-buy:hover { background: var(--black); color: var(--white); }
    .pincode-check { border: 1.5px solid var(--light-gray); padding: 16px 20px; margin-bottom: 20px; }
    .pincode-row { display: flex; gap: 10px; }
    .pincode-input { flex: 1; padding: 10px 14px; border: 1.5px solid var(--black); font-family: 'Barlow', sans-serif; font-size: 15px; outline: none; }
    .pincode-input:focus { border-color: var(--accent); }
    .pincode-btn { padding: 10px 18px; background: var(--black); color: var(--white); border: none; font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; }
    .pincode-result { margin-top: 10px; font-size: 13px; font-weight: 600; display: none; }
    .pincode-result.ok { color: #3bb54a; display: block; }
    .pincode-result.fail { color: var(--error); display: block; }
    .trust-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1.5px solid var(--light-gray); margin-bottom: 24px; }
    .trust-item { padding: 14px 12px; text-align: center; border-right: 1px solid var(--light-gray); }
    .trust-item:last-child { border-right: none; }
    .trust-icon { font-size: 20px; margin-bottom: 4px; }
    .trust-text { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray); }
    .accordion { margin-bottom: 48px; }
    .acc-item { border-bottom: 1.5px solid var(--black); }
    .acc-header { width: 100%; padding: 18px 0; background: none; border: none; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
    .acc-icon { font-size: 20px; transition: transform 0.2s; }
    .acc-item.open .acc-icon { transform: rotate(45deg); }
    .acc-body { display: none; padding-bottom: 20px; font-size: 14px; color: #444; line-height: 1.8; }
    .acc-item.open .acc-body { display: block; }

    @media (max-width: 1024px) { .product-layout { grid-template-columns: 1fr; gap: 40px; } .gallery { grid-template-columns: 60px 1fr; } }
    @media (max-width: 768px) { .header-inner { padding: 0 20px; } nav { display: none; } .product-layout { padding: 24px 20px; } .breadcrumb { padding: 12px 20px; } .gallery { grid-template-columns: 1fr; } .thumbs { flex-direction: row; } .thumb { width: 64px; height: 64px; } .premade-grid { grid-template-columns: repeat(3, 1fr); } .cta-row { flex-direction: column; } .trust-row { grid-template-columns: 1fr; } .trust-item { border-right: none; border-bottom: 1px solid var(--light-gray); } }
      `}</style>
            <div className="breadcrumb">
                <Link to={ROUTES.HOME}>Home</Link> › <Link to={ROUTES.SHOP}>Shop</Link> › <span>{product.name}</span>
            </div>

            <div className="product-layout">

                {/* GALLERY */}
                <div className="gallery">
                    <div className="thumbs">
                        {product.gallery.map((thumb, idx) => (
                            <div
                                key={idx}
                                className={`thumb ${activeThumb === thumb ? 'active' : ''}`}
                                onClick={() => setActiveThumb(thumb)}
                            >
                                {thumb}
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="main-img" id="main-img">
                            {activeThumb}
                            {product.badge && <span className="img-badge">{product.badge}</span>}
                        </div>
                    </div>
                </div>

                {/* PRODUCT INFO */}
                <div className="product-info">
                    <div className="product-category">{product.cat}</div>
                    <div className="product-name">
                        {product.name.split(' ').map((word, i) => (
                            <React.Fragment key={i}>
                                {word}
                                {i < product.name.split(' ').length - 1 && ' '}
                                {i === 0 && <br />}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="product-rating">
                        <span className="stars">★★★★★</span>
                        <span style={{ fontWeight: '700', fontSize: '14px' }}>{product.rating}</span>
                        <span className="rating-count">{product.reviews} reviews</span>
                        <button 
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', marginLeft: 'auto', color: wishlistItems.includes(product.id) ? 'var(--error)' : '#ccc' }}
                            onClick={() => {
                                toggleWishlist(product.id);
                                toast.success(wishlistItems.includes(product.id) ? 'Removed from Wishlist' : 'Added to Wishlist');
                            }}
                        >
                            {wishlistItems.includes(product.id) ? '♥' : '♡'}
                        </button>
                    </div>

                    <div className="product-price">
                        <span className="price-main">₹{currentPrice}</span>
                        {product.oldPrice && <span className="price-old">₹{product.oldPrice}</span>}
                        {product.discount && <span className="price-save">{product.discount}</span>}
                    </div>
                    <div className="price-note">Incl. GST · <span>Free shipping above ₹999</span></div>
                    <div className="divider-line"></div>

                    {/* COLOR */}
                    <div className="option-label">Color: <span style={{ fontWeight: 400, color: 'var(--gray)', textTransform: 'none', letterSpacing: 0, borderBottom: 'none' }}>{selectedColor?.name || ''}</span></div>
                    <div className="color-options">
                        {product.colors?.map(color => (
                            <div
                                key={color.id}
                                className={`color-swatch ${(selectedColor?.id === color.id) ? 'active' : ''}`}
                                style={{ background: color.hex, border: (color.border && selectedColor?.id !== color.id) ? '1.5px solid #ccc' : '' }}
                                title={color.name}
                                onClick={() => setSelectedColor(color)}
                            ></div>
                        ))}
                    </div>

                    {/* SIZE */}
                    <div className="option-label">Size <button onClick={() => alert('Size Chart:\nS: Chest 40"\nM: Chest 42"\nL: Chest 44"\nXL: Chest 46" (+₹50)\nXXL: Chest 48" (+₹50)')}>Size Chart</button></div>
                    <div className="size-options">
                        {product.sizes?.map(size => (
                            <button
                                key={size.id}
                                className={`size-btn ${(selectedSize?.id === size.id) ? 'active' : ''} ${!size.available ? 'out' : ''}`}
                                disabled={!size.available}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size.name}
                            </button>
                        ))}
                    </div>
                    <div className="stock-msg">⚡ Only 2 left in {selectedColor?.name || ''} / {selectedSize?.name || ''}</div>

                    <div className="divider-line"></div>
                    <div style={{ padding: '20px', border: '1.5px dashed var(--black)', marginBottom: '24px' }}>
                        <div className="option-label">Custom Design {uploading && <span style={{ color: 'var(--accent)' }}>Updating...</span>}</div>
                        {!preview ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <input type="file" id="design-file" hidden onChange={handleFileChange} accept="image/*" />
                                <label htmlFor="design-file" className="btn-sm btn-sm-outline" style={{ textAlign: 'center', display: 'block' }}>Choose Image</label>
                                <p style={{ fontSize: '11px', color: 'var(--gray)' }}>Max size 10MB. PNG/JPG preferred.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ width: '60px', height: '60px', border: '1px solid #ddd', background: '#f9f9f9', display: 'flex', alignItems: 'center', justify_content: 'center', overflow: 'hidden' }}>
                                    <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                <button onClick={removeDesign} style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}>Remove Design</button>
                            </div>
                        )}
                    </div>

                    {/* QUANTITY */}
                    <div className="qty-row">
                        <div className="qty-label">Quantity</div>
                        <div className="qty-control">
                            <button className="qty-btn" onClick={() => changeQty(-1)}>−</button>
                            <div className="qty-num">{quantity}</div>
                            <button className="qty-btn" onClick={() => changeQty(1)}>+</button>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--gray)' }}>Max 10 per order</div>
                    </div>

                    {/* CTA */}
                    <div className="cta-row">
                        <button className="btn-cart" onClick={handleAddToCart}>🛒 Add to Cart</button>
                        <button className="btn-buy" onClick={handleBuyNow}>⚡ Buy Now</button>
                    </div>

                    {/* PINCODE */}
                    <div className="pincode-check">
                        <div style={{ fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>📍 Check Delivery</div>
                        <div className="pincode-row">
                            <input
                                type="text"
                                className="pincode-input"
                                placeholder="Enter pincode"
                                maxLength="6"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                            <button className="pincode-btn" onClick={checkPincode}>Check</button>
                        </div>
                        {pincodeResult === 'ok' && (
                            <div className="pincode-result ok">
                                ✅ Delivery available · Shipping: ₹80 · Est. {pincode.startsWith('560') ? '1-2' : '3-5'} days
                            </div>
                        )}
                        {pincodeResult === 'fail' && (
                            <div className="pincode-result fail">
                                ❌ Sorry, we don't deliver to this pincode yet
                            </div>
                        )}
                    </div>

                    {/* TRUST BADGES */}
                    <div className="trust-row">
                        <div className="trust-item"><div className="trust-icon">🔒</div><div className="trust-text">Secure Payment</div></div>
                        <div className="trust-item"><div className="trust-icon">🧾</div><div className="trust-text">GST Invoice</div></div>
                        <div className="trust-item"><div className="trust-icon">📦</div><div className="trust-text">Prepaid Only</div></div>
                    </div>

                    {/* ACCORDION */}
                    <div className="accordion">
                        <div className={`acc-item ${accoState.details ? 'open' : ''}`}>
                            <button className="acc-header" onClick={() => toggleAcc('details')}>Product Details <span className="acc-icon">+</span></button>
                            <div className="acc-body">
                                {product.desc || 'Premium 240 GSM cotton blend · Oversized drop-shoulder fit · Ribbed crew neck · Double-stitched hem · Pre-shrunk fabric · Machine washable cold. Available in sizes S to XXL. XXXL currently out of stock.'}
                            </div>
                        </div>
                        <div className={`acc-item ${accoState.sizing ? 'open' : ''}`}>
                            <button className="acc-header" onClick={() => toggleAcc('sizing')}>Sizing Guide <span className="acc-icon">+</span></button>
                            <div className="acc-body">
                                S: Chest 40" · M: Chest 42" · L: Chest 44" · XL: Chest 46" (+₹50) · XXL: Chest 48" (+₹50). Our oversized fit runs 2 sizes larger — we recommend going by your usual size for the drop-shoulder look.
                            </div>
                        </div>
                        <div className={`acc-item ${accoState.design ? 'open' : ''}`}>
                            <button className="acc-header" onClick={() => toggleAcc('design')}>Design & Print Info <span className="acc-icon">+</span></button>
                            <div className="acc-body">
                                We use DTF (Direct to Film) printing for vibrant, long-lasting colours. Upload PNG or JPG (max 10MB). We'll print on the front-center by default. Need a specific placement? Add a note during checkout. Print area: 12" × 14".
                            </div>
                        </div>
                        <div className={`acc-item ${accoState.shipping ? 'open' : ''}`}>
                            <button className="acc-header" onClick={() => toggleAcc('shipping')}>Shipping & Returns <span className="acc-icon">+</span></button>
                            <div className="acc-body">
                                Orders dispatched within 2–3 business days. Delivery in 3–7 business days depending on location. Shipping charges calculated at checkout by pincode. Since all products are custom-printed, we do not accept returns unless there is a print defect or damage. Raise a request within 48 hours of delivery.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
