import { Bell, BookOpen, Clock3, FileEdit, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import ArticleCard from "../../components/user/ArticleCard";
import { userApi } from "../../services/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

function formatDate(value) {
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
      userApi.getMyArticles()
    ]).then(([topicList, profileData, editList, notificationList, eventList, myArticleList]) => {
      setTopics(topicList);
      setProfile(profileData);
      setEdits(editList);
      setNotifications(notificationList);
      setEvents(eventList);
      setMyArticles(myArticleList);
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

  const chartData = myArticles.slice(0, 10).map((article, index) => ({
    name: `Art ${index + 1}`,
    title: article.title,
    Likes: article.likeCount || article.like_count || 0,
    Comments: article.commentCount || article.comment_count || 0,
    Views: article.viewCount || article.view_count || 0,
  }));

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Home page</p>
          <h1>Overview</h1>
          <p>Browse the library, evaluate your content performance, and track your review pipeline.</p>
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

      <section className="panel-card panel-card-wide">
        <div className="panel-heading panel-heading-compact">
          <div>
            <p className="section-kicker">Analytics</p>
            <h2>Your Engagement</h2>
            <p>Likes, comments, and views across your top authored articles.</p>
          </div>
        </div>
        {myArticles.length > 0 ? (
          <div style={{ width: '100%', height: 300, marginTop: 16 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "8px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                  labelFormatter={(label, payload) => payload?.[0]?.payload?.title || label}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                <Bar dataKey="Views" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="Likes" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="Comments" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="table-empty-state">
            <h3>No analytics data</h3>
            <p>Publish some articles to see your engagement graph here.</p>
          </div>
        )}
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
