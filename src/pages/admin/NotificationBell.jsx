import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/admin/AdminLayout";
import "./NotificationBell.css";
import { FaBell } from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement('#root'); // Required for accessibility

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    // Mock notifications (replace with real API)
    setNotifications([
      { id: 1, message: "User A requested password change", detail: "User A wants to change password for security reasons.", status: "unread" },
      { id: 2, message: "Staff B updated profile", detail: "Staff B changed role to Manager.", status: "read" },
      { id: 3, message: "User C submitted a request", detail: "User C submitted a refund request for transaction #1234.", status: "unread" },
    ]);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const openDetail = (notification) => {
    setSelectedNotification(notification);
    markAsRead(notification.id);
  };

  const closeDetail = () => setSelectedNotification(null);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, status: "read" } : n
      )
    );
  };

  const unreadCount = notifications.filter(n => n.status === "unread").length;

  return (
    <AdminLayout>
      <div className="notification-container-page">
        {/* Header */}
        <div className="page-header">
          <h1>Admin Notifications</h1>
          <div className="bell-icon" onClick={toggleDropdown}>
            <FaBell size={24} />
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </div>
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="notification-dropdown">
            {notifications.length === 0 ? (
              <p className="no-notifications">No notifications</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`notification-item ${n.status === "unread" ? "unread" : ""}`}
                  onClick={() => openDetail(n)}
                >
                  {n.message}
                </div>
              ))
            )}
          </div>
        )}

        {/* Full notification table */}
        <div style={{ marginTop: "2rem" }}>
          {notifications.length === 0 ? (
            <p className="no-notifications">No notifications available.</p>
          ) : (
            <table className="notification-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Message</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((n) => (
                  <tr
                    key={n.id}
                    className={n.status === "unread" ? "notification-unread" : ""}
                    onClick={() => openDetail(n)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{n.id}</td>
                    <td>{n.message}</td>
                    <td>{n.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal for detail */}
        <Modal
          isOpen={!!selectedNotification}
          onRequestClose={closeDetail}
          contentLabel="Notification Detail"
          className="notification-modal"
          overlayClassName="notification-modal-overlay"
        >
          {selectedNotification && (
            <div>
              <h2>Notification Detail</h2>
              <p><strong>Message:</strong> {selectedNotification.message}</p>
              <p><strong>Detail:</strong> {selectedNotification.detail}</p>
              <button onClick={closeDetail} className="btn-close">Close</button>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default NotificationPage;
