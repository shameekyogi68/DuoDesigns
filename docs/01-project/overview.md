---
title:        Project Overview
section:      01-project
last-updated: 2025-03-13
maintained-by:Project Manager
status:       Approved
---

# 📖 Duo Designs Project Overview

## 🔍 What is Duo Designs?
**Duo Designs** is a modern e-commerce platform that brings a premium, street-wear aesthetic to custom-printed products in India. We specialize in T-shirts (regular and oversized), mugs, trackpants, and keychains—offering both curator-designed artworks and a complete **"Upload Your Own"** customization engine.

## 🎯 Target Audience
- **Geography:** 100% focused on India (pincode-based delivery).
- **Demographic:** Young adults (18-35), creators, and small brands looking for high-quality, zero-border-radius design aesthetics.
- **Pain Point:** Traditional custom-print sites are cluttered and feel cheap. Duo Designs provides a premium, high-contrast, bold design experience.

## 💼 Business Model
- **D2C (Direct to Consumer):** No marketplace middleman.
- **Prepaid Only:** We do NOT offer Cash on Delivery (COD). This ensures zero RTO (Return to Origin) for custom-printed items which cannot be resold.
- **Production:** Print on Demand (POD).
- **Taxation:** GST-compliant taxes splitting between CGST/SGST (Intrastate - Karnataka) and IGST (Interstate).

## 🚀 The Product Range
1. **Regular T-Shirts:** Classic fit, 180 GSM cotton.
2. **Oversized T-Shirts:** Heavyweight, wide-shoulder street-wear fit.
3. **Trackpants:** Zero-border minimalist branding.
4. **Mugs:** Ceramic 11oz, sublimation print.
5. **Keychains:** Metal or Acrylic, custom engraved/printed.

## 🛠️ The Three Apps
The platform consists of three distinct repositories/services:

1. **Customer App (`duodesigns.in`):**
   - Built with React + Vite.
   - Purpose: Discovery, Custom Design Upload, Checkout, and Tracking.
   
2. **Admin App (`admin.duodesigns.in`):**
   - Built with React + Vite.
   - Purpose: Order lifecycle management, Stock updates, Revenue analytics, and Partner commissions.

3. **Backend API (`api.duodesigns.in`):**
   - Built with Node.js + Express.
   - Purpose: Unified API service for both apps, payment verification, GST engine, and PDF invoice generator.

## 🛤️ The Customer Journey
1. **Land:** User visits homepage and sees highlighted best-sellers.
2. **Customize:** User selects a product class and enters the **Design Studio** to upload a 10MB PNG/JPG.
3. **Checkout:** User adds to cart, enters pincode for delivery check, and applies a coupon.
4. **Pay:** Razorpay integrated checkout securely handles the UPI/Card transaction.
5. **Track:** User receives email confirmation and can track the order status manually via the site header.

---
[Related: 01-project/business-rules.md](./business-rules.md) | [Home](../README.md)
