import { BookOpen, Bookmark, Clock, FolderOpen, Heart, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userApi, getRecentlyViewed } from "../../services/api";

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

function formatDateTime(value) {
  if (!value) return "Never";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "Never";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [myArticles, setMyArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [profile, setProfile] = useState(null);
  const [edits, setEdits] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [comments, setComments] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [recentlyViewed] = useState(() => getRecentlyViewed());

  useEffect(() => {
    Promise.all([
      userApi.getTopics(),
      userApi.getProfile(),
      userApi.getMyEdits(),
      userApi.getNotifications(),
      userApi.getArticles(),
      userApi.getMyArticles(),
      userApi.getMyComments().catch(() => []),
      userApi.getReadingList().catch(() => []),
    ]).then(([topicList, profileData, editList, notificationList, articleList, myArticleList, commentList, savedList]) => {
      setTopics(topicList);
      setProfile(profileData);
      setEdits(editList);
      setNotifications(notificationList);
      setArticles(articleList);
      setMyArticles(myArticleList);
      setComments(commentList);
      setSavedArticles(savedList);
    });
  }, []);

  // Build recent activity
  const recentActivity = [
    ...notifications.slice(0, 5).map((n) => ({
      type: n.related_type || "Notification",
      name: n.title || "Untitled",
      date: n.created_at,
      icon: "viewed",
    })),
    ...edits.slice(0, 3).map((e) => ({
      type: "Edited",
      name: e.title || "Untitled",
      date: e.created_at,
      icon: "edited",
    })),
    ...comments.slice(0, 3).map((c) => ({
      type: "Commented",
      name: c.content?.substring(0, 40) || "Comment",
      date: c.created_at,
      icon: "commented",
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  // Collect unique topics
  const popularTopics = [];
  const seenTopics = new Set();
  articles.forEach((article) => {
    (article.topicNames || []).forEach((name) => {
      if (!seenTopics.has(name)) {
        seenTopics.add(name);
        popularTopics.push(name);
      }
    });
  });
  topics.forEach((t) => {
    if (!seenTopics.has(t.name)) {
      seenTopics.add(t.name);
      popularTopics.push(t.name);
    }
  });

  // Reading progress
  const totalArticles = articles.length;
  const readCount = recentlyViewed.length;
  const progressPercent = totalArticles > 0 ? Math.min(Math.round((readCount / totalArticles) * 100), 100) : 0;

  const publicFrontendUrl = "http://localhost:5173";

  return (
    <div className="page-shell">
      {/* ═══ 1. HEADER ═════════════════════════════════════ */}
      <section className="home-welcome-card">
        <div className="home-welcome-text">
          <h1 className="home-welcome-title">
            Welcome, {profile?.username || "User"} 👋
          </h1>
          <p className="home-welcome-sub">
            Last login: {formatDateTime(profile?.lastLoginAt || new Date().toISOString())}
          </p>
        </div>
      </section>

      {/* ═══ 2. QUICK STATISTICS ═══════════════════════════ */}
      <section className="home-stats-row">
        <div className="home-stat-card">
          <span className="home-stat-icon home-stat-icon-articles">
            <BookOpen size={20} />
          </span>
          <div>
            <span className="home-stat-label">Total Articles</span>
            <strong className="home-stat-value">{articles.length}</strong>
          </div>
        </div>
        <div className="home-stat-card">
          <span className="home-stat-icon home-stat-icon-saved">
            <Heart size={20} />
          </span>
          <div>
            <span className="home-stat-label">Saved Articles</span>
            <strong className="home-stat-value">{savedArticles.length}</strong>
          </div>
        </div>
        <div className="home-stat-card">
          <span className="home-stat-icon home-stat-icon-topics">
            <FolderOpen size={20} />
          </span>
          <div>
            <span className="home-stat-label">Topics Read</span>
            <strong className="home-stat-value">{seenTopics.size}</strong>
          </div>
        </div>
      </section>

      {/* ═══ 3. READING PROGRESS ═══════════════════════════ */}
      <section className="panel-card">
        <div className="panel-heading panel-heading-compact">
          <div>
            <p className="section-kicker">Learning</p>
            <h2>Reading Progress</h2>
          </div>
          <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
            {readCount} of {totalArticles} articles explored
          </span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="progress-bar-label">
          <span>{progressPercent}% complete</span>
          <span>{totalArticles - readCount} remaining</span>
        </div>
      </section>

      {/* ═══ 4. RECENTLY VIEWED + SAVED ════════════════════ */}
      <section className="home-bottom-grid">
        {/* Recently Viewed */}
        <div className="panel-card">
          <div className="panel-heading panel-heading-compact">
            <div>
              <p className="section-kicker">⏱️ Continue reading</p>
              <h2>Recently Viewed</h2>
            </div>
            <Link to="/user/history" className="button button-secondary button-small">
              View all
            </Link>
          </div>
          {recentlyViewed.length ? (
            <div className="home-activity-list">
              {recentlyViewed.slice(0, 5).map((item) => (
                <a
                  key={item.id}
                  href={`${publicFrontendUrl}/article/${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-activity-item"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="home-activity-dot home-activity-dot-viewed" />
                  <div className="home-activity-copy">
                    <span className="home-activity-type">Viewed:</span>
                    <span className="home-activity-name">{item.title}</span>
                  </div>
                  <small className="home-activity-date">{formatDate(item.viewedAt)}</small>
                </a>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--color-text-muted)", margin: 0, fontSize: "0.85rem" }}>
              No articles viewed yet. Start reading to build your history.
            </p>
          )}
        </div>

        {/* Saved Articles */}
        <div className="panel-card">
          <div className="panel-heading panel-heading-compact">
            <div>
              <p className="section-kicker">❤️ Bookmarks</p>
              <h2>Saved Articles</h2>
            </div>
            <Link to="/user/saved" className="button button-secondary button-small">
              View all
            </Link>
          </div>
          {savedArticles.length ? (
            <div className="home-activity-list">
              {savedArticles.slice(0, 5).map((article) => (
                <a
                  key={article.id}
                  href={`${publicFrontendUrl}/article/${article.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-activity-item"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="home-activity-dot home-activity-dot-saved" />
                  <div className="home-activity-copy">
                    <span className="home-activity-type">Saved:</span>
                    <span className="home-activity-name">{article.title}</span>
                  </div>
                  <small className="home-activity-date">
                    {article.like_count ?? 0} ❤️
                  </small>
                </a>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--color-text-muted)", margin: 0, fontSize: "0.85rem" }}>
              No saved articles yet. Bookmark articles to find them here.
            </p>
          )}
        </div>
      </section>

      {/* ═══ 5. RECENT ARTICLES (table) ════════════════════ */}
      <section className="panel-card">
        <div className="panel-heading panel-heading-compact">
          <div>
            <p className="section-kicker">Browse</p>
            <h2>Recent Articles</h2>
          </div>
        </div>

        <div className="table-shell">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {articles.length ? (
                articles.slice(0, 8).map((article) => (
                  <tr key={article.id}>
                    <td>
                      <strong style={{ fontWeight: 600 }}>{article.title}</strong>
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
                      {formatDate(article.createdAt || article.created_at || article.updatedAt)}
                    </td>
                    <td>
                      <a
                        href={`${publicFrontendUrl}/article/${article.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-secondary button-small"
                      >
                        Read
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "28px 0", color: "var(--color-text-muted)" }}>
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══ 6. POPULAR TOPICS + RECENT ACTIVITY ═══════════ */}
      <section className="home-bottom-grid">
        {/* Popular Topics */}
        <div className="panel-card">
          <div className="panel-heading panel-heading-compact">
            <div>
              <p className="section-kicker">Explore</p>
              <h2>Popular Topics</h2>
            </div>
          </div>
          <div className="home-topics-grid">
            {popularTopics.length ? (
              popularTopics.slice(0, 12).map((name) => (
                <span key={name} className="home-topic-chip">{name}</span>
              ))
            ) : (
              <p style={{ color: "var(--color-text-muted)", margin: 0 }}>No topics available.</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="panel-card">
          <div className="panel-heading panel-heading-compact">
            <div>
              <p className="section-kicker">Activity</p>
              <h2>Recent Activity</h2>
            </div>
          </div>
          <div className="home-activity-list">
            {recentActivity.length ? (
              recentActivity.map((item, idx) => (
                <div key={idx} className="home-activity-item">
                  <span className={`home-activity-dot home-activity-dot-${item.icon}`} />
                  <div className="home-activity-copy">
                    <span className="home-activity-type">{item.type}:</span>
                    <span className="home-activity-name">{item.name}</span>
                  </div>
                  <small className="home-activity-date">{formatDate(item.date)}</small>
                </div>
              ))
            ) : (
              <p style={{ color: "var(--color-text-muted)", margin: 0 }}>No recent activity.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
