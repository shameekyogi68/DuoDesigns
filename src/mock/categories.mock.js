/**
 * @file         categories.mock.js
 * @description  Mock data for product categories.
 *
 * @module       mock/categories
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

export const MOCK_CATEGORIES = [
    { 
        id: 'regular-tshirts', 
        name: 'Regular T-Shirts', 
        icon: '👕', 
        count: 8, 
        desc: 'Classic fit tees — perfect for everyday wear. 100% cotton, soft and breathable.', 
        color: '#0a0a0a' 
    },
    { 
        id: 'oversized', 
        name: 'Oversized', 
        icon: '🧥', 
        count: 6, 
        desc: 'Drop-shoulder, relaxed fit tees. 240 GSM premium cotton. Streetwear essential.', 
        color: '#1a1a2e' 
    },
    { 
        id: 'trackpants', 
        name: 'Trackpants', 
        icon: '👖', 
        count: 4, 
        desc: 'Comfy joggers & track pants with custom prints. Elastic waistband, tapered fit.', 
        color: '#16213e' 
    },
    { 
        id: 'mugs', 
        name: 'Mugs', 
        icon: '☕', 
        count: 5, 
        desc: 'Ceramic mugs with vibrant sublimation prints. Microwave & dishwasher safe.', 
        color: '#0f3460' 
    },
    { 
        id: 'keychains', 
        name: 'Keychains', 
        icon: '🔑', 
        count: 3, 
        desc: 'Acrylic & metal keychains with double-sided prints. UV-resistant coating.', 
        color: '#533483' 
    },
    { 
        id: 'hoodies', 
        name: 'Hoodies', 
        icon: '🧥', 
        count: 0, 
        desc: 'Premium hoodies with custom prints. Coming soon — join the waitlist!', 
        color: '#2c2c54', 
        comingSoon: true 
    }
];
