---
title: Email & Domain Setup
app: All
section: 09-deployment
last-updated: 2025-03-14
maintained-by: DevOps Engineer
status: Current
---

# Email & Domain Setup

## 📧 Gmail SMTP (Nodemailer)
1. Use a dedicated Google account (e.g., `system@duodesigns.in`).
2. Enable **2-Step Verification**.
3. Go to `Security > App Passwords`.
4. Generate an app password for "Mail".
5. Use this 16-character code as `SMTP_PASS` (without spaces).

## 🌩️ Cloudflare (DNS)
1. Point your Domain's Nameservers to Cloudflare.
2. **Records**:
   - `A @`: Point to Vercel's IP.
   - `CNAME admin`: Point to Vercel's admin deployment.
   - `CNAME partner`: Point to Vercel's tracker deployment.
   - `CNAME api`: Point to Render's service URL.
3. **SSL/TLS**: Set to **Full (Strict)**.

---
[Related: Email System](../03-backend/email-system.md) | [Related: Tech Stack](../02-architecture/tech-stack.md)
