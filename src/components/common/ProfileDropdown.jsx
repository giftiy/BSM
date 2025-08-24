// /src/components/common/ProfileDropdown.jsx
import React from 'react';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Redesign.css';

const ProfileDropdown = ({ isOpen, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="profile-dropdown">
      <div className="profile-summary">
        <h5>John Doe</h5>
        <span>Customer</span>
      </div>
      <ul>
        <li><FaUser /> My Profile</li>
        <li><FaCog /> Settings</li>
        <li onClick={onLogout}><FaSignOutAlt /> Logout</li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;