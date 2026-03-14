---
title: Security
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: Technical Architect
status: Current
---

# Backend Security

The Duo Designs backend is hardened against common web vulnerabilities.

## 🛡️ Applied Protections

1.  **Helmet.js**: Implements multiple security-related HTTP headers.
2.  **NoSQL Injection**: Using `express-mongo-sanitize` to strip `$` and `.` from user-supplied input.
3.  **XSS Protection**: Using `xss-clean` to sanitize user strings and prevent script injection.
4.  **Parameter Pollution**: Using `hpp` to prevent duplicate query parameter attacks.
5.  **Rate Limiting**: Applied via `express-rate-limit` to Auth routes to prevent automated brute-force attempts.
6.  **JWT**: All tokens are signed with a 64-character secret and verified on every protected request.

## 💳 Payment Security
The system uses **HMAC integrity verification** for all Razorpay payments. We never update an order status without verifying the cryptographic signature provided by Razorpay.

---
[Related: Authentication](./authentication.md) | [Related: Payment Flow](./payment-flow.md)
