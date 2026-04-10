import { Clock, Trash2 } from "lucide-react";
import { useState } from "react";
import { getRecentlyViewed } from "../../services/api";

function formatDateTime(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

export default function HistoryPage() {
  const [history, setHistory] = useState(() => getRecentlyViewed());

  function handleClear() {
    localStorage.removeItem("gh_recently_viewed");
    setHistory([]);
  }

  function handleRemove(id) {
    const updated = history.filter((item) => item.id !== id);
    localStorage.setItem("gh_recently_viewed", JSON.stringify(updated));
    setHistory(updated);
  }

  const publicFrontendUrl = "http://localhost:5173";

  return (
    <div className="page-shell">
      <section className="home-welcome-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div className="home-welcome-text">
            <h1 className="home-welcome-title">
              <Clock size={24} style={{ color: "var(--color-accent)", marginRight: 8 }} />
              Recently Viewed
            </h1>
            <p className="home-welcome-sub">
              Continue reading where you left off. {history.length} article{history.length !== 1 ? "s" : ""} in history.
            </p>
          </div>
          {history.length > 0 ? (
            <button className="button button-secondary button-small" onClick={handleClear}>
              Clear history
            </button>
          ) : null}
        </div>
      </section>

      <section className="panel-card">
        {history.length ? (
          <div className="table-shell">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Viewed at</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong style={{ fontWeight: 600 }}>{item.title}</strong>
                    </td>
                    <td>
                      {item.categoryName ? (
                        <span className="status-badge status-badge-accent">{item.categoryName}</span>
                      ) : (
                        <span style={{ color: "var(--color-text-faint)" }}>—</span>
                      )}
                    </td>
                    <td style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                      {formatDateTime(item.viewedAt)}
                    </td>
                    <td>
                      <div className="table-actions">
                        <a
                          href={`${publicFrontendUrl}/article/${item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button button-secondary button-small"
                        >
                          Continue
                        </a>
                        <button
                          className="icon-button icon-button-danger"
                          title="Remove from history"
                          onClick={() => handleRemove(item.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="table-empty-state">
            <h3>No viewing history</h3>
            <p>Articles you read will appear here so you can easily pick up where you left off.</p>
          </div>
        )}
      </section>
    </div>
  );
}
