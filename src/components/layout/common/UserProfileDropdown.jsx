// Faayilii: /src/components/layout/common/UserProfileDropdown.jsx

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FaUser, FaEnvelope, FaShieldAlt, FaKey, FaArrowLeft } from 'react-icons/fa';
import './UserProfileDropdown.css';

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('menu');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  
  const timerRef = useRef(null); 

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
      setView('menu'); 
    }, 300); // 300ms (0.3 seconds)
  };
  // AAAA ------------------------------ AAAA

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handlePasswordChange = (e) => {
      e.preventDefault();
      alert("Password changed successfully! (Demo)");
      setView('menu');
  };

  const renderContent = () => {
    switch (view) {
      case 'profile':
        return (
          <div className="dropdown-view">
            <button className="back-btn" onClick={() => setView('menu')}><FaArrowLeft /> Back</button>
            <div className="profile-summary">
              <img src={`https://i.pravatar.cc/80?u=${user.id}`} alt="Profile" />
              <h4>{user.fullName}</h4>
              <p>{user.email}</p>
            </div>
            <div className="profile-details">
                <p><FaUser /> <strong>Full Name:</strong> {user.fullName}</p>
                <p><FaEnvelope /> <strong>Email:</strong> {user.email}</p>
                <p><FaShieldAlt /> <strong>Role:</strong> {user.role}</p>
            </div>
          </div>
        );
      case 'password':
        return (
          <div className="dropdown-view">
            <button className="back-btn" onClick={() => setView('menu')}><FaArrowLeft /> Back</button>
            <form className="change-password-form" onSubmit={handlePasswordChange}>
                <h5><FaKey/> Change Your Password</h5>
                <input type="password" placeholder="Current Password" required />
                <input type="password" placeholder="New Password" required />
                <input type="password" placeholder="Confirm New Password" required />
                <button type="submit">Update Password</button>
            </form>
          </div>
        );
      default:
        return (
          <>
            <button onClick={() => setView('profile')} className="dropdown-item">View Profile</button>
            <button onClick={() => setView('password')} className="dropdown-item">Change Password</button>
            <button onClick={handleLogout} className="dropdown-item logout-link">Logout</button>
          </>
        );
    }
  };

  return (
    
    <div className="user-profile-dropdown" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
      <div className="profile-activator">
        <img src={`https://i.pravatar.cc/40?u=${user.id}`} alt="Profile" />
        <div className="profile-info">
          <span className="user-name">{user.fullName}</span>
          <span className="user-role">{user.role}</span>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown-menu wide">
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;