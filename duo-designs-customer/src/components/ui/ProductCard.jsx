/**
 * @file         ProductCard.jsx
 * @description  Premium product card component with hover effects, 
 *               wishlist toggle, and quick add-to-cart.
 *
 * @module       components/ui/ProductCard
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 *
 * @dependencies
 *   - react
 *   - prop-types
 *   - react-router-dom (Link)
 *   - store/cartStore
 *   - store/wishlistStore
 *   - react-hot-toast
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { ROUTES } from '../../constants/routes';
import toast from 'react-hot-toast';

/**
 * @component ProductCard
 * @description Renders product information in a grid/list tile.
 *
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data object
 * @param {string} [props.viewMode='grid'] - Layout mode ('grid' | 'list')
 *
 * @returns {JSX.Element}
 */
const ProductCard = ({ product, viewMode = 'grid' }) => {
    const addItem = useCartStore((state) => state.addItem);
    const { items: wishlistItems, toggleItem: toggleWishlist } = useWishlistStore();
    const isSaved = wishlistItems.includes(product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addItem({
            product: { 
                id: product.id, 
                name: product.name, 
                price: product.price, 
                image: product.icon 
            },
            variant: { 
                id: `${product.colors[0]?.id || 'def'}-${product.sizes?.[0]?.id || 'def'}`, 
                color: product.colors[0]?.name || 'Standard', 
                size: product.sizes?.[0]?.name || 'Standard' 
            },
            qty: 1
        });
        toast.success('Added to Cart');
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        toggleWishlist(product.id);
        toast.success(isSaved ? 'Removed from Wishlist' : 'Added to Wishlist');
    };

    return (
        <div className={`product-card ${viewMode === 'list' ? 'list-view' : ''}`}>
            <Link to={ROUTES.PRODUCT.replace(':id', product.id)} style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
                <div className="product-img">
                    {product.icon}
                    {product.badge && (
                        <span className={`product-badge ${product.badge === 'HOT' ? 'badge-hot' : product.badge === 'SALE' ? 'badge-sale' : product.badge === 'OUT OF STOCK' ? 'badge-out' : 'badge-new'}`}>
                            {product.badge}
                        </span>
                    )}
                    <button 
                        className="wishlist-btn" 
                        style={{ color: isSaved ? 'var(--error)' : 'inherit' }}
                        onClick={handleWishlist}
                    >
                        {isSaved ? '♥' : '♡'}
                    </button>
                </div>
                <div className="product-info">
                    <div className="product-cat">{product.cat}</div>
                    <div className="product-name">{product.name}</div>
                    <div className="product-colors">
                        {product.colors?.map((c, i) => (
                            <div key={i} className="color-dot" style={{ background: c.hex || c, borderColor: (c.hex || c) === '#f5f5f0' || (c.hex || c) === '#e8ff3b' ? '#ccc' : 'transparent' }}></div>
                        ))}
                    </div>
                    <div className="product-price">
                        <span className="price">₹{product.price}</span>
                        {product.oldPrice && <span className="price-old">₹{product.oldPrice}</span>}
                        {product.save && <span className="price-save">{product.save}</span>}
                    </div>
                    {product.stock && (
                        <div className={product.stock === 'out' ? 'stock-out' : 'stock-warn'}>
                            {product.stock === 'out' ? 'Currently out of stock' : product.stock}
                        </div>
                    )}
                    <button 
                        className="add-cart" 
                        disabled={product.stock === 'out'} 
                        onClick={handleAddToCart}
                    >
                        {product.stock === 'out' ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </Link>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        cat: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        oldPrice: PropTypes.number,
        save: PropTypes.string,
        badge: PropTypes.string,
        icon: PropTypes.string,
        stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        colors: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            hex: PropTypes.string
        })).isRequired,
        sizes: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            available: PropTypes.bool
        }))
    }).isRequired,
    viewMode: PropTypes.oneOf(['grid', 'list'])
};

export default ProductCard;
