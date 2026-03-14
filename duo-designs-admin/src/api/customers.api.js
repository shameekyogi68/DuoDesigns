/** @file customers.api.js */
import api from './axios';

export const customersApi = {
  getAll: (params) => api.get('/customers', { params }),
  getById: (id) => api.get(`/customers/${id}`),
  getOrders: (id) => api.get(`/customers/${id}/orders`)
};
