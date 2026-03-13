/**
 * @file         wishlistStore.js
 * @description  Global wishlist state management for Duo Designs.
 *               Allows users to save favorite products across sessions.
 *
 * @module       store/wishlistStore
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-11
 *
 * @dependencies
 *   - zustand (create)
 *   - zustand/middleware (persist)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * @store wishlistStore
 * @description Global wishlist state using Zustand.
 *              Persisted to localStorage as 'duo-wishlist-storage'.
 *
 * @state {string[]} items          - Array of product IDs marked as favorite
 *
 * @action toggleItem(productId)    - Adds or removes a product from wishlist
 * @action clearWishlist()          - Resets the wishlist to an empty state
 * @computed isInWishlist(productId)- Checks if a specific ID exists in items
 */
export const useWishlistStore = create(
    persist(
        (set, get) => ({
            items: [],

            toggleItem: (productId) => set((state) => {
                const isSaved = state.items.includes(productId);
                if (isSaved) {
                    return { items: state.items.filter(id => id !== productId) };
                } else {
                    return { items: [...state.items, productId] };
                }
            }),

            isInWishlist: (productId) => {
                return get().items.includes(productId);
            },

            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'duo-wishlist-storage',
        }
    )
);
