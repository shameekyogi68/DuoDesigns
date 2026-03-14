---
title: Payment & Data Protection
app: All
section: 13-security
last-updated: 2025-03-14
maintained-by: Technical Architect
status: Current
---

# Payment & Data Protection

## 💳 Payment Integrity
Duo Designs **never** stores card numbers. All sensitive payment details are handled by Razorpay's PCI-DSS compliant environment.
- **Backend Role**: We only store the `razorpay_payment_id` for auditing and refund purposes.
- **Verification**: Our `verify` service computes a local hash of the response using our `RAZORPAY_KEY_SECRET` and compares it to the `razorpay_signature` provided by the client. If they don't match, the order is blocked.

## 📁 Data Privacy
- **User PII**: Personal Identifying Information (Email, Phone) is only accessible to `admin` roles and the user themselves.
- **Images**: Customer designs are stored in a non-public folder on Cloudinary to prevent scraping.
- **Backups**: MongoDB Atlas provides automated daily backups with point-in-time recovery.

---
[Related: Payment Flow](../03-backend/payment-flow.md) | [Related: Tech Stack](../02-architecture/tech-stack.md)
