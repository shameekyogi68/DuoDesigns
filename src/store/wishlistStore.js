import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
