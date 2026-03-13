---
title:        Backend Architecture (MVC)
section:      05-backend
last-updated: 2025-03-13
maintained-by:Backend Lead
status:       Approved
---

# ⚙️ Backend Architecture (MVC)

The Duo Designs API follows a classic **MVC + Service Layer** pattern to ensure separations of concerns and testability.

## 🏛️ Layered Structure

### 1. **Routes Layer (`src/routes/`)**
- **Purpose:** Entry points for API requests.
- **Responsibility:** Mapping URLs to controller methods.
- **Example:** `router.post('/login', authController.login);`

### 2. **Controller Layer (`src/controllers/`)**
- **Purpose:** Handling request parsing and response sending.
- **Responsibility:** Calling the necessary services and formatting the JSON output using `apiResponse` utils.
- **Rule:** Controllers should NOT contain complex calculations (e.g., GST or payment algorithms).

### 3. **Service Layer (`src/services/`)**
- **Purpose:** Core business logic.
- **Responsibility:** Heavy lifting like `calculateGST()`, `sendEmail()`, or `createRazorpayOrder()`.
- **Why?** This allows the same logic to be reused in different controllers or Cron jobs.

### 4. **Models Layer (`src/models/`)**
- **Purpose:** Data persistence.
- **Responsibility:** Defining Mongoose schemas, field validation, and pre-save hooks.

---

## 🏗️ The Request Lifecycle

1. **Client:** Sends a `POST` request.
2. **Middleware:** 
   - `helmet` & `cors` run first.
   - `authMiddleware` verifies JWT.
   - `validatorMiddleware` checks body format (e.g., is email valid?).
3. **Route:** Finds the matching handler.
4. **Controller:** Extracts `req.body` and calls a **Service**.
5. **Service:** Queries the **Database** model and performs logic.
6. **Response:** Controller uses `sendSuccess()` utility to return a 200/201.

---

## 🛠️ Global Handling Utilities

### `asyncHandler.js`
Wraps every controller method to automatically catch errors and pass them to the global error handler. This eliminates `try...catch` boilerplate.

### `apiResponse.js`
Ensures every success and error response has the exact same JSON structure:
```json
{
  "success": true,
  "message": "Update successful",
  "data": { ... }
}
```

---

## 🛡️ Error Middleware
A centralized `error.middleware.js` identifies specific MongoDB errors (like `Duplicate Key` or `Validation Error`) and converts them into user-friendly messages and appropriate HTTP status codes (400, 404, 500).

---
[Related: 05-backend/database.md](./database.md) | [Home](../README.md)
