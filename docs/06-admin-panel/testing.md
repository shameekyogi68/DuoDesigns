---
title: Admin Testing
app: Admin Panel
section: 06-admin-panel
last-updated: 2025-03-14
maintained-by: QA Engineer
status: Current
---

# Admin Panel Testing

The Admin Panel requires high reliability as it handles financial data and fulfillments.

## 🧪 Testing Focus

### 1. Data Integrity (The "Big Audit")
- **Manual Check**: Randomly verify that the `Total` in the Admin Order view matches the `Grand Total` in the customer's Order Confirmation email.
- **Stock Delta**: Ensure that adding `+10` to stock on the Stock page correctly updates the product availability on the storefront.

### 2. Permissions & Security
- **Negative Testing**: Attempt to access `/orders` without a token. Expect immediate redirect to `/login`.
- **Credential Leakage**: Verify that no API secrets or JWTs are logged in the browser console during production builds.

## 🚀 deployment check
Every change to Admin styles must be verified in **Dark Mode** (if supported/requested) and across popular resolutions (13" Macbook up to 27" iMac).

---
[Related: Manual Test Cases](../12-testing/manual-test-cases.md) | [Related: Security Overview](../13-security/overview.md)
