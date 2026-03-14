/** @file dashboard.api.js */
import api from './axios';

export const dashboardApi = {
  getStats: () => api.get('/admin/dashboard')
};
