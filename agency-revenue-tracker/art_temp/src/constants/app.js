export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Agency Revenue Tracker';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  ORDERS: '/orders',
  MONTHLY: '/monthly',
  REPORTS: '/reports',
  SETTINGS: '/settings',
};

export const SYNC_INTERVAL = parseInt(import.meta.env.VITE_SYNC_INTERVAL) || 300000;
export const DEFAULT_COMMISSION_RATE = parseFloat(import.meta.env.VITE_COMMISSION_RATE) || 0.05;

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
