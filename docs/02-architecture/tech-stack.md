---
title:        Tech Stack Rationale
section:      02-architecture
last-updated: 2025-03-13
maintained-by:System Architect
status:       Approved
---

# 🛠️ Tech Stack Rationale

Choosing the right tools determines the long-term scalability and maintainability of the project. Duo Designs uses a "MERN-lite" stack optimized for speed and modern aesthetics.

## 🎨 Frontend Stack

| Tool | Usage | Why? |
| :--- | :--- | :--- |
| **React** | Framework | Industry standard, component-based, massive ecosystem. |
| **Vite** | Build Tool | Blazing fast HMR (Hot Module Replacement) and optimized builds. |
| **Vanilla CSS** | Styling | Best-in-class performance. For the unique bold design of Duo Designs, utility frameworks like Tailwind were bypassed to ensure pixel-perfect control over every CSS variable. |
| **React Router** | Navigation | Standard for SPA navigation and nested routing. |
| **Zustand** | State Management | Much simpler and lighter than Redux. Perfect for cart, auth, and global loading states. |
| **Axios** | API Fetching | Interceptors for auto-injecting JWT tokens and handling error responses globally. |
| **React Hook Form** | Form Handling | Performance-focused validation without unnecessary re-renders. |

---

## ⚙️ Backend Stack

| Tool | Usage | Why? |
| :--- | :--- | :--- |
| **Node.js** | Runtime | Unified language (JS) across the entire stack. |
| **Express** | Web Framework | Lightweight, modular, and perfect for building RESTful APIs. |
| **Mongoose** | MongoDB ODM | Native validation, schema enforcement, and easy-to-use query builder. |
| **JWT** | Auth | Stateless sessions. Users stay logged in across subdomains without extra overhead. |
| **Bcrypt.js** | Security | Standard for hashing sensitive data (though we primarily use OTPs). |

---

## 🛠️ Infrastructure & Services

| Tool | Usage | Why? |
| :--- | :--- | : :--- |
| **MongoDB Atlas** | Database | Managed NoSQL. Perfect for flexible product schemas and JSON-heavy order objects. |
| **Cloudinary** | Assets | Excellent on-the-fly image transformations (e.g. creating mockups/thumbnails automatic). |
| **Razorpay** | Payments | The gold standard for Indian fintech. Best UPI and Card success rates. |
| **Nodemailer** | Emails | Robust library for sending transactional emails via SMTP. |
| **pdf-lib** | Invoices | High-performance PDF generation directly in the Node.js runtime. |

---

## 🧪 Development Tools

| Tool | Usage | Why? |
| :--- | :--- | :--- |
| **Nodemon** | Dev Runtime | Auto-restarts server on file change. |
| **Postman** | API Testing | Documenting and sharing API endpoints between frontend and backend devs. |
| **Morgan / Winston** | Logging | Morgan for request logging, Winston for persistent structured error logs. |
| **Jest / Supertest** | Testing | Fast unit and integration testing suite. |

## 🚀 Why "No CSS Framework"?
Duo Designs follows a **"Zero Border Radius"** and **"Bebas Neue High Bold"** design language. Modern frameworks carry heavy defaults that often fight against brand-specific aesthetics. By using custom CSS variables (found in `src/styles/variables.css`), we ensure that updating a single color or border-width updates the *entire* site (Customer + Admin) instantly with zero overhead.

---
[Related: 02-architecture/folder-structure.md](./folder-structure.md) | [Home](../README.md)
