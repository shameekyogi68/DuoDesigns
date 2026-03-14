---
title: Cron Jobs
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: DevOps Engineer
status: Current
---

# Cron Jobs

The backend uses `node-cron` to perform scheduled maintenance tasks automatically.

## 🕒 Active Jobs

### 1. `cleanExpiredOTPs`
- **Schedule**: `*/60 * * * *` (Every 60 minutes)
- **File**: `src/jobs/index.js` (Inline registered)
- **Logic**: Deletes all user OTPs from the database where `expiresAt < Date.now()`.

### 2. `keepAlive`
- **Schedule**: `*/14 * * * *` (Every 14 minutes)
- **File**: `src/jobs/keepAlive.job.js`
- **Logic**: Pings the `/health` endpoint of the live production server.
- **Why**: Prevents the Render "Free Tier" service from going to sleep after 15 minutes of inactivity.

## 🚀 Registration
All jobs are initialized in `src/jobs/index.js`, which is imported in `app.js` to start when the server boots up.

---
[Related: Tech Stack](../02-architecture/tech-stack.md) | [Related: Deployment Overview](../09-deployment/overview.md)
