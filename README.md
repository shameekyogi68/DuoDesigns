# 🚀 Duo Designs (Monorepo)

Premium street-wear custom-print e-commerce platform for India.

## 🏗️ Project Architecture (4 Modules)

All modules are completely independent and share a single Git repository for easier management and deployment.

### 1. [duo-designs-customer](./duo-designs-customer)
The main e-commerce storefront.
- **URL:** `duodesigns.in` (Production)
- **Stack:** React 19 + Vite + Vanilla CSS.

### 2. [duo-designs-admin](./duo-designs-admin)
Internal dashboard for orders, products, and inventory management.
- **URL:** `admin.duodesigns.in` (Production)
- **Stack:** React + Vite + Vanilla CSS.

### 3. [agency-revenue-tracker](./agency-revenue-tracker)
B2B portal for tracking agency sales and partner commissions.
- **URL:** `tracker.youragency.com` (Production)
- **Stack:** React + Vite.

### 4. [backend](./backend)
Combined API engine serving all three frontend applications.
- **URL:** `api.duodesigns.in` (Production)
- **Stack:** Node.js + Express + MongoDB.

---

## 🛠️ Quick Start

### Development
Each app runs on its own port.
- **Frontend (Customer):** `cd duo-designs-customer && npm install && npm run dev`
- **Frontend (Admin):** `cd duo-designs-admin && npm install && npm run dev`
- **Frontend (Tracker):** `cd agency-revenue-tracker && npm install && npm run dev`
- **Backend:** `cd backend && npm install && npm run dev`

### Production Deployment
- **Frontends:** Linked to Vercel with their respective **Root Directory** settings.
- **Backend:** Linked to Render via `render.yaml` Blueprint.

---

## 📖 Documentation
Detailed business rules, tax logic, and API specs can be found in the `docs/` folder.

---
© 2025 Duo Designs Dev Team
