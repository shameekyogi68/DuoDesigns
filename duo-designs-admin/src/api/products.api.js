/** @file products.api.js */
import api from './axios';

export const productsApi = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  updateStock: (id, data) => api.put(`/products/${id}/stock`, data),
  bulkUpdateStock: (data) => api.put('/products/stock/bulk', data),
  getLowStock: () => api.get('/products/low-stock')
};
