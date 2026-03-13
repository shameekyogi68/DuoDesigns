---
title:        Incident Response Plan
section:      08-deployment
last-updated: 2025-03-13
status:       Active
---

# 🚨 Incident Response Plan

Protocol for handling system failures and service downtime for Duo Designs.

## 1. System Monitoring
- **Uptime:** Monitored via UptimeRobot (pings `api/health` every 1 min).
- **Errors:** Logged and alerted via **Sentry.io**.
- **Performance:** Monitored via Render service logs and Google PageSpeed.

## 2. Priority Levels
| Level | Severity | Example | Action |
| :--- | :--- | :--- | :--- |
| **P0** | Critical | Checkout failed, Database down. | Immediate hotfix / Emergency rollback. |
| **P1** | High | Admin dashboard slow, Image uploads failing. | Fix within 4 hours. |
| **P2** | Medium | Incorrect footer link, Formatting bug. | Fix in next daily release. |

## 3. Recovery Procedures
- **Database Crash:** Switch to latest Atlas backup (automatic).
- **Service Overload:** Scale Render instance to 2 or 3 nodes.
- **Data Breach:** Revoke all JWT secrets, reset 2FA, and notify users via Email.

## 4. Communication Templates
- **Customer Facing:** "We're experiencing briefly maintenance. Back in 30 mins."
- **Internal:** Post-mortem report required for all P0 incidents within 24 hours.

---
[Home](../../README.md)
