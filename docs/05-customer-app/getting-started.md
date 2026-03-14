---
title: Getting Started
app: Customer App
section: 05-customer-app
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Customer App: Getting Started

The storefront is a high-performance React application optimized for mobile-first browsing and design customization.

## 📋 Prerequisites
- **Node.js**: v20 or higher
- **npm**: v10 or higher
- **Backend**: A running Duo Designs backend (Local or Live)

## 🛠️ Step-by-Step Setup

### 1. Identify the folder
From the monorepo root:
```bash
cd duo-designs-customer
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
Ensure `VITE_API_URL` points to your active backend (e.g., `http://localhost:5000/api`).

### 4. Launch Development Server
```bash
npm run dev
```
The app will open at `http://localhost:5173`.

## 📦 Build for Production
To generate a static bundle for Vercel/Hosting:
```bash
npm run build
```
The output will be in the `/dist` folder.

---
[Related: Folder Structure](./folder-structure.md) | [Related: API Integration](./api-integration.md)
