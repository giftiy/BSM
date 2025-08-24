// src/components/layout/Navbar.jsx
import React, { useState, useContext, useRef, useEffect } from "react";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ customer }) => {
  const [openNotif, setOpenNotif] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "✅ Deposit of $500 received", read: false },
    { id: 2, message: "📩 New message from Support", read: false },
    { id: 3, message: "⚠️ Reminder: Loan payment due tomorrow", read: false },
  ]);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const [openProfile, setOpenProfile] = useState(false);

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setOpenNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setOpenProfile(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    navigate("/notifications");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: theme === "light" ? "#f8f9fa" : "#222",
        color: theme === "light" ? "#000" : "#fff",
        borderBottom: "1px solid #ccc",
        position: "relative",
        zIndex: 100,
      }}
    >
      {/* Brand */}
      <h2 style={{ margin: 0, fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/")}>
        🏦 BankSys
      </h2>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Theme Toggle */}
        <button onClick={toggleTheme} style={iconButtonStyle(theme)}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        {/* Notifications */}
        <div ref={notifRef} style={{ position: "relative", cursor: "pointer" }}>
          <FaBell size={22} onClick={() => setOpenNotif(prev => !prev)} />
          {unreadCount > 0 && <span style={badgeStyle}>{unreadCount}</span>}
          {openNotif && (
            <div style={dropdownStyle(theme)}>
              <h4 style={{ margin: "0 0 8px 0" }}>Notifications</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {notifications.slice(0, 3).map(n => (
                  <li key={n.id} style={notificationItemStyle(n, theme)}>
                    {n.message}
                  </li>
                ))}
              </ul>
              {notifications.length > 0 && (
                <button onClick={markAllRead} style={dropdownButtonStyle(theme)}>
                  Mark All as Read & View All
                </button>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} style={{ position: "relative", cursor: "pointer" }}>
          <div onClick={() => setOpenProfile(prev => !prev)} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src={customer?.image || "https://via.placeholder.com/35"} alt="Profile" style={profileImageStyle} />
            <span style={{ fontWeight: "bold" }}>{customer?.name || "Customer"}</span>
          </div>
          {openProfile && <ProfileDropdown customer={customer} theme={theme} navigate={navigate} />}
        </div>
      </div>
    </nav>
  );
};

// ===== Styles =====
const iconButtonStyle = (theme) => ({
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: theme === "light" ? "#000" : "#fff",
  fontSize: 18,
});

const badgeStyle = {
  position: "absolute",
  top: "-6px",
  right: "-6px",
  background: "red",
  color: "#fff",
  borderRadius: "50%",
  padding: "2px 6px",
  fontSize: 12,
};

const dropdownStyle = (theme) => ({
  position: "absolute",
  right: 0,
  top: "30px",
  background: theme === "light" ? "#fff" : "#333",
  color: theme === "light" ? "#000" : "#fff",
  border: "1px solid #ccc",
  borderRadius: 8,
  padding: 12,
  width: 300,
  boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
});

const notificationItemStyle = (notif, theme) => ({
  padding: "6px 0",
  borderBottom: "1px solid #ddd",
  fontSize: 14,
  fontWeight: notif.read ? "normal" : "bold",
  color: theme === "light" ? "#000" : "#fff",
});

const dropdownButtonStyle = (theme) => ({
  marginTop: 8,
  width: "100%",
  background: theme === "light" ? "#007bff" : "#00adef",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  padding: 6,
  cursor: "pointer",
  fontWeight: "bold",
});

const profileImageStyle = {
  width: 35,
  height: 35,
  borderRadius: "50%",
  objectFit: "cover",
};

// ================= PROFILE DROPDOWN =================
const ProfileDropdown = ({ customer, theme, navigate }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    alert("Password changed successfully!");
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
  };

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "45px",
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        width: 300,
        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
        zIndex: 100,
      }}
    >
      <div style={{ marginBottom: 12, textAlign: "center" }}>
        <img
          src={customer?.image || "https://via.placeholder.com/80"}
          alt="Profile"
          style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", marginBottom: 8 }}
        />
        <h4 style={{ margin: "0 0 4px 0" }}>{customer?.name || "Customer"}</h4>
        <p style={{ margin: 0, fontSize: 14, color: "#888" }}>{customer?.email || "example@email.com"}</p>
        <p style={{ margin: "4px 0 0 0", fontSize: 14 }}>Account Type: {customer?.accountType || "Standard"}</p>
      </div>
      <hr />
      {/* CHANGE PASSWORD */}
      <div style={{ marginTop: 8 }}>
        <h5 style={{ margin: "8px 0" }}>Change Password</h5>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={inputStyle(theme)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={inputStyle(theme)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyle(theme)}
        />
        <button onClick={handleChangePassword} style={dropdownButtonStyle(theme)}>Update Password</button>
      </div>
    </div>
  );
};

const inputStyle = (theme) => ({
  width: "100%",
  padding: 6,
  margin: "4px 0",
  borderRadius: 4,
  border: `1px solid ${theme === "light" ? "#ccc" : "#555"}`,
  background: theme === "light" ? "#fff" : "#444",
  color: theme === "light" ? "#000" : "#fff",
  fontSize: 14,
});

export default Navbar;
