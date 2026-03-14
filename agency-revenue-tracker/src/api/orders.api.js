import api from './axios';

export const ordersApi = {
  // We want all orders that are completed/delivered for revenue tracking
  getAllPaidOrders: async () => {
    const response = await api.get('/orders', {
      params: { 
        status: 'delivered', // Only track delivered orders as actual revenue
        limit: 1000 // Pull a large set initially for history
      }
    });
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  }
};
