//src/components/layout/Sidebar.jsx 

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUniversity, 
  FaExchangeAlt, 
  FaBell, 
  FaMoneyBillWave, 
  FaSignOutAlt, 
  FaPiggyBank 
} from 'react-icons/fa';

import { useAuth } from '../../context/AuthContext.jsx'; 
// AAAA -------------------------------------------- AAAA
import './Layout.css';

const Sidebar = () => {
  const { logout } = useAuth(); 
  const location = useLocation();

  const customerLinks = [
    { icon: <FaTachometerAlt />, text: 'Dashboard', path: '/dashboard' },
    { icon: <FaUniversity />, text: 'Accounts', path: '/accounts' },
    { icon: <FaExchangeAlt />, text: 'Transactions', path: '/transactions' },
    { icon: <FaBell />, text: 'Notifications', path: '/notifications' },
    { icon: <FaMoneyBillWave />, text: 'Cardless', path: '/cardless' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <FaPiggyBank />
        <h2 className="logo">MyBank</h2>
      </div>
      <nav className="sidebar-nav">
        {customerLinks.map(link => (
          <Link 
            key={link.path} 
            to={link.path} 
            
            className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            {link.icon} <span>{link.text}</span>
          </Link>
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

export default Sidebar;