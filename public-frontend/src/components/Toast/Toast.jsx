import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import './Toast.css';

const iconMap = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

const Toast = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="toast-container">
      {notifications.map((n) => (
        <div key={n.id} className={`toast toast-${n.type}`}>
          <span className="toast-icon">{iconMap[n.type] || '✓'}</span>
          <span className="toast-message">{n.message}</span>
          <button className="toast-close" onClick={() => removeNotification(n.id)}>×</button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
