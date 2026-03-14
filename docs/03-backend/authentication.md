---
title: Authentication
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Authentication

Duo Designs uses **JWT (JSON Web Tokens)** for stateless authentication.

## 👤 Customer Login (OTP-based)
The customer app uses a passwordless flow to maximize conversion.
1. `POST /api/auth/send-otp`: Sends a 6-digit code to the user's email.
2. `POST /api/auth/verify-otp`: Validates the code and returns a Bearer Token.

## 🔒 Admin Login
Admin access uses standard credential-based login.
- **Username**: Stored in `User.model.js` with `role: 'admin'`.
- **Password**: Hashed using `bcryptjs`.

## 🛡️ Protecting Routes
To protect an endpoint, add the `protect` middleware:

```javascript
const { protect } = require('../middleware/auth.middleware');

router.get('/my-orders', protect, orderController.getMyOrders);
```

### Authorization Header
The frontend must include the token in every request:
`Authorization: Bearer <your_jwt_token>`

## ⌛ Token Specs
- **Algorithm**: HS256
- **Expiry**: 7 Days (Configurable in `auth.controller.js`)

---
[Related: User Roles](../01-project/user-roles.md) | [Related: Security Overview](../13-security/overview.md)
