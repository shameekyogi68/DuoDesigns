/** @file partners.api.js */
import api from './axios';

export const partnersApi = {
  getAll: (params) => api.get('/partners', { params }),
  create: (data) => api.post('/partners', data),
  markPaid: (id) => api.put(`/partners/${id}/pay`),
  delete: (id) => api.delete(`/partners/${id}`),
  getSummary: () => api.get('/partners/summary')
};
