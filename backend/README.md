# Duo Designs Backend

Production-ready Node.js REST API for Duo Designs — a custom print e-commerce platform in India.

## Stack
- **Node.js + Express** (Backend framework)
- **MongoDB Atlas + Mongoose** (Database + ODM)
- **Razorpay** (Payment Gateway for UPI/Cards in INR)
- **Cloudinary** (Image hosting & transformations)
- **Gmail SMTP** (Transactional emails)
- **pdf-lib** (Dynamic Tax Invoice generation)
- **JWT + bcrypt** (Stateless authentication & Security)

## Setup & Run

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file based on `.env.example`:
   ```env
   NODE_ENV=development
   PORT=5000
   CLIENT_URL=http://localhost:5173

   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key

   SMTP_EMAIL=your_gmail@gmail.com
   SMTP_PASSWORD=your_gmail_app_password

   RAZORPAY_KEY_ID=rzp_test_xxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx

   CLOUDINARY_CLOUD_NAME=duo-designs
   CLOUDINARY_API_KEY=xxxxxx
   CLOUDINARY_API_SECRET=xxxxxx
   ```

3. **Start the server**
   ```bash
   npm run dev       # Development (nodemon)
   npm start         # Production
   ```

## Key Features

- **OTP Authentication**: 6-digit email OTPs, 10-minute expiry, max 3 attempts.
- **GST Engine**: Auto-splits tax into CGST/SGST (intra-state) or IGST (inter-state) based on delivery address vs seller state (Karnataka).
- **Automated Invoices**: Generates professional PDF tax invoices upon order placement.
- **Delivery Rules**: Validates pincodes before checkout.
- **Cloudinary Streams**: Stores all customer uploads and product media securely. 
- **Rate Limiting**: Protects auth endpoints against brute force attacks.
