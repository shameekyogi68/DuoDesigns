---
title:        Frontend Getting Started
section:      04-frontend
last-updated: 2025-03-13
maintained-by:Frontend Lead
status:       Approved
---

# 🚀 Frontend Getting Started

Follow these steps to set up the Duo Designs frontend environments (Customer & Admin) on your local machine.

## 📋 Prerequisites
- **Node.js:** v18.x or higher.
- **npm / pnpm:** Latest version.
- **Git**

---

## 🛠️ Step-by-Step Installation

### 1. Clone the Repository
```bash
git clone https://github.com/duodesigns/frontend-v1.git
cd frontend-v1
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root of the project (use `.env.example` as a template).
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=rzp_test_xxxxxxxxxxxx
```

### 4. Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

---

## 🧪 Running Tests
We use [Vitest] and [React Testing Library].
```bash
npm run test          # Run all tests
npm run test:ui       # Run tests with UI interface
npm run test:coverage # Generate coverage report
```

## 🏗️ Building for Production
```bash
npm run build
```
This generates a `dist/` folder ready for deployment to Vercel.

## 🤝 Coding Standards
1. **Components:** Created in `src/components/` following PascalCase.
2. **Styles:** One `.css` file per component/page.
3. **Props:** Use `PropTypes` or TypeScript types for all component props.
4. **State:** Keep UI state local; move shared data to Zustand (`src/store`).

## ⚠️ Common Issues
- **`VITE_API_URL` not working:** Ensure your backend server is running and the port matches.
- **Razorpay popup fails:** Check if `VITE_RAZORPAY_KEY` is a valid test key from your dashboard.

---
[Related: 04-frontend/customer-app.md](./customer-app.md) | [Home](../README.md)
