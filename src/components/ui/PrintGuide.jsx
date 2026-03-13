/**
 * @file         PrintGuide.jsx
 * @description  UI component to show print specifications (DPI, formats, areas) to the customer during upload.
 * @module       components/ui/PrintGuide
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React from 'react';
import './PrintGuide.css';

const PrintGuide = () => {
  return (
    <div className="print-guide-card">
      <h3 className="guide-title">📐 DESIGN SPECIFICATIONS</h3>
      
      <div className="spec-grid">
        <div className="spec-item">
          <span className="spec-label">FORMAT</span>
          <span className="spec-value">PNG / JPG</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">MIN RES</span>
          <span className="spec-value">300 DPI</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">MAX AREA</span>
          <span className="spec-value">12" x 16"</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">COLOR</span>
          <span className="spec-value">RGB</span>
        </div>
      </div>

      <div className="guide-tips">
        <p className="tip-text">• Use **transparent backgrounds** for apparel for best results.</p>
        <p className="tip-text">• Avoid thin lines below 2pt to ensure print durability.</p>
        <p className="tip-text">• Don't include "Glow" effects; solid colors print best.</p>
      </div>
      
      <div className="quality-warning">
         <span className="warning-icon">⚠️</span>
         <span>LOW QUALITY IMAGES WILL BE REJECTED.</span>
      </div>
    </div>
  );
};

export default PrintGuide;
