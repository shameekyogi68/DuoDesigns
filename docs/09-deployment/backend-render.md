---
title: Backend Deployment (Render)
app: Backend
section: 09-deployment
last-updated: 2025-03-14
maintained-by: DevOps Engineer
status: Current
---

# Deploying to Render.com

The backend API is hosted on Render for its native Node.js support and integrated Cron functionality.

## 🛠️ Step-by-Step

1.  **New Web Service**: Connect your GitHub repository.
2.  **Configuration**:
    - **Name**: `duo-designs-api`
    - **Language**: `Node`
    - **Root Directory**: `backend`
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
3.  **Environment Variables**: Add all variables from `docs/02-architecture/environment-variables.md`.
4.  **Auto-Deploy**: Enabled by default on the `main` branch.

## 🕒 Cron Job Setup
Render handles the cleaner jobs automatically if the background process is running, but for the "Keep-Alive" ping, we use an internal `node-cron` script.

---
[Related: Environment Variables](../02-architecture/environment-variables.md) | [Related: Tech Stack](../02-architecture/tech-stack.md)
