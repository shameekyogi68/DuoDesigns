---
title:        API Integration Guide
section:      04-frontend
last-updated: 2025-03-13
maintained-by:Frontend Lead
status:       Approved
---

# 🔌 API Integration Guide

This document describes how to communicate with the Backend API securely and efficiently.

## 1. Axios Configuration (`src/services/api.js`)
We centralize all request logic in a customized Axios instance.

```javascript
import axios from 'axios';
import useAuthStore from '../store/authStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Request Interceptor: Inject JWT
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor: Handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Trigger logout or refresh token logic
        }
        return Promise.reject(error);
    }
);

export default api;
```

---

## 2. API Service Modules
Folder: `src/services/`

Each module handles a specific domain.
- `authService.js`: login, verifyOtp, getMe.
- `productService.js`: getAll, getById, search.
- `orderService.js`: placeOrder, getMyOrders, track.
- `paymentService.js`: createRzpOrder, verifyPayment.

---

## 3. Standard Response Format
Every call returns data in the following wrapper:
```javascript
{
  "success": true,
  "message": "Information string",
  "data": { ... } // Actual payload
}
```

---

## 4. Error Handling Pattern
Always use `try...catch` in your components or hooks to display meaningful UI toasts.

```javascript
const handleLogin = async (email) => {
    setLoading(true);
    try {
        await authService.sendOTP(email);
        toast.success("OTP Sent!");
        setStep(2);
    } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
};
```

---

## 🚀 Pro-Tip: React Hooks
We wrap most service calls in custom hooks (`src/hooks/`) that handle loading and error states automatic.
Example: `const { products, loading, error } = useProducts(queryParams);`

---
[Related: 06-api/overview.md](../06-api/overview.md) | [Home](../README.md)
