import { Heart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { userApi } from "../../services/api";

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export default function SavedPage() {
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadSaved() {
    setLoading(true);
    try {
      const data = await userApi.getReadingList();
      setSavedArticles(data);
    } catch {
      setError("Unable to load saved articles.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSaved();
  }, []);

  async function handleRemove(articleId) {
    try {
      await userApi.removeFromReadingList(articleId);
      setSavedArticles((prev) => prev.filter((a) => a.id !== articleId));
    } catch {
      setError("Unable to remove article.");
    }
  }

  const publicFrontendUrl = "http://localhost:5173";

  return (
    <div className="page-shell">
      <section className="home-welcome-card">
        <div className="home-welcome-text">
          <h1 className="home-welcome-title">
            <Heart size={24} style={{ color: "var(--color-danger)", marginRight: 8 }} />
            Saved Articles
          </h1>
          <p className="home-welcome-sub">
            Your bookmarked articles for later reading. {savedArticles.length} article{savedArticles.length !== 1 ? "s" : ""} saved.
          </p>
        </div>
      </section>

      {error ? <div className="notice-banner notice-banner-danger">{error}</div> : null}

      <section className="panel-card">
        {loading ? (
          <div className="page-loading">Loading saved articles...</div>
        ) : savedArticles.length ? (
          <div className="table-shell">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Likes</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {savedArticles.map((article) => (
                  <tr key={article.id}>
                    <td>
                      <strong style={{ fontWeight: 600 }}>{article.title}</strong>
                      {article.summary ? (
                        <p style={{ color: "var(--color-text-muted)", fontSize: "0.82rem", margin: "4px 0 0", maxWidth: "40ch" }}>
                          {article.summary.substring(0, 80)}{article.summary.length > 80 ? "…" : ""}
                        </p>
                      ) : null}
                    </td>
                    <td>
                      <span className="status-badge status-badge-accent">
                        {article.categoryName || article.topicNames?.[0] || "—"}
                      </span>
                    </td>
                    <td style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                      {article.authorName || "Unknown"}
                    </td>
                    <td style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                      {article.like_count ?? 0}
                    </td>
                    <td>
                      <div className="table-actions">
                        <a
                          href={`${publicFrontendUrl}/article/${article.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button button-secondary button-small"
                        >
                          Read
                        </a>
                        <button
                          className="icon-button icon-button-danger"
                          title="Remove from saved"
                          onClick={() => handleRemove(article.id)}
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
            <h3>No saved articles yet</h3>
            <p>Bookmark articles while reading to save them here for later.</p>
          </div>
        )}
      </section>
    </div>
  );
}
