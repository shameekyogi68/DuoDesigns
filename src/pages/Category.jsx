import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { DUO_PRODUCTS } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import toast from 'react-hot-toast';

export default function Category() {
    const { category } = useParams();
    const navigate = useNavigate();
    const addItem = useCartStore((state) => state.addItem);
    const { items: wishlistItems, toggleItem: toggleWishlist } = useWishlistStore();

    const [activeTab, setActiveTab] = useState(category || 'all');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const [filtersOpen, setFiltersOpen] = useState(false);

    const dummyProducts = DUO_PRODUCTS;

    const handleTabChange = (cat) => {
        setActiveTab(cat);
        if (cat === 'all') navigate(ROUTES.SHOP);
        else navigate(`${ROUTES.SHOP}/${cat}`);
    };

    const filteredProducts = activeTab === 'all'
        ? dummyProducts
        : dummyProducts.filter(p => p.cat === activeTab);

    return (
        <>
            <style>{`
    .cat-tabs-wrap { border-bottom: 1.5px solid var(--black); background: var(--white); position: sticky; top: 64px; z-index: 99; }
    .cat-tabs { max-width: 1400px; margin: 0 auto; padding: 0 40px; display: flex; gap: 0; overflow-x: auto; }
    .cat-tab { padding: 16px 28px; font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; background: none; border: none; cursor: pointer; color: var(--gray); border-bottom: 3px solid transparent; white-space: nowrap; transition: all 0.2s; }
    .cat-tab:hover { color: var(--black); }
    .cat-tab.active { color: var(--black); border-bottom-color: var(--accent); }
    .shop-hero { background: var(--black); color: var(--white); }
    .shop-hero-inner { max-width: 1400px; margin: 0 auto; padding: 48px 40px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
    .shop-hero h1 { font-family: 'Bebas Neue', sans-serif; font-size: 72px; letter-spacing: 2px; line-height: 0.9; }
    .shop-hero h1 span { -webkit-text-stroke: 2px var(--white); color: transparent; }
    .shop-hero p { font-size: 15px; color: #888; margin-top: 12px; max-width: 400px; }
    .result-count { font-family: 'Barlow Condensed', sans-serif; font-size: 48px; font-weight: 700; text-align: right; }
    .result-count span { display: block; font-size: 13px; font-weight: 400; color: #888; font-family: 'Barlow', sans-serif; letter-spacing: 1px; text-transform: uppercase; }
    .shop-layout { max-width: 1400px; margin: 0 auto; padding: 0 40px 80px; display: grid; grid-template-columns: 260px 1fr; gap: 48px; align-items: start; margin-top: 40px; }
    .filters { position: sticky; top: 130px; }
    .filter-section { border-bottom: 1.5px solid var(--black); padding-bottom: 24px; margin-bottom: 24px; }
    .filter-section:last-child { border-bottom: none; }
    .filter-title { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; display: flex; justify-content: space-between; cursor: pointer; }
    .filter-title span { font-size: 16px; }
    .filter-options { display: flex; flex-direction: column; gap: 10px; }
    .filter-option { display: flex; align-items: center; gap: 10px; cursor: pointer; }
    .filter-option input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--black); cursor: pointer; }
    .filter-option label { font-size: 14px; font-weight: 500; cursor: pointer; flex: 1; }
    .filter-option .count { font-size: 12px; color: var(--gray); }
    .color-filter { display: flex; gap: 10px; flex-wrap: wrap; }
    .color-filter-dot { width: 28px; height: 28px; border: 2px solid transparent; cursor: pointer; transition: all 0.2s; }
    .color-filter-dot.active { border-color: var(--black); transform: scale(1.15); }
    .price-range { display: flex; gap: 10px; align-items: center; }
    .price-input { flex: 1; padding: 8px 10px; border: 1.5px solid var(--black); font-family: 'Barlow', sans-serif; font-size: 14px; outline: none; width: 100%; }
    .price-input:focus { border-color: var(--accent); }
    .clear-filters { width: 100%; padding: 10px; background: none; border: 1.5px solid var(--black); font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: all 0.2s; }
    .clear-filters:hover { background: var(--black); color: var(--white); }
    .results-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1.5px solid var(--light-gray); flex-wrap: wrap; gap: 12px; }
    .results-text { font-size: 14px; color: var(--gray); font-weight: 600; }
    .results-text strong { color: var(--black); }
    .sort-wrap { display: flex; align-items: center; gap: 10px; }
    .sort-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--gray); }
    .sort-select { padding: 8px 14px; border: 1.5px solid var(--black); background: var(--white); font-family: 'Barlow', sans-serif; font-weight: 600; font-size: 13px; outline: none; cursor: pointer; }
    .view-toggle { display: flex; gap: 0; border: 1.5px solid var(--black); }
    .view-btn { padding: 8px 12px; background: none; border: none; cursor: pointer; font-size: 16px; transition: background 0.2s; }
    .view-btn.active { background: var(--black); }
    .active-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
    .products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
    .products-grid.list-view { grid-template-columns: 1fr; }
    .product-card { border-right: 1.5px solid var(--black); border-bottom: 1.5px solid var(--black); cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden; }
    .product-card:hover { background: var(--card-bg); }
    .product-card:nth-child(3n) { border-right: none; }
    .products-grid.list-view .product-card { border-right: none; border-bottom: 1.5px solid var(--black); display: grid; grid-template-columns: 160px 1fr; }
    .products-grid.list-view .product-card:nth-child(3n) { border-right: none; }
    .product-img { aspect-ratio: 1; background: var(--card-bg); display: flex; align-items: center; justify-content: center; font-size: 64px; border-bottom: 1.5px solid var(--black); position: relative; overflow: hidden; transition: background 0.2s; }
    .products-grid.list-view .product-img { aspect-ratio: unset; border-bottom: none; border-right: 1.5px solid var(--black); }
    .product-card:hover .product-img { background: #e0e0da; }
    .product-badge { position: absolute; top: 12px; left: 12px; font-weight: 800; font-size: 10px; padding: 4px 10px; letter-spacing: 1px; text-transform: uppercase; }
    .badge-hot { background: var(--accent); color: var(--black); }
    .badge-new { background: var(--black); color: var(--white); }
    .badge-sale { background: #e05050; color: var(--white); }
    .badge-out { background: #888; color: var(--white); }
    .product-info { padding: 20px; }
    .product-name { font-weight: 800; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
    .product-cat { font-size: 12px; color: var(--gray); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
    .product-colors { display: flex; gap: 6px; margin-bottom: 12px; }
    .color-dot { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid var(--black); }
    .product-price { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .price { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 700; }
    .price-old { font-size: 14px; color: var(--gray); text-decoration: line-through; }
    .price-save { background: var(--accent); color: var(--black); font-size: 10px; font-weight: 800; padding: 2px 8px; }
    .stock-warn { font-size: 11px; color: #e05050; font-weight: 700; margin-top: 6px; }
    .stock-out { font-size: 11px; color: var(--gray); font-weight: 700; margin-top: 6px; }
    .add-cart { width: 100%; margin-top: 14px; background: var(--black); color: var(--white); border: none; padding: 11px; font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
    .add-cart:hover { background: var(--accent); color: var(--black); }
    .add-cart:disabled { background: var(--light-gray); color: var(--gray); cursor: not-allowed; }
    .wishlist-btn { position: absolute; top: 12px; right: 12px; background: var(--white); border: 1.5px solid var(--black); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px; transition: all 0.2s; }
    .wishlist-btn:hover { background: var(--accent); }
    .no-results { text-align: center; padding: 80px 20px; }
    .no-results h3 { font-family: 'Bebas Neue', sans-serif; font-size: 42px; letter-spacing: 2px; margin-bottom: 8px; }
    .no-results p { font-size: 14px; color: var(--gray); }
    .pagination { display: flex; justify-content: center; align-items: center; gap: 0; margin-top: 48px; border-top: 1.5px solid var(--black); padding-top: 32px; }
    .page-btn { width: 44px; height: 44px; border: 1.5px solid var(--black); border-right: none; background: none; font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
    .page-btn:last-child { border-right: 1.5px solid var(--black); }
    .page-btn:hover, .page-btn.active { background: var(--black); color: var(--white); }
    @media (max-width: 1100px) { .products-grid { grid-template-columns: repeat(2, 1fr); } .product-card:nth-child(3n) { border-right: 1.5px solid var(--black); } .product-card:nth-child(2n) { border-right: none; } }
    @media (max-width: 900px) { .shop-layout { grid-template-columns: 1fr; } .filters { position: static; display: none; } .filters.open { display: block; } }
    @media (max-width: 768px) { .cat-tabs { padding: 0 20px; } .shop-hero-inner { padding: 32px 20px; flex-direction: column; align-items: flex-start; } .shop-hero h1 { font-size: 48px; } .result-count { font-size: 32px; } .products-grid { grid-template-columns: 1fr; } .product-card:nth-child(even), .product-card:nth-child(odd) { border-right: none; } .results-bar { flex-direction: column; align-items: flex-start; } .sort-wrap { width: 100%; justify-content: space-between; } }
      `}</style>

            {/* CATEGORY TABS */}
            <div className="cat-tabs-wrap">
                <div className="cat-tabs">
                    <button className={`cat-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => handleTabChange('all')}>All Products</button>
                    <button className={`cat-tab ${activeTab === 'tshirt' ? 'active' : ''}`} onClick={() => handleTabChange('tshirt')}>👕 Regular T-Shirts</button>
                    <button className={`cat-tab ${activeTab === 'oversized' ? 'active' : ''}`} onClick={() => handleTabChange('oversized')}>🧥 Oversized</button>
                    <button className={`cat-tab ${activeTab === 'trackpants' ? 'active' : ''}`} onClick={() => handleTabChange('trackpants')}>👖 Trackpants</button>
                    <button className={`cat-tab ${activeTab === 'mugs' ? 'active' : ''}`} onClick={() => handleTabChange('mugs')}>☕ Mugs</button>
                    <button className={`cat-tab ${activeTab === 'keychains' ? 'active' : ''}`} onClick={() => handleTabChange('keychains')}>🔑 Keychains</button>
                </div>
            </div>

            {/* SHOP HERO */}
            <div className="shop-hero">
                <div className="shop-hero-inner">
                    <div>
                        <h1>SHOP <span>ALL</span><br />PRODUCTS</h1>
                        <p>Custom print everything — upload your design or pick from ours.</p>
                    </div>
                    <div className="result-count">{filteredProducts.length}<span>Products Found</span></div>
                </div>
            </div>

            <div className="shop-layout">

                {/* FILTERS */}
                <aside className={`filters ${filtersOpen ? 'open' : ''}`} id="filters-sidebar">
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '28px', letterSpacing: '2px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        FILTERS
                        <button className="clear-filters" style={{ width: 'auto', padding: '6px 14px', fontSize: '11px' }}>Clear All</button>
                    </div>

                    <div className="filter-section">
                        <div className="filter-title">Category <span>−</span></div>
                        <div className="filter-options">
                            <div className="filter-option"><input type="checkbox" id="f-tshirt" /><label htmlFor="f-tshirt">Regular T-Shirts</label><span className="count">(8)</span></div>
                            <div className="filter-option"><input type="checkbox" id="f-oversized" /><label htmlFor="f-oversized">Oversized</label><span className="count">(6)</span></div>
                            <div className="filter-option"><input type="checkbox" id="f-trackpants" /><label htmlFor="f-trackpants">Trackpants</label><span className="count">(4)</span></div>
                            <div className="filter-option"><input type="checkbox" id="f-mugs" /><label htmlFor="f-mugs">Mugs</label><span className="count">(3)</span></div>
                            <div className="filter-option"><input type="checkbox" id="f-keychains" /><label htmlFor="f-keychains">Keychains</label><span className="count">(3)</span></div>
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-title">Color <span>−</span></div>
                        <div className="color-filter">
                            <div className="color-filter-dot" style={{ background: '#0a0a0a' }} title="Black"></div>
                            <div className="color-filter-dot" style={{ background: '#f5f5f0', border: '1.5px solid #ccc' }} title="White"></div>
                            <div className="color-filter-dot" style={{ background: '#888' }} title="Grey"></div>
                            <div className="color-filter-dot" style={{ background: '#4a7c59' }} title="Olive"></div>
                            <div className="color-filter-dot" style={{ background: '#3a5fa0' }} title="Navy"></div>
                            <div className="color-filter-dot" style={{ background: '#e05050' }} title="Red"></div>
                            <div className="color-filter-dot" style={{ background: '#e8ff3b', border: '1.5px solid #ccc' }} title="Yellow"></div>
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-title">Size <span>−</span></div>
                        <div className="filter-options">
                            <div className="filter-option"><input type="checkbox" /><label>S</label></div>
                            <div className="filter-option"><input type="checkbox" /><label>M</label></div>
                            <div className="filter-option"><input type="checkbox" /><label>L</label></div>
                            <div className="filter-option"><input type="checkbox" /><label>XL (+₹50)</label></div>
                            <div className="filter-option"><input type="checkbox" /><label>XXL (+₹50)</label></div>
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-title">Price Range <span>−</span></div>
                        <div className="price-range">
                            <input type="number" className="price-input" placeholder="₹ Min" defaultValue="0" />
                            <span style={{ color: 'var(--gray)', fontWeight: '700' }}>–</span>
                            <input type="number" className="price-input" placeholder="₹ Max" defaultValue="2000" />
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-title">Availability <span>−</span></div>
                        <div className="filter-options">
                            <div className="filter-option"><input type="checkbox" defaultChecked /><label>In Stock</label></div>
                            <div className="filter-option"><input type="checkbox" /><label>Out of Stock</label></div>
                        </div>
                    </div>
                </aside>

                {/* PRODUCTS AREA */}
                <div>
                    {/* SORT BAR */}
                    <div className="results-bar">
                        <div>
                            <div className="results-text">Showing <strong>{filteredProducts.length} products</strong></div>
                            <div className="active-filters" id="active-filters"></div>
                        </div>
                        <div className="sort-wrap">
                            <span className="sort-label">Sort:</span>
                            <select className="sort-select">
                                <option value="popular">Most Popular</option>
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="discount">Biggest Discount</option>
                            </select>
                            <div className="view-toggle">
                                <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Grid">⊞</button>
                                <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="List">☰</button>
                            </div>
                            <button
                                style={{ background: 'var(--black)', color: 'var(--white)', border: 'none', padding: '8px 14px', fontFamily: "'Barlow',sans-serif", fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', display: 'none' }}
                                id="filter-toggle"
                                onClick={() => setFiltersOpen(!filtersOpen)}
                            >
                                ⚙ Filters
                            </button>
                        </div>
                    </div>

                    {/* PRODUCT GRID */}
                    <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>

                        {filteredProducts.map(p => (
                            <div className="product-card" key={p.id}>
                                <Link to={`${ROUTES.PRODUCT.replace(':id', p.id)}`} style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
                                    <div className="product-img">
                                        {p.icon}
                                        {p.badge && (
                                            <span className={`product-badge ${p.badge === 'HOT' ? 'badge-hot' : p.badge === 'SALE' ? 'badge-sale' : p.badge === 'OUT OF STOCK' ? 'badge-out' : 'badge-new'}`}>
                                                {p.badge}
                                            </span>
                                        )}
                                        <button 
                                            className="wishlist-btn" 
                                            style={{ color: wishlistItems.includes(p.id) ? 'var(--error)' : 'inherit' }}
                                            onClick={(e) => { 
                                                e.preventDefault(); 
                                                toggleWishlist(p.id);
                                                toast.success(wishlistItems.includes(p.id) ? 'Removed from Wishlist' : 'Added to Wishlist');
                                            }}
                                        >
                                            {wishlistItems.includes(p.id) ? '♥' : '♡'}
                                        </button>
                                    </div>
                                    <div className="product-info">
                                        <div className="product-cat">{p.cat}</div>
                                        <div className="product-name">{p.name}</div>
                                        <div className="product-colors">
                                            {p.colors.map((c, i) => (
                                                <div key={i} className="color-dot" style={{ background: c.hex || c, borderColor: (c.hex || c) === '#f5f5f0' || (c.hex || c) === '#e8ff3b' ? '#ccc' : 'transparent' }}></div>
                                            ))}
                                        </div>
                                        <div className="product-price">
                                            <span className="price">₹{p.price}</span>
                                            {p.oldPrice && <span className="price-old">₹{p.oldPrice}</span>}
                                            {p.save && <span className="price-save">{p.save}</span>}
                                        </div>
                                        {p.stock && (
                                            <div className={p.stock === 'out' ? 'stock-out' : 'stock-warn'}>
                                                {p.stock === 'out' ? 'Currently out of stock' : p.stock}
                                            </div>
                                        )}
                                        <button 
                                            className="add-cart" 
                                            disabled={p.stock === 'out'} 
                                            onClick={(e) => { 
                                                e.preventDefault(); 
                                                addItem({
                                                    product: { id: p.id, name: p.name, price: p.price, image: p.icon },
                                                    variant: { id: `${p.colors[0]?.id || 'def'}-${p.sizes?.[0]?.id || 'def'}`, color: p.colors[0]?.name || 'Standard', size: p.sizes?.[0]?.name || 'Standard' },
                                                    qty: 1
                                                });
                                                toast.success('Added to Cart');
                                            }}
                                        >
                                            {p.stock === 'out' ? 'Out of Stock' : 'Add to Cart'}
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* PAGINATION */}
                    <div className="pagination">
                        <button className="page-btn">‹</button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn">2</button>
                        <button className="page-btn">3</button>
                        <button className="page-btn">›</button>
                    </div>
                </div>
            </div>
        </>
    );
}
