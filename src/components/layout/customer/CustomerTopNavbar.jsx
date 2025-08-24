

import React, { useContext } from "react";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; 
import { ThemeContext } from "../../../context/ThemeContext";
import UserProfileDropdown from '../common/UserProfileDropdown.jsx';
import './CustomerLayout.css';

const CustomerTopNavbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate(); 

 
    const goToNotifications = () => {
        navigate('/customer/notifications');
    };

    return (
        <nav className="top-navbar-customer">
            
            <div className="navbar-brand-customer">
              
            </div>
           

            <div className="navbar-actions">
                {/* Theme Toggle */}
                <button onClick={toggleTheme} className="theme-toggle-btn">
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                </button>

                
                <div className="notification-wrapper">
                   
                    <button className="notification-btn" onClick={goToNotifications}>
                        <FaBell /> 
                        <span className="notification-badge">3</span>
                    </button>
                </div>
               

                {/* Profile Dropdown */}
                <UserProfileDropdown />
            </div>
        </nav>
    );
};

export default CustomerTopNavbar;