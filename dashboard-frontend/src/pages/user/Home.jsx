import { Bell, BookOpen, Clock3, FileEdit, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import ArticleCard from "../../components/user/ArticleCard";
import { userApi } from "../../services/api";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [profile, setProfile] = useState(null);
  const [edits, setEdits] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    topic: "all",
  });

  useEffect(() => {
    Promise.all([
      userApi.getTopics(),
      userApi.getProfile(),
      userApi.getMyEdits(),
      userApi.getNotifications(),
      userApi.getHistoricalEvents(),
    ]).then(([topicList, profileData, editList, notificationList, eventList]) => {
      setTopics(topicList);
      setProfile(profileData);
      setEdits(editList);
      setNotifications(notificationList);
      setEvents(eventList);
    });
  }, []);

  useEffect(() => {
    userApi.getArticles(filters).then(setArticles);
  }, [filters]);

  const unreadNotifications = notifications.filter((notification) => !notification.is_read);
  const homeMetrics = [
    {
      label: "Published articles",
      value: articles.length,
      note: "Visible in the current filtered feed",
      icon: BookOpen,
    },
    {
      label: "Your edits",
      value: profile?.editCount ?? 0,
      note: "Rows tied to your contributor account",
      icon: FileEdit,
    },
    {
      label: "Pending review",
      value: profile?.pendingEditCount ?? 0,
      note: "Edits waiting for moderation",
      icon: Clock3,
    },
    {
      label: "Unread notifications",
      value: unreadNotifications.length,
      note: "New votes, approvals, and alerts",
      icon: Bell,
    },
  ];

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Home page</p>
          <h1>Published articles</h1>
          <p>Browse the article library, track your edit pipeline, and follow schema-backed activity from one dashboard.</p>
        </div>
        <div className="hero-inline-note">
          <Sparkles size={16} />
          <span>{unreadNotifications.length} unread alerts and {edits.length} total edits on your account.</span>
        </div>
      </section>

      <section className="metric-grid metric-grid-user-home">
        {homeMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article key={metric.label} className="metric-card">
              <span className="metric-icon">
                <Icon size={18} />
              </span>
              <div>
                <p>{metric.label}</p>
                <h3>{metric.value}</h3>
                <span>{metric.note}</span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="page-grid page-grid-two page-grid-home">
        <section className="panel-card panel-card-wide">
          <div className="toolbar">
            <label className="search-input">
              <Search size={16} />
              <input
                type="search"
                placeholder="Search title"
                value={filters.keyword}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, keyword: event.target.value }))
                }
              />
            </label>

            <div className="toolbar-group">
              <select
                value={filters.topic}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, topic: event.target.value }))
                }
              >
                <option value="all">All topics</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
          </div>


          <div className="panel-heading panel-heading-compact">
            <div>
              <p className="section-kicker">Article feed</p>
              <h2>Published collection</h2>
              <p>Searchable article cards enriched with topics and linked events from the new schema.</p>
            </div>
          </div>

          <div className="article-grid">
            {articles.length ? (
              articles.map((article) => <ArticleCard key={article.id} article={article} />)
            ) : (
              <div className="table-empty-state">
                <h3>No articles found</h3>
                <p>Try another keyword or adjust the selected filters.</p>
              </div>
            )}
          </div>
        </section>

        <div className="page-shell home-side-stack">
          <section className="panel-card">
            <div className="panel-heading panel-heading-compact">
              <div>
                <p className="section-kicker">Recent edit activity</p>
                <h2>Your latest edits</h2>
                <p>Fast access to the current review pipeline.</p>
              </div>
            </div>
            <div className="stack-list">
              {edits.slice(0, 3).map((edit) => (
                <article key={edit.id} className="stack-row">
                  <div>
                    <h3>{edit.title}</h3>
                    <p>{edit.summary}</p>
                  </div>
                  <div className="stack-row-meta">
                    <span className={`status-badge ${edit.status === "approved" ? "status-badge-success" : "status-badge-warning"}`}>
                      {edit.status}
                    </span>
                    <small>{formatDate(edit.created_at)}</small>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel-card">
            <div className="panel-heading panel-heading-compact">
              <div>
                <p className="section-kicker">Notification snapshot</p>
                <h2>Unread first</h2>
                <p>Latest moderation and community signals.</p>
              </div>
            </div>
            <div className="stack-list">
              {notifications.slice(0, 3).map((notification) => (
                <article key={notification.id} className="stack-row">
                  <div>
                    <h3>{notification.title}</h3>
                    <p>{notification.message}</p>
                  </div>
                  <div className="stack-row-meta">
                    <span className={`status-badge ${notification.is_read ? "status-badge-neutral" : "status-badge-warning"}`}>
                      {notification.related_type}
                    </span>
                    <small>{formatDate(notification.created_at)}</small>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel-card">
            <div className="panel-heading panel-heading-compact">
              <div>
                <p className="section-kicker">Historical events</p>
                <h2>Linked event records</h2>
                <p>Reference events related to the article knowledge graph.</p>
              </div>
            </div>
            <div className="stack-list">
              {events.slice(0, 3).map((eventItem) => (
                <article key={eventItem.id} className="stack-row">
                  <div>
                    <h3>{eventItem.title}</h3>
                    <p>{eventItem.summary}</p>
                  </div>
                  <div className="stack-row-meta">
                    <span className="status-badge status-badge-accent">{eventItem.event_year}</span>
                    <small>{formatDate(eventItem.created_at)}</small>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
