/**
 * @file         NotFound.jsx
 * @description  404 error page for Duo Designs.
 *               Displayed when a user navigates to a non-existent route.
 *               Provides quick links to return home or browse products.
 *
 * @module       pages/NotFound
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react
 *   - react-router-dom (Link)
 *   - constants/routes (ROUTES)
 *
 * @notes
 *   - Minimalistic design with a large background "404" indicator.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

/**
 * @component NotFound
 * @description Page component for handling 404 errors.
 *
 * @returns {JSX.Element} 404 error layout with navigation options
 *
 * @example
 *   <NotFound />
 */
export default function NotFound() {
    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px 20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background number */}
            <div style={{
                position: 'absolute',
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(200px, 40vw, 400px)',
                color: 'var(--card-bg)',
                lineHeight: '1',
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 0
            }}>
                404
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    fontSize: '64px',
                    marginBottom: '16px'
                }}>
                    🔍
                </div>
                <h1 style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: 'clamp(42px, 6vw, 72px)',
                    letterSpacing: '3px',
                    marginBottom: '12px'
                }}>
                    PAGE NOT FOUND
                </h1>
                <p style={{
                    fontSize: '16px',
                    color: 'var(--gray)',
                    maxWidth: '400px',
                    lineHeight: '1.7',
                    marginBottom: '40px',
                    fontFamily: '"Inter", sans-serif'
                }}>
                    The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to={ROUTES.HOME} className="btn-primary">
                        ← Back to Home
                    </Link>
                    <Link to={ROUTES.SHOP} className="btn-outline">
                        Browse Products
                    </Link>
                </div>
            </div>
        </div>
    );
}
