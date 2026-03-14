---
title: Architectural Decisions (ADR)
app: All
section: 15-changelog
last-updated: 2025-03-14
maintained-by: Technical Lead
status: Current
---

# Architectural Decision Log

Recording the "Why" behind our system design.

## 1. Monorepo vs Microrepos
- **Decision**: Monorepo.
- **Why**: 1 developer team. Ease of cross-application logic (GST, models) and single-command deployments.

## 2. NoSQL (MongoDB) vs SQL
- **Decision**: MongoDB.
- **Why**: High flexibility for `Product` variants and `Order` payloads (which vary wildly for custom prints).

## 3. JWT vs Sessions
- **Decision**: JWT.
- **Why**: Scaling the backend on Render (FaaS style) becomes easier when the server doesn't need to track session state in memory.

## 4. OTP vs Password
- **Decision**: OTP Login for Customers.
- **Why**: Reduces friction for mobile users and removes the "Forgot Password" support burden.

---
[Next: Version History](./v1-launch.md) | [Next: Future Roadmap](./future-roadmap.md)
