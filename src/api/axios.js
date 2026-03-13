/**
 * @file         axios.js
 * @description  Configured Axios instance for API communication.
 *               Includes request/response interceptors for JWT handling
 *               and automatic session expiration logic.
 *
 * @module       api/axios
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - axios
 *   - store/authStore (useAuthStore)
 *
 * @notes
 *   - Base URL defaults to http://localhost:5000/api if VITE_API_URL is missing.
 *   - Intercepts 401 errors to trigger global logout.
 */

import axios from 'axios';
import { useAuthStore } from '../store/authStore';

/**
 * @instance axiosInstance
 * @description Singleton Axios instance shared across the application.
 */

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach JWT token if it exists
instance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle 401 Unauthorized
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear token and logout
            useAuthStore.getState().logout();
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
