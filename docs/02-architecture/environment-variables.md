---
title: Environment Variables
app: All
section: 02-architecture
last-updated: 2025-03-14
maintained-by: DevOps Engineer
status: Current
---

# Environment Variables

Each application in the monorepo requires its own `.env` file for local development. In production, these variables are configured in the Vercel or Render dashboard.

## ⚙️ Backend (`/backend/.env`)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 5000 | Yes |
| `MONGODB_URI` | MongoDB Connection string | `mongodb+srv://...` | Yes |
| `JWT_SECRET` | Secret for signing tokens | `random_64_char` | Yes |
| `RAZORPAY_KEY_ID` | Razorpay API Key | `rzp_test_...` | Yes |
| `RAZORPAY_KEY_SECRET` | Razorpay Secret | `secret_...` | Yes |
| `CLOUDINARY_URL` | Cloudinary credentials | `cloudinary://...` | Yes |
| `GMAIL_USER` | Email for SMTP | `abc@gmail.com` | Yes |
| `GMAIL_PASS` | Google App Password | `xxxx xxxx...` | Yes |

## 👕 Customer App (`/duo-designs-customer/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Full URL of Backend API | `http://localhost:5000/api` |
| `VITE_RAZORPAY_KEY` | Public Razorpay Key | `rzp_test_...` |

## 🔒 Admin Panel (`/duo-designs-admin/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Full URL of Backend API | `http://localhost:5000/api` |
| `VITE_ADMIN_USER` | Initial fallback user | `admin` |

## 📊 Revenue Tracker (`/agency-revenue-tracker/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Duo Designs Live API | `https://api.duodesigns.in/api` |
| `VITE_PARTNER_CREDENTIALS` | Bcrypt hash for tracker login | `$2y$10$...` |

---
[Related: Deployment Prerequisites](../09-deployment/prerequisites.md) | [Related: Security Overview](../13-security/overview.md)
