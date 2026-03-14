---
title: Code Review & PR Process
app: All
section: 10-workflows
last-updated: 2025-03-14
maintained-by: Technical Lead
status: Current
---

# Code Review & PR Process

Pull Requests (PRs) are the primary venue for team collaboration and knowledge sharing.

## 📥 Submitting a PR
1. Ensure your branch is pushed.
2. Select **`main`** as the base branch.
3. Use a clear title.
4. **Description**: Briefly explain *what* you changed and *why*. Link any relevant issue if applicable.
5. Attach a screenshot or video if the PR includes UI changes.

## 🔍 Reviewer Checklist
1. **Logic**: Does the code actually do what it claims to? Any edge cases (null pointers)?
2. **Security**: Any hardcoded secrets or NoSQL injection vulnerabilities?
3. **Consistency**: Does the code follow the [Tech Stack](../02-architecture/tech-stack.md) and [Design System](../08-design-system/overview.md) guidelines?
4. **Performance**: Any expensive loops or multiple redundant DB queries?

## 🛠️ Actions
- **Request Changes**: Mention specific lines and suggest improvements.
- **Approve**: Only when you're 100% confident.

---
[Related: Tech Stack](../02-architecture/tech-stack.md) | [Related: Design System](../08-design-system/overview.md)
