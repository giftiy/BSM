import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import ThemeToggle from './ThemeToggle.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import Button from './Button.jsx';
import '../../assets/styles/Common.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      {/* Left side: Logo */}
      <NavLink to="/" className="nav-logo">BMS</NavLink>

      {/* Left side: Links */}
      {user && (
        <nav className="nav-links">
          <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          <NavLink to="/accounts" className="nav-link">Accounts</NavLink>
          <NavLink to="/transactions" className="nav-link">Transactions</NavLink>
          <NavLink to="/cardless" className="nav-link">Cardless</NavLink> {/* <-- Added */}
        </nav>
      )}

      {/* Right side: Actions */}
      <div className="nav-actions">
        <LanguageSwitcher />
        <ThemeToggle />
        {user ? (
          <Button onClick={handleLogout} variant="secondary">Logout</Button>
        ) : (
          <Button onClick={() => navigate('/login')} variant="primary">Login</Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
