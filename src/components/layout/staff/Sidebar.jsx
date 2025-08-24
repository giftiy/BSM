// /src/components/layout/staff/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { 
  FaTachometerAlt, 
  FaExchangeAlt, 
  FaUserCheck, 
  FaUserPlus, 
  FaUsers, 
  FaSignOutAlt, 
  FaUniversity 
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <FaUniversity />
        <h2>Staff Panel</h2>
      </div>
      <nav className="sidebar-nav">
        

        <NavLink to="/staff/dashboard" className="nav-link" end>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/staff/transactions" className="nav-link">
          <FaExchangeAlt />
          <span>Transactions</span>
        </NavLink>

        <NavLink to="/staff/account-approval" className="nav-link">
          <FaUserCheck />
          <span>Account Approval</span>
        </NavLink>

        <NavLink to="/staff/create-account" className="nav-link">
          <FaUserPlus />
          <span>Create Account</span>
        </NavLink>

        
        <NavLink to="/staff/manage-customers" className="nav-link">
          <FaUsers />
          <span>Manage Customers</span>
        </NavLink>

        {/* AAAA -------------------------------------------------------- AAAA */}
      </nav>
      <div className="sidebar-footer">
       
        <a href="/login" className="nav-link logout">
          <FaSignOutAlt />
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;