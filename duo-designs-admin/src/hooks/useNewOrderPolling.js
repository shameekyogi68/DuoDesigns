/** @file useNewOrderPolling.js */
import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/api/orders.api';
import { useAdminUIStore } from '@/store/ui.store';
import toast from 'react-hot-toast';

/**
 * @hook useNewOrderPolling
 * @description Polls for new orders and triggers notifications
 */
export const useNewOrderPolling = (interval = 30000) => {
  const queryClient = useQueryClient();
  const { setUnreadOrdersCount } = useAdminUIStore();
  const prevCount = useRef(0);

  useEffect(() => {
    const poll = async () => {
      try {
        const data = await ordersApi.getAll({ status: 'placed', limit: 1 });
        const currentCount = data.total;

        if (currentCount > prevCount.current && prevCount.current !== 0) {
          toast.success('New Order Received!', {
            icon: '📦',
            duration: 5000,
          });
          // Play notification sound here if needed
          queryClient.invalidateQueries(['orders']);
        }

        setUnreadOrdersCount(currentCount);
        prevCount.current = currentCount;
      } catch (err) {
        console.error('Polling error:', err);
      }
    };

    poll(); // Initial check
    const id = setInterval(poll, interval);
    return () => clearInterval(id);
  }, [queryClient, setUnreadOrdersCount, interval]);
};
