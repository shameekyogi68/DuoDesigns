---
title:        OTP Login Workflow
section:      04-frontend
last-updated: 2025-03-13
maintained-by:Frontend Lead
status:       Approved
---

# 🔑 OTP Login Workflow

Duo Designs uses a passwordless authentication system to maximize user conversion and security.

## 🛤️ Visual Flow

1. **Email Phase:** User sees a single input field asking for their email.
2. **Transition:** Click "SEND OTP" → CTA changes to "SENDING..." → OTP box appears on success.
3. **OTP Phase:** User sees six separate bordered input boxes.
4. **Resend Timer:** A "Resend in 01:59" label appears below the boxes.

---

## 🛠️ Technical Steps

### 1. Requesting the Code
Frontend calls `POST /api/auth/send-otp`.
- **Param:** `{ "email": "user@example.com" }`
- **Frontend Logic:**
  - Start a 2-minute timer for the "Resend" button.
  - Automatically focus the first OTP input box.

### 2. The 6-Box Input Component
We use a specialized component (`src/components/auth/OTPInput.jsx`) that handles:
- **Auto-Advance:** Moving focus to box #2 after box #1 is filled.
- **Backspace Behavior:** Moving focus back when a digit is deleted.
- **Paste Event:** Distributing a pasted 6-digit number across all 6 boxes.

### 3. Verifying the Code
Once box #6 is filled, the frontend calls `POST /api/auth/verify-otp`.
- **Params:** `{ "email": "...", "otp": "123456" }`
- **On Success:** 
  - Save `token` and `user` to `authStore`.
  - Show "LOGIN SUCCESSFUL" toast.
  - Redirect to the `redirect` query param or `/`.

---

## 🕒 Resend Logic
- Users must wait **120 seconds** before clicking resend.
- After 3 resend attempts, the frontend should temporarily disable the button and show a "Please wait 10 minutes" message.

## ⚠️ Edge Case Handling
- **Wrong OTP:** Show red error pulse on the boxes and clear them.
- **Expired OTP:** Clear boxes and show "Session Expired. Request a new OTP."
- **Rate Limited:** If backend returns 429, show "Too many attempts. Account locked for 1 hour."

---
[Related: 05-backend/authentication.md](../05-backend/authentication.md) | [Home](../README.md)
