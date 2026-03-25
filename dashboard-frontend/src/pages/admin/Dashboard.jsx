import { Activity, FolderTree, Tags, Users } from "lucide-react";
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
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
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
      helper: "Accounts with admin visibility",
    },
    {
      icon: Activity,
      label: "Total articles",
      value: overview.stats.totalArticles,
      helper: "Published, review, draft, and archived",
    },
    {
      icon: FolderTree,
      label: "Categories",
      value: overview.stats.totalCategories,
      helper: "Editorial structure in use",
    },
    {
      icon: Tags,
      label: "Tags",
      value: overview.stats.totalTags,
      helper: "Reusable labels across articles",
    },
    {
      icon: Activity,
      label: "Reactions",
      value: overview.stats.totalReactions,
      helper: "Likes and dislikes combined",
    },
  ];

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div>
          <p className="section-kicker">Admin Dashboard</p>
          <h1>Overview</h1>
          <p>
            A quick read on content volume, taxonomy structure, and where editorial attention is
            currently concentrated.
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
          title="Monthly article activity"
          description="How many articles were updated in the last six months."
          data={overview.monthlyActivity}
          xKey="month"
          series={[{ dataKey: "articles", label: "Articles" }]}
        />
        <AdminChart
          type="pie"
          title="Article status mix"
          description="Distribution of current content states across the collection."
          data={overview.articleStatus}
          dataKey="value"
          nameKey="name"
        />
      </section>

      <section className="page-grid page-grid-two">
        <AdminChart
          type="bar"
          title="Category distribution"
          description="Article counts grouped by editorial category."
          data={overview.categoryBreakdown}
          xKey="name"
          series={[{ dataKey: "articles", label: "Articles" }]}
        />

        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Recent content</p>
              <h2>Latest article updates</h2>
              <p>The most recently touched records in the admin workspace.</p>
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
                  <span className="status-badge status-badge-neutral">{article.categoryName}</span>
                  <span className="status-badge status-badge-accent">
                    {article.status.toUpperCase()}
                  </span>
                  <small>{formatDate(article.updatedAt)}</small>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
