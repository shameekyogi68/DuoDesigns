/**
 * @file         EmptyState.jsx
 * @description  Reusable component for displaying an empty state message.
 *               Used across Cart, Wishlist, and Order history pages.
 *
 * @module       components/common/EmptyState
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react
 *   - react-router-dom (Link)
 *   - constants/routes (ROUTES)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROUTES } from '../../constants/routes';

/**
 * @component EmptyState
 * @description A generic, visually appealing placeholder for empty screens.
 *
 * @param {Object} props - Component props
 * @param {string} props.icon - Emoji or icon character to display
 * @param {string} props.title - Main heading text
 * @param {string} props.message - Descriptive sub-text
 * @param {string} [props.btnText] - Optional button label
 * @param {string} [props.btnLink] - Optional route for the button link
 *
 * @returns {JSX.Element} Centered empty state feedback block
 *
 * @example
 *   <EmptyState
 *     icon="🛒"
 *     title="EMPTY CART"
 *     message="Add something to see it here."
 *   />
 */
const EmptyState = ({ icon, title, message, btnText = 'Start Shopping', btnLink = ROUTES.SHOP }) => {
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
      <p className="empty-subtitle">{message}</p>
      <Link to={btnLink} className="empty-btn">
        {btnText} →
      </Link>
    </div>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  btnText: PropTypes.string,
  btnLink: PropTypes.string
};

export default EmptyState;
