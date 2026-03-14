---
title: CI/CD Workflow
app: All
section: 09-deployment
last-updated: 2025-03-14
maintained-by: DevOps Engineer
status: Current
---

# CI/CD Workflow

Duo Designs uses **GitHub-native integrations** with Vercel and Render for frictionless deployment.

## 🔄 The Pipeline

1.  **Dev Phase**: Feature branch created.
2.  **PR Phase**: A pull request to `main` triggers:
    - Vercel Preview Deployments for all 3 frontends.
    - Render PR Previews (if configured).
3.  **Audit Phase**: The team reviews the Preview URLs and runs manual sanity checks.
4.  **Merge Phase**: Merging into `main` triggers the **Production Build**.

## 🛡️ Safeguards
To prevent breaking production:
- Use **Protected Branches** in GitHub settings.
- Require at least one approving review.
- (Recommended) Add GitHub Actions to run `npm test` on every PR.

---
[Related: Git Workflow](../10-workflows/git-workflow.md) | [Related: Overview](./overview.md)
