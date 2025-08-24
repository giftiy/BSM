// /src/components/common/NotificationPopover.jsx
import React from 'react';
import './Redesign.css';

const notifications = [
  { id: 1, text: 'Your payment of $78.50 was successful.', time: '1h ago', read: false },
  { id: 2, text: 'Account balance is low.', time: '1 day ago', read: true },
];

const NotificationPopover = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="notification-popover">
      <div className="popover-header">
        <h4>Notifications</h4>
      </div>
      <ul className="popover-list">
        {notifications.map(n => (
          <li key={n.id} className={n.read ? 'read' : 'unread'}>
            <p>{n.text}</p>
            <small>{n.time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPopover;