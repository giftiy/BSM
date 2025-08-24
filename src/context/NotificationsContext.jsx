// src/context/NotificationsContext.jsx
import React, { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', text: 'Your payment of $78.50 to Online Shopping was successful.', time: '1 day ago', read: false },
    { id: 2, type: 'warning', text: 'Your account balance is low. Please consider making a deposit.', time: '2 days ago', read: false },
    { id: 3, type: 'info', text: 'New security features have been added to your account.', time: '5 days ago', read: true },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const addNotification = (newNotif) => {
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <NotificationsContext.Provider value={{ notifications, markAllRead, addNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};
