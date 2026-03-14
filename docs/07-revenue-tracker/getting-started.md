---
title: Getting Started
app: Revenue Tracker
section: 07-revenue-tracker
last-updated: 2025-03-14
maintained-by: Agency Owner
status: Current
---

# Revenue Tracker: Getting Started

The Agency Revenue Tracker is a dedicated portal for the marketing agency to monitor sales, commissions, and payouts from Duo Designs.

## 📋 Prerequisites
- **Node.js**: v20 or higher
- **npm**: v10 or higher
- **Backend API**: Connection to Duo Designs Production API

## 🛠️ Step-by-Step Setup

### 1. Identify the folder
From the monorepo root:
```bash
cd agency-revenue-tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file:
```bash
VITE_API_URL=https://api.duodesigns.in/api
```

### 4. Launch Development Server
```bash
npm run dev
```
The app will open at `http://localhost:5175`.

---
[Related: Commission Logic](./commission-logic.md) | [Related: Payout Tracking](./payout-tracking.md)
