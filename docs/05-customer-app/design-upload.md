---
title: Custom Design Upload
app: Customer App
section: 05-customer-app
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Custom Design Upload

The "Design Your Own" feature allows customers to upload high-resolution images for custom printing on T-shirts, Mugs, and Keychains.

## 📁 Technical Implementation
1. **Selection**: User selects an image file (PNG/JPG preferred).
2. **Preview**: `URL.createObjectURL(file)` generates a local browser URL for instant visual feedback.
3. **Upload**: 
   - Application sends file to `POST /api/upload/design`.
   - Backend returns a Cloudinary secure direct link.
4. **Linkage**: The Cloudinary URL is saved in the cart item's `design` property.

## 📏 Constraints
- **File Size**: Max 10MB enforced by backend.
- **Resolution**: Recommended min 2000px for high-quality prints.
- **Formats**: PNG, JPG, JPEG only.

## 🎨 Preview Component
The `DesignPreview` component in `src/pages/CustomDesign.jsx` superimposes the uploaded image onto a product mockup (T-shirt/Mug) to show the user how the final product might look.

---
[Related: File Upload](../03-backend/file-upload.md) | [Related: API Integration](./api-integration.md)
