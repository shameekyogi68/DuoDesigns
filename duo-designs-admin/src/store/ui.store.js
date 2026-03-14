/** @file ui.store.js */
import { create } from 'zustand';

export const useAdminUIStore = create((set) => ({
  sidebarOpen: window.innerWidth > 768,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
  
  unreadOrdersCount: 0,
  setUnreadOrdersCount: (count) => set({ unreadOrdersCount: count }),
  incrementUnreadOrders: () => set((state) => ({ unreadOrdersCount: state.unreadOrdersCount + 1 })),
  
  notificationsEnabled: true,
  toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
}));
