/**
 * @file         ScrollToTop.jsx
 * @description  Route transition utility for Duo Designs.
 *               Ensures the window scrolls to the top of the page on every
 *               navigation change to maintain UX consistency.
 *
 * @module       components/common/ScrollToTop
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react (useEffect)
 *   - react-router-dom (useLocation)
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * @component ScrollToTop
 * @description Invisible utility component that manages scroll position on route changes.
 *
 * @returns {null} Renders nothing
 *
 * @example
 *   // Typically used within Router
 *   <ScrollToTop />
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
