# 📚 DOCUMENTATION MASTER PROMPT (Duo Designs)

**Role:** You are a Senior Technical Writer and System Architect.
**Task:** Populate the complete 51-file documentation suite for the "Duo Designs" platform based on the provided directory structure and project summary.

---

## 🏗️ 1. STRUCTURE TO FOLLOW
The documentation is organized into 12 sections:
1. `01-project`: High-level business rules, roles, and legal.
2. `02-architecture`: System design, tech stack, data flow.
3. `03-design`: UI/UX standards and design system.
4. `04-frontend`: React-specific configuration and guides.
5. `05-backend`: Node.js-specific services and logic.
6. `06-api`: Detailed API reference per domain.
7. `07-database`: Data models and relational maps.
8. `08-deployment`: CI/CD, hosting, and environment configs.
9. `09-workflows`: Development standards and PR process.
10. `10-roles`: Guidelines for Admin, Customer, and Support.
11. `11-testing`: Manual and automated test cases.
12. `12-changelog`: Versioning and future roadmap.

---

## 📄 2. FILE STANDARDS
Every markdown file must include:
- **YAML Frontmatter:** `title`, `section`, `last-updated`, `status`.
- **Formatting:** Use tables, code blocks, checklists, and clear headers.
- **Tone:** Professional, developer-friendly, and concise.

---

## 🛠️ 3. CONTENT TO GENERATE
Refer to the `documentation.md` file (if provided) for the full list of titles. If a title is missing content:
- **Project Context:** Assume the project is a premium Indian custom streetwear brand.
- **Tech Stack:** Node.js, Express, MongoDB, React, Razorpay, Cloudinary.
- **Business Logic:** OTP Auth, GST calculation, Print-on-demand fulfillment.

---

## 🚀 4. EXECUTION
1. Create the base `docs/README.md` as the table of contents.
2. Iterate through each directory (`01` through `12`).
3. If a file exists but is a placeholder, expand it with real technical details.
4. If a file is missing, create it using the standard template.
5. Ensure all cross-links between documentation files are functional.

---

## 🎯 GOAL
Create a "Bible" for the Duo Designs platform that allows any new developer, designer, or business partner to understand exactly how the system works without asking questions.
