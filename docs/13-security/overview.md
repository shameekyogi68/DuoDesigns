---
title: Security Overview
app: All
section: 13-security
last-updated: 2025-03-14
maintained-by: Technical Architect
status: Current
---

# Security Architecture

Duo Designs follows a **Security-in-Depth** approach to protect customer data and financial transactions.

## 🛡️ Strategic Layers

1.  **Transport Layer**: Full SSL encryption for all data in transit via Cloudflare and Render.
2.  **Stateless Auth**: JWT-based authentication with expiration to prevent long-term session hijacking.
3.  **Sanitization**: Input filtering at the express middleware level to block common injection vectors.
4.  **Database Security**: Mongoose schemas enforce strict types, and MongoDB Atlas is IP-restricted.
5.  **Payment Honesty**: Cryptographic HMAC verification for all external payment notifications.

---
[Next: Authentication Security](./authentication-security.md) | [Next: Payment Security](./payment-security.md)
