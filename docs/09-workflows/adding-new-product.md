---
title:        Adding a New Product
section:      09-workflows
last-updated: 2025-03-13
status:       Approved
---

# 📦 Adding a New Product

Follow these steps to correctly launch a new item on the Duo Designs catalog.

## 🛠️ Step 1: Asset Preparation
1. **Mockup:** Create a primary image (e.g., White T-shirt mockup).
2. **Variants:** Collect all secondary images (e.g., Black version, Red version).
3. **Dimensions:** Ensure images are square (1:1 ratio) and under 1MB for fast loading.

---

## 🏗️ Step 2: Upload to Cloudinary
Upload images to the `duo/products` folder in Cloudinary and copy the **Public URL**.

---

## 🖥️ Step 3: Admin Dashboard Input
Navigate to `Inventory` → `Add New Product`.

1. **Basic Info:**
   - **Name:** e.g., "Oversized Heavyweight Tee"
   - **Category:** Select from "Oversized T-Shirts", "Mugs", etc.
   - **Base Price:** The price for S, M, L sizes.
2. **Customization:** Toggle "Is Customizable" to `On` if it's for user design uploads.
3. **Variants:**
   - Add a variant for every Color + Size combination.
   - Set **Initial Stock** (e.g. 50).
4. **HSN Code:** Enter the correct HSN (Apparel: 6109, Mugs: 6912).

---

## 🚀 Step 4: Verification
1. Click **"Save Product"**.
2. Open the **Customer App Shop** page.
3. Verify the product appears and the "Best Seller" badge (if enabled) is visible.
4. Open the **Product Detail** page and verify the size selector shows the correct stock availability.

## 💡 Top Tip: Bulk Stock Update
If you only need to update quantities, use the "Quick Edit" pencil icon next to the stock count in the inventory table rather than opening the full editor form.

---
[Related: 04-frontend/admin-app.md](../04-frontend/admin-app.md) | [Home](../README.md)
