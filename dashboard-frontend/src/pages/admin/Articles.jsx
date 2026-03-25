import { Eye, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AdminTable from "../../components/admin/AdminTable";
import { adminApi } from "../../services/api";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function getStatusTone(status) {
  switch (status) {
    case "published":
      return "status-badge-success";
    case "review":
      return "status-badge-warning";
    case "archived":
      return "status-badge-danger";
    default:
      return "status-badge-neutral";
  }
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filters, setFilters] = useState({
    query: "",
    categoryId: "all",
    tagId: "all",
    status: "all",
  });

  async function loadPage() {
    const [articleList, categoryList, tagList] = await Promise.all([
      adminApi.getArticles(),
      adminApi.getCategories(),
      adminApi.getTags(),
    ]);

    setArticles(articleList);
    setCategories(categoryList);
    setTags(tagList);
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
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query);
      const matchesCategory =
        filters.categoryId === "all" || article.categoryId === filters.categoryId;
      const matchesTag = filters.tagId === "all" || article.tagIds.includes(filters.tagId);
      const matchesStatus = filters.status === "all" || article.status === filters.status;

      return matchesQuery && matchesCategory && matchesTag && matchesStatus;
    });
  }, [articles, filters]);

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
      key: "category",
      header: "Category",
      render: (article) => article.categoryName,
    },
    {
      key: "tags",
      header: "Tags",
      render: (article) => article.tagNames.join(", ") || "No tags",
    },
    {
      key: "status",
      header: "Status",
      render: (article) => (
        <span className={`status-badge ${getStatusTone(article.status)}`}>{article.status}</span>
      ),
    },
    {
      key: "reactions",
      header: "Reactions",
      render: (article) => article.reactionTotal,
    },
    {
      key: "updatedAt",
      header: "Updated",
      render: (article) => formatDate(article.updatedAt),
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
          <p>Search the article library, inspect details, and remove entries when necessary.</p>
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
              value={filters.categoryId}
              onChange={(event) =>
                setFilters((current) => ({ ...current, categoryId: event.target.value }))
              }
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={filters.tagId}
              onChange={(event) =>
                setFilters((current) => ({ ...current, tagId: event.target.value }))
              }
            >
              <option value="all">All tags</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
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
              <p>{selectedArticle.summary}</p>
            </div>
            <div className="detail-card">
              <span className="detail-label">Category</span>
              <p>{selectedArticle.categoryName}</p>
            </div>
            <div className="detail-card">
              <span className="detail-label">Tags</span>
              <p>{selectedArticle.tagNames.join(", ") || "No tags assigned"}</p>
            </div>
            <div className="detail-card">
              <span className="detail-label">Author</span>
              <p>{selectedArticle.authorName}</p>
            </div>
            <div className="detail-card">
              <span className="detail-label">Country</span>
              <p>{selectedArticle.country}</p>
            </div>
            <div className="detail-card">
              <span className="detail-label">Last updated</span>
              <p>{formatDate(selectedArticle.updatedAt)}</p>
            </div>
            <div className="detail-card detail-card-wide">
              <span className="detail-label">Content preview</span>
              <p>{selectedArticle.content}</p>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
