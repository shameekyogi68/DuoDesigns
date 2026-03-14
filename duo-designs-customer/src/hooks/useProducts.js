/**
 * @file         useProducts.js
 * @description  Hook for fetching and filtering product data.
 *
 * @module       hooks/useProducts
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import { useQuery } from '@tanstack/react-query';
import { MOCK_PRODUCTS } from '../mock/products.mock';

export const useProducts = (category = null) => {
    return useQuery({
        queryKey: ['products', category],
        queryFn: async () => {
            // Simulate network delay
            await new Promise(r => setTimeout(r, 600));
            if (category) {
                return MOCK_PRODUCTS.filter(p => p.cat === category);
            }
            return MOCK_PRODUCTS;
        }
    });
};
