---
title: Authentication API
app: All
section: 04-api-reference
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Authentication API

Endpoints for managing user login, OTPs, and profile data.

## 🔓 Public Endpoints

### `POST /auth/send-otp`
Sends a 6-digit OTP to the user's email.
- **Body**: `{ "email": "string" }`
- **Response**: `200 Success`

### `POST /auth/verify-otp`
Verifies OTP and returns login tokens.
- **Body**: `{ "email": "string", "otp": "string" }`
- **Success Response**:
  ```json
  {
    "success": true,
    "data": {
      "token": "JWT_ACCESS_TOKEN",
      "refreshToken": "JWT_REFRESH_TOKEN",
      "user": { "id": "...", "name": "...", "role": "..." }
    }
  }
  ```

---

## 🔒 Protected Endpoints (Bearer Required)

### `GET /auth/me`
Returns the current authenticated user's profile.

### `PUT /auth/profile`
Updates user name or phone.
- **Body**: `{ "name": "string", "phone": "string" }`

### `POST /auth/address`
Adds a new shipping address.
- **Body**: `{ "name": "string", "phone": "string", "line1": "string", "city": "string", "state": "string", "pincode": "string" }`

---
[Related: Authentication Flow](../03-backend/authentication.md)
