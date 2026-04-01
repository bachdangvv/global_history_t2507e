import { useEffect, useState } from "react";
import { userApi } from "../../services/api";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    userApi.getNotifications().then(setNotifications);
  }, []);

  async function handleMarkRead(notificationId) {
    await userApi.markNotificationRead(notificationId);
    const refreshed = await userApi.getNotifications();
    setNotifications(refreshed);
  }

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Notifications</p>
          <h1>Recent updates</h1>
          <p>Track moderation results, vote activity, and other events attached to your account.</p>
        </div>
      </section>

      <section className="panel-card">
        <div className="notification-list">
          {notifications.length ? (
            notifications.map((notification) => (
              <article key={notification.id} className="notification-card">
                <div>
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <small>
                    Triggered by {notification.actorName} • {formatDate(notification.created_at)}
                  </small>
                </div>
                <div className="stack-row-meta">
                  <span className={`status-badge ${notification.is_read ? "status-badge-neutral" : "status-badge-warning"}`}>
                    {notification.related_type}
                  </span>
                  {!notification.is_read ? (
                    <button
                      type="button"
                      className="button button-secondary button-small"
                      onClick={() => handleMarkRead(notification.id)}
                    >
                      Mark as read
                    </button>
                  ) : (
                    <small>{formatDate(notification.created_at)}</small>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="table-empty-state">
              <h3>No notifications</h3>
              <p>Approvals, votes, and edit activity will appear here once there is activity.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
