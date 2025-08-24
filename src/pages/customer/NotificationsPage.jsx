// Faayilii: /src/pages/customer/NotificationsPage.jsx

import React, { useState } from 'react';
import CustomerLayout from '../../components/layout/customer/CustomerLayout';
import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaTrash, FaTimes } from 'react-icons/fa';
import './NotificationsPage.css';

const initialNotifications = [
  { id: 1, type: 'success', text: 'Your payment of $78.50 to Online Shopping was successful.', time: '1 day ago', read: false, icon: <FaCheckCircle /> },
  { id: 2, type: 'warning', text: 'Your account balance is low. Please consider making a deposit.', time: '2 days ago', read: false, icon: <FaExclamationTriangle /> },
  { id: 3, type: 'info', text: 'New security features have been added to your account.', time: '5 days ago', read: true, icon: <FaInfoCircle /> },
  { id: 4, type: 'info', text: 'Your monthly account statement is now available.', time: '7 days ago', read: true, icon: <FaInfoCircle /> },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const clearAll = () => {
      setNotifications([]);
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  const openDetail = (notif) => {
    markAsRead(notif.id);
    setSelectedNotification(notif);
  };

  const closeDetail = () => {
    setSelectedNotification(null);
  };

  return (
    <CustomerLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Notifications</h1>
          <p>You have {unreadCount} unread notifications.</p>
        </div>
        
        <div className="notification-page-container">
            <div className="notification-actions">
                <button onClick={clearAll} className="clear-all-btn"><FaTrash /> Clear All</button>
            </div>
            <ul className="notification-list">
            {notifications.map(notif => (
                <li 
                    key={notif.id} 
                    className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                    onClick={() => openDetail(notif)}
                >
                <div className={`notification-icon ${notif.type}`}>{notif.icon}</div>
                <div className="notification-content">
                    <p>{notif.text}</p>
                    <small>{notif.time}</small>
                </div>
                {!notif.read && <div className="unread-dot"></div>}
                </li>
            ))}
            {notifications.length === 0 && (
                <li className="no-notifications">
                    You have no new notifications.
                </li>
            )}
            </ul>
        </div>

        {/* Detail Modal */}
        {selectedNotification && (
          <div className="notification-modal">
            <div className="modal-content">
              <button className="close-btn" onClick={closeDetail}><FaTimes /></button>
              <div className={`modal-icon ${selectedNotification.type}`}>{selectedNotification.icon}</div>
              <h2>Notification Detail</h2>
              <p>{selectedNotification.text}</p>
              <small>{selectedNotification.time}</small>
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default NotificationsPage;
