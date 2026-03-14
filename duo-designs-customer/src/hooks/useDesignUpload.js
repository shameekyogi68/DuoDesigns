/**
 * @file         useDesignUpload.js
 * @description  Hook for handling file selection, validation, and preview generation.
 *
 * @module       hooks/useDesignUpload
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import { useState } from 'react';
import { MAX_UPLOAD_SIZE } from '../constants/app';

export const useDesignUpload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && selected.size <= MAX_UPLOAD_SIZE) {
            setFile(selected);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(selected);
        }
    };

    return { file, preview, handleFileChange };
};
