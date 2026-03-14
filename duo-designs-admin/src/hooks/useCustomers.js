/** @file useCustomers.js */
import { useQuery } from '@tanstack/react-query';
import { customersApi } from '@/api';

export const useCustomers = (filters) => {
  return useQuery({
    queryKey: ['customers', filters],
    queryFn: async () => {
      const { data } = await customersApi.getAll(filters);
      return data.data;
    },
  });
};

export const useCustomer = (id) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      const { data } = await customersApi.getById(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCustomerOrders = (id) => {
  return useQuery({
    queryKey: ['customerOrders', id],
    queryFn: async () => {
      const { data } = await customersApi.getOrders(id);
      return data.data;
    },
    enabled: !!id,
  });
};
