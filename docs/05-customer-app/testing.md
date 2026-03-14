---
title: Frontend Testing
app: Customer App
section: 05-customer-app
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Frontend Testing Strategy

The customer app prioritizes responsiveness and reliable state transitions (Cart -> Checkout).

## 🧪 Testing Layers

### 1. Manual Sanity Checks
Frequent manual verification of the checkout flow, especially:
- Coupon application edge cases (invalid code, expired code).
- Mobile menu responsiveness.
- Image upload preview performance.

### 2. Sentry Monitoring
We use **Sentry for React** to capture unhandled exceptions in the wild.
- Capture scope: `store` actions and `api` calls.
- Dashboards monitor for "White Screen of Death" scenarios across different browser versions.

## 🚀 Build Validation
The `npm run build` command acts as a "smoke test". Any syntax error or missing component import will fail the build process, preventing broken code from reaching the staging/production environments.

---
[Related: Manual Test Cases](../12-testing/manual-test-cases.md) | [Related: Deployment Go-Live](../09-deployment/go-live-checklist.md)
