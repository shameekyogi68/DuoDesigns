---
title:        WhatsApp Notifications
section:      05-backend
last-updated: 2025-03-13
status:       Active
---

# 💬 WhatsApp Notifications

In the Indian market, WhatsApp is the primary communication channel with a 98% open rate. Duo Designs uses **Template Messages** for key transactional updates.

## 🚀 Active Notifications
| Trigger | Template Name | Parameters |
| :--- | :--- | :--- |
| **Order Placed** | `order_confirmed_v1` | Name, Order # |
| **Order Dispatched** | `order_dispatched_v1` | Order #, Tracking Link |
| **Order Delivered** | `order_delivered_v1` | Order # |

---

## 🛠️ Implementation Details
- **Provider:** Meta Graph API (Official).
- **Service:** `whatsapp.service.js`.
- **Pre-requisite:** Phone numbers must be in international format (e.g. `91XXXXXXXXXX`).

## 🛡️ Security
All WhatsApp API requests require a `WHATSAPP_API_KEY` stored in environment variables. If the key is missing, the service is designed to **fail silently** (logging a warning) to ensure the core user journey (checkout) isn't blocked.

---
[Home](../../README.md)
