---
title:        API Documentation Overview
section:      06-api
last-updated: 2025-03-13
maintained-by:Backend Lead
status:       Approved
---

# 🚀 API Documentation Overview

Duo Designs follows **RESTful conventions** for all endpoints.

## 🔗 Base URLs
- **Development:** `http://localhost:5000/api`
- **Production:** `https://api.duodesigns.in/api`

---

## 🏗️ Standards

### 1. HTTP Methods
- `GET`: Fetch data.
- `POST`: Create a resource (Orders, Users, Uploads).
- `PATCH`: Partially update a resource (Stock, Status).
- `DELETE`: Remove a resource (Admin only).

### 2. Header Conventions
All authenticated requests must include the JWT:
`Authorization: Bearer <your_jwt_token>`

### 3. Response Structure
```json
{
  "success": true,
  "message": "Human readable message",
  "data": { ... payload ... }
}
```

### 4. Errors
```json
{
  "success": false,
  "message": "Specific error message",
  "errors": [ { "field": "email", "msg": "Invalid format" } ]
}
```

---

## 🚦 Endpoint Categories

| Section | Purpose |
| :--- | :--- |
| **[Auth](./auth.md)** | OTP sending, verification, refresh tokens. |
| **[Products](./products.md)** | Catalog access and search. |
| **[Orders](./orders.md)** | Lifecycle from placement to completion. |
| **[Payments](./payments.md)** | Razorpay order creation and signature verification. |
| **[Admin](./admin.md)** | Protected dashboard analytics and management. |

---

## 📦 Postman Collection
A public workspace containing pre-configured requests is available at:
`[Link to Postman Workspace]`

---
[Related: 05-backend/architecture.md](../05-backend/architecture.md) | [Home](../README.md)
