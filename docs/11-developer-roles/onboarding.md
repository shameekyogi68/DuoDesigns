---
title: Onboarding Guide
app: All
section: 11-developer-roles
last-updated: 2025-03-14
maintained-by: Engineering Manager
status: Current
---

# Developer Onboarding

Welcome to the Duo Designs engineering team! This guide will get you set up and productive on your first day.

## 🏁 Day 1 Checklist
1. **GitHub**: Request access to the `duo-designs` monorepo.
2. **Environment**: Ensure you have Node.js 20+, MongoDB (Local or Atlas), and a browser with dev tools.
3. **Cloning**: `git clone https://github.com/shameekyogi68/DuoDesigns.git`.
4. **Bootstrapping**:
   - `cd backend && npm install`
   - `cd duo-designs-customer && npm install`
5. **Context**: Read the [Project Overview](../01-project/overview.md) and [System Architecture](../02-architecture/system-overview.md).

## 🧭 Navigating the Monorepo
- **Logic**: All APIs exist in `backend/`.
- **E-commerce**: All buyer UI is in `duo-designs-customer/`.
- **Ops**: All internal management is in `duo-designs-admin/`.
- **Marketing**: All agency tracking is in `agency-revenue-tracker/`.

---
[Next: Full Stack Developer](./full-stack-dev.md)
