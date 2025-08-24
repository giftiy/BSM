// Faayilii: /src/components/layout/customer/CustomerTopNavbar.jsx

import React, { useContext } from "react";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // <== KANA IMPORT GODHAA
import { ThemeContext } from "../../../context/ThemeContext";
import UserProfileDropdown from '../common/UserProfileDropdown.jsx';
import './CustomerLayout.css';

const CustomerTopNavbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate(); // <== useNavigate hook fayyadamna

    // Funkishinii gara fuula notifications geessu
    const goToNotifications = () => {
        navigate('/customer/notifications');
    };

    return (
        <nav className="top-navbar-customer">
            {/* VVVV --- BARRUUN "CUSTOMER PORTAL" ASII BAHEERA --- VVVV */}
            <div className="navbar-brand-customer">
                {/* Iddoon kun amma duwwaadha */}
            </div>
            {/* AAAA -------------------------------------------- AAAA */}

            <div className="navbar-actions">
                {/* Theme Toggle */}
                <button onClick={toggleTheme} className="theme-toggle-btn">
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                </button>

                {/* VVVV --- NOTIFICATIONS BUTTON KAN JIJJIIRAME --- VVVV */}
                <div className="notification-wrapper">
                    {/* onClick isaa amma goToNotifications waama */}
                    <button className="notification-btn" onClick={goToNotifications}>
                        <FaBell /> 
                        <span className="notification-badge">3</span>
                    </button>
                </div>
                {/* AAAA ---------------------------------------------- AAAA */}

                {/* Profile Dropdown */}
                <UserProfileDropdown />
            </div>
        </nav>
    );
};

export default CustomerTopNavbar;