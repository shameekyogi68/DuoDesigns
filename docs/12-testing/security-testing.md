---
title: Security & Performance
app: All
section: 12-testing
last-updated: 2025-03-14
maintained-by: Lead Architect
status: Current
---

# Security & Performance Testing

## 🛡️ Security Sanity Checks
- **Unauthorized API**: Use curl to hit `/api/admin/dashboard` without a token. Expect `401`.
- **Injection**: Try to enter `{"$gt": ""}` in the OTP login field. Verify `mongo-sanitize` strips it.
- **XSS**: Try to set a delivery address name to `<script>alert(1)</script>`. Verify user profile view sanitizes the display.

## 🚀 Performance Benchmarks
- **Lighthouse**: Maintain a score of **90+** on Mobile for the Homepage.
- **API Latency**: Average response for `GET /api/products` should be **<150ms**.
- **Payload**: Product images must be compressed (WebP) with a target size of **<150KB** per thumbnail.

---
[Related: Tech Stack](../02-architecture/tech-stack.md) | [Related: Security Overview](../13-security/overview.md)
