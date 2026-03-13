---
title:        Design System
section:      03-design
last-updated: 2025-03-13
maintained-by:Lead Designer
status:       Approved
---

# 🎨 Design System

Duo Designs follows a **high-contrast, bold, minimalist** aesthetic. We avoid soft UI patterns (radius, shadows, gradients) in favor of stark lines and aggressive typography.

## 🌈 Color Palette

| Name | Hex | Usage |
| :--- | :--- | :--- |
| **Pure Black** | `#000000` | Text, primary backgrounds, borders. |
| **Duo Black** | `#0A0A0A` | Standard body backgrounds, buttons. |
| **Warm White** | `#F5F5F0` | Main site backgrounds (off-white). |
| **Accent Lime** | `#E8FF3B` | Hover states, actionable badges, primary buttons. |
| **Neutral Gray** | `#888888` | Secondary text, disabled states. |
| **Card Fill** | `#F0F0EB` | Product card and container backgrounds. |
| **Success Green** | `#3BB54A` | Success messages, paid badges. |
| **Error Red** | `#E05050` | Error messages, stock alerts, danger buttons. |

---

## 🔤 Typography

We use Google Fonts specifically chosen for their high-impact appearance.

### 1. **Bebas Neue** (Headings)
- **Usage:** Page titles, product names, section headers.
- **Attributes:** Uppercase only, high weight, condensed.
- **Sizes:** `h1: 4rem`, `h2: 2.5rem`, `h3: 1.5rem`.

### 2. **Barlow** (Body Copy)
- **Usage:** Descriptions, labels, navigation links.
- **Weights:** 400 (Regular), 600 (Semi-bold), 700 (Bold).
- **Size:** `default: 1rem (16px)`.

---

## 📐 Spacing & Grid
We use a base-8 grid system.
- `8px`, `16px`, `24px`, `32px`, `48px`, `64px`.

**Container Max Widths:**
- Desktop: `1400px` (with `auto` margin).
- Mobile Padding: `16px`.

---

## ⏹️ Border & Radius Rules
- **Border Radius:** `0px` (Strictly prohibited).
- **Border Width:** `1.5px` (Solid #0A0A0A).
- **Shadows:** No `box-shadow` allowed. Use thick borders or offset fills for depth.

---

## 📱 Breakpoints

| Name | Screen Width | Device Class |
| :--- | :--- | :--- |
| `xs` | `320px` | Small phones |
| `sm` | `480px` | Large phones |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Laptops |
| `xl` | `1280px` | Desktops |
| `2xl` | `1400px` | Wide screens |

---

## 🔘 Components Preview

### Primary Button
- **Default:** Black background, White text.
- **Hover:** Lime background, Black text.
- **Active:** Thick border.

### Product Card
- **Structure:** `Card Fill` background, no radius, thick border.
- **Badge:** Top left solid black badge with lime text.

---
[Related: 03-design/component-library.md](./component-library.md) | [Home](../README.md)
