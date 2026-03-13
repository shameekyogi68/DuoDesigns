---
title:        Authentication (JWT & OTP)
section:      05-backend
last-updated: 2025-03-13
maintained-by:Backend Lead
status:       Approved
---

# 🔐 Authentication (JWT & OTP)

Duo Designs uses a passwordless session-based authentication system using JSON Web Tokens (JWT) and Email One-Time-Passcodes (OTP).

## 🚆 The Core Protocol

### 1. Verification Phase
- **Endpoint:** `POST /api/auth/send-otp`
- **Logic:**
  - Generate a secure 6-digit number using `crypto`.
  - Save the hash and `expiresAt` (10 min) to the `User` document.
  - Trigger `emailService.sendOTP()`.

### 2. Issuance Phase
- **Endpoint:** `POST /api/auth/verify-otp`
- **Logic:**
  - Validate the digits against the stored hash.
  - Check for expiry and max attempts (3).
  - On Success: Create an **Access Token** and a **Refresh Token**.

---

## 🎟️ Token Strategy

### Access Token
- **Secret:** `process.env.JWT_SECRET`
- **Expiry:** `15 minutes`
- **Stored:** Passed in the `Authorization: Bearer <token>` header on every request.

### Refresh Token
- **Secret:** `process.env.JWT_SECRET` (can be different).
- **Expiry:** `30 days`
- **Stored:** Saved in the `refreshTokens` array in the `User` model.
- **Usage:** Allows the frontend to request a new Access Token without the user needing to request a new OTP.

---

## 🛡️ Security Measures

### Rate Limiting
We use `express-rate-limit` on all auth routes:
- **Send OTP:** Max 5 requests per 10 minutes per IP.
- **Verify OTP:** Max 10 requests per 10 minutes per IP.

### Request Blockage
- If a user enters the wrong OTP 3 times in a row, the OTP is invalidated and the user must request a new one.

### Refresh Token Revocation
- When a user clicks **Logout**, the specific refresh token is removed from the `User.refreshTokens` array in the database, correctly invalidating the session across all devices.

## 👥 Roles
The JWT payload includes the `role`:
- `customer`: Standard access.
- `admin`: Full platform access (triggered via `adminMiddleware`).

---
[Related: 04-frontend/otp-flow.md](../04-frontend/otp-flow.md) | [Home](../README.md)
