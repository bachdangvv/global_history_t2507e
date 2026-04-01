import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userApi } from "../../services/api";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    userApi.getArticle(id).then(setArticle);
  }, [id]);

  async function handleArticleVote(voteType) {
    const updatedArticle = await userApi.voteArticle(id, voteType);
    setArticle(updatedArticle);
  }

  async function handleEditVote(editId, voteType) {
    await userApi.voteEdit(editId, voteType);
    const refreshedArticle = await userApi.getArticle(id);
    setArticle(refreshedArticle);
  }

  if (!article) {
    return <div className="page-loading">Loading article detail...</div>;
  }

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Article detail</p>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
        </div>
        <div className="detail-actions">
          <button
            type="button"
            className={`button ${article.currentUserVote === "like" ? "button-primary" : "button-secondary"}`}
            onClick={() => handleArticleVote("like")}
          >
            <ThumbsUp size={16} />
            Like
          </button>
          <button
            type="button"
            className={`button ${article.currentUserVote === "dislike" ? "button-primary" : "button-secondary"}`}
            onClick={() => handleArticleVote("dislike")}
          >
            <ThumbsDown size={16} />
            Dislike
          </button>
          <Link className="button button-secondary" to={`/user/articles/${article.id}/edit`}>
            Suggest edit
          </Link>
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-card">
          <span className="detail-label">Author</span>
          <p>{article.authorName}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">Topics</span>
          <p>{article.topicNames.join(", ")}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">Linked events</span>
          <p>{article.linkedEvents.length ? article.linkedEvents.map((eventItem) => eventItem.title).join(", ") : "No linked events"}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">Like / Dislike</span>
          <p>
            {article.like_count} likes and {article.dislike_count} dislikes
          </p>
        </div>
        <div className="detail-card detail-card-wide">
          <span className="detail-label">Content</span>
          <p>{article.content}</p>
        </div>
        {article.currentEdit ? (
          <div className="detail-card detail-card-wide">
            <span className="detail-label">Current approved edit</span>
            <p>{article.currentEdit.summary}</p>
            <p>{article.currentEdit.content}</p>
          </div>
        ) : null}
      </section>

      <section className="page-grid page-grid-two">
        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Community edits</p>
              <h2>Pending and recent edit activity</h2>
              <p>Vote on edits tied to this article through the `edits_votes` flow.</p>
            </div>
          </div>

          <div className="stack-list">
            {article.relatedEdits.length ? (
              article.relatedEdits.map((edit) => (
                <article key={edit.id} className="stack-row">
                  <div>
                    <h3>{edit.title}</h3>
                    <p>{edit.summary}</p>
                    <small>By {edit.editorName} • {formatDate(edit.created_at)}</small>
                  </div>
                  <div className="stack-row-meta">
                    <span className="status-badge status-badge-warning">{edit.status}</span>
                    <div className="detail-actions">
                      <button
                        type="button"
                        className={`button button-small ${edit.currentUserVote === "upvote" ? "button-primary" : "button-secondary"}`}
                        onClick={() => handleEditVote(edit.id, "upvote")}
                      >
                        <ThumbsUp size={14} />
                        {edit.upvote_count}
                      </button>
                      <button
                        type="button"
                        className={`button button-small ${edit.currentUserVote === "downvote" ? "button-primary" : "button-secondary"}`}
                        onClick={() => handleEditVote(edit.id, "downvote")}
                      >
                        <ThumbsDown size={14} />
                        {edit.downvote_count}
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="table-empty-state">
                <h3>No community edits yet</h3>
                <p>Once contributors submit new edits, they will appear here for review and voting.</p>
              </div>
            )}
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Comments</p>
              <h2>Article discussion</h2>
              <p>Recent article comments from the schema-backed activity stream.</p>
            </div>
          </div>

          <div className="stack-list">
            {article.comments.length ? (
              article.comments.map((comment) => (
                <article key={comment.id} className="stack-row">
                  <div>
                    <h3>{comment.authorName}</h3>
                    <p>{comment.content}</p>
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
                <p>Discussion for this article will appear here once users start commenting.</p>
              </div>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
