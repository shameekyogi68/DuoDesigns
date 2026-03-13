---
title:        Auth API Reference
section:      06-api
last-updated: 2025-03-13
status:       Approved
---

# 🔐 Auth API Reference

Endpoints for managing user sessions and identity.

## 1. Send OTP
Request a 6-digit code to be sent via email.

- **Method:** `POST`
- **Path:** `/auth/send-otp`
- **Body:**
  ```json
  { "email": "customer@gmail.com" }
  ```
- **Success (200):**
  ```json
  { "success": true, "message": "OTP sent successfully" }
  ```

---

## 2. Verify OTP
Submit code to receive your JWT tokens.

- **Method:** `POST`
- **Path:** `/auth/verify-otp`
- **Body:**
  ```json
  { "email": "customer@gmail.com", "otp": "123456" }
  ```
- **Success (200):**
  ```json
  {
    "success": true,
    "data": {
      "user": { "name": "...", "role": "customer" },
      "accessToken": "ey...",
      "refreshToken": "ey..."
    }
  }
  ```

---

## 3. Refresh Token
Exchange your 30-day token for a new 15-minute access token.

- **Method:** `POST`
- **Path:** `/auth/refresh`
- **Body:**
  ```json
  { "refreshToken": "ey..." }
  ```
- **Success (200):** Returns new `accessToken`.

---

## 4. Logout
Invalidate the current session.

- **Method:** `POST`
- **Path:** `/auth/logout`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "refreshToken": "..." }`

---
[Home](../README.md)
