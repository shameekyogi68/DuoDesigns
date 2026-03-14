---
title: OTP & Login Flow
app: Customer App
section: 05-customer-app
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# OTP & Login Flow (UI)

The storefront implements a two-step seamless login experience.

## Step 1: Request OTP
- **Endpoint**: `POST /auth/send-otp`
- **Component**: `Login.jsx` (Email Step)
- **UI Logic**: Validates email format before allowing the "Send OTP" click. Upon success, shifts the view to the 6-digit input.

## Step 2: Verification
- **Endpoint**: `POST /auth/verify-otp`
- **Component**: `Login.jsx` (OTP Step)
- **UI Logic**: 
  - Automatically moves cursor to next input on digit entry.
  - Shows "Resend OTP" link after 60 seconds (Client-side timer).
  - Handles `400 Error` (Invalid OTP) by clearing the inputs and showing a red error toast.

## Post-Login handled in `authStore`
```javascript
const handleVerify = async (otp) => {
  const { token, user } = await verifyOTP(email, otp);
  authStore.setAuth(user, token);
  navigate(-1); // Go back to where the user was
}
```

---
[Related: Authentication Flow](../03-backend/authentication.md) | [Related: API Integration](./api-integration.md)
