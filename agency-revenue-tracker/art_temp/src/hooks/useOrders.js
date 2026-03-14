import { useQuery } from '@tanstack/react-query';
import { useOrdersStore } from '@/store/ordersStore';

export const useOrders = () => {
  const { orders, syncOrders, isSyncing, lastSyncedAt } = useOrdersStore();

  return {
    orders,
    isLoading: isSyncing && orders.length === 0,
    isRefetching: isSyncing,
    lastSyncedAt,
    refetch: syncOrders
  };
};

export const useStats = () => {
  const { getStats } = useOrdersStore();
  return getStats();
};
