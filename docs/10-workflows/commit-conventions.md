---
title: Commit Conventions
app: All
section: 10-workflows
last-updated: 2025-03-14
maintained-by: Technical Lead
status: Current
---

# Commit Conventions

Duo Designs uses **Conventional Commits** to auto-generate changelogs and maintain a professional history.

## 📝 Format
`<type>: <description>`

## ✨ Common Types
- **`feat`**: A new feature for the user.
- **`fix`**: A bug fix for the user.
- **`docs`**: Documentation only changes.
- **`style`**: Changes that do not affect the meaning of the code (white-space, formatting, etc.).
- **`refactor`**: A code change that neither fixes a bug nor adds a feature.
- **`chore`**: Updating build tasks, package manager configs, etc.

## ✅ Good vs ❌ Bad
- ✅ `feat: implement otp resend timer`
- ❌ `Fixed the timer`
- ✅ `fix: resolve crash on null address in order`
- ❌ `some changes`

---
[Related: Git Workflow](./git-workflow.md) | [Related: Branching Strategy](./branching-strategy.md)
