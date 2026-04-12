import { ArrowRight, FilePenLine } from "lucide-react";
import { Link } from "react-router-dom";

export default function ArticleCard({ article, showEdit = false }) {
  return (
    <article className="article-card">
      <div className="article-card-top">
        <span className={`status-badge ${article.status === "published" ? "status-badge-success" : "status-badge-warning"}`}>
          {article.status}
        </span>
        {article.topicNames?.[0] ? (
          <span className="status-badge status-badge-neutral">{article.topicNames[0]}</span>
        ) : null}
      </div>

      <div className="article-card-content">
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
      </div>

      {article.topicNames?.length ? (
        <div className="article-chip-list">
          {article.topicNames.map((topicName) => (
            <span key={topicName} className="status-badge status-badge-accent">
              {topicName}
            </span>
          ))}
        </div>
      ) : null}

      {article.linkedEvents?.length ? (
        <div className="article-card-meta">
          {article.linkedEvents.map((eventItem) => (
            <span key={eventItem.id}>Event: {eventItem.title}</span>
          ))}
        </div>
      ) : null}

      <div className="article-card-footer">
        <div className="article-card-meta">
          <span>{article.authorName}</span>
          <span>{article.like_count} likes</span>
          <span>{article.dislike_count} dislikes</span>
        </div>

        <div className="article-card-actions">
          <a className="button button-secondary button-small" href={`http://localhost:5173/article/${article.id}`} target="_blank" rel="noopener noreferrer">
            Read detail
            <ArrowRight size={16} />
          </a>
          {showEdit ? (
            <Link className="button button-primary button-small" to={`/user/articles/${article.id}/edit`}>
              <FilePenLine size={16} />
              Edit
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
