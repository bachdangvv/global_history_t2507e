import { ArrowLeft, Bookmark, Eye, Heart, MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { userApi, addRecentlyViewed } from "../../services/api";

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getImageSource(value) {
  if (!value) {
    return "";
  }

  return value.startsWith("/") ? `http://localhost:8080${value}` : value;
}

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isVotingArticle, setIsVotingArticle] = useState(false);
  const [activeEditVote, setActiveEditVote] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function loadArticleDetail() {
    setError("");

    try {
      const articleData = await userApi.getArticle(id);
      setArticle(articleData);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load article detail.");
    }
  }

  useEffect(() => {
    void loadArticleDetail();
  }, [id]);

  // Track in recently viewed
  useEffect(() => {
    if (article) {
      addRecentlyViewed(article);
    }
  }, [article]);

  const linkedEventNames = useMemo(
    () => (article?.linkedEvents || []).map((eventItem) => eventItem.title).join(", ") || "No linked events",
    [article],
  );

  async function handleArticleVote(voteType) {
    setFeedback("");
    setError("");
    setIsVotingArticle(true);

    try {
      const updatedArticle = await userApi.voteArticle(id, voteType);
      setArticle(updatedArticle);
      setFeedback(`Article ${voteType} submitted.`);
    } catch (voteError) {
      setError(voteError instanceof Error ? voteError.message : "Unable to submit your vote.");
    } finally {
      setIsVotingArticle(false);
    }
  }

  async function handleEditVote(editId, voteType) {
    setFeedback("");
    setError("");
    setActiveEditVote(`${editId}:${voteType}`);

    try {
      await userApi.voteEdit(editId, voteType);
      await loadArticleDetail();
      setFeedback("Edit vote submitted.");
    } catch (voteError) {
      setError(voteError instanceof Error ? voteError.message : "Unable to vote on the edit.");
    } finally {
      setActiveEditVote(null);
    }
  }

  async function handleToggleSave() {
    setIsSaving(true);
    try {
      if (isSaved) {
        await userApi.removeFromReadingList(id);
        setIsSaved(false);
        setFeedback("Removed from saved articles.");
      } else {
        await userApi.addToReadingList(id);
        setIsSaved(true);
        setFeedback("Saved to reading list!");
      }
    } catch {
      setError("Unable to update reading list.");
    } finally {
      setIsSaving(false);
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

  const topicNames = article.topicNames?.length ? article.topicNames : [];
  const comments = Array.isArray(article.comments) ? article.comments : [];
  const relatedEdits = Array.isArray(article.relatedEdits) ? article.relatedEdits : [];
  const heroImage = getImageSource(article.imageUrl);

  return (
    <div className="page-shell">
      {feedback ? <div className="notice-banner">{feedback}</div> : null}
      {error ? <div className="notice-banner notice-banner-danger">{error}</div> : null}

      {/* ── Hero banner with image background ────────────── */}
      <section
        className="article-hero"
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : {}}
      >
        <div className="article-hero-overlay">
          <Link className="article-hero-back" to="/user">
            ← Back
          </Link>

          <div className="article-hero-badges">
            {article.categoryName ? (
              <span className="article-hero-badge article-hero-badge-cat">
                {article.categoryName.toUpperCase()}
              </span>
            ) : null}
            {topicNames.map((name) => (
              <span key={name} className="article-hero-badge">
                {name.toUpperCase()}
              </span>
            ))}
          </div>

          <h1 className="article-hero-title">{article.title}</h1>
          <p className="article-hero-author">By {article.authorName || "Unknown"}</p>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <section className="article-stats-bar">
        <div className="article-stat-item">
          <Heart size={16} className="article-stat-icon article-stat-icon-like" />
          <span className="article-stat-label">LIKE</span>
          <strong>{article.like_count ?? 0}</strong>
        </div>
        <div className="article-stat-item">
          <MessageCircle size={16} className="article-stat-icon article-stat-icon-comment" />
          <span className="article-stat-label">COMMENTS</span>
          <strong>{comments.length}</strong>
        </div>
        <div className="article-stat-item">
          <Eye size={16} className="article-stat-icon article-stat-icon-view" />
          <span className="article-stat-label">VIEWS</span>
          <strong>{article.viewCount ?? article.view_count ?? 0}</strong>
        </div>
      </section>

      {/* ── Actions ──────────────────────────────────────── */}
      <section className="article-detail-actions">
        <button
          type="button"
          className={`button ${article.currentUserVote === "like" ? "button-primary" : "button-secondary"}`}
          onClick={() => handleArticleVote("like")}
          disabled={isVotingArticle}
        >
          <ThumbsUp size={16} />
          Like
        </button>
        <button
          type="button"
          className={`button ${article.currentUserVote === "dislike" ? "button-primary" : "button-secondary"}`}
          onClick={() => handleArticleVote("dislike")}
          disabled={isVotingArticle}
        >
          <ThumbsDown size={16} />
          Dislike
        </button>
        <Link className="button button-primary" to={`/user/articles/${article.id}/edit`}>
          Suggest edit
        </Link>
        <button
          type="button"
          className={`button ${isSaved ? "button-saved" : "button-secondary"}`}
          onClick={handleToggleSave}
          disabled={isSaving}
        >
          <Bookmark size={16} />
          {isSaved ? "Saved" : "Save"}
        </button>
      </section>

      {/* ── Summary ──────────────────────────────────────── */}
      {article.summary ? (
        <section className="article-detail-summary">
          <p className="article-detail-summary-text">
            {article.summary}
          </p>
        </section>
      ) : null}

      {/* ── Content body ─────────────────────────────────── */}
      <section className="article-detail-body panel-card">
        <h2>Overview</h2>
        <div className="article-detail-content">
          {article.content || "No article content available."}
        </div>
      </section>

      {/* ── Metadata cards ───────────────────────────────── */}
      <section className="article-meta-grid">
        <div className="article-meta-card">
          <span className="detail-label">Category</span>
          <p>{article.categoryName || "No category"}</p>
        </div>
        <div className="article-meta-card">
          <span className="detail-label">Topics</span>
          <p>{topicNames.length ? topicNames.join(", ") : "No topics assigned"}</p>
        </div>
        <div className="article-meta-card">
          <span className="detail-label">Linked events</span>
          <p>{linkedEventNames}</p>
        </div>
        <div className="article-meta-card">
          <span className="detail-label">Updated</span>
          <p>{formatDate(article.updated_at || article.created_at)}</p>
        </div>
      </section>

      {/* ── Current edit ─────────────────────────────────── */}
      {article.currentEdit ? (
        <section className="panel-card">
          <div className="panel-heading panel-heading-compact">
            <div>
              <p className="section-kicker">Current edit</p>
              <h2>Approved revision</h2>
            </div>
          </div>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
            {article.currentEdit.summary || "No approved edit summary."}
          </p>
        </section>
      ) : null}

      {/* ── Community edits & comments ────────────────────── */}
      <section className="page-grid page-grid-two">
        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Community edits</p>
              <h2>Related revisions</h2>
              <p>Readers can review the current edit queue and react to submitted revisions.</p>
            </div>
          </div>

          <div className="stack-list">
            {relatedEdits.length ? (
              relatedEdits.map((edit) => (
                <article key={edit.id} className="stack-row">
                  <div>
                    <h3>{edit.title}</h3>
                    <p>{edit.summary || "No edit summary provided."}</p>
                    <small>
                      By {edit.editorName || "Unknown editor"} | {formatDate(edit.created_at)}
                    </small>
                  </div>
                  <div className="stack-row-meta">
                    <span
                      className={`status-badge ${
                        edit.status === "approved"
                          ? "status-badge-success"
                          : edit.status === "rejected"
                            ? "status-badge-danger"
                            : "status-badge-warning"
                      }`}
                    >
                      {edit.status}
                    </span>
                    <div className="detail-actions">
                      <button
                        type="button"
                        className={`button button-small ${edit.currentUserVote === "upvote" ? "button-primary" : "button-secondary"}`}
                        onClick={() => handleEditVote(edit.id, "upvote")}
                        disabled={activeEditVote === `${edit.id}:upvote`}
                      >
                        <ThumbsUp size={14} />
                        {edit.upvote_count ?? 0}
                      </button>
                      <button
                        type="button"
                        className={`button button-small ${edit.currentUserVote === "downvote" ? "button-primary" : "button-secondary"}`}
                        onClick={() => handleEditVote(edit.id, "downvote")}
                        disabled={activeEditVote === `${edit.id}:downvote`}
                      >
                        <ThumbsDown size={14} />
                        {edit.downvote_count ?? 0}
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="table-empty-state">
                <h3>No community edits yet</h3>
                <p>New article revisions will appear here once contributors submit them.</p>
              </div>
            )}
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Comments</p>
              <h2>Discussion</h2>
              <p>Recent public comments tied to this article.</p>
            </div>
          </div>

          <div className="stack-list">
            {comments.length ? (
              comments.map((comment) => (
                <article key={comment.id} className="stack-row">
                  <div>
                    <h3>{comment.authorName || "Anonymous"}</h3>
                    <p>{comment.content || "No comment content available."}</p>
                  </div>
                  <div className="stack-row-meta">
                    <span className="status-badge status-badge-neutral">
                      <MessageCircle size={12} />
                      Comment
                    </span>
                    <small>{formatDate(comment.created_at)}</small>
                  </div>
                </article>
              ))
            ) : (
              <div className="table-empty-state">
                <h3>No comments yet</h3>
                <p>Reader discussion will appear here when comments are posted.</p>
              </div>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
