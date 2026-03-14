---
title: Documentation Home
app: All
section: Root
last-updated: 2025-03-14
maintained-by: Technical Architect
status: Current
---

# 🚀 Duo Designs Documentation

Welcome to the official documentation for the **Duo Designs** platform. This is a comprehensive guide covering every aspect of the project, from business rules to technical implementation and deployment.

## 🌟 Quick Start by Role

Choose your role to get started with the most relevant guides:

- **I am a Backend Developer** → [Backend Getting Started](./03-backend/getting-started.md)
- **I am a Frontend Developer** → [Customer App Guide](./05-customer-app/getting-started.md) or [Admin Panel Guide](./06-admin-panel/getting-started.md)
- **I am setting up Deployment** → [Deployment Overview](./09-deployment/overview.md)
- **I am a QA Tester** → [Manual Test Cases](./12-testing/manual-test-cases.md)
- **I am the Project Manager** → [Project Overview](./01-project/overview.md)

---

## 🗺️ Documentation Map

### [01 Project Overview](./01-project/overview.md)
Strategic and business-level documentation.
- Business Rules, Pricing Rules, User Roles.

### [02 Architecture](./02-architecture/system-overview.md)
High-level system design and monorepo structure.
- Tech Stack, Data Flow, Environment Variables.

### [03 Backend API](./03-backend/getting-started.md)
Node.js/Express server documentation.
- Database Schemas, GST Logic, Payment Verification.

### [04 API Reference](./04-api-reference/overview.md)
Complete endpoint-by-endpoint technical reference.

### [05 Customer App](./05-customer-app/getting-started.md)
React storefront documentation.
- Cart Flow, Checkout, Custom Design Uploads.

### [06 Admin Panel](./06-admin-panel/getting-started.md)
Internal tool for operations and inventory.

### [07 Revenue Tracker](./07-revenue-tracker/overview.md)
B2B portal for agency sales tracking.

### [08 Design System](./08-design-system/overview.md)
UI/UX standards, colors, and components.

### [09 Deployment](./09-deployment/overview.md)
Infrastructure and "Go-Live" instructions.

### [10 Workflows](./10-workflows/git-workflow.md)
Development processes and Git standards.

---

## 🛠️ Tech Stack at a Glance

| Layer | Technology |
|-------|------------|
| **Backend** | Node.js, Express, MongoDB Atlas |
| **Frontend** | React 19, Vite, Zustand, Vanilla CSS |
| **Payments** | Razorpay (India) |
| **Images** | Cloudinary |
| **Email** | Gmail SMTP (Nodemailer) |
| **Hosting** | Vercel (Frontends), Render (Backend) |

## 📦 Repository Structure
The project is organized as a **Monorepo**:
- `/duo-designs-customer`: The main storefront.
- `/duo-designs-admin`: The management dashboard.
- `/agency-revenue-tracker`: The partner portal.
- `/backend`: The shared API engine.

---
**Last Updated:** 2025-03-14 | **Version:** 1.0.0
