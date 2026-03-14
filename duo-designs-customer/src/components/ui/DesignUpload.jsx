/**
 * @file         DesignUpload.jsx
 * @description  Custom design selection and upload component for Duo Designs.
 *               Allows users to either upload their own image files or
 *               select from a gallery of pre-made design icons.
 *
 * @module       components/ui/DesignUpload
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react (useState, useRef)
 *
 * @notes
 *   - Enforces file size limits (10MB) and format restrictions (PNG, JPG).
 *   - Provides real-time selection preview and clearing functionality.
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * @component DesignUpload
 * @description Interactive UI for managing custom design inputs on product pages.
 *
 * @param {Object} props - Component props
 * @param {function} props.onDesignSelected - Callback function invoked when a design is chosen or cleared
 *
 * @returns {JSX.Element} Collapsible design selection panel
 *
 * @example
 *   <DesignUpload onDesignSelected={(design) => console.log(design)} />
 */
export default function DesignUpload({ onDesignSelected }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'premade'
    const [previewName, setPreviewName] = useState('');
    const [previewThumb, setPreviewThumb] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const fileInputRef = useRef(null);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setErrorMsg('');

        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setErrorMsg('File too large! Maximum size is 10MB.');
                return;
            }
            if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
                setErrorMsg('Invalid file type! PNG or JPG only.');
                return;
            }

            setPreviewName(file.name);
            setPreviewThumb('🖼️');
            onDesignSelected({ type: 'upload', file });
        }
    };

    const handlePremadeSelect = (icon) => {
        setPreviewThumb(icon);
        setPreviewName('Pre-made design selected');
        onDesignSelected({ type: 'premade', icon });
    };

    const clearSelection = () => {
        setPreviewName('');
        setPreviewThumb('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        onDesignSelected(null);
    };

    return (
        <div className="design-section">
            <div className="design-header">
                🎨 Custom Design
                <button className="design-toggle" onClick={toggleOpen}>Optional</button>
            </div>

            {isOpen && (
                <div className="design-body">
                    <div className="design-tabs">
                        <button
                            className={`design-tab ${activeTab === 'upload' ? 'active' : ''}`}
                            onClick={() => handleTabSwitch('upload')}
                        >
                            Upload My Design
                        </button>
                        <button
                            className={`design-tab ${activeTab === 'premade' ? 'active' : ''}`}
                            onClick={() => handleTabSwitch('premade')}
                        >
                            Pick Pre-made
                        </button>
                    </div>

                    {activeTab === 'upload' && (
                        <div>
                            <div className="upload-zone" onClick={() => fileInputRef.current.click()}>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept=".png,.jpg,.jpeg"
                                    onChange={handleFileUpload}
                                />
                                <div className="upload-icon">⬆️</div>
                                <div className="upload-text">Click to Upload Your Design</div>
                                <div className="upload-hint">PNG or JPG only · Maximum 10MB</div>
                            </div>
                            {errorMsg && <div style={{ color: 'var(--error)', fontSize: '12px', marginTop: '8px', fontWeight: 'bold' }}>{errorMsg}</div>}
                        </div>
                    )}

                    {activeTab === 'premade' && (
                        <div>
                            <div className="premade-grid">
                                {['🌟', '🔥', '💀', '🌊', '🏔️', '⚡', '🎭', '🌈'].map((icon, i) => (
                                    <div
                                        key={i}
                                        className={`premade-design ${previewThumb === icon ? 'active' : ''}`}
                                        onClick={() => handlePremadeSelect(icon)}
                                    >
                                        {icon}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {previewName && (
                        <div className="design-preview show" style={{ marginTop: '16px' }}>
                            <div className="preview-thumb">{previewThumb}</div>
                            <div className="preview-name">{previewName}</div>
                            <button className="remove-design" onClick={clearSelection}>✕</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

DesignUpload.propTypes = {
    onDesignSelected: PropTypes.func.isRequired
};
