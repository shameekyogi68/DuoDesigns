---
title:        Backend Getting Started
section:      05-backend
last-updated: 2025-03-13
maintained-by:Backend Lead
status:       Approved
---

# 🚀 Backend Getting Started

Follow these steps to set up the Duo Designs Node.js API on your local machine.

## 📋 Prerequisites
- **Node.js:** v20.x or higher.
- **npm / pnpm:** Latest version.
- **MongoDB Atlas Account:** (Free tier works).
- **Postman:** For API testing.

---

## 🛠️ Step-by-Step Installation

### 1. Clone the Repository
```bash
git clone https://github.com/duodesigns/backend-api.git
cd backend-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup MongoDB Atlas
- **Create Cluster:** Go to [mongodb.com] and create a free Shared Cluster.
- **Create User:** Add a database user with Read/Write access.
- **Whitelist IP:** Ensure your current IP is whitelisted (or set to `0.0.0.0/0` for initial dev).
- **Connection String:** Copy the `mongodb+srv://` URI for your `.env`.

### 4. Setup Environment Variables
Create a `.env` in the root (refer to `.env.example`).
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=super_secret_string
SMTP_EMAIL=you@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop # App Password
RAZORPAY_KEY_ID=rzp_test_xxxxxx
RAZORPAY_KEY_SECRET=xxxxxx
CLOUDINARY_CLOUD_NAME=duo-designs
# ... and more
```

### 5. Start Development Server
```bash
npm run dev
```
The API will be live at `http://localhost:5000/api`.

---

## 🧪 Testing
```bash
npm run test          # Run all Jest tests
npm run test:watch    # Autotrack changes
npm run test:coverage # Check logic coverage
```

---

## 🔝 Standard Success Check
- **DB Check:** `Mongo DB Connected successfully` should log in the terminal.
- **API Check:** `GET http://localhost:5000/api/products` should return an empty array `[]` (if not seeded).

## ⚠️ Common Issues
- **`ECONNREFUSED`:** Your MongoDB URI is likely incorrect or your IP is not whitelisted.
- **`error: login failed` (SMTP):** Ensure you used a **Gmail App Password**, not your actual Google account password.
- **Unauthorized (401):** Ensure your JWT hasn't expired (test token expiry is currently 15m).

---
[Related: 05-backend/architecture.md](./architecture.md) | [Home](../README.md)
