---
title: Typography
app: All
section: 08-design-system
last-updated: 2025-03-14
maintained-by: Lead Designer
status: Current
---

# Typography

Duo Designs uses clean, modern typography to convey a high-end streetwear identity.

## 🔡 Typefaces
The system prioritizes **Inter** or **Outfit** for all apps.
- **Headings**: `Outfit` (Weight: 700)
- **Body**: `Inter` (Weights: 400, 500)
- **Fallback**: `system-ui`, `sans-serif`

## 📏 Scale

| Element | Size | Weight | Letter Spacing |
|---------|------|--------|----------------|
| **H1** | 3rem (48px) | 700 | -0.02em |
| **H2** | 2rem (32px) | 700 | -0.01em |
| **H3** | 1.5rem (24px)| 600 | normal |
| **Body**| 1rem (16px) | 400 | normal |
| **Muted**| 0.875rem | 400 | +0.02em |

## 🔗 Implementation
Fonts are imported globally in `index.css` via Google Fonts.
```css
body {
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.01em;
  -webkit-font-smoothing: antialiased;
}
```

---
[Related: Colors](./colors.md) | [Related: Spacing](./spacing.md)
