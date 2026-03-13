---
title:        Scheduled Jobs (Cron)
section:      05-backend
last-updated: 2025-03-13
status:       Active
---

# 🕒 Scheduled Jobs (Cron)

The Duo Designs backend uses `node-cron` to handle recurring maintenance tasks and business audits.

## 🛠️ Configuration
Jobs are localized in `backend/src/jobs/` and initialized in `app.js`.

| Job | Frequency | Purpose |
| :--- | :--- | :--- |
| **OTP Cleanup** | Every Hour | Deletes expired OTP codes and reset attempts. |
| **Low Stock Alert** | Daily (9 AM) | Checks inventory and logs warnings for items below threshold (5). |
| **Abandoned Cart** | Weekly | (Planned) Clears cart data older than 7 days. |

---

## 🏗️ Registering a New Job
Create a `.job.js` file in the jobs folder:

```javascript
const cron = require('node-cron');

cron.schedule('0 0 * * *', () => {
  // Logic runs at midnight every day
});
```

Then require it in `jobs/index.js`.

## 🛡️ Best Practices
1. **Error Handling:** Always wrap the job logic in `try-catch` to prevent the server process from crashing.
2. **Logging:** Log the start, results (e.g., "Deleted 5 items"), and errors to the Winston logger.
3. **Atomic Updates:** Use `updateMany` where possible to minimize database load.

---
[Home](../../README.md)
