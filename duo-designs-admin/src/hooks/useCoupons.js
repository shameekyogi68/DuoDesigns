/** @file useCoupons.js */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { couponsApi } from '@/api';
import toast from 'react-hot-toast';

export const useCoupons = (filters) => {
  return useQuery({
    queryKey: ['coupons', filters],
    queryFn: async () => {
      const { data } = await couponsApi.getAll(filters);
      return data.data;
    },
  });
};

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => couponsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      toast.success('Coupon created successfully');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create coupon'),
  });
};

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => couponsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      toast.success('Coupon deactivated successfully');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to deactivate coupon'),
  });
};
