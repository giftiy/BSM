// /src/components/layout/DashboardLayout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import NotificationPopover from '../common/NotificationPopover';
import ProfileDropdown from '../common/ProfileDropdown';

const DashboardLayout = ({ children }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => alert('Logging out...');

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Navbar 
          onNotificationClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
          onProfileClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
        />
        <div className="content-area">
          {children}
        </div>
        
        <NotificationPopover isOpen={showNotifications} />
        <ProfileDropdown isOpen={showProfile} onLogout={handleLogout} />
      </main>
    </div>
  );
};

export default DashboardLayout;
