---
title: Getting Started
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Backend: Getting Started

The Duo Designs backend is a robust Node.js/Express server that acts as the source of truth for all three frontend applications.

## 📋 Prerequisites

Before setting up, ensure you have the following installed:
- **Node.js**: v20 or higher (Check with `node -v`)
- **npm**: v10 or higher
- **MongoDB**: A running MongoDB instance (Local or Atlas)
- **Git**: For version control

## 🛠️ Step-by-Step Setup

### 1. Navigate to the folder
From the monorepo root:
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the template and fill in your secrets:
```bash
cp .env.example .env
```
💡 *Refer to [Environment Variables](../02-architecture/environment-variables.md) for details on each key.*

### 4. Run the Server
For development (with hot reload):
```bash
npm run dev
```
For production:
```bash
npm start
```

## ✅ Verification
Once the server is running, check the health endpoint:
```bash
curl http://localhost:5000/health
```
**Expected Output:**
```json
{
  "status": "ok",
  "uptime": 1.234,
  "timestamp": "2025-03-14T..."
}
```

## ❌ Common Errors

| Error | Fix |
|-------|-----|
| `EADDRINUSE` | Change the `PORT` in `.env` or kill the process on 5000. |
| `MongooseServerSelectionError` | Ensure your `MONGODB_URI` is correct and your IP is whitelisted in Atlas. |
| `razorpay: Secret is missing` | Ensure `RAZORPAY_KEY_SECRET` is set in your `.env`. |

---
[Related: Folder Structure](./folder-structure.md) | [Related: API Overview](./api-overview.md)
