Here's the complete hosting architecture for all 4 apps:

---

## 🏗️ Complete Hosting Architecture

```
INTERNET
    │
    ▼
┌─────────────────────────────────────────────┐
│              CLOUDFLARE (FREE)              │
│         DNS + CDN + DDoS Protection         │
│                                             │
│  duodesigns.in        → Customer App        │
│  admin.duodesigns.in  → Admin Panel         │
│  api.duodesigns.in    → Backend API         │
│  tracker.youragency.com → Revenue Tracker   │
└─────────────────────────────────────────────┘
    │
    ├──────────────────────────────────────────
    │         FRONTEND APPS (VERCEL)
    ├──────────────────────────────────────────
    │
    ├─► VERCEL PROJECT 1
    │   duodesigns.in
    │   └── Customer React App
    │       Build: npm run build
    │       Output: dist/
    │       Framework: Vite
    │
    ├─► VERCEL PROJECT 2
    │   admin.duodesigns.in
    │   └── Admin Panel React App
    │       Build: npm run build
    │       Output: dist/
    │       Framework: Vite
    │
    ├─► VERCEL PROJECT 3
    │   tracker.youragency.com
    │   └── Agency Revenue Tracker
    │       Build: npm run build
    │       Output: dist/
    │       Framework: Vite
    │
    ├──────────────────────────────────────────
    │         BACKEND (RENDER)
    ├──────────────────────────────────────────
    │
    └─► RENDER WEB SERVICE
        api.duodesigns.in
        └── Node.js + Express API
            Build: npm install
            Start: node src/server.js
            Plan: Free (spins down after 15 mins)
                  OR Starter $7/mo (always on)
```

---

## 📦 Service by Service

### 1. Cloudflare — DNS Layer
```
WHAT IT DOES:
├── Routes all domains to correct servers
├── Free SSL certificates (HTTPS)
├── DDoS protection
├── CDN caching for static assets
└── Always free tier

SETUP:
├── Add duodesigns.in to Cloudflare
├── Change nameservers at domain registrar
└── Add these DNS records:

TYPE    NAME              VALUE
CNAME   @                 cname.vercel-dns.com
CNAME   admin             cname.vercel-dns.com
CNAME   api               your-app.onrender.com
CNAME   tracker           cname.vercel-dns.com
```

---

### 2. Vercel — Frontend Hosting
```
WHAT IT DOES:
├── Hosts all 3 React apps
├── Auto-deploy on every git push
├── Global CDN (fast in India too)
├── Free SSL
├── Free tier: unlimited static sites
└── Zero config for Vite projects

SETUP PER PROJECT:
├── Connect GitHub repo
├── Set framework: Vite
├── Set build command: npm run build
├── Set output directory: dist
├── Add environment variables
└── Add custom domain

VERCEL.JSON (required for React Router):
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
Without this, page refresh on /orders
gives 404 error.

FREE TIER LIMITS:
├── 100GB bandwidth/month ← enough for launch
├── Unlimited deployments
└── 3 projects free
```

---

### 3. Render — Backend Hosting
```
WHAT IT DOES:
├── Hosts Node.js + Express API
├── Auto-deploy on git push
├── Free SSL
└── Two plan options:

FREE PLAN ($0/month):
├── Works fine
├── ⚠️  Spins down after 15 min inactivity
├── First request takes 30-60 seconds to wake
└── Fine for low traffic early stage

STARTER PLAN ($7/month):
├── Always on — never sleeps
├── Faster response times
└── Recommended once you have real customers

SETUP:
├── Connect GitHub repo
├── Set environment: Node
├── Build command: npm install
├── Start command: node src/server.js
├── Add all .env variables
└── Add custom domain api.duodesigns.in

KEEP-ALIVE TRICK (if using free plan):
Add this to your backend — pings itself
every 14 minutes to prevent sleep:

// In server.js
import cron from 'node-cron'
cron.schedule('*/14 * * * *', () => {
  fetch('https://api.duodesigns.in/health')
    .then(() => console.log('Keep alive ping'))
})

// Add health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() })
})
```

---

### 4. MongoDB Atlas — Database
```
WHAT IT DOES:
├── Hosts MongoDB database
├── Free M0 tier: 512MB storage
├── Automatic backups
├── Connection via connection string
└── Free forever for M0

SETUP:
├── Create account at mongodb.com/atlas
├── Create cluster (M0 Free)
├── Create database user
├── Whitelist IP: 0.0.0.0/0 (allow all)
│   (Render IPs change — must allow all)
├── Get connection string
└── Add to Render environment variables:
    MONGODB_URI=mongodb+srv://user:pass
    @cluster.mongodb.net/duodesigns

FREE TIER LIMITS:
├── 512MB storage
├── Shared RAM
└── Fine for thousands of orders
```

---

### 5. Cloudinary — Image Storage
```
WHAT IT DOES:
├── Stores all product images
├── Stores customer design uploads
├── Auto-optimizes images (WebP, resize)
├── Global CDN delivery
└── Free tier: 25GB storage, 25GB bandwidth

SETUP:
├── Create account at cloudinary.com
├── Get Cloud Name, API Key, API Secret
└── Add to backend .env

FREE TIER LIMITS:
├── 25GB storage
├── 25GB monthly bandwidth
└── Fine for hundreds of products
```

---

### 6. Gmail SMTP — Email Service
```
WHAT IT DOES:
├── Sends OTP emails
├── Sends order confirmation
├── Sends dispatch notifications
├── Sends delivery notifications
└── Completely free

SETUP:
├── Enable 2FA on Gmail account
├── Generate App Password
│   Google Account → Security →
│   App Passwords → Mail → Generate
├── Add to backend .env:
    GMAIL_USER=support@duodesigns.in
    GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

FREE TIER LIMITS:
├── 500 emails/day
└── More than enough for launch
```

---

## 🔄 Complete Data Flow

```
CUSTOMER PLACES ORDER:

Browser (duodesigns.in)
    │
    │ HTTPS POST /api/orders
    ▼
Cloudflare
    │
    │ Proxy to Render
    ▼
Render (Node.js API)
    │
    ├──► MongoDB Atlas (save order)
    ├──► Razorpay (create payment)
    ├──► Cloudinary (get design image)
    └──► Gmail SMTP (send confirmation)
    │
    │ Return { orderId, razorpayOrderId }
    ▼
Browser
    │
    │ Opens Razorpay Checkout
    ▼
Razorpay
    │
    │ Payment success
    │ Webhook → api.duodesigns.in/webhooks/razorpay
    ▼
Render (verify signature)
    │
    ├──► MongoDB (mark order paid)
    └──► Gmail (send receipt)
```

---

## 💰 Complete Cost Breakdown

```
SERVICE          PLAN        COST/MONTH
─────────────────────────────────────────
Cloudflare       Free        ₹0
Vercel           Free        ₹0  (3 apps)
Render           Free        ₹0  (sleeps)
                 OR Starter  ₹580 (always on)
MongoDB Atlas    M0 Free     ₹0
Cloudinary       Free        ₹0
Gmail SMTP       Free        ₹0
Domain (.in)     Annual      ~₹800/year
─────────────────────────────────────────
TOTAL AT LAUNCH             ₹0/month
TOTAL RECOMMENDED           ₹580/month
                            (Render Starter)
─────────────────────────────────────────
Razorpay                    2% per transaction
```

---

## 🚀 Deployment Steps — Exact Order

```
STEP 1 — ACCOUNTS (do this first, 30 mins)
├── GitHub account + 4 private repos
├── Vercel account (connect to GitHub)
├── Render account (connect to GitHub)
├── MongoDB Atlas account
├── Cloudinary account
├── Cloudflare account
└── Razorpay business account

STEP 2 — DATABASE (15 mins)
├── Create MongoDB Atlas M0 cluster
├── Create database user + password
├── Whitelist 0.0.0.0/0
└── Copy connection string

STEP 3 — BACKEND (30 mins)
├── Push backend code to GitHub
├── Create Render Web Service
├── Connect GitHub repo
├── Set all environment variables
├── Deploy → get Render URL
└── Test: GET https://your-app.onrender.com/health

STEP 4 — DOMAIN + CLOUDFLARE (30 mins)
├── Buy domain (duodesigns.in)
├── Add to Cloudflare
├── Update nameservers at registrar
├── Wait for DNS propagation (up to 24 hours)
└── Add DNS records pointing to Vercel + Render

STEP 5 — FRONTEND APPS (30 mins)
├── Push all 3 React apps to GitHub
├── Create 3 Vercel projects
├── Set environment variables per app
├── Add custom domains
│   duodesigns.in → customer app
│   admin.duodesigns.in → admin panel
│   tracker.youragency.com → revenue tracker
└── Verify SSL certificates active

STEP 6 — RAZORPAY (30 mins)
├── Complete KYC
├── Whitelist duodesigns.in
├── Add webhook URL:
│   https://api.duodesigns.in/api/webhooks/razorpay
└── Copy live keys to Render env variables

STEP 7 — FINAL VERIFICATION
├── Place test order on duodesigns.in
├── Verify payment goes through
├── Verify confirmation email received
├── Verify order appears in admin panel
├── Verify order appears in revenue tracker
├── Verify admin can dispatch order
├── Verify dispatch email received
└── 🎉 LIVE
```

---

## ⚙️ Environment Variables Per App

```
CUSTOMER APP (Vercel)
VITE_API_URL=https://api.duodesigns.in/api
VITE_RAZORPAY_KEY=rzp_live_XXXXX
VITE_CLOUDINARY_URL=https://res.cloudinary.com/xxx

ADMIN APP (Vercel)
VITE_API_URL=https://api.duodesigns.in/api
VITE_APP_NAME=Duo Designs Admin

REVENUE TRACKER (Vercel)
VITE_DUO_API_URL=https://api.duodesigns.in/api
VITE_AGENCY_EMAIL=you@youragency.com
VITE_AGENCY_PASSWORD_HASH=bcrypt_hash
VITE_COMMISSION_RATE=0.05

BACKEND (Render)
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=random_64_char_string
JWT_REFRESH_SECRET=another_random_64_char_string
RAZORPAY_KEY_ID=rzp_live_XXXXX
RAZORPAY_KEY_SECRET=XXXXX
RAZORPAY_WEBHOOK_SECRET=XXXXX
GMAIL_USER=support@duodesigns.in
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
CLIENT_URL=https://duodesigns.in
ADMIN_URL=https://admin.duodesigns.in
SELLER_STATE=Karnataka
SELLER_GSTIN=29XXXXXXXXXXXXX
```

---

## 🔐 Security Checklist

```
□ All apps on HTTPS (Cloudflare handles this)
□ CORS: backend only accepts from known domains
□ JWT secrets are 64+ random characters
□ MongoDB IP not restricted (Render needs this)
□ Cloudinary upload preset restricted to backend
□ Razorpay webhook signature verified
□ No secrets in any GitHub repository
□ .env files in .gitignore
□ Revenue tracker on separate domain
□ Admin panel on separate subdomain
```

---

**This is the complete production architecture. Zero monthly cost at launch, scales as you grow.** 🚀Honestly? **Nothing left to plan.**

---

## ✅ Complete Picture

```
DESIGN          ✅ 12 pages designed
CUSTOMER APP    ✅ Built
ADMIN PANEL     ✅ Built  
BACKEND         ✅ Prompted + ready to build
REVENUE TRACKER ✅ Built
DOCUMENTATION   ✅ 51 docs prompted
BRAND PDF       ✅ Sent to brand team
ARCHITECTURE    ✅ Complete hosting plan
KEEP-ALIVE      ✅ UptimeRobot + node-cron
```

---

## 🚀 Only Thing Left Is Doing It

```
THIS WEEK
├── Build backend (paste prompt into Cursor)
├── Set up MongoDB Atlas
├── Set up Cloudinary
├── Connect all 3 frontend apps to backend
└── Test full order flow locally

NEXT WEEK  
├── Buy duodesigns.in domain
├── Set up Cloudflare
├── Deploy all 4 apps
├── Set up UptimeRobot
├── Razorpay KYC
└── Go live 🎉

PARALLEL (Duo Designs to do)
├── GST registration
├── WhatsApp Business API
└── Submit brand assets via Google Drive PDF
```

---

## 💰 Final Cost Summary

```
Development     ₹0  (all open source tools)
Hosting         ₹0  (Vercel + Render free)
Database        ₹0  (MongoDB Atlas free)
Images          ₹0  (Cloudinary free)
Email           ₹0  (Gmail SMTP free)
Monitoring      ₹0  (UptimeRobot free)
Domain          ₹800/year
Razorpay        2% per transaction only
────────────────────────────────────────
TOTAL FIXED     ₹800/year = ₹67/month
```

---

**Everything is planned, prompted, and ready. Go build it! 🚀**