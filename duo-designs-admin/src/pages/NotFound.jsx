/** @file NotFound.jsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ROUTES } from '@/constants/routes';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#0a0a0a',
      textAlign: 'center',
      padding: '20px'
    }}>
      <Helmet><title>404 — Page Not Found</title></Helmet>
      
      <div style={{ 
        fontFamily: 'var(--font-heading)', 
        fontSize: '120px', 
        color: '#222', 
        lineHeight: 1,
        marginBottom: '20px'
      }}>
        404
      </div>
      
      <div style={{ 
        fontFamily: 'var(--font-heading)', 
        fontSize: '32px', 
        color: 'var(--white)', 
        letterSpacing: '2px',
        marginBottom: '16px'
      }}>
        LOST IN THE VOID
      </div>
      
      <p style={{ 
        color: 'var(--gray)', 
        fontSize: '14px', 
        maxWidth: '400px', 
        marginBottom: '32px',
        lineHeight: 1.6
      }}>
        The page you are looking for does not exist or has been moved to another coordinate.
      </p>
      
      <button 
        className="btn-form" 
        onClick={() => navigate(ROUTES.DASHBOARD)}
      >
        Return to Orbit
      </button>

      <div style={{ marginTop: '40px', opacity: 0.2 }}>
        <img 
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400" 
          alt="" 
          style={{ width: '200px', filter: 'grayscale(1)' }}
        />
      </div>
    </div>
  );
};

export default NotFound;
