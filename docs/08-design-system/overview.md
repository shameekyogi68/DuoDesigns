---
title: Design System Overview
app: All
section: 08-design-system
last-updated: 2025-03-14
maintained-by: Lead Designer
status: Current
---

# Design System Overview

The Duo Designs design system is built for a **high-fashion, minimalist aesthetic** with high contrast and smooth interactions.

## 🎨 Core Philosophy
- **Contrast**: Using `#0A0A0A` (Deep Black) against `#F8F8F4` (Off-white) to create a premium, editorial feel.
- **Vibrancy**: Using `#C8FF00` (Electric Lime) as the primary action color.
- **Typography**: Clean, sans-serif fonts with generous letter spacing.
- **Depth**: Subtle glassmorphism (`backdrop-filter`) used for navigation and overlays.

## 🛠️ Implementation
Tokens are managed via CSS Variables in three locations:
- `duo-designs-customer/src/styles/variables.css`
- `duo-designs-admin/src/styles/variables.css`
- `agency-revenue-tracker/src/styles/variables.css`

While the three apps serve different audiences, they share the same **Colors** and **Typography** tokens to maintain a unified brand identity across the monorepo.

---
[Next: Color Palette](./colors.md) | [Next: Typography](./typography.md)
