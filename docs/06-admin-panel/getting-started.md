---
title: Getting Started
app: Admin Panel
section: 06-admin-panel
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Admin Panel: Getting Started

The Admin Panel is a secure, internal dashboard for managing orders, inventory, and business operations.

## 📋 Prerequisites
- **Node.js**: v20 or higher
- **npm**: v10 or higher
- **Backend**: Live Duo Designs API access

## 🛠️ Step-by-Step Setup

### 1. Identify the folder
From the monorepo root:
```bash
cd duo-designs-admin
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file from the example:
```bash
cp .env.example .env
```
Ensure `VITE_API_URL` is set.

### 4. Launch Development Server
```bash
npm run dev
```
The app will open at `http://localhost:5174` (or similar).

---
[Related: Pages](./pages.md) | [Related: Order Management](./order-management.md)
