/** @file useProducts.js */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '@/api';
import { useAdminProductsStore } from '@/store/products.store';
import toast from 'react-hot-toast';

export const useProducts = () => {
  const filters = useAdminProductsStore((state) => state.filters);
  
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const { data } = await productsApi.getAll(filters);
      return data.data;
    },
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await productsApi.getById(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => productsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create product'),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => productsApi.update(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      toast.success('Product updated successfully');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update product'),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => productsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deactivated successfully');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to deactivate product'),
  });
};
