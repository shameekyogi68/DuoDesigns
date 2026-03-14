/** @file auth.api.js */
import api from './axios';

export const authApi = {
  sendOTP: (email) => api.post('/auth/send-otp', { email }),
  verifyOTP: (email, otp) => api.post('/auth/verify-otp', { email, otp }),
  refreshToken: (token) => api.post('/auth/refresh-token', { token }),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me')
};
