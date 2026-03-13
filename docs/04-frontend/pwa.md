---
title:        PWA (Progressive Web App)
section:      04-frontend
last-updated: 2025-03-13
status:       Active
---

# 📱 PWA (Progressive Web App)

Duo Designs is built as a Progressive Web App to provide a fast, app-like experience on mobile devices, especially optimized for 4G/3G connections common in India.

## ✨ Key Features
- **Installable:** "Add to Home Screen" prompt for Android/iOS.
- **Offline Mode:** Browse products using cached Data.
- **Splash Screen:** Immediate branding on app launch.
- **Fast Load:** Service workers cache core assets (JS, CSS, SVGs).

---

## 🛠️ Tech Setup
- **Plugin:** `vite-plugin-pwa`.
- **Manifest:** Located in `public/manifest.json`.
- **Service Worker:** Automatic generation via Vite building.

## 📁 Manifest Config (Summary)
```json
{
  "name": "Duo Designs",
  "short_name": "Duo",
  "theme_color": "#000000",
  "background_color": "#E8FF3B",
  "display": "standalone"
}
```

## 🧪 Testing the PWA
1. Run `npm run build`.
2. Open Chrome DevTools → **Application** tab.
3. Check **Service Workers** and **Manifest** sections.
4. Use **Lighthouse** to verify PWA score (Target: >90).

---
[Home](../../README.md)
