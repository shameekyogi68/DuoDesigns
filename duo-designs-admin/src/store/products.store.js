/** @file products.store.js */
import { create } from 'zustand';

export const useAdminProductsStore = create((set) => ({
  filters: {
    category: 'all',
    status: 'all',
    search: '',
  },
  setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  clearFilters: () => set({ filters: { category: 'all', status: 'all', search: '' } }),
}));
