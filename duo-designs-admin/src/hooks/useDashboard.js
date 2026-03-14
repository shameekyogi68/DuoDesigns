/** @file useDashboard.js */
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/api';
import { POLL_INTERVAL_DASHBOARD } from '@/constants/app';

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const { data } = await dashboardApi.getStats();
      return data.data;
    },
    refetchInterval: POLL_INTERVAL_DASHBOARD,
  });
};
