// /src/components/layout/customer/CustomerSidebar.jsx

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUniversity, FaExchangeAlt, FaBell, FaMoneyBillWave, FaSignOutAlt, FaPiggyBank } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext.jsx';
import './CustomerLayout.css';

const CustomerSidebar = () => {
  const { logout } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();

  const customerLinks = [
    { icon: <FaTachometerAlt />, text: 'Dashboard', path: '/customer/dashboard' },
    { icon: <FaUniversity />, text: 'Accounts', path: '/customer/accounts' },
    { icon: <FaExchangeAlt />, text: 'Transactions', path: '/customer/transactions' },
    { icon: <FaBell />, text: 'Notifications', path: '/customer/notifications' },
    { icon: <FaMoneyBillWave />, text: 'Cardless', path: '/customer/cardless' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand"> <FaPiggyBank /> <h2 className="logo">MyBank</h2> </div>
      <nav className="sidebar-nav">
        {customerLinks.map(link => (
          <NavLink key={link.path} to={link.path} className="sidebar-link" end>
            {link.icon} <span>{link.text}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button onClick={logout} className="sidebar-link logout-btn">
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default CustomerSidebar;