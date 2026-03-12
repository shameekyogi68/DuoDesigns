import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { DUO_PRODUCTS } from '../data/products';
import toast from 'react-hot-toast';
import EmptyState from '../components/common/EmptyState';

export default function Wishlist() {
    const { items: wishlistIds, toggleItem: toggleWishlist } = useWishlistStore();
    const addItem = useCartStore((state) => state.addItem);

    const wishlistProducts = DUO_PRODUCTS.filter(p => wishlistIds.includes(p.id));

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

    return (
        <div className="wishlist-page">
            <style>{`
                .wishlist-page { max-width: 1400px; margin: 0 auto; padding: 60px 40px; min-height: 70vh; }
                .wishlist-header { margin-bottom: 40px; border-bottom: 2px solid var(--black); padding-bottom: 20px; display: flex; align-items: baseline; gap: 15px; }
                .wishlist-header h1 { font-family: 'Bebas Neue', sans-serif; font-size: 64px; letter-spacing: 2px; }
                .wishlist-header span { font-family: 'Barlow', sans-serif; color: var(--gray); font-weight: 600; }
                
                .wishlist-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
                
                .wishlist-card { border: 1.5px solid var(--black); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; display: flex; flex-direction: column; background: var(--white); }
                .wishlist-card:hover { transform: translateY(-8px); box-shadow: 12px 12px 0 var(--black); }
                
                .wishlist-img-wrap { height: 300px; background: #f5f5f0; display: flex; align-items: center; justify-content: center; font-size: 80px; position: relative; border-bottom: 1.5px solid var(--black); }
                .remove-wish { position: absolute; top: 15px; right: 15px; width: 36px; height: 36px; background: var(--white); border: 1.5px solid var(--black); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; z-index: 10; font-size: 18px; }
                .remove-wish:hover { background: var(--error); color: var(--white); transform: rotate(90deg); }
                
                .wishlist-info { padding: 24px; flex-grow: 1; display: flex; flex-direction: column; }
                .wishlist-cat { font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--gray); letter-spacing: 1px; margin-bottom: 8px; }
                .wishlist-name { font-family: 'Barlow Condensed', sans-serif; font-size: 24px; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; color: var(--black); }
                .wishlist-price { font-family: 'Barlow', sans-serif; font-size: 20px; font-weight: 800; margin-bottom: 20px; }
                
                .wishlist-actions { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: auto; }
                .btn-view { padding: 12px; border: 1.5px solid var(--black); text-align: center; text-decoration: none; color: var(--black); font-family: 'Barlow', sans-serif; font-weight: 800; text-transform: uppercase; font-size: 13px; letter-spacing: 1px; transition: all 0.2s; }
                .btn-view:hover { background: #eee; }
                .btn-add-cart { padding: 14px; background: var(--black); color: var(--white); border: 1.5px solid var(--black); cursor: pointer; font-family: 'Barlow', sans-serif; font-weight: 800; text-transform: uppercase; font-size: 13px; letter-spacing: 1px; transition: all 0.2s; }
                .btn-add-cart:hover { background: var(--accent); color: var(--black); }
                
                .empty-wishlist { text-align: center; padding: 100px 0; }
                .empty-wishlist h2 { font-family: 'Bebas Neue', sans-serif; font-size: 48px; margin-bottom: 20px; }
                .btn-shop { display: inline-block; padding: 16px 40px; background: var(--accent); color: var(--black); text-decoration: none; font-family: 'Barlow', sans-serif; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; border: 2px solid var(--black); box-shadow: 6px 6px 0 var(--black); transition: all 0.2s; }
                .btn-shop:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 var(--black); }

                @media (max-width: 768px) {
                    .wishlist-page { padding: 40px 20px; }
                    .wishlist-header h1 { font-size: 48px; }
                    .wishlist-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <div className="wishlist-header">
                <h1>My Wishlist</h1>
                <span>({wishlistProducts.length} items)</span>
            </div>

            {wishlistProducts.length === 0 ? (
                <EmptyState 
                    icon="❤️"
                    title="YOUR WISHLIST IS EMPTY"
                    subtitle="Keep track of the designs you love. Add items to your wishlist and they'll appear here so you can shop them later!"
                />
            ) : (
                <div className="wishlist-grid">
                    {wishlistProducts.map(p => (
                        <div key={p.id} className="wishlist-card">
                            <button className="remove-wish" onClick={() => toggleWishlist(p.id)} title="Remove">✕</button>
                            <Link to={ROUTES.PRODUCT.replace(':id', p.id)} className="wishlist-img-wrap">
                                {p.icon}
                            </Link>
                            <div className="wishlist-info">
                                <div className="wishlist-cat">{p.cat}</div>
                                <div className="wishlist-name">{p.name}</div>
                                <div className="wishlist-price">₹{p.price}</div>
                                <div className="wishlist-actions">
                                    <button className="btn-add-cart" onClick={() => handleAddToCart(p)}>Add to Cart</button>
                                    <Link to={ROUTES.PRODUCT.replace(':id', p.id)} className="btn-view">View details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
