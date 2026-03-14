/** @file payments.api.js */
import api from './axios';

export const paymentsApi = {
  getAll: (params) => api.get('/payments', { params }),
  getGSTReport: (month, year) => api.get('/admin/reports/gst', { 
    params: { month, year },
    responseType: 'blob' 
  })
};
