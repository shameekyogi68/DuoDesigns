import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_DUO_API_URL || 'http://localhost:5000/api',
});

// Interceptor to attach token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('art_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Interceptor for errors
let lastToastTime = 0;
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const now = Date.now();
    if (now - lastToastTime > 5000) { // Only toast every 5 seconds
      if (error.response?.status === 401) {
        toast.error('Admin API token expired or invalid.');
      } else if (!error.response) {
        console.warn('API Offline: Falling back to local high-fidelity mock data.');
        toast.error('Duo API Server Offline. Displaying Cached Vault.', { icon: '🛡️' });
      }
      lastToastTime = now;
    }
    return Promise.reject(error);
  }
);

export default api;
