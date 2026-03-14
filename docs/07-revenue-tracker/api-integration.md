---
title: API Integration
app: Revenue Tracker
section: 07-revenue-tracker
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# API Integration & Authentication

The Revenue Tracker shares the same core backend as the Storefront.

## 🔐 Auth Logic
Unlike the storefront (OTP), the agency users log in with a **Username/Password** provided during onboarding.
- **Role**: `agency`
- **Scope**: The token issued only allows access to `/api/partners/*` endpoints. Attempts to reach `/api/admin/*` will result in a `403 Forbidden`.

## 📡 Data Fetching
Used **TanStack Query** for all remote data.
```javascript
// Example: Getting Monthly Stats
const { data, isLoading } = useQuery({
  queryKey: ['partner-stats'],
  queryFn: () => axios.get('/partners/config/summary')
});
```

---
[Related: Authentication Flow](../03-backend/authentication.md) | [Related: Partners API](../04-api-reference/partners.md)
