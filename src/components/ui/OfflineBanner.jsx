/**
 * @file         OfflineBanner.jsx
 * @description  Sticky banner that appears when the user is offline.
 * @module       components/ui/OfflineBanner
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React, { useState, useEffect } from 'react';
import './OfflineBanner.css';

const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="offline-banner">
      <div className="offline-content">
        <span className="offline-icon">⚡</span>
        <span className="offline-text">YOU ARE CURRENTLY OFFLINE. BROWSING MODE ENABLED.</span>
      </div>
    </div>
  );
};

export default OfflineBanner;
