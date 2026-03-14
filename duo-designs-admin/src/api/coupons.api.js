/** @file coupons.api.js */
import api from './axios';

export const couponsApi = {
  getAll: (params) => api.get('/coupons', { params }),
  create: (data) => api.post('/coupons', data),
  delete: (id) => api.delete(`/coupons/${id}`)
};
