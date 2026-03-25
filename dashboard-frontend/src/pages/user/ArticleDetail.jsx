import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userApi } from "../../services/api";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    userApi.getArticle(id).then(setArticle);
  }, [id]);

  async function handleVote(voteType) {
    const updatedArticle = await userApi.voteArticle(id, voteType);
    setArticle(updatedArticle);
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
            onClick={() => handleVote("like")}
          >
            <ThumbsUp size={16} />
            Like
          </button>
          <button
            type="button"
            className={`button ${article.currentUserVote === "dislike" ? "button-primary" : "button-secondary"}`}
            onClick={() => handleVote("dislike")}
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
          <span className="detail-label">Category</span>
          <p>{article.categoryName}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">Country</span>
          <p>{article.country}</p>
        </div>
        <div className="detail-card">
          <span className="detail-label">Like / Dislike</span>
          <p>
            {article.likes} likes and {article.dislikes} dislikes
          </p>
        </div>
        <div className="detail-card detail-card-wide">
          <span className="detail-label">Content</span>
          <p>{article.content}</p>
        </div>
      </section>
    </div>
  );
}
