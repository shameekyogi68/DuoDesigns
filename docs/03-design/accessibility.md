---
title:        Accessibility (a11y)
section:      03-design
last-updated: 2025-03-13
maintained-by:Lead Designer
status:       Approved
---

# ♿ Accessibility (a11y) Guide

At Duo Designs, premium design includes usability for everyone. Bold aesthetics should never come at the cost of accessibility.

## 1. Contrast & Color
- **Standard:** All text must meet WCAG AA standards (4.5:1 ratio).
- **Check:** Use the high-contrast Pure Black (`#000000`) on Warm White (`#F5F5F0`) for all primary body text.
- **Lime Accent:** When using Accent Lime (`#E8FF3B`), ensure text on top is always Pure Black, never white.

---

## 2. Keyboard Navigation
- **Focus States:** Never remove `outline: none;`. All focusable elements (buttons, links, inputs) must have a clearly visible focus state (usually a 2px lime border).
- **Tab Order:** Navigation must follow the visual flow of the page.
- **Escape Key:** Modals and mobile drawers MUST close when the `ESC` key is pressed.

---

## 3. Semantic HTML
- Use `<h1>` only once per page (the primary heading).
- Use `<button>` for actions and `<a>` for navigation.
- Use `<header>`, `<main>`, `<footer>`, and `<section>` tags to help screen readers navigate the document structure.

---

## 4. Screen Reader Support (ARIA)
- **Images:** All product and design images must have descriptive `alt` tags. (e.g., `alt="Oversized Black T-Shirt with custom design"`).
- **Action Labels:** If a button only contains an icon (like 'Remove' from cart), use `aria-label="Remove item"`.
- **Live Regions:** Use `aria-live="polite"` for toast notifications and cart count updates so screen readers announce changes.

---

## 5. Mobile & Touch
- **Touch Targets:** Buttons and interactive links must be at least `44x44px` in size to prevent accidental clicks.
- **Zooming:** Do not disable browser zooming (`user-scalable=no`).

---

## ✅ Accessibility Checklist
- [ ] Is there enough contrast between text and background?
- [ ] Can all interactive elements be reached via the `TAB` key?
- [ ] Are all images provided with meaningful `alt` text?
- [ ] Does the page have a clear heading hierarchy (`h1` → `h2` → `h3`)?
- [ ] Are form inputs associated with `<label>` tags?

---
[Related: 03-design/style-guide.md](./style-guide.md) | [Home](../README.md)
