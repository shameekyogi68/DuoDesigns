/** @file orders.store.js */
import { create } from 'zustand';

export const useAdminOrdersStore = create((set) => ({
  filters: {
    status: 'all',
    search: '',
    startDate: null,
    endDate: null,
  },
  setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  clearFilters: () => set({ filters: { status: 'all', search: '', startDate: null, endDate: null } }),
  
  selectedOrderId: null,
  setSelectedOrderId: (id) => set({ selectedOrderId: id }),
}));
