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
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error('Admin API token expired or invalid. Please check settings.');
    } else if (!error.response) {
      toast.error('Cannot reach Duo Designs API server.');
    }
    return Promise.reject(error);
  }
);

export default api;
