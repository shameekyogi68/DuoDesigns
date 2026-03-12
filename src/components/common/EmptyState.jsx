import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const EmptyState = ({ icon, title, subtitle, actionText = 'Start Shopping', actionLink = ROUTES.SHOP }) => {
  return (
    <div className="empty-state reveal">
      <style>{`
        .empty-state {
          text-align: center;
          padding: 80px 40px;
          max-width: 500px;
          margin: 0 auto;
        }
        .empty-icon {
          font-size: 84px;
          margin-bottom: 24px;
          display: block;
          animation: float 4s ease-in-out infinite;
        }
        .empty-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 2px;
          line-height: 1;
          margin-bottom: 12px;
          color: var(--black);
        }
        .empty-subtitle {
          font-size: 15px;
          color: var(--gray);
          line-height: 1.6;
          margin-bottom: 32px;
        }
        .empty-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 36px;
          background: var(--black);
          color: var(--white);
          text-decoration: none;
          font-family: 'Barlow', sans-serif;
          font-weight: 800;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          transition: all 0.3s ease;
          border: 2px solid var(--black);
        }
        .empty-btn:hover {
          background: var(--accent);
          color: var(--black);
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
      <span className="empty-icon">{icon}</span>
      <h2 className="empty-title">{title}</h2>
      <p className="empty-subtitle">{subtitle}</p>
      <Link to={actionLink} className="empty-btn">
        {actionText} →
      </Link>
    </div>
  );
};

export default EmptyState;
