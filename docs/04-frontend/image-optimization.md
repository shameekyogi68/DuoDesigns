---
title:        Image Optimization Strategy
section:      04-frontend
last-updated: 2025-03-13
status:       Active
---

# 📸 Image Optimization Strategy

To maintain a premium feel without sacrificing speed, Duo Designs uses a multi-layered image strategy.

## 1. Cloudinary Dynamic Transformations
Instead of shipping raw 5MB assets, our `imageUrl.js` utility injects parameters:
- `f_auto`: Delivers WebP/AVIF to modern browsers.
- `q_auto`: Automatically balances quality vs. compression.
- `w_[px]`: Resizes the image on the fly to match the slot size.

## 2. The `OptimizedImage` Component
We use a custom component for all product and hero assets:
- **Blur-up Placeholder:** Shows a tiny, highly blurred version while the main file loads.
- **Lazy Loading:** `loading="lazy"` prevents off-screen images from using bandwidth.
- **Fade-in:** A smooth 0.5s CSS transition once the load is complete.

---

## 🎨 Best Practices
- **Product Mockups:** Use 1:1 square aspect ratios.
- **Max Weight:** Original uploads should be under 1MB where possible.
- **Iconography:** Use SVGs for all UI icons to ensure sharpness at any zoom level.

---
[Home](../../README.md)
