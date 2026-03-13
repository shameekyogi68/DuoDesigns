/**
 * @file         products.js
 * @description  Static product database for Duo Designs.
 *               Contains catalogs for t-shirts, oversized tees, mugs,
 *               keychains, and trackpants with their variants.
 *
 * @module       data/products
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @notes
 *   - Serves as the primary source of truth for the experimental frontend.
 *   - Each product includes variants (colors, sizes) and pricing attributes.
 *   - Prices are inclusive of GST as per frontend display logic.
 */

/**
 * @constant DUO_PRODUCTS
 * @description Master array of product objects available in the shop.
 * @type {Array<Object>}
 */
export const DUO_PRODUCTS = [
    { 
        id: '1', 
        cat: 'tshirt', 
        name: 'Classic Custom Tee', 
        price: 499, 
        oldPrice: 699, 
        save: '28% OFF', 
        badge: 'HOT', 
        icon: '👕', 
        stock: 'Only 4 left in Black/M', 
        rating: 4.8,
        reviews: 42,
        colors: [
            { id: 'c1', name: 'Black', hex: '#0a0a0a' }, 
            { id: 'c2', name: 'White', hex: '#f5f5f0', border: true }, 
            { id: 'c3', name: 'Neon Yellow', hex: '#e8ff3b' }, 
            { id: 'c4', name: 'Red', hex: '#e05050' }
        ],
        sizes: [
            { id: 's1', name: 'S', extra: 0, available: true },
            { id: 's2', name: 'M', extra: 0, available: true },
            { id: 's3', name: 'L', extra: 0, available: true },
            { id: 's4', name: 'XL', extra: 0, available: true },
            { id: 's5', name: 'XXL', extra: 50, available: false }
        ],
        gallery: ['👕', '🧵', '👕', '🪡'],
        desc: 'Our standard 180 GSM cotton t-shirt. Perfect for everyday wear and custom printing. Pre-shrunk and bio-washed for maximum comfort.'
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
        stock: 'Only 2 left in Grey/L', 
        rating: 4.9,
        reviews: 128,
        colors: [
            { id: 'c1', name: 'Black', hex: '#0a0a0a' }, 
            { id: 'c2', name: 'Grey', hex: '#888' }, 
            { id: 'c3', name: 'Olive Green', hex: '#4a7c59' }
        ],
        sizes: [
            { id: 's1', name: 'S', extra: 0, available: true },
            { id: 's2', name: 'M', extra: 0, available: true },
            { id: 's3', name: 'L', extra: 0, available: true },
            { id: 's4', name: 'XL', extra: 50, available: true },
            { id: 's5', name: 'XXL', extra: 50, available: true },
            { id: 's6', name: 'XXXL', extra: 50, available: false }
        ],
        gallery: ['🧥', '👕', '🔍', '📐'],
        desc: 'Premium 240 GSM cotton blend · Oversized drop-shoulder fit · Ribbed crew neck · Double-stitched hem · Pre-shrunk fabric · Machine washable cold.'
    },
    { 
        id: '3', 
        cat: 'mugs', 
        name: 'Custom Print Mug', 
        price: 349, 
        oldPrice: null, 
        save: null, 
        badge: null, 
        icon: '☕', 
        stock: null, 
        rating: 4.5,
        reviews: 89,
        colors: [
            { id: 'c1', name: 'White', hex: '#f5f5f0', border: true }, 
            { id: 'c2', name: 'Black Inside', hex: '#0a0a0a' }
        ],
        sizes: [
            { id: 's1', name: 'Standard 11oz', extra: 0, available: true },
            { id: 's2', name: 'Large 15oz', extra: 100, available: true }
        ],
        gallery: ['☕', '✨', '📸', '🎁'],
        desc: 'High-quality ceramic mug with a glossy finish. Microwave and dishwasher safe. Your custom print is wrapped around the mug for maximum visibility.'
    },
    { 
        id: '4', 
        cat: 'keychains', 
        name: 'Keychain — Double Print', 
        price: 199, 
        oldPrice: 299, 
        save: '33% OFF', 
        badge: 'SALE', 
        icon: '🔑', 
        stock: 'Only 6 left', 
        rating: 4.7,
        reviews: 215,
        colors: [
            { id: 'c1', name: 'Gold', hex: '#c0a060' }, 
            { id: 'c2', name: 'Silver', hex: '#888' }
        ],
        sizes: [
            { id: 's1', name: 'One Size', extra: 0, available: true }
        ],
        gallery: ['🔑', '🏷️', '✨', '🎁'],
        desc: 'Durable metal keychain with custom printing on both sides. Epoxy coating for scratch resistance. Perfect for gifts or corporate merchandise.'
    },
    { 
        id: '5', 
        cat: 'trackpants', 
        name: 'Custom Trackpants', 
        price: 899, 
        oldPrice: 1199, 
        save: '25% OFF', 
        badge: 'NEW', 
        icon: '👖', 
        stock: null, 
        rating: 4.6,
        reviews: 56,
        colors: [
            { id: 'c1', name: 'Black', hex: '#0a0a0a' }, 
            { id: 'c2', name: 'Grey Melange', hex: '#888' }, 
            { id: 'c3', name: 'Navy', hex: '#3a5fa0' }
        ],
        sizes: [
            { id: 's1', name: 'S', extra: 0, available: true },
            { id: 's2', name: 'M', extra: 0, available: true },
            { id: 's3', name: 'L', extra: 0, available: true },
            { id: 's4', name: 'XL', extra: 0, available: true },
            { id: 's5', name: 'XXL', extra: 100, available: true }
        ],
        gallery: ['👖', '🏃', '🧵', '✨'],
        desc: 'Comfortable French Terry fabric trackpants. Elastic waistband with drawcord, side pockets, and custom print placement on the thigh or calf.'
    },
    { 
        id: '6', 
        cat: 'keychains', 
        name: 'Keychain — Single Print', 
        price: 149, 
        oldPrice: 199, 
        save: null, 
        badge: null, 
        icon: '🗝️', 
        stock: null, 
        rating: 4.4,
        reviews: 32,
        colors: [
            { id: 'c1', name: 'Gold', hex: '#c0a060' }, 
            { id: 'c2', name: 'Silver', hex: '#888' }
        ],
        sizes: [
            { id: 's1', name: 'One Size', extra: 0, available: true }
        ],
        gallery: ['🗝️', '🏷️', '✨', '🎁'],
        desc: 'Affordable single-sided print keychain. Highly durable with a glossy protective layer. Blank metallic finish on the reverse side.'
    },
    { 
        id: '7', 
        cat: 'tshirt', 
        name: 'Polo Custom Tee', 
        price: 599, 
        oldPrice: null, 
        save: null, 
        badge: null, 
        icon: '👕', 
        stock: null, 
        rating: 4.8,
        reviews: 95,
        colors: [
            { id: 'c1', name: 'Black', hex: '#0a0a0a' }, 
            { id: 'c2', name: 'White', hex: '#f5f5f0', border: true }, 
            { id: 'c3', name: 'Navy Blue', hex: '#3a5fa0' }
        ],
        sizes: [
            { id: 's1', name: 'S', extra: 0, available: true },
            { id: 's2', name: 'M', extra: 0, available: true },
            { id: 's3', name: 'L', extra: 0, available: true },
            { id: 's4', name: 'XL', extra: 0, available: true },
            { id: 's5', name: 'XXL', extra: 50, available: true }
        ],
        gallery: ['👕', '👔', '🧵', '✨'],
        desc: 'Classic pique cotton polo shirt. Features a standard collar and 2-button placket. Custom DTF printing suitable for left-chest logos or full back designs.'
    },
    { 
        id: '8', 
        cat: 'oversized', 
        name: 'Boxy Crop Tee', 
        price: 749, 
        oldPrice: null, 
        save: null, 
        badge: 'OUT OF STOCK', 
        icon: '🧥', 
        stock: 'out', 
        rating: 4.9,
        reviews: 77,
        colors: [
            { id: 'c1', name: 'Black', hex: '#0a0a0a' }, 
            { id: 'c2', name: 'Grey', hex: '#888' }
        ],
        sizes: [
            { id: 's1', name: 'XS', extra: 0, available: false },
            { id: 's2', name: 'S', extra: 0, available: false },
            { id: 's3', name: 'M', extra: 0, available: false },
            { id: 's4', name: 'L', extra: 0, available: false }
        ],
        gallery: ['🧥', '✨', '🧵', '📸'],
        desc: 'Trendy boxy crop cut for women. 220 GSM heavyweight cotton. Raw hem finish and dropped shoulders. Very popular for graphic streetwear prints.'
    },
    { 
        id: '9', 
        cat: 'mugs', 
        name: 'Magic Colour Mug', 
        price: 449, 
        oldPrice: 599, 
        save: '25% OFF', 
        badge: 'NEW', 
        icon: '☕', 
        stock: 'Only 8 left', 
        rating: 4.9,
        reviews: 310,
        colors: [
            { id: 'c1', name: 'Matte Black', hex: '#0a0a0a' }
        ],
        sizes: [
            { id: 's1', name: 'Standard 11oz', extra: 0, available: true }
        ],
        gallery: ['☕', '🔥', '✨', '🎁'],
        desc: 'The viral color-changing magic mug! Appears completely black when cold. Pour in a hot beverage and watch your custom design magically reveal itself.'
    }
];
