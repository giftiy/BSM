// /src/components/common/ChangePasswordModal.jsx

import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './ChangePasswordModal.css'; // Faayilii CSS haaraa ni uumna

const ChangePasswordModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password changed successfully! (This is a demo)");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Change Password</h2>
          <button onClick={onClose} className="close-button"><FaTimes /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label>Current Password</label>
            <input type="password" required />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" required />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input type="password" required />
          </div>
          <button type="submit" className="submit-btn">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;