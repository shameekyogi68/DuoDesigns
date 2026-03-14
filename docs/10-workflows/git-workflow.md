---
title: Git Workflow
app: All
section: 10-workflows
last-updated: 2025-03-14
maintained-by: Technical Lead
status: Current
---

# Git Workflow

Duo Designs follows a **Feature Branch** workflow to ensure the `main` branch always remains stable and deployable.

## 🌊 The Flow

1.  **Pull**: Ensure your local `main` is up to date: `git pull origin main`.
2.  **Branch**: Create a specific branch for your task: `git checkout -b feat/checkout-redesign`.
3.  **Code**: Hack away and commit often.
4.  **Sync**: Occasionally merge `main` into your feature branch to resolve conflicts early.
5.  **Push**: `git push origin feat/checkout-redesign`.
6.  **PR**: Open a Pull Request on GitHub.
7.  **Merge**: Once approved and builds pass, merge to `main`.

---
[Next: Branching Strategy](./branching-strategy.md) | [Next: Commit Conventions](./commit-conventions.md)
