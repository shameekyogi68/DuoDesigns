/** @file app.js — Application-wide constants */
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Duo Designs Admin';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const LOW_STOCK_THRESHOLD = 10;
export const ORDERS_PER_PAGE = 20;
export const POLL_INTERVAL_NEW_ORDERS = 30000;
export const POLL_INTERVAL_DASHBOARD = 60000;
export const ORDER_STATUSES = ['all', 'placed', 'confirmed', 'dispatched', 'delivered', 'cancelled'];
export const PRODUCT_CATEGORIES = [
  { value: 'tshirt', label: 'Regular T-Shirt' },
  { value: 'oversized', label: 'Oversized' },
  { value: 'trackpants', label: 'Trackpants' },
  { value: 'mug', label: 'Mugs' },
  { value: 'keychain', label: 'Keychains' },
];
export const GST_RATE = 0.18;
export const COMMISSION_RATE = 0.05;
export const SELLER_STATE = 'Karnataka';
