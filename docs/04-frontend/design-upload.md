---
title:        Design Upload Workflow
section:      04-frontend
last-updated: 2025-03-13
maintained-by:Frontend Developer
status:       Approved
---

# 🎨 Design Upload Workflow

One of our flagship features is the ability to upload custom designs to any customizable product.

## 🛤️ Visual Flow

1. **Upload Trigger:** User clicks "UPLOAD DESIGN" on the Product Detail page.
2. **File Explorer:** A browser file explorer opens limited to `.png` and `.jpg`.
3. **Visual Processing:** A lime "UPLOADING..." loader appears over the button.
4. **Mockup Refresh:** Once uploaded, the product mockup preview replaces its default image with a representation of the user’s design (overlay logic).
5. **Association:** The cart item object now includes `designUrl: "https://res.cloudinary.com/..."`.

---

## 🛠️ Technical Implementation

### 1. The Trigger
- **Component:** `src/components/product/DesignUploader.jsx`
- **Method:** `onChange` on a hidden `<input type="file" />`.

### 2. Client-Side Validation
```javascript
const validate = (file) => {
  const allowed = ['image/png', 'image/jpeg'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowed.includes(file.type)) throw new Error("Invalid file type");
  if (file.size > maxSize) throw new Error("File too large");
};
```

### 3. API Call
- **Endpoint:** `POST /api/upload/design`
- **Payload:** `FormData` containing the file.
- **Success:** Receives a Cloudinary URL.
- **State Update:** Save the URL in the local component state to update the **Live Preview Overlay**.

### 4. Live Preview Overlay
We use a simple `CSS absolute positioning` pattern.
- **Base:** The product mockup (e.g. White T-shirt).
- **Overlay:** The user’s design centered on the chest area of the T-shirt image.
- **Note:** This is for visual representation only; the backend uses the raw high-resolution URL for printing.

---

## ⚠️ Known Constraints
- **Transparency:** We strongly recommend PNGs with transparent backgrounds for the best visual output on apparel.
- **Resolution:** Designs below 1000px width will show a "Low Resolution" warning label.

---
[Related: 05-backend/file-upload.md](../05-backend/file-upload.md) | [Home](../README.md)
