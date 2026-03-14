/** @file axios.js — Configured Axios instance with JWT interceptors */
import axios from 'axios';
import { API_URL } from '@/constants/app';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('duo-admin-auth');
  if (raw) {
    try {
      const { state } = JSON.parse(raw);
      if (state?.token) config.headers.Authorization = `Bearer ${state.token}`;
    } catch (e) { /* skip */ }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('duo-admin-auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
