---
title:        Database Indexing Strategy
section:      07-database
last-updated: 2025-03-13
status:       Approved
---

# 🚀 Database Indexing Strategy

Indexing is critical for maintaining high performance as the Duo Designs catalog and order history grow.

## 👥 User Collection
| Field | Type | Why? |
| :--- | :--- | :--- |
| `email` | Unique | Used for every login and OTP request. |

## 📦 Product Collection
| Field | Type | Why? |
| :--- | :--- | :--- |
| `category` | Standard | High-frequency filtering on the Shop page. |
| `price` | Standard | Efficient sorting on the Shop page. |
| `name, description` | **Text** | Powers the global search bar. |

## 🧾 Order Collection
| Field | Type | Why? |
| :--- | :--- | :--- |
| `orderNumber` | Unique | Public tracking and Admin search. |
| `user` | Standard | Loading order history for the "My Account" page. |
| `status` | Standard | Dashboard analytics and Admin filtering. |
| `createdAt` | TTL / Sort | Sorting by newest and potential archival logic. |

## 📍 Pincode Collection
| Field | Type | Why? |
| :--- | :--- | :--- |
| `pincode` | Unique | Looked up on every checkout to verify pricing/tax. |

---

## 🏗️ Creating a New Index
Always add indexes via the Mongoose schema definition for visibility:

```javascript
// Example in Product.js
productSchema.index({ category: 1, basePrice: -1 }); // Compound index
productSchema.index({ name: 'text', description: 'text' });
```

## 🧪 Performance Profiling
Use the **MongoDB Atlas Performance Advisor** to identify slow queries that may require new compound indexes. We aim for all common queries to have an `executionTime` below **50ms**.

---
[Home](../README.md)
