import React from 'react';

const PageLoader = () => {
  return (
    <div style={{
      width: '100%',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '24px',
      padding: '40px'
    }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          letter-spacing: 4px;
          color: var(--black);
          opacity: 0.1;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0% { opacity: 0.05; transform: scale(0.95); }
          50% { opacity: 0.15; transform: scale(1.05); }
          100% { opacity: 0.05; transform: scale(0.95); }
        }
        .skeleton-bar {
          width: 200px;
          height: 4px;
          background: #f0f0f0;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
          border-radius: 2px;
        }
      `}</style>
      <div className="skeleton-logo">DUO DESIGNS</div>
      <div className="skeleton-bar"></div>
    </div>
  );
};

export default PageLoader;
