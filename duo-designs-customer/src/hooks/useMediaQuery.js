/**
 * @file         useMediaQuery.js
 * @description  Custom hook for responsive design logic.
 *
 * @module       hooks/useMediaQuery
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import { useState, useEffect } from 'react';

/**
 * @hook useMediaQuery
 * @description Listens for media query matches.
 *
 * @param {string} query - CSS media query string
 * @returns {boolean} True if query matches
 */
export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
};
