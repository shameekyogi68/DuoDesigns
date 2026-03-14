/**
 * @file         useScrollToTop.js
 * @description  Hook to reset scroll position to the top of the page.
 *               Typically triggered on route changes.
 *
 * @module       hooks/useScrollToTop
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * @hook useScrollToTop
 * @description Automatically scrolls to window (0,0) when location changes.
 */
export const useScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
};
