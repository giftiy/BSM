// /src/components/layout/admin/AdminSidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

// VVVV --- SIRREEFFAMNI AS JIRA: 'FaExchangeAlt' dabalaa --- VVVV
import {
  FaShieldAlt,
  FaChartLine,
  FaUserCog,
  FaFileInvoice,
  FaUsers,
  FaUniversity,
  FaExchangeAlt, // KANA ITTI DABALAA
  FaSignOutAlt,
  FaKey,
  FaBell
  
} from 'react-icons/fa';
// AAAA -------------------------------------------------------- AAAA

import '../staff/Sidebar.css';

const AdminSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand"><FaShieldAlt /><h2>Admin Panel</h2></div>
      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className="nav-link" end><FaChartLine /><span>Dashboard</span></NavLink>
        <NavLink to="/admin/users" className="nav-link"><FaUserCog /><span>Users</span></NavLink>
        <NavLink to="/admin/audit-logs" className="nav-link"><FaFileInvoice /><span>Audit Logs</span></NavLink>

        {/* Amma kuni sirriitti hojjeta */}
        <NavLink to="/admin/all-transactions" className="nav-link"><FaExchangeAlt /><span>All Transactions</span></NavLink>
          <NavLink to="/admin/notification" className="nav-link"><FaBell /><span>Notification</span></NavLink>
        <NavLink to="/admin/accounts" className="nav-link"><FaUsers /><span>Accounts</span></NavLink>
        <NavLink to="/admin/reports" className="nav-link"><FaChartLine /><span>Reports</span></NavLink>
        <NavLink to="/admin/reset-password" className="nav-link"><FaKey /><span>Reset Password</span></NavLink>
      </nav>
      <div className="sidebar-footer"><a href="/login" className="nav-link logout"><FaSignOutAlt /><span>Logout</span></a></div>
    </aside>
  );
};

export default AdminSidebar;