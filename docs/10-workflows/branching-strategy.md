---
title: Branching Strategy
app: All
section: 10-workflows
last-updated: 2025-03-14
maintained-by: Technical Lead
status: Current
---

# Branching Strategy

We use a strict prefixing strategy to keep the repository history readable and searchable.

## 📍 Naming Conventions

| Prefix | Usage | Example |
|--------|-------|---------|
| `feat/` | New functionality or UI components. | `feat/razorpay-webhook` |
| `fix/`  | Bug fixes and logic corrections. | `fix/gst-karnataka-rounding` |
| `docs/` | Documentation changes only. | `docs/update-api-ref` |
| `perf/` | Code changes that improve performance. | `perf/optimize-image-load` |
| `refactor/`| Structural changes without new features. | `refactor/api-response-util` |
| `hotfix/`| Urgent production fixes. | `hotfix/login-crash` |

## 🛡️ Protected Branches
- **`main`**: The source of truth for Production. No direct commits allowed.
- **`staging`**: (Optional) For internal testing before reaching production.

---
[Related: Commit Conventions](./commit-conventions.md) | [Related: CI/CD Workflow](../09-deployment/ci-cd-workflow.md)
