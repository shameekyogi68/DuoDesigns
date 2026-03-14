import { useEffect } from 'react';
import { useOrdersStore } from '@/store/ordersStore';
import { SYNC_INTERVAL } from '@/constants/app';

export const useAutoSync = () => {
  const { syncOrders, isLoggedIn } = useOrdersStore();

  useEffect(() => {
    // Initial sync
    syncOrders();

    // Setup interval
    const interval = setInterval(() => {
      syncOrders();
    }, SYNC_INTERVAL);

    return () => clearInterval(interval);
  }, []);
};
