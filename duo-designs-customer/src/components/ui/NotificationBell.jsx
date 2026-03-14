/**
 * @file         NotificationBell.jsx
 * @description  Header notification bell showing unread count and dropdown trigger.
 * @module       components/ui/NotificationBell
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React, { useState } from 'react';
import './NotificationBell.css';

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(2); // Example mock count
  const [isOpen, setIsOpen] = useState(false);

  // Example notifications
  const notifications = [
    { id: 1, text: "YOUR ORDER #DD101 HAS BEEN DISPATCHED!", time: "2m ago" },
    { id: 2, text: "NEW ARRIVAL: OVERSIZED HOODIES NOW LIVE.", time: "1h ago" }
  ];

  return (
    <div className="notification-wrapper">
      <button 
        className="bell-button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications"
      >
        <svg 
          viewBox="0 0 24 24" 
          width="24" 
          height="24" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          fill="none" 
          strokeLinecap="square"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="dropdown-header">NOTIFICATIONS</div>
          <div className="dropdown-body">
            {notifications.length > 0 ? (
              notifications.map(item => (
                <div key={item.id} className="notification-item">
                  <p className="item-text">{item.text}</p>
                  <span className="item-time">{item.time}</span>
                </div>
              ))
            ) : (
              <div className="empty-notifications">NO NEW UPDATES.</div>
            )}
          </div>
          <div className="dropdown-footer">MARK ALL AS READ</div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
