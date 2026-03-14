---
title: Testing
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Backend Testing

Testing is mandatory for core logic like GST and Payments to avoid financial discrepancies.

## 🧪 Tools
- **Framework**: Jest
- **Integration**: Supertest (for testing endpoints)

## 📁 Test Structure
Tests are located in `src/tests/*`.

| File | What it tests |
|------|---------------|
| `auth.test.js` | OTP generation and flow. |
| `order.test.js` | Calculation of GST and totals. |
| `payment.test.js` | Signature verification logic. |
| `product.test.js` | Category filtering and stock checks. |

## 🚀 Running Tests
```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Watch mode for development
npm run test:watch
```

## 🚨 Rule
Always run `npm test` before pushing to `main` to ensure no regressions in the pricing or tax logic.

---
[Related: API Reference](../04-api-reference/overview.md) | [Related: Manual Test Cases](../12-testing/manual-test-cases.md)
