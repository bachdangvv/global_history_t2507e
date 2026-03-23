import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  Bell,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Filter,
  GitBranch,
  Globe2,
  Heart,
  Lock,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Tags,
  ThumbsDown,
  Trash2,
  Unlock,
  Users,
  XCircle,
} from "lucide-react";
import { adminApi } from "./adminApi";

const CHART_COLORS = ["#17303d", "#8d5b32", "#4a7a6a", "#d0a56f", "#7796a8"];

const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    description: "KPIs and content health",
    icon: BarChart3,
  },
  {
    id: "articles",
    label: "Articles",
    description: "Search, inspect, and remove posts",
    icon: FileText,
  },
  {
    id: "revisions",
    label: "Revisions",
    description: "Compare versions and moderate edits",
    icon: GitBranch,
  },
  {
    id: "users",
    label: "Users",
    description: "Roles, access, and account locks",
    icon: Users,
  },
  {
    id: "categories",
    label: "Categories",
    description: "Taxonomy management",
    icon: Tags,
  },
  {
    id: "countries",
    label: "Countries",
    description: "Regional metadata",
    icon: Globe2,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "System events and read states",
    icon: Bell,
  },
];

const ROLE_OPTIONS = ["admin", "editor", "reviewer", "contributor"];

const EMPTY_DASHBOARD = {
  totalUsers: 0,
  totalArticles: 0,
  revisionsPending: 0,
  totalLikes: 0,
  totalDislikes: 0,
  trends: [],
  categoryBreakdown: [],
  engagement: [],
  recentActivity: [],
};

function cx(...values) {
  return values.filter(Boolean).join(" ");
}

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

function compactNumber(value) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value || 0));
}

function sentenceCase(value) {
  return String(value || "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function truncate(value, length = 180) {
  const text = String(value || "");
  if (text.length <= length) {
    return text;
  }

  return `${text.slice(0, length).trim()}...`;
}

function getArticleTone(status) {
  switch (status) {
    case "published":
      return "success";
    case "review":
    case "pending":
      return "warning";
    case "draft":
      return "neutral";
    case "archived":
    case "rejected":
      return "danger";
    default:
      return "neutral";
  }
}

function getRoleTone(role) {
  switch (role) {
    case "admin":
      return "danger";
    case "editor":
      return "warning";
    case "reviewer":
      return "info";
    default:
      return "neutral";
  }
}

function getNotificationTone(type) {
  switch (type) {
    case "revision":
      return "warning";
    case "article":
      return "success";
    case "user":
      return "info";
    default:
      return "neutral";
  }
}

function StatusPill({ tone = "neutral", children }) {
  return <span className={cx("status-pill", `status-pill-${tone}`)}>{children}</span>;
}

function SectionCard({ title, description, action, children, className = "" }) {
  return (
    <section className={cx("section-card", className)}>
      {(title || description || action) && (
        <div className="section-card-header">
          <div>
            {title ? <h2>{title}</h2> : null}
            {description ? <p>{description}</p> : null}
          </div>
          {action ? <div className="section-card-action">{action}</div> : null}
        </div>
      )}
      {children}
    </section>
  );
}

function MetricCard({ icon: Icon, label, value, helper, tone = "neutral" }) { // eslint-disable-line no-unused-vars
  return (
    <article className={cx("metric-card", `metric-card-${tone}`)}>
      <div className="metric-card-icon">
        <Icon size={18} />
      </div>
      <div className="metric-card-content">
        <p>{label}</p>
        <h3>{value}</h3>
        <span>{helper}</span>
      </div>
    </article>
  );
}

function EmptyState({ title, copy }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{copy}</p>
    </div>
  );
}

function LoadingView() {
  return (
    <div className="loading-view">
      <div className="loading-spinner" />
      <h2>Loading admin dashboard</h2>
      <p>Fetching overview metrics, moderation queue, and management data.</p>
    </div>
  );
}

function buildRevisionFields(revision, categories, countries) {
  const findCategory = (categoryId) =>
    categories.find((category) => category.id === categoryId)?.name || "Uncategorized";
  const findCountry = (countryId) =>
    countries.find((country) => country.id === countryId)?.name || "Not assigned";

  return [
    {
      key: "title",
      label: "Title",
      current: revision.current.title || "Untitled article",
      proposed: revision.proposed.title || "Untitled article",
    },
    {
      key: "summary",
      label: "Summary",
      current: revision.current.summary || "No summary provided.",
      proposed: revision.proposed.summary || "No summary provided.",
    },
    {
      key: "content",
      label: "Content",
      current: revision.current.content || "No body content provided.",
      proposed: revision.proposed.content || "No body content provided.",
    },
    {
      key: "categoryId",
      label: "Category",
      current: findCategory(revision.current.categoryId),
      proposed: findCategory(revision.proposed.categoryId),
    },
    {
      key: "countryId",
      label: "Country",
      current: findCountry(revision.current.countryId),
      proposed: findCountry(revision.proposed.countryId),
    },
  ].map((field) => ({
    ...field,
    changed: field.current !== field.proposed,
  }));
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [dashboard, setDashboard] = useState(EMPTY_DASHBOARD);
  const [articles, setArticles] = useState([]);
  const [articleDetail, setArticleDetail] = useState(null);
  const [revisions, setRevisions] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [selectedRevisionId, setSelectedRevisionId] = useState("");
  const [articleFilters, setArticleFilters] = useState({
    query: "",
    category: "all",
    status: "all",
  });
  const [reviewNote, setReviewNote] = useState("");
  const [categoryForm, setCategoryForm] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [countryForm, setCountryForm] = useState({
    name: "",
    code: "",
  });
  const [resourceSources, setResourceSources] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [busyKey, setBusyKey] = useState("");
  const [error, setError] = useState("");
  const [flash, setFlash] = useState(null);

  useEffect(() => {
    if (!flash) {
      return undefined;
    }

    const timer = window.setTimeout(() => setFlash(null), 3200);
    return () => window.clearTimeout(timer);
  }, [flash]);

  useEffect(() => {
    setReviewNote("");
  }, [selectedRevisionId]);

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    if (!selectedArticleId) {
      setArticleDetail(null);
      return undefined;
    }

    let cancelled = false;
    setDetailLoading(true);

    adminApi
      .getArticle(selectedArticleId)
      .then((result) => {
        if (cancelled) {
          return;
        }

        setArticleDetail(result.data);
        setResourceSources((current) => ({
          ...current,
          articleDetail: result.source,
        }));
      })
      .catch(() => {
        if (!cancelled) {
          setArticleDetail(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setDetailLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedArticleId]);

  async function loadAllData({ silent = false } = {}) {
    if (!silent) {
      setIsLoading(true);
    }

    setError("");

    try {
      const [
        dashboardResult,
        articlesResult,
        revisionsResult,
        usersResult,
        categoriesResult,
        countriesResult,
        notificationsResult,
      ] = await Promise.all([
        adminApi.getDashboard(),
        adminApi.getArticles(),
        adminApi.getPendingRevisions(),
        adminApi.getUsers(),
        adminApi.getCategories(),
        adminApi.getCountries(),
        adminApi.getNotifications(),
      ]);

      setDashboard(dashboardResult.data || EMPTY_DASHBOARD);
      setArticles(articlesResult.data || []);
      setRevisions(revisionsResult.data || []);
      setUsers(usersResult.data || []);
      setCategories(categoriesResult.data || []);
      setCountries(countriesResult.data || []);
      setNotifications(notificationsResult.data || []);
      setResourceSources({
        dashboard: dashboardResult.source,
        articles: articlesResult.source,
        revisions: revisionsResult.source,
        users: usersResult.source,
        categories: categoriesResult.source,
        countries: countriesResult.source,
        notifications: notificationsResult.source,
      });
      setSelectedArticleId((current) =>
        (articlesResult.data || []).some((article) => article.id === current)
          ? current
          : articlesResult.data?.[0]?.id || "",
      );
      setSelectedRevisionId((current) =>
        (revisionsResult.data || []).some((revision) => revision.id === current)
          ? current
          : revisionsResult.data?.[0]?.id || "",
      );
    } catch (loadError) {
      setError(loadError.message || "Unable to load the admin dashboard.");
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  }

  async function refreshEverything() {
    setIsRefreshing(true);
    await loadAllData({ silent: true });
    setIsRefreshing(false);
  }

  function showSuccess(message) {
    setFlash({
      type: "success",
      message,
    });
  }

  async function handleDeleteArticle(article) {
    const confirmed = window.confirm(`Delete "${article.title}" from the article library?`);
    if (!confirmed) {
      return;
    }

    setBusyKey(`article-delete-${article.id}`);
    setError("");

    try {
      await adminApi.deleteArticle(article.id);
      showSuccess(`Deleted "${article.title}".`);
      await loadAllData({ silent: true });
    } catch (actionError) {
      setError(actionError.message || "Unable to delete the article.");
    } finally {
      setBusyKey("");
    }
  }

  async function handleApproveRevision(revision) {
    const confirmed = window.confirm(`Approve revision ${revision.id} for "${revision.articleTitle}"?`);
    if (!confirmed) {
      return;
    }

    setBusyKey(`revision-approve-${revision.id}`);
    setError("");

    try {
      await adminApi.approveRevision(revision.id, reviewNote);
      showSuccess(`Approved revision ${revision.id}.`);
      await loadAllData({ silent: true });
    } catch (actionError) {
      setError(actionError.message || "Unable to approve the revision.");
    } finally {
      setBusyKey("");
    }
  }

  async function handleRejectRevision(revision) {
    const confirmed = window.confirm(`Reject revision ${revision.id} for "${revision.articleTitle}"?`);
    if (!confirmed) {
      return;
    }

    setBusyKey(`revision-reject-${revision.id}`);
    setError("");

    try {
      await adminApi.rejectRevision(revision.id, reviewNote);
      showSuccess(`Rejected revision ${revision.id}.`);
      await loadAllData({ silent: true });
    } catch (actionError) {
      setError(actionError.message || "Unable to reject the revision.");
    } finally {
      setBusyKey("");
    }
  }

  async function handleRoleChange(userId, nextRole) {
    setBusyKey(`user-role-${userId}`);
    setError("");

    try {
      await adminApi.updateUserRole(userId, nextRole);
      showSuccess(`Updated role to ${sentenceCase(nextRole)}.`);
      await loadAllData({ silent: true });
    } catch (actionError) {
      setError(actionError.message || "Unable to update the user role.");
    } finally {
      setBusyKey("");
    }
  }

  async function handleToggleUserLock(user) {
    setBusyKey(`user-lock-${user.id}`);
    setError("");

    try {
      await adminApi.lockUser(user.id, !user.locked);
      showSuccess(`${user.locked ? "Unlocked" : "Locked"} ${user.name}.`);
      await loadAllData({ silent: true });
    } catch (actionError) {
      setError(actionError.message || "Unable to update the lock status.");
    } finally {
      setBusyKey("");
    }
  }

  async function handleCategorySubmit(event) {
    event.preventDefault();

    if (!categoryForm.name.trim()) {
      setError("Category name is required.");
      return;
    }

    setBusyKey(categoryForm.id ? `category-update-${categoryForm.id}` : "category-create");
    setError("");

    try {
      if (categoryForm.id) {
        await adminApi.updateCategory(categoryForm.id, {
          name: categoryForm.name.trim(),
          description: categoryForm.description.trim(),
        });
        showSuccess(`Updated category "${categoryForm.name.trim()}".`);
      } else {
        await adminApi.createCategory({
          name: categoryForm.name.trim(),
          description: categoryForm.description.trim(),
        });
        showSuccess(`Created category "${categoryForm.name.trim()}".`);
      }

      setCategoryForm({ id: "", name: "", description: "" });
      await loadAllData({ silent: true });
    } catch (actionError) {
      setError(actionError.message || "Unable to save the category.");
    } finally {
      setBusyKey("");
    }
  }

  function startCategoryEdit(category) {
    setCategoryForm({
      id: category.id,
      name: category.name,
      description: category.description || "",
    });
  }

  function resetCategoryForm() {
    setCategoryForm({
      id: "",
      name: "",
      description: "",
    });
  }

  async function handleDeleteCategory(category) {
    const confirmed = window.confirm(
      `Delete "${category.name}"? Affected articles will become uncategorized.`,
    );
    if (!confirmed) {
      return;
    }

    setBusyKey(`category-delete-${category.id}`);
    setError("");

    try {
      await adminApi.deleteCategory(category.id);
      if (categoryForm.id === category.id) {
        resetCategoryForm();
      }
      showSuccess(`Deleted category "${category.name}".`);
      await loadAllData({ silent: true });
    } catch (actionError) {
      setError(actionError.message || "Unable to delete the category.");
    } finally {
      setBusyKey("");
    }
  }

  async function handleCountrySubmit(event) {
    event.preventDefault();

    if (!countryForm.name.trim() || !countryForm.code.trim()) {
      setError("Country name and code are required.");
      return;
    }

    setBusyKey("country-create");
    setError("");

    try {
      await adminApi.createCountry({
        name: countryForm.name.trim(),
        code: countryForm.code.trim().toUpperCase(),
      });
      setCountryForm({
        name: "",
        code: "",
      });
      showSuccess("Added a new country.");
      await loadAllData({ silent: true });
    } catch (actionError) {
      setError(actionError.message || "Unable to create the country.");
    } finally {
      setBusyKey("");
    }
  }

  async function handleMarkNotificationRead(notification) {
    if (notification.read) {
      return;
    }

    setBusyKey(`notification-read-${notification.id}`);
    setError("");

    try {
      await adminApi.markNotificationRead(notification.id);
      showSuccess("Notification marked as read.");
      await loadAllData({ silent: true });
    } catch (actionError) {
      setError(actionError.message || "Unable to mark the notification as read.");
    } finally {
      setBusyKey("");
    }
  }

  const filteredArticles = articles.filter((article) => {
    const query = articleFilters.query.trim().toLowerCase();
    const matchesQuery =
      !query ||
      article.title.toLowerCase().includes(query) ||
      String(article.summary || "").toLowerCase().includes(query);
    const matchesCategory =
      articleFilters.category === "all" || article.categoryId === articleFilters.category;
    const matchesStatus =
      articleFilters.status === "all" || article.status === articleFilters.status;

    return matchesQuery && matchesCategory && matchesStatus;
  });

  const listSelectedArticle =
    articles.find((article) => article.id === selectedArticleId) || null;
  const selectedArticle = listSelectedArticle
    ? {
        ...listSelectedArticle,
        ...(articleDetail || {}),
      }
    : articleDetail || null;
  const selectedRevision =
    revisions.find((revision) => revision.id === selectedRevisionId) || null;
  const comparisonFields = selectedRevision
    ? buildRevisionFields(selectedRevision, categories, countries)
    : [];
  const unreadNotifications = notifications.filter((notification) => !notification.read).length;
  const usingDemoData = Object.values(resourceSources).some((source) => source === "mock");
  const articleStatusOptions = ["all", ...new Set(articles.map((article) => article.status))];
  const metrics = [
    {
      label: "Total Users",
      value: compactNumber(dashboard.totalUsers),
      helper: "Accounts with admin visibility",
      icon: Users,
      tone: "neutral",
    },
    {
      label: "Total Articles",
      value: compactNumber(dashboard.totalArticles),
      helper: "All indexed content records",
      icon: FileText,
      tone: "success",
    },
    {
      label: "Revisions Pending",
      value: compactNumber(dashboard.revisionsPending),
      helper: "Needs moderation right now",
      icon: GitBranch,
      tone: "warning",
    },
    {
      label: "Total Likes",
      value: compactNumber(dashboard.totalLikes),
      helper: "Positive engagement across posts",
      icon: Heart,
      tone: "info",
    },
    {
      label: "Total Dislikes",
      value: compactNumber(dashboard.totalDislikes),
      helper: "Signals to review or improve",
      icon: ThumbsDown,
      tone: "danger",
    },
  ];

  if (isLoading) {
    return <LoadingView />;
  }

  function renderOverview() {
    return (
      <div className="section-stack">
        <div className="dashboard-grid dashboard-grid-primary">
          <SectionCard
            title="Publishing Activity"
            description="A six-month snapshot of article updates, incoming revisions, and approvals."
          >
            <div className="chart-frame">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboard.trends}>
                  <defs>
                    <linearGradient id="articlesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#17303d" stopOpacity={0.55} />
                      <stop offset="95%" stopColor="#17303d" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="revisionsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8d5b32" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#8d5b32" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d7d8d2" />
                  <XAxis dataKey="label" stroke="#526b79" />
                  <YAxis stroke="#526b79" allowDecimals={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="articles"
                    stroke="#17303d"
                    fill="url(#articlesGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="revisions"
                    stroke="#8d5b32"
                    fill="url(#revisionsGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard
            title="Category Distribution"
            description="How the current article library is distributed across editorial categories."
          >
            <div className="chart-frame">
              {dashboard.categoryBreakdown.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboard.categoryBreakdown}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={88}
                      paddingAngle={3}
                    >
                      {dashboard.categoryBreakdown.map((entry, index) => (
                        <Cell
                          key={`${entry.name}-${entry.value}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState
                  title="No category data"
                  copy="Category analytics will appear once articles are linked to categories."
                />
              )}
            </div>
            <div className="legend-list">
              {dashboard.categoryBreakdown.map((entry, index) => (
                <div className="legend-row" key={entry.name}>
                  <span
                    className="legend-dot"
                    style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                  />
                  <span>{entry.name}</span>
                  <strong>{entry.value}</strong>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="dashboard-grid">
          <SectionCard
            title="Top Engagement"
            description="Highest volume of likes and dislikes across the article collection."
          >
            <div className="chart-frame chart-frame-compact">
              {dashboard.engagement.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboard.engagement} layout="vertical" margin={{ left: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#d7d8d2" />
                    <XAxis type="number" stroke="#526b79" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={150}
                      tick={{ fill: "#526b79", fontSize: 12 }}
                    />
                    <Tooltip />
                    <Bar dataKey="likes" fill="#4a7a6a" radius={[6, 6, 6, 6]} />
                    <Bar dataKey="dislikes" fill="#a35f55" radius={[6, 6, 6, 6]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState
                  title="No engagement yet"
                  copy="Engagement analytics will appear after readers interact with articles."
                />
              )}
            </div>
          </SectionCard>

          <SectionCard
            title="Recent Activity"
            description="The latest admin-facing events across content and moderation."
          >
            <div className="activity-list">
              {dashboard.recentActivity.length ? (
                dashboard.recentActivity.map((item) => (
                  <article className="activity-item" key={item.id}>
                    <div className={cx("activity-dot", `activity-dot-${item.tone || "neutral"}`)} />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.message}</p>
                    </div>
                    <span>{formatDate(item.createdAt)}</span>
                  </article>
                ))
              ) : (
                <EmptyState
                  title="No recent activity"
                  copy="Operational events will show up here as the admin system is used."
                />
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    );
  }

  function renderArticles() {
    return (
      <div className="section-stack">
        <SectionCard
          title="Article Library"
          description="Search, filter, inspect article detail, and remove records that should no longer be listed."
        >
          <div className="toolbar">
            <label className="search-field">
              <Search size={16} />
              <input
                type="search"
                value={articleFilters.query}
                onChange={(event) =>
                  setArticleFilters((current) => ({
                    ...current,
                    query: event.target.value,
                  }))
                }
                placeholder="Search title or summary"
              />
            </label>

            <div className="toolbar-filters">
              <label className="select-field">
                <Filter size={16} />
                <select
                  value={articleFilters.category}
                  onChange={(event) =>
                    setArticleFilters((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                >
                  <option value="all">All categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="select-field">
                <Shield size={16} />
                <select
                  value={articleFilters.status}
                  onChange={(event) =>
                    setArticleFilters((current) => ({
                      ...current,
                      status: event.target.value,
                    }))
                  }
                >
                  {articleStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === "all" ? "All statuses" : sentenceCase(status)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="table-list">
            {filteredArticles.length ? (
              filteredArticles.map((article) => (
                <article
                  className={cx(
                    "table-row-card",
                    selectedArticleId === article.id && "table-row-card-selected",
                  )}
                  key={article.id}
                >
                  <button
                    type="button"
                    className="table-row-main"
                    onClick={() => setSelectedArticleId(article.id)}
                  >
                    <div>
                      <h3>{article.title}</h3>
                      <p>{truncate(article.summary, 120)}</p>
                    </div>
                    <div className="table-row-meta">
                      <StatusPill tone={getArticleTone(article.status)}>
                        {sentenceCase(article.status)}
                      </StatusPill>
                      <span>{article.categoryName || "Uncategorized"}</span>
                      <span>{article.countryName || "Not assigned"}</span>
                    </div>
                  </button>

                  <div className="table-row-actions">
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => setSelectedArticleId(article.id)}
                      aria-label={`View ${article.title}`}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      className="icon-button icon-button-danger"
                      disabled={busyKey === `article-delete-${article.id}`}
                      onClick={() => handleDeleteArticle(article)}
                      aria-label={`Delete ${article.title}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <EmptyState
                title="No matching articles"
                copy="Try a different search term or adjust the category and status filters."
              />
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="Article Detail"
          description="Loaded from the article detail endpoint for a closer admin review."
        >
          {selectedArticle ? (
            <div className="detail-panel">
              <div className="detail-panel-header">
                <div>
                  <p className="detail-kicker">Article ID: {selectedArticle.id}</p>
                  <h3>{selectedArticle.title}</h3>
                  <p>{selectedArticle.summary || "No summary available."}</p>
                </div>
                <StatusPill tone={getArticleTone(selectedArticle.status)}>
                  {sentenceCase(selectedArticle.status)}
                </StatusPill>
              </div>

              <div className="detail-stats">
                <div>
                  <span>Category</span>
                  <strong>{selectedArticle.categoryName || "Uncategorized"}</strong>
                </div>
                <div>
                  <span>Country</span>
                  <strong>{selectedArticle.countryName || "Not assigned"}</strong>
                </div>
                <div>
                  <span>Current revision</span>
                  <strong>{selectedArticle.currentRevisionId || "Not linked"}</strong>
                </div>
                <div>
                  <span>Author</span>
                  <strong>{selectedArticle.authorName || "Unknown author"}</strong>
                </div>
                <div>
                  <span>Updated</span>
                  <strong>{formatDate(selectedArticle.updatedAt)}</strong>
                </div>
                <div>
                  <span>Published</span>
                  <strong>{formatDate(selectedArticle.publishedAt)}</strong>
                </div>
              </div>

              <div className="engagement-strip">
                <div>
                  <Heart size={16} />
                  <span>{selectedArticle.likes} likes</span>
                </div>
                <div>
                  <ThumbsDown size={16} />
                  <span>{selectedArticle.dislikes} dislikes</span>
                </div>
                <div>
                  <Clock3 size={16} />
                  <span>{detailLoading ? "Refreshing detail..." : "Detail synced"}</span>
                </div>
              </div>

              <div className="prose-card">
                <h4>Content</h4>
                <p>{selectedArticle.content || "No article body available."}</p>
              </div>
            </div>
          ) : (
            <EmptyState
              title="No article selected"
              copy="Choose an article from the list to inspect the full detail view."
            />
          )}
        </SectionCard>
      </div>
    );
  }

  function renderRevisions() {
    return (
      <div className="revision-layout">
        <SectionCard
          title="Pending Revision Queue"
          description="The approval flow below controls which revision becomes the current article version."
          className="revision-queue-card"
        >
          <div className="queue-summary">
            <div>
              <span>Pending queue</span>
              <strong>{revisions.length}</strong>
            </div>
            <div>
              <span>Current focus</span>
              <strong>{selectedRevision ? selectedRevision.articleTitle : "No revision selected"}</strong>
            </div>
          </div>

          <div className="revision-queue">
            {revisions.length ? (
              revisions.map((revision) => (
                <button
                  type="button"
                  key={revision.id}
                  className={cx(
                    "revision-queue-item",
                    selectedRevisionId === revision.id && "revision-queue-item-selected",
                  )}
                  onClick={() => setSelectedRevisionId(revision.id)}
                >
                  <div>
                    <p className="revision-id">{revision.id}</p>
                    <h3>{revision.articleTitle}</h3>
                    <p>{revision.summary}</p>
                  </div>
                  <div className="revision-meta">
                    <StatusPill tone="warning">Pending</StatusPill>
                    <span>{revision.submittedByName || "Unknown editor"}</span>
                    <span>{formatDate(revision.submittedAt)}</span>
                  </div>
                </button>
              ))
            ) : (
              <EmptyState
                title="Revision queue cleared"
                copy="There are no pending revisions waiting for an admin decision."
              />
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="Revision Compare"
          description="Approve to promote the proposed content to the current article revision."
          className="revision-compare-card"
        >
          {selectedRevision ? (
            <div className="revision-detail">
              <div className="revision-detail-header">
                <div>
                  <p className="detail-kicker">Submitted by {selectedRevision.submittedByName}</p>
                  <h3>{selectedRevision.articleTitle}</h3>
                  <p>{selectedRevision.summary}</p>
                </div>
                <StatusPill tone="warning">Awaiting approval</StatusPill>
              </div>

              <div className="moderation-note">
                <label htmlFor="moderation-note">Moderation note</label>
                <textarea
                  id="moderation-note"
                  rows={3}
                  value={reviewNote}
                  onChange={(event) => setReviewNote(event.target.value)}
                  placeholder="Optional note for this moderation decision"
                />
              </div>

              <div className="comparison-list">
                {comparisonFields.map((field) => (
                  <div
                    className={cx("comparison-row", field.changed && "comparison-row-changed")}
                    key={field.key}
                  >
                    <div className="comparison-field-label">
                      <span>{field.label}</span>
                      {field.changed ? <StatusPill tone="warning">Changed</StatusPill> : null}
                    </div>
                    <div className="comparison-columns">
                      <div>
                        <h4>Current</h4>
                        <p>{field.current}</p>
                      </div>
                      <div>
                        <h4>Proposed</h4>
                        <p>{field.proposed}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="action-row">
                <button
                  type="button"
                  className="primary-button"
                  disabled={busyKey === `revision-approve-${selectedRevision.id}`}
                  onClick={() => handleApproveRevision(selectedRevision)}
                >
                  <CheckCircle2 size={16} />
                  Approve revision
                </button>
                <button
                  type="button"
                  className="secondary-button secondary-button-danger"
                  disabled={busyKey === `revision-reject-${selectedRevision.id}`}
                  onClick={() => handleRejectRevision(selectedRevision)}
                >
                  <XCircle size={16} />
                  Reject revision
                </button>
              </div>
            </div>
          ) : (
            <EmptyState
              title="No revision selected"
              copy="Choose a pending revision from the queue to compare versions and approve or reject it."
            />
          )}
        </SectionCard>
      </div>
    );
  }

  function renderUsers() {
    return (
      <SectionCard
        title="User Management"
        description="Assign roles, review account activity, and lock or unlock access."
      >
        <div className="data-table">
          <div className="data-table-header">
            <span>User</span>
            <span>Role</span>
            <span>Status</span>
            <span>Articles</span>
            <span>Last seen</span>
            <span>Action</span>
          </div>

          {users.length ? (
            users.map((user) => (
              <div className="data-table-row" key={user.id}>
                <div>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
                <div>
                  <select
                    className="table-select"
                    value={user.role}
                    disabled={busyKey === `user-role-${user.id}`}
                    onChange={(event) => handleRoleChange(user.id, event.target.value)}
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {sentenceCase(role)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <StatusPill tone={user.locked ? "danger" : "success"}>
                    {user.locked ? "Locked" : "Active"}
                  </StatusPill>
                </div>
                <div>
                  <StatusPill tone={getRoleTone(user.role)}>{user.articlesCount}</StatusPill>
                </div>
                <div>{formatDate(user.lastSeen)}</div>
                <div>
                  <button
                    type="button"
                    className="secondary-button"
                    disabled={busyKey === `user-lock-${user.id}`}
                    onClick={() => handleToggleUserLock(user)}
                  >
                    {user.locked ? <Unlock size={16} /> : <Lock size={16} />}
                    {user.locked ? "Unlock" : "Lock"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              title="No users found"
              copy="User accounts will appear here once the admin API returns user records."
            />
          )}
        </div>
      </SectionCard>
    );
  }

  function renderCategories() {
    return (
      <div className="dashboard-grid">
        <SectionCard
          title={categoryForm.id ? "Edit Category" : "Create Category"}
          description="Add new categories or update descriptions used throughout the article workflow."
        >
          <form className="form-stack" onSubmit={handleCategorySubmit}>
            <label>
              <span>Name</span>
              <input
                type="text"
                value={categoryForm.name}
                onChange={(event) =>
                  setCategoryForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="Category name"
              />
            </label>

            <label>
              <span>Description</span>
              <textarea
                rows={5}
                value={categoryForm.description}
                onChange={(event) =>
                  setCategoryForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                placeholder="Explain how this category should be used"
              />
            </label>

            <div className="action-row">
              <button type="submit" className="primary-button" disabled={busyKey.startsWith("category-")}>
                {categoryForm.id ? <Pencil size={16} /> : <Plus size={16} />}
                {categoryForm.id ? "Update category" : "Create category"}
              </button>
              {categoryForm.id ? (
                <button type="button" className="secondary-button" onClick={resetCategoryForm}>
                  Reset
                </button>
              ) : null}
            </div>
          </form>
        </SectionCard>

        <SectionCard
          title="Category Inventory"
          description="Current taxonomy, article counts, and management actions."
        >
          <div className="stack-list">
            {categories.length ? (
              categories.map((category) => (
                <article className="stack-list-item" key={category.id}>
                  <div>
                    <h3>{category.name}</h3>
                    <p>{category.description || "No description provided."}</p>
                  </div>
                  <div className="stack-list-meta">
                    <StatusPill tone="info">{category.articleCount} articles</StatusPill>
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => startCategoryEdit(category)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      className="icon-button icon-button-danger"
                      disabled={busyKey === `category-delete-${category.id}`}
                      onClick={() => handleDeleteCategory(category)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <EmptyState
                title="No categories available"
                copy="Create a category to begin organizing the article library."
              />
            )}
          </div>
        </SectionCard>
      </div>
    );
  }

  function renderCountries() {
    return (
      <div className="dashboard-grid">
        <SectionCard
          title="Add Country"
          description="Register a new country so editors can map article records consistently."
        >
          <form className="form-stack" onSubmit={handleCountrySubmit}>
            <label>
              <span>Country name</span>
              <input
                type="text"
                value={countryForm.name}
                onChange={(event) =>
                  setCountryForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="Country name"
              />
            </label>

            <label>
              <span>ISO code</span>
              <input
                type="text"
                value={countryForm.code}
                maxLength={3}
                onChange={(event) =>
                  setCountryForm((current) => ({
                    ...current,
                    code: event.target.value.toUpperCase(),
                  }))
                }
                placeholder="VN"
              />
            </label>

            <button type="submit" className="primary-button" disabled={busyKey === "country-create"}>
              <Plus size={16} />
              Add country
            </button>
          </form>
        </SectionCard>

        <SectionCard
          title="Country Registry"
          description="Available countries and the number of articles tagged to each one."
        >
          <div className="stack-list">
            {countries.length ? (
              countries.map((country) => (
                <article className="stack-list-item" key={country.id}>
                  <div>
                    <h3>{country.name}</h3>
                    <p>{country.code}</p>
                  </div>
                  <div className="stack-list-meta">
                    <StatusPill tone="info">{country.articleCount} articles</StatusPill>
                  </div>
                </article>
              ))
            ) : (
              <EmptyState
                title="No countries available"
                copy="Add a country to make regional article metadata selectable."
              />
            )}
          </div>
        </SectionCard>
      </div>
    );
  }

  function renderNotifications() {
    return (
      <SectionCard
        title="System Notifications"
        description="Track admin-facing updates and mark each event as read after review."
      >
        <div className="notification-summary">
          <StatusPill tone="info">{notifications.length} total</StatusPill>
          <StatusPill tone="warning">{unreadNotifications} unread</StatusPill>
        </div>

        <div className="stack-list">
          {notifications.length ? (
            notifications.map((notification) => (
              <article
                className={cx(
                  "stack-list-item",
                  !notification.read && "stack-list-item-unread",
                )}
                key={notification.id}
              >
                <div>
                  <div className="notification-heading">
                    <h3>{notification.title}</h3>
                    <StatusPill tone={getNotificationTone(notification.type)}>
                      {sentenceCase(notification.type)}
                    </StatusPill>
                  </div>
                  <p>{notification.message}</p>
                  <small>{formatDate(notification.createdAt)}</small>
                </div>
                <div className="stack-list-meta">
                  {notification.read ? (
                    <StatusPill tone="success">Read</StatusPill>
                  ) : (
                    <button
                      type="button"
                      className="secondary-button"
                      disabled={busyKey === `notification-read-${notification.id}`}
                      onClick={() => handleMarkNotificationRead(notification)}
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </article>
            ))
          ) : (
            <EmptyState
              title="No notifications"
              copy="System events will appear here as admins moderate and manage the dashboard."
            />
          )}
        </div>
      </SectionCard>
    );
  }

  function renderActiveSection() {
    switch (activeSection) {
      case "articles":
        return renderArticles();
      case "revisions":
        return renderRevisions();
      case "users":
        return renderUsers();
      case "categories":
        return renderCategories();
      case "countries":
        return renderCountries();
      case "notifications":
        return renderNotifications();
      case "overview":
      default:
        return renderOverview();
    }
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand-card">
          <p className="eyebrow">Museum CMS</p>
          <h1>Admin Dashboard</h1>
          <p>
            Operations hub for overview metrics, article moderation, taxonomy, and system control.
          </p>
        </div>

        <nav className="sidebar-nav" aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const badgeValue =
              item.id === "revisions"
                ? dashboard.revisionsPending
                : item.id === "notifications"
                  ? unreadNotifications
                  : null;

            return (
              <button
                key={item.id}
                type="button"
                className={cx("nav-button", activeSection === item.id && "nav-button-active")}
                onClick={() => setActiveSection(item.id)}
              >
                <div className="nav-button-main">
                  <Icon size={18} />
                  <div>
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                  </div>
                </div>
                {badgeValue ? <StatusPill tone="warning">{badgeValue}</StatusPill> : null}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="admin-main">
        <header className="hero-card">
          <div>
            <p className="eyebrow">Role-Based Content Management</p>
            <h2>Operational overview and moderation workspace</h2>
            <p>
              Focus on revision approvals first, then move through articles, users, taxonomy, and
              notifications as needed.
            </p>
          </div>

          <div className="hero-actions">
            <StatusPill tone={usingDemoData ? "warning" : "success"}>
              {usingDemoData ? "Demo fallback data" : "Live API connected"}
            </StatusPill>
            <button type="button" className="secondary-button" onClick={refreshEverything}>
              <RefreshCw size={16} className={isRefreshing ? "spin" : ""} />
              Refresh data
            </button>
          </div>
        </header>

        {error ? (
          <div className="banner banner-error">
            <XCircle size={16} />
            <span>{error}</span>
          </div>
        ) : null}

        {flash ? (
          <div className="banner banner-success">
            <CheckCircle2 size={16} />
            <span>{flash.message}</span>
          </div>
        ) : null}

        <section className="metric-grid">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              icon={metric.icon}
              label={metric.label}
              value={metric.value}
              helper={metric.helper}
              tone={metric.tone}
            />
          ))}
        </section>

        {renderActiveSection()}
      </main>
    </div>
  );
}
