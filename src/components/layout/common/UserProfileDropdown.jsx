// /src/components/layout/common/UserProfileDropdown.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // <== Link import godhaa
import { useAuth } from '../../../context/AuthContext';
import './UserProfileDropdown.css';

// onOpenChangePassword prop haaraa fudhata
const UserProfileDropdown = ({ onOpenChangePassword }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="user-profile-dropdown" onMouseLeave={() => setIsOpen(false)}>
      <div className="profile-activator" onMouseEnter={() => setIsOpen(true)}>
        <img src={`https://i.pravatar.cc/40?u=${user.id}`} alt="Profile" />
        <div className="profile-info">
          <span className="user-name">{user.fullName}</span>
          <span className="user-role">{user.role}</span>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <Link to="/profile" className="dropdown-item">View Profile</Link>
          <button onClick={onOpenChangePassword} className="dropdown-item">Change Password</button>
          <button onClick={logout} className="dropdown-item logout-link">Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;