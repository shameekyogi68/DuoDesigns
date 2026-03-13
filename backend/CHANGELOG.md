# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-03-13
### Added
- Complete API schema spanning 8 Mongoose models
- Secured via JWT + Refresh Tokens (30d) + bcrypt
- Razorpay Webhook processor ensuring correct transaction status tracking
- Complete OTP flow allowing quick login + robust recovery
- Full logging suite via Winston and Morgan
- Added Admin dashboard aggregated endpoint exposing comprehensive metrics
- Bulk CSV shipping data import pipeline
- MongoDB sanitization + XSS parsing shielding all protected endpoints
- Integrated PDF invoice pipeline using pdf-lib
