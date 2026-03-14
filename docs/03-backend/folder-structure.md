---
title: Folder Structure
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Backend Folder Structure

The backend follows a traditional **Controller-Service-Model** pattern to ensure clean separation of concerns.

```text
backend/
├── src/
│   ├── config/         # App configurations (logger, database, Sentry)
│   ├── controllers/    # Request handling & HTTP logic
│   ├── jobs/           # Scheduled cron jobs (node-cron)
│   ├── middleware/     # Auth, Error, Rate limit, and Body parsing
│   ├── models/         # Mongoose schemas (The Data Layer)
│   ├── routes/         # Express route definitions
│   ├── services/       # Core business logic (Payments, Emails, GST)
│   ├── utils/          # Reusable helper functions
│   ├── validators/     # Request body validation rules
│   └── app.js          # Express app entry
├── server.js           # Server startup and listener
└── package.json        # Dependencies and scripts
```

## Key Files
- **`server.js`**: Connects to the database first, then starts the listener.
- **`src/app.js`**: Where all global middleware (Helmet, CORS, Morgan) and API routes are registered.
- **`src/services/`**: The "Heart" of the app. All heavy computations happen here (e.g., GST calculation, Razorpay logic).

---
[Related: API Overview](./api-overview.md) | [Related: Database Schemas](./database-schemas.md)
