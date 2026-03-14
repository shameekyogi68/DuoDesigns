---
title: Email System
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Email System

The backend sends all transactional emails using **Nodemailer** through a Gmail SMTP relay.

## 📧 Service Setup
The logic is located in `src/services/email.service.js`.

### Configuration (Required in `.env`)
- `GMAIL_USER`: The sender address.
- `GMAIL_PASS`: Google App Password (not the normal password).

## ✨ Email Templates
The system supports the following automated emails:
1.  **OTP Verification**: Sent during login.
2.  **Order Confirmation**: Sent as soon as `payment.status` becomes `paid`.
3.  **Order Dispatched**: Sent when an admin enters tracking info.
4.  **Order Delivered**: Sent when an admin marks an order as delivered.

## 💡 Best Practice
In production, we use a structured log transport (`winston`) to track email delivery success and failures. Look for `Email sent successfully` in `logs/combined.log`.

---
[Related: Authentication](./authentication.md) | [Related: Gmail Setup](../09-deployment/gmail-smtp.md)
