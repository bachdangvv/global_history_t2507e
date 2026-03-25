import { ArrowRight, FilePenLine } from "lucide-react";
import { Link } from "react-router-dom";

export default function ArticleCard({ article, showEdit = false }) {
  return (
    <article className="article-card">
      <div className="article-card-top">
        <span className="status-badge status-badge-neutral">{article.categoryName}</span>
        <span className="status-badge status-badge-accent">{article.country}</span>
      </div>

      <div className="article-card-content">
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
      </div>

      <div className="article-card-footer">
        <div className="article-card-meta">
          <span>{article.authorName}</span>
          <span>{article.likes} likes</span>
          <span>{article.dislikes} dislikes</span>
        </div>

        <div className="article-card-actions">
          <Link className="button button-secondary button-small" to={`/user/articles/${article.id}`}>
            Read detail
            <ArrowRight size={16} />
          </Link>
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
