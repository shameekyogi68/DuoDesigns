/**
 * @file         useDocumentTitle.js
 * @description  Hook to update the browser tab title dynamically.
 *
 * @module       hooks/useDocumentTitle
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import { useEffect } from 'react';
import { APP_NAME } from '../constants/app';

export const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title ? `${title} — ${APP_NAME}` : APP_NAME;
    }, [title]);
};
