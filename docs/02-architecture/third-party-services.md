---
title: Third Party Services
app: All
section: 02-architecture
last-updated: 2025-03-14
maintained-by: DevOps Engineer
status: Current
---

# Third Party Services

The platform offloads specialized tasks to established industry providers to ensure security and speed.

## 1. Razorpay (Payments)
- **Role**: Handles all credit card, UPI, and net banking transactions.
- **Why**: PCI-DSS compliance and high success rates in India.
- **Integration**: Backend creates order → Frontend shows popup → Backend verifies signature via Webhook.

## 2. Cloudinary (Media)
- **Role**: Storage and on-the-fly optimization for product images and customer design uploads.
- **Why**: Handles resizing and format conversion (e.g., WebP) automatically.
- **Integration**: Node-Cloudinary SDK in the backend uploads buffer and returns persistent URL.

## 3. MongoDB Atlas (Data)
- **Role**: Cloud-hosted document database.
- **Why**: Fully managed, auto-backups, and zero-downtime scaling.

## 4. Gmail SMTP (Email)
- **Role**: Delivering OTPs, Order Confirmations, and Shipping Alerts.
- **Why**: Reliable delivery when configured with an App Password.

## 5. Cloudflare (DNS & Proxy)
- **Role**: Domain management, SSL termination, and DDoS protection.
- **Why**: Fastest DNS in the world and free standard security.

---
[Related: Tech Stack](./tech-stack.md) | [Related: Razorpay Setup](../09-deployment/razorpay-setup.md)
