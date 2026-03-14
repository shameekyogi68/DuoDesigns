---
title: Animations
app: All
section: 08-design-system
last-updated: 2025-03-14
maintained-by: Lead Designer
status: Current
---

# Animations

Duo Designs uses subtle, performance-sensitive animations to enhance the "luxury" feel.

## 🎞️ Global Transitions
All interactive elements must use the global ease:
```css
transition: all 0.4s var(--ease-out);
```

## ✨ Visual Effects

### 1. Scroll Reveal
Elements with the `.reveal` class fade and slide up as the user scrolls.
- **Trigger**: IntersectionObserver (see `App.jsx`).
- **Effect**: `opacity: 0` + `translateY(20px)` → `opacity: 1` + `translateY(0)`.

### 2. Micro-interactions
- **Button Hover**: Scaled 1.02x to provide tactile feedback.
- **Skeleton Loading**: A soft pulsing shine (`#EEE` → `#F5F5F5`) used in `PageLoader`.

## ⚙️ Prefers-Reduced-Motion
The system respects system settings. If "Reduced Motion" is enabled, all non-essential transitions are disabled.

---
[Related: Tech Stack](../02-architecture/tech-stack.md) | [Related: Overview](./overview.md)
