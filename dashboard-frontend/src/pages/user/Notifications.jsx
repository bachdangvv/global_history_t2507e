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

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Notifications</p>
          <h1>Recent updates</h1>
          <p>Track approvals, votes, and revision activity related to your content.</p>
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
                </div>
                <div className="stack-row-meta">
                  <span className="status-badge status-badge-neutral">{notification.type}</span>
                  <small>{formatDate(notification.createdAt)}</small>
                </div>
              </article>
            ))
          ) : (
            <div className="table-empty-state">
              <h3>No notifications</h3>
              <p>Approvals, votes, and edits will appear here once there is activity.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
