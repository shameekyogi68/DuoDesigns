---
title: API Overview
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# API Overview

All three Duo Designs frontends communicate with this API using a consistent JSON structure.

## 📡 Base Endpoint
- **Local**: `http://localhost:5000/api`
- **Production**: `https://api.duodesigns.in/api`

## 📦 Request / Response Standard
The system uses a standardized response utility (`src/utils/apiResponse.js`).

### Success Response
```json
{
  "success": true,
  "message": "Action completed",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional array of validation errors
}
```

## 🛡️ Security Layers
1. **CORS**: Restricted to `allowedOrigins` (Customer, Admin, and Local dev URLs).
2. **Helmet**: Sets various HTTP headers for security.
3. **Mongo Sanitize**: Prevents NoSQL injection attacks.
4. **HPP**: Detects and prevents HTTP Parameter Pollution.
5. **Rate Limiting**: Applied to Auth routes to prevent brute-force attacks.

---
[Related: Authentication](./authentication.md) | [Related: API Reference](../04-api-reference/overview.md)
