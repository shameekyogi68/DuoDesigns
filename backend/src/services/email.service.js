/**
 * @file         email.service.js
 * @description  Email sending service via Gmail SMTP.
 *               Contains all 5 transactional email templates.
 *
 * @module       services/email
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

/**
 * @function sendMail
 * @description Low-level send helper.
 * @param {string} to      - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html    - HTML body
 * @param {Array}  [attachments] - Optional file attachments
 */
const sendMail = async (to, subject, html, attachments = []) => {
    try {
        await transporter.sendMail({
            from: `"Duo Designs" <${process.env.SMTP_EMAIL}>`,
            to,
            subject,
            html,
            attachments,
        });
        console.log(`📧 Email sent to ${to}: ${subject}`);
    } catch (error) {
        console.error(`❌ Email failed to ${to}:`, error.message);
    }
};

/** 1. OTP Email */
const sendOTPEmail = async (to, otp) => {
    const html = `
    <div style="font-family:'Helvetica',sans-serif;max-width:480px;margin:0 auto;border:2px solid #0a0a0a;padding:40px;">
        <h1 style="font-size:28px;letter-spacing:3px;margin:0 0 8px;">DUO<span style="font-weight:400;">DESIGNS</span></h1>
        <hr style="border:1px solid #e8ff3b;margin:16px 0;">
        <p style="font-size:14px;color:#666;">Your one-time verification code:</p>
        <div style="font-size:42px;font-weight:800;letter-spacing:8px;background:#f5f5f0;padding:16px 24px;text-align:center;margin:20px 0;border:1.5px solid #0a0a0a;">${otp}</div>
        <p style="font-size:12px;color:#999;">This code expires in 10 minutes. Do not share it with anyone.</p>
    </div>`;
    await sendMail(to, `Your Duo Designs OTP — ${otp}`, html);
};

/** 2. Order Confirmed */
const sendOrderConfirmation = async (to, order, invoiceBuffer = null) => {
    const itemsHTML = order.items.map(i =>
        `<tr><td style="padding:8px;border-bottom:1px solid #eee;">${i.name}</td>
         <td style="padding:8px;border-bottom:1px solid #eee;">${i.variant} / ${i.size}</td>
         <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">₹${i.price} × ${i.qty}</td></tr>`
    ).join('');

    const html = `
    <div style="font-family:'Helvetica',sans-serif;max-width:560px;margin:0 auto;border:2px solid #0a0a0a;padding:40px;">
        <h1 style="font-size:24px;letter-spacing:3px;">ORDER CONFIRMED! 🎉</h1>
        <hr style="border:1px solid #e8ff3b;margin:16px 0;">
        <p><strong>Order #:</strong> ${order.orderNumber}</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">${itemsHTML}</table>
        <div style="text-align:right;font-size:20px;font-weight:800;margin-top:16px;">Total: ₹${order.pricing.total}</div>
        <p style="font-size:12px;color:#999;margin-top:24px;">We'll start preparing your custom print right away!</p>
    </div>`;

    const attachments = invoiceBuffer ? [{ filename: `Invoice-${order.orderNumber}.pdf`, content: invoiceBuffer }] : [];
    await sendMail(to, `Order Confirmed! #${order.orderNumber}`, html, attachments);
};

/** 3. Order Dispatched */
const sendDispatchEmail = async (to, order) => {
    const html = `
    <div style="font-family:'Helvetica',sans-serif;max-width:560px;margin:0 auto;border:2px solid #0a0a0a;padding:40px;">
        <h1 style="font-size:24px;letter-spacing:3px;">YOUR ORDER IS ON ITS WAY! 🚚</h1>
        <hr style="border:1px solid #e8ff3b;margin:16px 0;">
        <p><strong>Order #:</strong> ${order.orderNumber}</p>
        <div style="background:#f5f5f0;padding:16px;border:1.5px solid #0a0a0a;margin:16px 0;">
            <p style="margin:0;"><strong>Courier:</strong> ${order.dispatch.courier}</p>
            <p style="margin:4px 0;"><strong>Tracking #:</strong> ${order.dispatch.trackingNumber}</p>
        </div>
        <p style="font-size:12px;color:#999;">Estimated delivery in 3–5 business days.</p>
    </div>`;
    await sendMail(to, `Your Order is on its Way! 🚚 #${order.orderNumber}`, html);
};

/** 4. Order Delivered */
const sendDeliveryEmail = async (to, order) => {
    const html = `
    <div style="font-family:'Helvetica',sans-serif;max-width:560px;margin:0 auto;border:2px solid #0a0a0a;padding:40px;">
        <h1 style="font-size:24px;letter-spacing:3px;">ORDER DELIVERED! 🎨</h1>
        <hr style="border:1px solid #e8ff3b;margin:16px 0;">
        <p><strong>Order #:</strong> ${order.orderNumber}</p>
        <p>We hope you love your custom-printed goodies! If there's any issue, reach out within 48 hours.</p>
        <p style="font-size:12px;color:#999;margin-top:24px;">— Team Duo Designs</p>
    </div>`;
    await sendMail(to, `Order Delivered! Hope you love it 🎨 #${order.orderNumber}`, html);
};

/** 5. Password Reset OTP */
const sendPasswordResetOTP = async (to, otp) => {
    const html = `
    <div style="font-family:'Helvetica',sans-serif;max-width:480px;margin:0 auto;border:2px solid #0a0a0a;padding:40px;">
        <h1 style="font-size:24px;letter-spacing:3px;">RESET YOUR PASSWORD</h1>
        <hr style="border:1px solid #e8ff3b;margin:16px 0;">
        <p style="font-size:14px;color:#666;">Your password reset code:</p>
        <div style="font-size:42px;font-weight:800;letter-spacing:8px;background:#f5f5f0;padding:16px 24px;text-align:center;margin:20px 0;border:1.5px solid #0a0a0a;">${otp}</div>
        <p style="font-size:12px;color:#999;">Expires in 10 minutes. Ignore if you didn't request this.</p>
    </div>`;
    await sendMail(to, `Reset Your Duo Designs Password`, html);
};

module.exports = {
    sendMail,
    sendOTPEmail,
    sendOrderConfirmation,
    sendDispatchEmail,
    sendDeliveryEmail,
    sendPasswordResetOTP,
};
