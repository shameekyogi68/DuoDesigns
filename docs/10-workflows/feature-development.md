---
title: Maintenance Processes
app: All
section: 10-workflows
last-updated: 2025-03-14
maintained-by: DevOps Engineer
status: Current
---

# Feature & Maintenance Processes

## 🚀 Feature Development
1. **Discovery**: Discuss the UI/UX requirement.
2. **API First**: Build the backend route and model changes. Test with Postman.
3. **Storefront**: Implement the frontend UI and state management.
4. **Admin**: (If required) Add controls for the new feature in the Admin panel.

## 🚑 Hotfix Procedure
When a critical bug is found in Production:
1. Branch from `main` with prefix `hotfix/`.
2. Fix the bug and run local tests.
3. **Vypass CI** (only if absolutely urgent and manually verified).
4. Merge to `main` and verify the live deployment.
5. Merge `main` back into all active development branches to sync the fix.

## 📦 Release Process
We release via **Continuous Deployment**. Every merge to `main` is a release. Larger features should be hidden behind **Feature Flags** (environmental toggles) if they require a specific marketing "launch" date.

---
[Related: Deployment Overview](../09-deployment/overview.md) | [Related: CI/CD Workflow](../09-deployment/ci-cd-workflow.md)
