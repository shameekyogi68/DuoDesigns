---
title:        Environment Variables
section:      02-architecture
last-updated: 2025-03-13
maintained-by:DevOps Engineer
status:       Approved
---

# 🔑 Environment Variables

To keep the application secure, sensitive keys and dynamic configurations are stored in `.env` files. **Never commit `.env` files to Git.**

## 1. ⚙️ Backend API (.env)

| Variable | Description | Example Value | Required? |
| :--- | :--- | :--- | :---: |
| `NODE_ENV` | Run mode | `development`, `production` | ✅ |
| `PORT` | Listening port | `5000` | ✅ |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` | ✅ |
| `MONGODB_URI` | Mongo Connection String | `mongodb+srv://...` | ✅ |
| `JWT_SECRET` | Secret for Access Token | `your_secret_key` | ✅ |
| `SMTP_EMAIL` | Gmail account for notifications | `hi@gmail.com` | ✅ |
| `SMTP_PASSWORD` | Gmail App Password (not login) | `xxxx xxxx xxxx xxxx` | ✅ |
| `RAZORPAY_KEY_ID` | Public Key from Dashboard | `rzp_test_xxxxxx` | ✅ |
| `RAZORPAY_KEY_SECRET` | Secret Key from Dashboard | `xxxxxxxxxxxxxxxx` | ✅ |
| `RAZORPAY_WEBHOOK_SECRET` | Secret for hook verification | `xxxxxxxxxxxxxxxx` | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloud Name from Console | `duo-designs` | ✅ |
| `CLOUDINARY_API_KEY` | Key from Console | `123456789` | ✅ |
| `CLOUDINARY_API_SECRET` | Secret from Console | `xxxxxxxxxxxxxxxx` | ✅ |

---

## 2. 🌐 Customer/Admin Frontend (.env)

| Variable | Description | Example Value | Required? |
| :--- | :--- | :--- | :---: |
| `VITE_API_URL` | Base path for API calls | `http://localhost:5000/api` | ✅ |
| `VITE_RAZORPAY_KEY` | Public key for UI payment | `rzp_test_xxxxxx` | ✅ |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Preset for unsigned uploads | `duo_preset` | 💡 Optional |

---

## 🔐 Security Best Practices

1. **Naming:** All frontend variables must be prefixed with `VITE_` to be exposed to the browser.
2. **Rotation:** Rotate `JWT_SECRET` and `RAZORPAY_KEY_SECRET` every 6 months or in case of a leak.
3. **Staging vs Prod:** Always use separate Razorpay Test vs Live keys for staging and production environments.
4. **CI/CD:** On Vercel or Render, add these variables in the **Environment Variables** section of the dashboard, not in the code.

## ⚠️ Warning
If `RAZORPAY_WEBHOOK_SECRET` is missing, order payments will not be verified automatic in the background, leading to "Paid" orders showing as "Pending" in the database.

---
[Related: 08-deployment/overview.md](../08-deployment/overview.md) | [Home](../README.md)
