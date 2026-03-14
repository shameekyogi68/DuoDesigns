---
title: API Integration
app: Customer App
section: 05-customer-app
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# API Integration (Axios)

The frontend communicates with the backend via a centralized Axios instance.

## 🛠️ The Instance
Located in `src/api/axios.js`.

### Features
1. **Base URL**: Automatically prefixed using `import.meta.env.VITE_API_URL`.
2. **Request Interceptor**: Synchronously attaches the Bearer token from `authStore` to every outbound request.
3. **Response Interceptor**: Automatically handles `401 Unauthorized` errors by clearing the local session and redirecting to login.

## 📡 Usage Pattern
We use **React Query (TanStack Query)** alongside Axios for caching and data synchronisation.

```javascript
/* Example: Fetching Products */
export const useProducts = (query) => {
  return useQuery({
    queryKey: ['products', query],
    queryFn: () => axios.get('/products', { params: query })
  });
};
```

---
[Related: API Reference Overview](../04-api-reference/overview.md) | [Related: State Management](./state-management.md)
