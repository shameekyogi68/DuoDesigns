/** @file orders.api.js */
import api from './axios';

export const ordersApi = {
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  confirm: (id) => api.put(`/orders/${id}/confirm`),
  dispatch: (id, data) => api.put(`/orders/${id}/dispatch`, data),
  deliver: (id) => api.put(`/orders/${id}/deliver`),
  cancel: (id, data) => api.put(`/orders/${id}/cancel`, data),
  getInvoice: (id) => api.get(`/orders/${id}/invoice`, { responseType: 'blob' })
};
