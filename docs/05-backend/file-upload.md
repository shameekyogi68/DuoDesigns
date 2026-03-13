---
title:        File Upload Management
section:      05-backend
last-updated: 2025-03-13
maintained-by:Backend Lead
status:       Approved
---

# 🖼️ File Upload Management

Duo Designs handles three types of assets: **Product Mockups**, **Customer Designs**, and **Pre-made Artworks**. All are managed via **Cloudinary**.

## 🛠️ The Middleware Pipeline
We use `multer` and `multer-storage-cloudinary` to handle streams directly from the multipart/form-data request.

- **Component:** `src/middleware/upload.middleware.js`
- **Logic:** Files are never saved to the local disk; they are streamed straight to the cloud to prevent server storage bloat.

---

## 📁 Storage Folders (Cloudinary)

| Folder | Usage | Access |
| :--- | :--- | :--- |
| `duo/products` | High-res product mockups. | Admin Only |
| `duo/designs` | Customer-uploaded PNG/JPG files. | Public |
| `duo/temp` | Temporary uploads (CSVs, metadata). | Private |

---

## 🏗️ Technical Usage Example

```javascript
const { designUpload } = require('../middleware/upload.middleware');

// In Route
router.post('/upload', designUpload.single('file'), (req, res) => {
    // req.file.path contains the public Cloudinary URL
    res.json({ url: req.file.path });
});
```

## 🎨 Image Transformations
Cloudinary allows us to transform images on-the-fly via URL parameters. We use these for:
1. **Thumbnails:** `.../upload/w_200,h_200,c_fill/...` (Used in Cart/Admin Table).
2. **Mockup Overlay:** Combining the customer design URL with a product base URL via Cloudinary layers.

---

## 🔐 Security Constraints
- **File Types:** Restricted to `image/jpeg` and `image/png`.
- **Admin Access:** Deleting images from Cloudinary requires an API call through `cloudinary.service.js` which performs an Admin role check.

## ⚠️ Known Limitation
If an order is cancelled, we generally **do not** delete the design from Cloudinary immediately. We keep them for 30 days for recovery purposes, after which they can be purged via a script.

---
[Related: 04-frontend/design-upload.md](../04-frontend/design-upload.md) | [Home](../README.md)
