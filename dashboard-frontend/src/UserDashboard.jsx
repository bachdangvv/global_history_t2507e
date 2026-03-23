import React, { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Filter,
  GitBranch,
  Globe2,
  Heart,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Tags,
  ThumbsDown,
  User,
  XCircle,
} from "lucide-react";
import { userApi } from "./adminApi";

const USER_NAV_ITEMS = [
  {
    id: "articles",
    label: "Browse Articles",
    description: "Filter, inspect, and vote on posts",
    icon: FileText,
  },
  {
    id: "write",
    label: "Write and Edit",
    description: "Always submit a revision",
    icon: Pencil,
  },
  {
    id: "profile",
    label: "Profile",
    description: "Your articles and activity history",
    icon: User,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Updates that matter to you",
    icon: Bell,
  },
];

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

function getStatusTone(status) {
  switch (status) {
    case "published":
      return "success";
    case "pending":
    case "review":
      return "warning";
    case "approved":
      return "success";
    case "rejected":
      return "danger";
    default:
      return "neutral";
  }
}

function getNotificationTone(type) {
  switch (type) {
    case "article":
      return "success";
    case "revision":
      return "warning";
    case "profile":
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
      <h2>Loading user dashboard</h2>
      <p>Fetching article feeds, profile data, revision tools, and notifications.</p>
    </div>
  );
}

export default function UserDashboard() {
  const [activeSection, setActiveSection] = useState("articles");
  const [articles, setArticles] = useState([]);
  const [articleDetail, setArticleDetail] = useState(null);
  const [revisions, setRevisions] = useState([]);
  const [profile, setProfile] = useState(null);
  const [myArticles, setMyArticles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [articleFilters, setArticleFilters] = useState({
    query: "",
    category: "all",
    country: "all",
  });
  const [revisionForm, setRevisionForm] = useState({
    articleId: "",
    title: "",
    summary: "",
    content: "",
    categoryId: "",
    countryId: "",
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
    loadAllData();
  }, []);

  useEffect(() => {
    if (!selectedArticleId) {
      setArticleDetail(null);
      return undefined;
    }

    let cancelled = false;
    setDetailLoading(true);

    userApi
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
      const [articlesResult, revisionsResult, profileResult, myArticlesResult, notificationsResult] =
        await Promise.all([
          userApi.getArticles(),
          userApi.getRevisionFeed(),
          userApi.getMyProfile(),
          userApi.getMyArticles(),
          userApi.getNotifications(),
        ]);

      setArticles(articlesResult.data || []);
      setRevisions(revisionsResult.data || []);
      setProfile(profileResult.data || null);
      setMyArticles(myArticlesResult.data || []);
      setNotifications(notificationsResult.data || []);
      setResourceSources({
        articles: articlesResult.source,
        revisions: revisionsResult.source,
        profile: profileResult.source,
        myArticles: myArticlesResult.source,
        notifications: notificationsResult.source,
      });
      setSelectedArticleId((current) =>
        (articlesResult.data || []).some((article) => article.id === current)
          ? current
          : articlesResult.data?.[0]?.id || "",
      );
    } catch (loadError) {
      setError(loadError.message || "Unable to load the user dashboard.");
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

  function syncRevisionForm(articleId) {
    const article = articles.find((entry) => entry.id === articleId);

    if (!article) {
      setRevisionForm({
        articleId: "",
        title: "",
        summary: "",
        content: "",
        categoryId: "",
        countryId: "",
      });
      return;
    }

    setRevisionForm({
      articleId: article.id,
      title: article.title,
      summary: article.summary || "",
      content: article.content || "",
      categoryId: article.categoryId || "",
      countryId: article.countryId || "",
    });
  }

  async function handleArticleVote(article, value) {
    setBusyKey(`article-vote-${article.id}-${value}`);
    setError("");

    try {
      await userApi.voteArticle(article.id, value);
      showSuccess(`Recorded your ${value} vote on "${article.title}".`);
      await loadAllData({ silent: true });
    } catch (actionError) {
      setError(actionError.message || "Unable to save your article vote.");
    } finally {
      setBusyKey("");
    }
  }

  async function handleRevisionVote(revision, value) {
    setBusyKey(`revision-vote-${revision.id}-${value}`);
    setError("");

    try {
      await userApi.voteRevision(revision.id, value);
      showSuccess(`Recorded your ${value} vote on revision ${revision.id}.`);
      await loadAllData({ silent: true });
    } catch (actionError) {
      setError(actionError.message || "Unable to save your revision vote.");
    } finally {
      setBusyKey("");
    }
  }

  async function handleRevisionSubmit(event) {
    event.preventDefault();

    if (!revisionForm.title.trim() || !revisionForm.content.trim()) {
      setError("Title and content are required before submitting a revision.");
      return;
    }

    setBusyKey("revision-submit");
    setError("");

    try {
      await userApi.createRevision({
        articleId: revisionForm.articleId || undefined,
        title: revisionForm.title.trim(),
        summary: revisionForm.summary.trim(),
        content: revisionForm.content.trim(),
        categoryId: revisionForm.categoryId || undefined,
        countryId: revisionForm.countryId || undefined,
      });
      showSuccess("Revision submitted for admin review.");
      setRevisionForm({
        articleId: "",
        title: "",
        summary: "",
        content: "",
        categoryId: "",
        countryId: "",
      });
      await loadAllData({ silent: true });
    } catch (actionError) {
      setError(actionError.message || "Unable to submit the revision.");
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
      await userApi.markNotificationRead(notification.id);
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
      articleFilters.category === "all" ||
      (article.categoryId || article.categoryName) === articleFilters.category;
    const matchesCountry =
      articleFilters.country === "all" ||
      (article.countryId || article.countryName) === articleFilters.country;

    return matchesQuery && matchesCategory && matchesCountry;
  });

  const categoryOptions = Array.from(
    new Map(
      articles
        .filter((article) => article.categoryId || article.categoryName)
        .map((article) => [
          article.categoryId || article.categoryName,
          {
            id: article.categoryId || article.categoryName,
            name: article.categoryName || sentenceCase(article.categoryId),
          },
        ]),
    ).values(),
  );

  const countryOptions = Array.from(
    new Map(
      articles
        .filter((article) => article.countryId || article.countryName)
        .map((article) => [
          article.countryId || article.countryName,
          {
            id: article.countryId || article.countryName,
            name: article.countryName || sentenceCase(article.countryId),
          },
        ]),
    ).values(),
  );

  const listSelectedArticle =
    articles.find((article) => article.id === selectedArticleId) || null;
  const selectedArticle = listSelectedArticle
    ? {
        ...listSelectedArticle,
        ...(articleDetail || {}),
      }
    : articleDetail || null;
  const unreadNotifications = notifications.filter((notification) => !notification.read).length;
  const usingDemoData = Object.values(resourceSources).some((source) => source === "mock");
  const profileStats = {
    totalArticles: profile?.stats?.totalArticles ?? myArticles.length,
    totalRevisions:
      profile?.stats?.totalRevisions ??
      revisions.filter((revision) => revision.submittedBy === profile?.id).length,
    totalVotes:
      (profile?.stats?.totalArticleVotes || 0) + (profile?.stats?.totalRevisionVotes || 0),
    unreadNotifications,
  };

  const metrics = [
    {
      label: "Articles Available",
      value: compactNumber(articles.length),
      helper: "Browseable content records",
      icon: FileText,
      tone: "neutral",
    },
    {
      label: "My Articles",
      value: compactNumber(profileStats.totalArticles),
      helper: "Posts authored by this profile",
      icon: User,
      tone: "success",
    },
    {
      label: "My Revisions",
      value: compactNumber(profileStats.totalRevisions),
      helper: "Submissions waiting or already reviewed",
      icon: GitBranch,
      tone: "warning",
    },
    {
      label: "Unread Notifications",
      value: compactNumber(profileStats.unreadNotifications),
      helper: "Items still needing attention",
      icon: Bell,
      tone: "info",
    },
  ];

  if (isLoading) {
    return <LoadingView />;
  }

  function renderArticles() {
    return (
      <div className="section-stack">
        <SectionCard
          title="Article Explorer"
          description="Browse published content, inspect article detail, and vote on the items you want to support or challenge."
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
                <Tags size={16} />
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
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="select-field">
                <Globe2 size={16} />
                <select
                  value={articleFilters.country}
                  onChange={(event) =>
                    setArticleFilters((current) => ({
                      ...current,
                      country: event.target.value,
                    }))
                  }
                >
                  <option value="all">All countries</option>
                  {countryOptions.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
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
                      <StatusPill tone={getStatusTone(article.status)}>
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
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      className={cx(
                        "icon-button",
                        article.currentUserVote === "like" && "icon-button-active",
                      )}
                      disabled={busyKey === `article-vote-${article.id}-like`}
                      onClick={() => handleArticleVote(article, "like")}
                    >
                      <Heart size={16} />
                    </button>
                    <button
                      type="button"
                      className={cx(
                        "icon-button",
                        article.currentUserVote === "dislike" && "icon-button-danger",
                      )}
                      disabled={busyKey === `article-vote-${article.id}-dislike`}
                      onClick={() => handleArticleVote(article, "dislike")}
                    >
                      <ThumbsDown size={16} />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <EmptyState
                title="No matching articles"
                copy="Try another search term or adjust the category and country filters."
              />
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="Article Detail"
          description="Loaded from the public article detail endpoint for reading and voting context."
        >
          {selectedArticle ? (
            <div className="detail-panel">
              <div className="detail-panel-header">
                <div>
                  <p className="detail-kicker">Article ID: {selectedArticle.id}</p>
                  <h3>{selectedArticle.title}</h3>
                  <p>{selectedArticle.summary || "No summary available."}</p>
                </div>
                <StatusPill tone={getStatusTone(selectedArticle.status)}>
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
                <div>
                  <span>Current revision</span>
                  <strong>{selectedArticle.currentRevisionId || "Not linked"}</strong>
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
              copy="Choose an article from the explorer to inspect the full detail view."
            />
          )}
        </SectionCard>
      </div>
    );
  }

  function renderWrite() {
    return (
      <div className="dashboard-grid">
        <SectionCard
          title="Create a Revision"
          description="Writing and editing never changes the article directly. Every change becomes a new revision for admin approval."
        >
          <div className="highlight-note">
            <GitBranch size={16} />
            <span>
              This workflow always submits a revision. Direct article edits are intentionally blocked.
            </span>
          </div>

          <form className="form-stack" onSubmit={handleRevisionSubmit}>
            <label>
              <span>Base article</span>
              <select
                className="table-select"
                value={revisionForm.articleId}
                onChange={(event) => syncRevisionForm(event.target.value)}
              >
                <option value="">Start a new article revision</option>
                {articles.map((article) => (
                  <option key={article.id} value={article.id}>
                    {article.title}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Title</span>
              <input
                type="text"
                value={revisionForm.title}
                onChange={(event) =>
                  setRevisionForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                placeholder="Revision title"
              />
            </label>

            <label>
              <span>Summary</span>
              <textarea
                rows={4}
                value={revisionForm.summary}
                onChange={(event) =>
                  setRevisionForm((current) => ({
                    ...current,
                    summary: event.target.value,
                  }))
                }
                placeholder="Short revision summary"
              />
            </label>

            <label>
              <span>Content</span>
              <textarea
                rows={8}
                value={revisionForm.content}
                onChange={(event) =>
                  setRevisionForm((current) => ({
                    ...current,
                    content: event.target.value,
                  }))
                }
                placeholder="Write the full proposed content"
              />
            </label>

            <div className="toolbar-filters">
              <label className="select-field">
                <Tags size={16} />
                <select
                  value={revisionForm.categoryId}
                  onChange={(event) =>
                    setRevisionForm((current) => ({
                      ...current,
                      categoryId: event.target.value,
                    }))
                  }
                >
                  <option value="">Choose a category</option>
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="select-field">
                <Globe2 size={16} />
                <select
                  value={revisionForm.countryId}
                  onChange={(event) =>
                    setRevisionForm((current) => ({
                      ...current,
                      countryId: event.target.value,
                    }))
                  }
                >
                  <option value="">Choose a country</option>
                  {countryOptions.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button type="submit" className="primary-button" disabled={busyKey === "revision-submit"}>
              <Plus size={16} />
              Submit revision
            </button>
          </form>
        </SectionCard>

        <SectionCard
          title="Revision Voting"
          description="Support the revisions you want to see move forward by voting on proposals."
        >
          <div className="stack-list">
            {revisions.length ? (
              revisions.map((revision) => (
                <article className="stack-list-item" key={revision.id}>
                  <div>
                    <p className="detail-kicker">{revision.id}</p>
                    <h3>{revision.articleTitle}</h3>
                    <p>{truncate(revision.summary, 140)}</p>
                    <small>{formatDate(revision.submittedAt)}</small>
                  </div>

                  <div className="stack-list-meta">
                    <StatusPill tone={getStatusTone(revision.status)}>
                      {sentenceCase(revision.status)}
                    </StatusPill>
                    <button
                      type="button"
                      className={cx(
                        "icon-button",
                        revision.currentUserVote === "like" && "icon-button-active",
                      )}
                      disabled={busyKey === `revision-vote-${revision.id}-like`}
                      onClick={() => handleRevisionVote(revision, "like")}
                    >
                      <Heart size={16} />
                    </button>
                    <button
                      type="button"
                      className={cx(
                        "icon-button",
                        revision.currentUserVote === "dislike" && "icon-button-danger",
                      )}
                      disabled={busyKey === `revision-vote-${revision.id}-dislike`}
                      onClick={() => handleRevisionVote(revision, "dislike")}
                    >
                      <ThumbsDown size={16} />
                    </button>
                    <StatusPill tone="success">{revision.likes} likes</StatusPill>
                    <StatusPill tone="danger">{revision.dislikes} dislikes</StatusPill>
                  </div>
                </article>
              ))
            ) : (
              <EmptyState
                title="No revisions available"
                copy="Revision voting becomes available when the feed returns pending or recent revisions."
              />
            )}
          </div>
        </SectionCard>
      </div>
    );
  }

  function renderProfile() {
    return (
      <div className="section-stack">
        <SectionCard
          title="Profile"
          description="Your author summary, writing stats, and recent activity."
        >
          {profile ? (
            <div className="detail-panel">
              <div className="detail-panel-header">
                <div>
                  <p className="detail-kicker">Current profile</p>
                  <h3>{profile.name}</h3>
                  <p>{profile.email}</p>
                </div>
                <StatusPill tone="info">{sentenceCase(profile.role || "contributor")}</StatusPill>
              </div>

              <div className="detail-stats">
                <div>
                  <span>Country</span>
                  <strong>{profile.countryName || "Not assigned"}</strong>
                </div>
                <div>
                  <span>My articles</span>
                  <strong>{profileStats.totalArticles}</strong>
                </div>
                <div>
                  <span>My revisions</span>
                  <strong>{profileStats.totalRevisions}</strong>
                </div>
                <div>
                  <span>Total votes</span>
                  <strong>{profileStats.totalVotes}</strong>
                </div>
                <div>
                  <span>Last seen</span>
                  <strong>{formatDate(profile.lastSeen)}</strong>
                </div>
                <div>
                  <span>Unread notices</span>
                  <strong>{profileStats.unreadNotifications}</strong>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              title="Profile unavailable"
              copy="The current user profile could not be loaded."
            />
          )}
        </SectionCard>

        <div className="dashboard-grid">
          <SectionCard
            title="My Articles"
            description="Articles authored by the current user."
          >
            <div className="stack-list">
              {myArticles.length ? (
                myArticles.map((article) => (
                  <article className="stack-list-item" key={article.id}>
                    <div>
                      <h3>{article.title}</h3>
                      <p>{truncate(article.summary, 120)}</p>
                    </div>
                    <div className="stack-list-meta">
                      <StatusPill tone={getStatusTone(article.status)}>
                        {sentenceCase(article.status)}
                      </StatusPill>
                    </div>
                  </article>
                ))
              ) : (
                <EmptyState
                  title="No authored articles"
                  copy="Articles you publish or revise will be listed here."
                />
              )}
            </div>
          </SectionCard>

          <SectionCard
            title="Activity History"
            description="Recent writing, voting, and notification events tied to this profile."
          >
            <div className="activity-list">
              {profile?.activity?.length ? (
                profile.activity.map((item) => (
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
                  title="No activity history"
                  copy="Your actions will be summarized here as you browse, write, and vote."
                />
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    );
  }

  function renderNotifications() {
    return (
      <SectionCard
        title="Notifications"
        description="Track feedback, approval updates, and system messages tied to your account."
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
              copy="Updates for your account will appear here when new events happen."
            />
          )}
        </div>
      </SectionCard>
    );
  }

  function renderActiveSection() {
    switch (activeSection) {
      case "write":
        return renderWrite();
      case "profile":
        return renderProfile();
      case "notifications":
        return renderNotifications();
      case "articles":
      default:
        return renderArticles();
    }
  }

  return (
    <div className="admin-shell user-dashboard-shell">
      <aside className="admin-sidebar">
        <div className="brand-card">
          <p className="eyebrow">Contributor Workspace</p>
          <h1>User Dashboard</h1>
          <p>
            Explore articles, submit revisions instead of editing directly, review your profile,
            and stay on top of personal notifications.
          </p>
        </div>

        <nav className="sidebar-nav" aria-label="User navigation">
          {USER_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const badgeValue =
              item.id === "notifications" ? unreadNotifications : item.id === "write" ? revisions.length : null;

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
            <p className="eyebrow">Personal Publishing Workspace</p>
            <h2>Browse, vote, and submit revisions with a protected workflow</h2>
            <p>
              Articles stay immutable from the user side. Every edit flows through a revision so
              the admin team can review it before publishing.
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

        <section className="metric-grid user-metric-grid">
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
