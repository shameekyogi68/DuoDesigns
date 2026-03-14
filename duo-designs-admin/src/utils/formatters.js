/** @file formatters.js — Utility formatters for currency, dates, text */
import { format } from 'date-fns';

export const formatCurrency = (amount) => {
  if (amount == null) return '₹0';
  return '₹' + Number(amount).toLocaleString('en-IN');
};

export const formatDate = (date) => {
  if (!date) return '—';
  return format(new Date(date), 'd MMM yyyy');
};

export const formatDateTime = (date) => {
  if (!date) return '—';
  return format(new Date(date), 'd MMM yyyy, h:mm a');
};

export const formatOrderId = (id) => id || '—';

export const formatPhone = (phone) => phone || '—';

export const truncateText = (text, length = 40) => {
  if (!text) return '';
  return text.length > length ? text.slice(0, length) + '...' : text;
};

export const getInitials = (name) => {
  if (!name) return '??';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
};

export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let size = bytes;
  while (size >= 1024 && i < units.length - 1) { size /= 1024; i++; }
  return size.toFixed(1) + ' ' + units[i];
};
