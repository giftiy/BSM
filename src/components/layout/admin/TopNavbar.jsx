

import React from 'react';
import { FaSearch, FaSun, FaMoon } from 'react-icons/fa';


import UserProfileDropdown from '/src/components/layout/common/UserProfileDropdown.jsx';


import './TopNavbar.css';

const TopNavbar = ({ onThemeToggle, theme, searchTerm, onSearchChange }) => {
  
  return (
    <header className="top-navbar">
      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-bar"
          placeholder="Search for customers by name..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <div className="navbar-actions">
        <button className="theme-toggle-btn" onClick={onThemeToggle} aria-label="Toggle theme">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        <UserProfileDropdown />
      </div>
    </header>
  );
};

export default TopNavbar;