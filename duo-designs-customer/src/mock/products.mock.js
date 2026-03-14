/**
 * @file         products.mock.js
 * @description  Mock database of products for UI consistency and testing.
 *
 * @module       mock/products
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

export const MOCK_PRODUCTS = [
    { 
        id: '1', 
        cat: 'tshirt', 
        name: 'Classic Custom Tee', 
        price: 499, 
        oldPrice: 699, 
        save: '28% OFF', 
        badge: 'HOT', 
        icon: '👕', 
        stock: 45, 
        rating: 4.8,
        reviews: 42,
        colors: [
            { id: 'c1', name: 'Black', hex: '#0a0a0a' }, 
            { id: 'c2', name: 'White', hex: '#f5f5f0', border: true }
        ],
        sizes: [
            { id: 's1', name: 'S', extra: 0, available: true },
            { id: 's2', name: 'M', extra: 0, available: true },
            { id: 's3', name: 'L', extra: 0, available: true }
        ],
        desc: 'Our standard 180 GSM cotton t-shirt. Perfect for everyday wear.'
    },
    { 
        id: '2', 
        cat: 'oversized', 
        name: 'Oversized Drop Tee', 
        price: 699, 
        oldPrice: 999, 
        save: '30% OFF', 
        badge: 'NEW', 
        icon: '🧥', 
        stock: 22, 
        rating: 4.9,
        reviews: 128,
        colors: [
            { id: 'c1', name: 'Grey', hex: '#888' }, 
            { id: 'c2', name: 'Olive Green', hex: '#4a7c59' }
        ],
        sizes: [
            { id: 's2', name: 'M', extra: 0, available: true },
            { id: 's3', name: 'L', extra: 0, available: true },
            { id: 's4', name: 'XL', extra: 50, available: true }
        ],
        desc: 'Premium 240 GSM cotton blend for that perfect streetwear look.'
    },
    { 
        id: '3', 
        cat: 'mugs', 
        name: 'Custom Photo Mug', 
        price: 349, 
        oldPrice: 449, 
        save: '22% OFF', 
        badge: null, 
        icon: '☕', 
        stock: 15, 
        rating: 4.5,
        reviews: 89,
        colors: [
            { id: 'c1', name: 'White', hex: '#f5f5f0', border: true }
        ],
        sizes: [
            { id: 's1', name: 'Standard 11oz', extra: 0, available: true }
        ],
        desc: 'Ceramic mug with vibrant prints. Microwave safe.'
    },
    { 
        id: '4', 
        cat: 'keychains', 
        name: 'Metal Keychain', 
        price: 199, 
        oldPrice: 299, 
        save: '33% OFF', 
        badge: 'SALE', 
        icon: '🔑', 
        stock: 60, 
        rating: 4.7,
        reviews: 215,
        colors: [
            { id: 'c1', name: 'Gold', hex: '#c0a060' }
        ],
        sizes: [
            { id: 's1', name: 'One Size', extra: 0, available: true }
        ],
        desc: 'Durable metal keychain with custom double-sided printing.'
    },
    { 
        id: '5', 
        cat: 'trackpants', 
        name: 'Relaxed Joggers', 
        price: 899, 
        oldPrice: 1199, 
        save: '25% OFF', 
        badge: null, 
        icon: '👖', 
        stock: 12, 
        rating: 4.6,
        reviews: 56,
        colors: [
            { id: 'c1', name: 'Navy Blue', hex: '#3a5fa0' }
        ],
        sizes: [
            { id: 's2', name: 'M', extra: 0, available: true },
            { id: 's3', name: 'L', extra: 0, available: true }
        ],
        desc: 'French Terry fabric trackpants. Perfect for lounging or workouts.'
    },
    { 
        id: '6', 
        cat: 'tshirt', 
        name: 'Vintage Wash Tee', 
        price: 549, 
        oldPrice: 799, 
        save: '31% OFF', 
        badge: 'VINTAGE', 
        icon: '👕', 
        stock: 18, 
        rating: 4.8,
        reviews: 34,
        colors: [
            { id: 'c1', name: 'Charcoal', hex: '#333' }
        ],
        sizes: [
            { id: 's2', name: 'M', extra: 0, available: true },
            { id: 's3', name: 'L', extra: 0, available: true }
        ],
        desc: 'Acid-washed cotton tee with a soft, worn-in feel.'
    },
    { 
        id: '7', 
        cat: 'oversized', 
        name: 'Heavyweight Boxy Tee', 
        price: 799, 
        oldPrice: null, 
        save: null, 
        badge: 'PREMIUM', 
        icon: '🧥', 
        stock: 30, 
        rating: 5.0,
        reviews: 12,
        colors: [
            { id: 'c1', name: 'Cream', hex: '#fffdd0' }
        ],
        sizes: [
            { id: 's1', name: 'S', extra: 0, available: true },
            { id: 's2', name: 'M', extra: 0, available: true }
        ],
        desc: 'Our thickest 280 GSM cotton fabric. Boxy, modern silhouette.'
    },
    { 
        id: '8', 
        cat: 'mugs', 
        name: 'Magic Reveal Mug', 
        price: 499, 
        oldPrice: 599, 
        save: '17% OFF', 
        badge: 'VIRAL', 
        icon: '☕', 
        stock: 5, 
        rating: 4.9,
        reviews: 310,
        colors: [
            { id: 'c1', name: 'Matte Black', hex: '#0a0a0a' }
        ],
        sizes: [
            { id: 's1', name: 'Standard 11oz', extra: 0, available: true }
        ],
        desc: 'Watch your design appear when hot water is poured in.'
    },
    { 
        id: '9', 
        cat: 'keychains', 
        name: 'Acrylic Charm', 
        price: 149, 
        oldPrice: null, 
        save: null, 
        badge: 'NEW', 
        icon: '🏷️', 
        stock: 100, 
        rating: 4.3,
        reviews: 15,
        colors: [
            { id: 'c1', name: 'Clear', hex: 'rgba(255,255,255,0.5)' }
        ],
        sizes: [
            { id: 's1', name: '2x2 inch', extra: 0, available: true }
        ],
        desc: 'Vibrant acrylic keychain with laser-cut edges.'
    },
    { 
        id: '10', 
        cat: 'trackpants', 
        name: 'Cargo Joggers', 
        price: 999, 
        oldPrice: 1499, 
        save: '33% OFF', 
        badge: 'TRENDING', 
        icon: '👖', 
        stock: 8, 
        rating: 4.7,
        reviews: 28,
        colors: [
            { id: 'c1', name: 'Black', hex: '#0a0a0a' }
        ],
        sizes: [
            { id: 's2', name: 'M', extra: 0, available: true },
            { id: 's3', name: 'L', extra: 0, available: true }
        ],
        desc: 'Utility-focused cargo trackpants with 6 pockets.'
    },
    { 
        id: '11', 
        cat: 'tshirt', 
        name: 'Tie-Dye Custom Tee', 
        price: 599, 
        oldPrice: 899, 
        save: '33% OFF', 
        badge: 'LIMITED', 
        icon: '👕', 
        stock: 15, 
        rating: 4.6,
        reviews: 45,
        colors: [
            { id: 'c1', name: 'Blue Swirl', hex: '#add8e6' }
        ],
        sizes: [
            { id: 's2', name: 'M', extra: 0, available: true },
            { id: 's3', name: 'L', extra: 0, available: true }
        ],
        desc: 'Hand-dyed cotton tees. Each piece is unique.'
    },
    { 
        id: '12', 
        cat: 'oversized', 
        name: 'Acid Wash Hoodie', 
        price: 1299, 
        oldPrice: 1999, 
        save: '35% OFF', 
        badge: 'WINTER', 
        icon: '🧥', 
        stock: 0, 
        rating: 4.9,
        reviews: 82,
        colors: [
            { id: 'c1', name: 'Washed Black', hex: '#2c2c2c' }
        ],
        sizes: [
            { id: 's2', name: 'M', extra: 0, available: false },
            { id: 's3', name: 'L', extra: 0, available: false }
        ],
        desc: 'Heavyweight fleece hoodie. Coming back soon.'
    }
];
