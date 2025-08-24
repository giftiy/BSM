// /src/components/layout/admin/AdminLayout.jsx
import React, { useContext } from 'react';
import AdminSidebar from './AdminSidebar';
import TopNavbar from '../staff/TopNavbar'; // Isa duraanii fayyadamna
import StaffChatWidget from '../staff/StaffChatWidget'; // Isa duraanii fayyadamna
import { ThemeContext } from '../../../context/ThemeContext';
import '../staff/StaffLayout.css'; // CSS isa duraanii fayyadamna

const AdminLayout = ({ children, searchTerm, onSearchChange }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <div className="staff-layout">
        <AdminSidebar />
        <div className="main-container">
          <TopNavbar onThemeToggle={toggleTheme} theme={theme} searchTerm={searchTerm} onSearchChange={onSearchChange} />
          <main className="content-area">{children}</main>
        </div>
      </div>
      <StaffChatWidget />
    </>
  );
};
export default AdminLayout;