---
title: API Overview
app: All
section: 04-api-reference
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# API Reference Overview

This section provides the exact technical specification for all Duo Designs API endpoints.

## 📡 Base URLs
- **Production**: `https://api.duodesigns.in/api`
- **Development**: `http://localhost:5000/api`

## 🔑 Authentication
Most endpoints require a **Bearer Token**. Include it in your headers like this:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

| Type | Permission Level |
|------|------------------|
| **Public** | No token required. |
| **Customer** | Requires valid `customer` role token. |
| **Admin** | Requires valid `admin` role token. |

---

## 📦 Request Format
- All `POST`, `PUT`, and `PATCH` requests must have `Content-Type: application/json`.
- Maximum request body size is **10MB** (primarily for design uploads).

---

## ✅ Response Format
The API follows a strict JSON response pattern:

### Success (2xx)
```json
{
  "success": true,
  "message": "Human readable message",
  "data": { ... }
}
```

### Error (4xx, 5xx)
```json
{
  "success": false,
  "message": "Specific error message",
  "errors": ["Field X is required"]
}
```

---
[Next: Authentication API](./auth.md)
