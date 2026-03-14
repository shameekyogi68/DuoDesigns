---
title: Dashboard API
app: Admin Panel
section: 04-api-reference
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Dashboard API

Centralized stats for the internal operational dashboard.

### `GET /admin/dashboard`
Returns a snapshot of the business health.
- **Auth**: Admin Token
- **Response Data**:
  ```json
  {
    "orders": { "total": 1500, "pending": 12 },
    "revenue": { "mtd": 450000, "allTime": 2500000 },
    "stock": { "criticalItems": 5 }
  }
  ```

---

# Search API

### `GET /search`
Fuzzy full-text search across product names and descriptions.
- **Query**: `?q=oversized`
- **Logic**: Uses MongoDB `$text` search index.

---
[Related: Database Indexes](../03-backend/database-indexes.md)
