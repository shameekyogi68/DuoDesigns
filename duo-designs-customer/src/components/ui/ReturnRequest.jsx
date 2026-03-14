/**
 * @file         ReturnRequest.jsx
 * @description  UI component for customers to submit a return/replacement request.
 * @module       components/ui/ReturnRequest
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React, { useState } from 'react';
import './ReturnRequest.css';

const ReturnRequest = ({ orderId, onClose, onSubmit }) => {
  const [reason, setReason] = useState('damaged');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ orderId, reason, description, images });
  };

  return (
    <div className="return-modal-overlay">
      <div className="return-modal-card">
        <header className="modal-header">
          <h2 className="modal-title">REPORT AN ISSUE</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>

        <form onSubmit={handleSubmit} className="return-form">
          <div className="form-group">
            <label className="input-label">REASON FOR RETURN</label>
            <select 
              className="form-select"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="wrong_item">WRONG ITEM RECEIVED</option>
              <option value="damaged">DAMAGED ON ARRIVAL</option>
              <option value="quality_issue">PRINT QUALITY ISSUE</option>
              <option value="size_mismatch">SIZE DOES NOT MATCH CHART</option>
            </select>
          </div>

          <div className="form-group">
            <label className="input-label">DESCRIPTION</label>
            <textarea 
              className="form-textarea"
              placeholder="Tell us what's wrong..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="input-label">UPLOAD PROOF (IMAGES)</label>
            <div className="upload-placeholder">
               <span>DRAG & DROP OR CLICK TO UPLOAD</span>
               {/* Image upload logic would go here */}
            </div>
            <p className="upload-note">MAX 3 IMAGES. CLEAR PHOTOS OF DAMAGE/DEFECT REQUIRED.</p>
          </div>

          <button type="submit" className="submit-return-btn">
            SUBMIT REQUEST
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReturnRequest;
