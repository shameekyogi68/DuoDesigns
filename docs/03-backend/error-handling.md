---
title: Error Handling
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Error Handling

Duo Designs uses a global error-handling strategy to ensure no sensitive information is leaked and all errors are returned in a standard JSON format.

## 🏗️ The Middleware
Found in `src/middleware/error.middleware.js`.

### 1. `notFound`
Catches any request to a route that doesn't exist and passes a `404` to the main error handler.

### 2. `errorHandler`
Catches all errors (synchronous and asynchronous) and formats them:
- **Mongoose Validation**: Returns `400` with descriptive error messages.
- **Duplicate Key**: Returns `409 Conflict`.
- **Cast Error**: Returns `400 Invalid ID`.
- **Production vs Dev**: Stack traces are only visible in `development` mode.

## 📡 Sentry Integration
In production, all unhandled exceptions are automatically reported to Sentry via the `initSentryErrorHandler` middleware in `app.js`.

---
[Related: API Overview](./api-overview.md) | [Related: Tech Stack](../02-architecture/tech-stack.md)
