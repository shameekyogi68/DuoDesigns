---
title: File Upload
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# File Upload (Cloudinary)

Duo Designs utilizes **Cloudinary** for image storage and transformation.

## 📁 The Flow
1.  **Request**: Frontend sends a `multipart/form-data` POST request to `/api/upload`.
2.  **Parsing**: `multer` intercepts the request and handles the file buffer.
3.  **Cloudinary Store**: The `multer-storage-cloudinary` utility uploads the image directly to a folder named `duo-designs/`.
4.  **Response**: The backend returns the secure URL provided by Cloudinary.

## 🎨 Asset Optimization
Images are automatically optimized for web:
- **Format**: Converted to WebP or AVIF based on browser support.
- **Quality**: Handled by Cloudinary's `q_auto` parameter.

## ⚙️ Configuration
The Cloudinary SDK configuration resides in `src/config/cloudinary.js` and requires the `CLOUDINARY_URL` env variable.

---
[Related: Tech Stack](../02-architecture/tech-stack.md) | [Related: API Reference](../04-api-reference/upload.md)
