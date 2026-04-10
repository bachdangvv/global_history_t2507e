import { ArrowLeft, CheckCircle, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminApi } from "../../services/api";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadArticleDetail() {
    setError("");

    try {
      const articleData = await adminApi.getArticle(id);
      setArticle(articleData);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load article detail.");
    }
  }

  useEffect(() => {
    void loadArticleDetail();
  }, [id]);

  async function handleApprove() {
    if (!article) {
      return;
    }

    try {
      await adminApi.approveArticle(article.id);
      setMessage("Article approved successfully.");
      await loadArticleDetail();
    } catch (approveError) {
      setError(approveError instanceof Error ? approveError.message : "Unable to approve the article.");
    }
  }

  async function handleDelete() {
    if (!article) {
      return;
    }

    try {
      await adminApi.deleteArticle(article.id);
      navigate("/admin/articles");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete the article.");
    }
  }

  if (!article) {
    return (
      <div className="page-shell">
        {error ? <div className="notice-banner notice-banner-danger">{error}</div> : null}
        <div className="page-loading">Loading article detail...</div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      {message ? <div className="notice-banner">{message}</div> : null}
      {error ? <div className="notice-banner notice-banner-danger">{error}</div> : null}

      <section className="page-hero">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Article detail</p>
            <h1>{article.title}</h1>
            <p>Review the complete article record, approve it for publication, or remove it from the collection.</p>
          </div>
          <div className="detail-actions">
            <Link className="button button-secondary" to="/admin/articles">
              <ArrowLeft size={16} />
              Back to articles
            </Link>
            {article.status !== "published" ? (
              <button type="button" className="button button-approve" onClick={handleApprove}>
                <CheckCircle size={16} />
                Approve article
              </button>
            ) : null}
            <button type="button" className="button button-secondary" onClick={handleDelete}>
              <Trash2 size={16} />
              Delete article
            </button>
          </div>
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-card">
          <span className="detail-label">Status</span>
          <p>{article.status}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">Author</span>
          <p>{article.authorName || "Unknown"}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">Created</span>
          <p>{formatDate(article.created_at)}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">Updated</span>
          <p>{formatDate(article.updated_at)}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">Topics</span>
          <p>{article.topicNames.length ? article.topicNames.join(", ") : "No topics assigned"}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">Linked events</span>
          <p>{article.linkedEvents.length ? article.linkedEvents.map((eventItem) => eventItem.title).join(", ") : "No linked events"}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">Pending edits</span>
          <p>{article.pendingEditCount}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">Reactions</span>
          <p>{article.like_count} likes and {article.dislike_count} dislikes</p>
        </div>
        <div className="detail-card detail-card-wide">
          <span className="detail-label">Summary</span>
          <p>{article.summary || "No summary available."}</p>
        </div>
        <div className="detail-card detail-card-wide">
          <span className="detail-label">Content</span>
          <p>{article.content || "No content available."}</p>
        </div>
        {article.currentEdit ? (
          <div className="detail-card detail-card-wide">
            <span className="detail-label">Current approved edit</span>
            <p>{article.currentEdit.summary || "No current edit summary."}</p>
            <p>{article.currentEdit.content || "No current edit content."}</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
