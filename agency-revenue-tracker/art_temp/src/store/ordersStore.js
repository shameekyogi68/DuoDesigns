import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ordersApi } from '@/api/orders.api';
import { calculateAllTimeStats } from '@/utils/commission';

export const useOrdersStore = create(
  persist(
    (set, get) => ({
      orders: [],
      lastSyncedAt: null,
      isSyncing: false,
      syncError: null,
      
      // Local tracking for payment statuses (paid/pending)
      // Keyed by monthKey "yyyy-MM"
      monthlyPaymentStatus: {},
      
      adminToken: localStorage.getItem('art_admin_token') || '',
      commissionRate: 0.05,

      setAdminToken: (token) => {
        localStorage.setItem('art_admin_token', token);
        set({ adminToken: token });
      },

      setCommissionRate: (rate) => {
        set({ commissionRate: rate });
      },

      syncOrders: async () => {
        set({ isSyncing: true, syncError: null });
        try {
          const data = await ordersApi.getAllPaidOrders();
          const syncedOrders = data.data?.orders || [];
          set({ 
            orders: syncedOrders, 
            lastSyncedAt: new Date().toISOString(),
            isSyncing: false 
          });
        } catch (error) {
          set({ 
            syncError: error.message || 'Failed to sync orders',
            isSyncing: false 
          });
        }
      },

      togglePaymentStatus: (monthKey) => {
        const current = get().monthlyPaymentStatus[monthKey] || 'pending';
        const newStatus = current === 'paid' ? 'pending' : 'paid';
        set((state) => ({
          monthlyPaymentStatus: {
            ...state.monthlyPaymentStatus,
            [monthKey]: newStatus
          }
        }));
      },

      getStats: () => {
        const { orders, commissionRate, monthlyPaymentStatus } = get();
        return calculateAllTimeStats(orders, commissionRate, monthlyPaymentStatus);
      }
    }),
    {
      name: 'art_orders_storage',
      partialize: (state) => ({ 
        orders: state.orders, 
        lastSyncedAt: state.lastSyncedAt,
        monthlyPaymentStatus: state.monthlyPaymentStatus,
        commissionRate: state.commissionRate
      }),
    }
  )
);
