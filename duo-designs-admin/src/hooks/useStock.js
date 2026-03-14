/** @file useStock.js */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '@/api';
import toast from 'react-hot-toast';

export const useLowStock = () => {
  return useQuery({
    queryKey: ['lowStock'],
    queryFn: async () => {
      const { data } = await productsApi.getLowStock();
      return data.data;
    },
  });
};

export const useUpdateStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => productsApi.updateStock(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      queryClient.invalidateQueries({ queryKey: ['lowStock'] });
      toast.success('Stock updated');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update stock'),
  });
};
