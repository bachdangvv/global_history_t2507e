import { Eye, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AdminTable from "../../components/admin/AdminTable";
import { adminApi } from "../../services/api";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getStatusTone(status) {
  switch (status) {
    case "published":
      return "status-badge-success";
    case "review":
    case "pending":
      return "status-badge-warning";
    case "archived":
      return "status-badge-danger";
    default:
      return "status-badge-neutral";
  }
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filters, setFilters] = useState({
    query: "",
    topicId: "all",
    eventId: "all",
    status: "all",
  });

  async function loadPage() {
    const [articleList, topicList, eventList] = await Promise.all([
      adminApi.getArticles(),
      adminApi.getTopics(),
      adminApi.getEvents(),
    ]);

    setArticles(articleList);
    setTopics(topicList);
    setEvents(eventList);
    setSelectedArticle((current) =>
      articleList.find((article) => article.id === current?.id) || articleList[0] || null,
    );
  }

  useEffect(() => {
    loadPage();
  }, []);

  async function handleDelete(articleId) {
    await adminApi.deleteArticle(articleId);
    await loadPage();
  }

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const query = filters.query.trim().toLowerCase();
      const matchesQuery =
        !query ||
        (article.title || '').toLowerCase().includes(query) ||
        (article.summary || '').toLowerCase().includes(query);
      const matchesTopic =
        filters.topicId === "all" ||
        (article.topicNames || []).some((topicName) => topics.find((topic) => String(topic.id) === filters.topicId)?.name === topicName);
      const matchesEvent =
        filters.eventId === "all" ||
        (article.linkedEvents || []).some((eventItem) => String(eventItem.id) === filters.eventId);
      const matchesStatus = filters.status === "all" || article.status === filters.status;

      return matchesQuery && matchesTopic && matchesEvent && matchesStatus;
    });
  }, [articles, filters, topics]);

  const columns = [
    {
      key: "title",
      header: "Article",
      render: (article) => (
        <div className="table-primary">
          <strong>{article.title}</strong>
          <p>{article.summary}</p>
        </div>
      ),
    },
    {
      key: "topics",
      header: "Topics",
      render: (article) => (article.topicNames || []).join(", ") || "No topics",
    },
    {
      key: "events",
      header: "Events",
      render: (article) =>
        (article.linkedEvents || []).length
          ? article.linkedEvents.map((eventItem) => eventItem.title).join(", ")
          : "No linked events",
    },
    {
      key: "status",
      header: "Status",
      render: (article) => (
        <span className={`status-badge ${getStatusTone(article.status)}`}>{article.status}</span>
      ),
    },
    {
      key: "edits",
      header: "Pending edits",
      render: (article) => article.pendingEditCount,
    },
    {
      key: "updated_at",
      header: "Updated",
      render: (article) => formatDate(article.updated_at),
    },
    {
      key: "actions",
      header: "Actions",
      render: (article) => (
        <div className="table-actions">
          <button
            type="button"
            className="icon-button"
            onClick={() => setSelectedArticle(article)}
            aria-label={`View ${article.title}`}
          >
            <Eye size={16} />
          </button>
          <button
            type="button"
            className="icon-button icon-button-danger"
            onClick={() => handleDelete(article.id)}
            aria-label={`Delete ${article.title}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div>
          <p className="section-kicker">Articles management</p>
          <h1>Articles</h1>
          <p>Inspect article records together with linked topics, historical events, and current edit status.</p>
        </div>
      </section>

      <section className="panel-card">
        <div className="toolbar">
          <label className="search-input">
            <Search size={16} />
            <input
              type="search"
              placeholder="Search title or summary"
              value={filters.query}
              onChange={(event) =>
                setFilters((current) => ({ ...current, query: event.target.value }))
              }
            />
          </label>

          <div className="toolbar-group">
            <select
              value={filters.topicId}
              onChange={(event) =>
                setFilters((current) => ({ ...current, topicId: event.target.value }))
              }
            >
              <option value="all">All topics</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>

            <select
              value={filters.eventId}
              onChange={(event) =>
                setFilters((current) => ({ ...current, eventId: event.target.value }))
              }
            >
              <option value="all">All events</option>
              {events.map((eventItem) => (
                <option key={eventItem.id} value={eventItem.id}>
                  {eventItem.title}
                </option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(event) =>
                setFilters((current) => ({ ...current, status: event.target.value }))
              }
            >
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="review">Review</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <AdminTable
          columns={columns}
          rows={filteredArticles}
          emptyTitle="No matching articles"
          emptyText="Try changing the search term or one of the current filters."
        />
      </section>

      <section className="panel-card">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Article detail</p>
            <h2>{selectedArticle ? selectedArticle.title : "Select an article"}</h2>
            <p>
              {selectedArticle
                ? "A focused detail panel for the currently selected article."
                : "Choose an article from the table to inspect the full record."}
            </p>
          </div>
        </div>

        {selectedArticle ? (
          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-label">Summary</span>
              <p>{selectedArticle.summary || "No summary"}</p>
            </div>
            <div className="detail-card">
              <span className="detail-label">Author</span>
              <p>{selectedArticle.authorName || "Unknown"}</p>
            </div>
            <div className="detail-card">
              <span className="detail-label">Topics</span>
              <p>{(selectedArticle.topicNames || []).join(", ") || "No topics assigned"}</p>
            </div>
            <div className="detail-card">
              <span className="detail-label">Linked events</span>
              <p>
                {(selectedArticle.linkedEvents || []).length
                  ? selectedArticle.linkedEvents.map((eventItem) => eventItem.title).join(", ")
                  : "No linked events"}
              </p>
            </div>
            <div className="detail-card">
              <span className="detail-label">Current edit</span>
              <p>{selectedArticle.currentEdit ? selectedArticle.currentEdit.summary : "No current edit record"}</p>
            </div>
            <div className="detail-card">
              <span className="detail-label">Reactions</span>
              <p>{(selectedArticle.like_count || 0) + (selectedArticle.dislike_count || 0)} total reactions</p>
            </div>
            <div className="detail-card detail-card-wide">
              <span className="detail-label">Content preview</span>
              <p>{selectedArticle.content || "No content"}</p>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
