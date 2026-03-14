/**
 * @file         breakpoints.js
 * @description  Responsive design breakpoint constants for JS logic.
 *
 * @module       styles/breakpoints
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

export const BREAKPOINTS = {
    XS: 320,  // small phones
    SM: 480,  // phones
    MD: 768,  // tablets
    LG: 1024, // laptops
    XL: 1280, // desktops
    XXL: 1400 // wide screens
};

export const MEDIA_QUERIES = {
    XS: `(min-width: ${BREAKPOINTS.XS}px)`,
    SM: `(min-width: ${BREAKPOINTS.SM}px)`,
    MD: `(min-width: ${BREAKPOINTS.MD}px)`,
    LG: `(min-width: ${BREAKPOINTS.LG}px)`,
    XL: `(min-width: ${BREAKPOINTS.XL}px)`,
    XXL: `(min-width: ${BREAKPOINTS.XXL}px)`
};
