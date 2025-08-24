// /src/components/layout/customer/CustomerTopNavbar.jsx

// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useRef, useEffect } from "react";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";
import './CustomerLayout.css';

const CustomerTopNavbar = () => {
    // eslint-disable-next-line no-unused-vars
    const [openNotif, setOpenNotif] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, logout } = useAuth();
    const notifRef = useRef(null);

    return (
        <nav className="top-navbar-customer">
            <h2>Welcome, {user?.fullName || 'Customer'}!</h2>
            <div className="navbar-actions">
                <button onClick={toggleTheme} className="theme-toggle-btn">
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                </button>
                <div className="notification-wrapper" ref={notifRef}>
                    <button className="notification-btn" onClick={() => setOpenNotif(p => !p)}>
                        <FaBell /> <span className="notification-badge">3</span>
                    </button>
                </div>
                <button onClick={logout} className="logout-btn-nav">Logout</button>
            </div>
        </nav>
    );
};

export default CustomerTopNavbar;