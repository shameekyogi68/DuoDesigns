/** @file shipping.api.js */
import api from './axios';

export const shippingApi = {
  getAll: (params) => api.get('/shipping', { params }),
  create: (data) => api.post('/shipping', data),
  update: (id, data) => api.put(`/shipping/${id}`, data),
  delete: (id) => api.delete(`/shipping/${id}`),
  bulkImport: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/shipping/bulk-import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};
