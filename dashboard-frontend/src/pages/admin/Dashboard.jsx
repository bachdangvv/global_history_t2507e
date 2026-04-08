import { Activity, BellRing, BookOpen, Clock3, FolderTree, Landmark, Users } from "lucide-react";
import { useEffect, useState } from "react";
import AdminChart from "../../components/admin/AdminChart";
import { adminApi } from "../../services/api";

function MetricCard({ icon: Icon, label, value, helper }) {
  return (
    <article className="metric-card">
      <span className="metric-icon">
        <Icon size={18} />
      </span>
      <div>
        <p>{label}</p>
        <h3>{value}</h3>
        <span>{helper}</span>
      </div>
    </article>
  );
}

function formatDate(value) {
  if (!value) return "Never";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "Never";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

export default function DashboardPage() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    adminApi.getDashboardOverview().then(setOverview);
  }, []);

  if (!overview) {
    return <div className="page-loading">Loading dashboard overview...</div>;
  }

  const metrics = [
    {
      icon: Users,
      label: "Total users",
      value: overview.stats.totalUsers,
      helper: "Contributors and admins in the workspace",
    },
    {
      icon: BookOpen,
      label: "Articles",
      value: overview.stats.totalArticles,
      helper: "Article records in the knowledge base",
    },
    {
      icon: FolderTree,
      label: "Topics",
      value: overview.stats.totalTopics,
      helper: "Taxonomy nodes linked to articles and events",
    },
    {
      icon: Landmark,
      label: "Historical events",
      value: overview.stats.totalEvents,
      helper: "Timeline records with current edit context",
    },
    {
      icon: Clock3,
      label: "Pending edits",
      value: overview.stats.pendingEdits,
      helper: "Items waiting for moderator review",
    },
    {
      icon: Activity,
      label: "Reactions",
      value: overview.stats.totalReactions,
      helper: "Article likes and dislikes combined",
    },
  ];

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div>
          <p className="section-kicker">Admin Dashboard</p>
          <h1>Schema overview</h1>
          <p>
            A workspace view of articles, topics, events, edits, and contributor activity across the updated
            knowledge model.
          </p>
        </div>
      </section>

      <section className="metric-grid">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="page-grid page-grid-two">
        <AdminChart
          type="line"
          title="Monthly content activity"
          description="How many articles and edits were active in the last six months."
          data={overview.monthlyActivity}
          xKey="month"
          series={[
            { dataKey: "articles", label: "Articles" },
            { dataKey: "edits", label: "Edits" },
          ]}
        />
        <AdminChart
          type="pie"
          title="Article status mix"
          description="Distribution of current article states across the collection."
          data={overview.articleStatus}
          dataKey="value"
          nameKey="name"
        />
      </section>

      <section className="page-grid page-grid-two">
        <AdminChart
          type="bar"
          title="Topic coverage"
          description="How many article records are linked to each topic."
          data={overview.topicBreakdown}
          xKey="name"
          series={[{ dataKey: "articles", label: "Articles" }]}
        />

        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Pending queue</p>
              <h2>Edits waiting for review</h2>
              <p>The most recent pending edits across article and historical-event records.</p>
            </div>
          </div>

          <div className="stack-list">
            {overview.pendingEditQueue.map((edit) => (
              <article key={edit.id} className="stack-row">
                <div>
                  <h3>{edit.title}</h3>
                  <p>{edit.summary}</p>
                </div>
                <div className="stack-row-meta">
                  <span className="status-badge status-badge-warning">{edit.editable_type}</span>
                  <span className="status-badge status-badge-neutral">{edit.editorName}</span>
                  <small>{formatDate(edit.created_at)}</small>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="page-grid page-grid-two">
        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Recent articles</p>
              <h2>Latest content updates</h2>
              <p>Recently touched article records with linked topics and moderation pressure.</p>
            </div>
          </div>

          <div className="stack-list">
            {overview.recentArticles.map((article) => (
              <article key={article.id} className="stack-row">
                <div>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                </div>
                <div className="stack-row-meta">
                  <span className="status-badge status-badge-neutral">{article.topicNames[0] || "No topic"}</span>
                  <span className="status-badge status-badge-accent">
                    {article.pendingEditCount} pending edits
                  </span>
                  <small>{formatDate(article.updated_at)}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Activity feed</p>
              <h2>Notifications and events</h2>
              <p>Recent alerts in the contributor system and highlighted historical-event records.</p>
            </div>
          </div>

          <div className="stack-list">
            {overview.recentNotifications.map((notification) => (
              <article key={notification.id} className="stack-row">
                <div>
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                </div>
                <div className="stack-row-meta">
                  <span className={`status-badge ${notification.is_read ? "status-badge-neutral" : "status-badge-warning"}`}>
                    {notification.related_type}
                  </span>
                  <span className="status-badge status-badge-neutral">
                    <BellRing size={12} />
                    {notification.actorName}
                  </span>
                  <small>{formatDate(notification.created_at)}</small>
                </div>
              </article>
            ))}

            {overview.eventHighlights.map((eventItem) => (
              <article key={`event-${eventItem.id}`} className="stack-row">
                <div>
                  <h3>{eventItem.title}</h3>
                  <p>{eventItem.summary}</p>
                </div>
                <div className="stack-row-meta">
                  <span className="status-badge status-badge-accent">{eventItem.event_year}</span>
                  <span className={`status-badge ${eventItem.currentEditStatus === "approved" ? "status-badge-success" : "status-badge-warning"}`}>
                    {eventItem.currentEditStatus}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
