/** @file useOrders.js */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/api';
import { useAdminOrdersStore } from '@/store/orders.store';
import toast from 'react-hot-toast';

export const useOrders = () => {
  const filters = useAdminOrdersStore((state) => state.filters);
  
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: async () => {
      const { data } = await ordersApi.getAll(filters);
      return data.data;
    },
  });
};

export const useOrder = (id) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data } = await ordersApi.getById(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  const confirm = useMutation({
    mutationFn: (id) => ordersApi.confirm(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order confirmed successfully');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to confirm order'),
  });

  const dispatch = useMutation({
    mutationFn: ({ id, payload }) => ordersApi.dispatch(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order dispatched successfully');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to dispatch order'),
  });

  const deliver = useMutation({
    mutationFn: (id) => ordersApi.deliver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order marked as delivered');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update order status'),
  });

  return { confirm, dispatch, deliver };
};
