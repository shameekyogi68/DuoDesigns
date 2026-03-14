/** @file validators.js — Input validation helpers */
export const isValidGSTIN = (gstin) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstin);
export const isValidPincode = (pincode) => /^[1-9][0-9]{5}$/.test(pincode);
export const isValidPhone = (phone) => /^(\+91[\-\s]?)?[0]?(91)?[6-9]\d{9}$/.test(phone?.replace(/\s/g, ''));
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidOrderId = (id) => /^#?DD-\d{4}$/.test(id);
