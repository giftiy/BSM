// /src/components/layout/staff/StaffLayout.jsx

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import StaffChatWidget from './StaffChatWidget';
import './StaffLayout.css';

const StaffLayout = ({ children, searchTerm, onSearchChange }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };
  
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
  
    <>
      <div className="staff-layout">
        <Sidebar />
        <div className="main-container">
          <TopNavbar 
              onThemeToggle={toggleTheme} 
              theme={theme}
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
          />
          <main className="content-area">
            {children}
          </main>
        </div>
      </div>
      <StaffChatWidget />
    </>
   
  );
};

export default StaffLayout;