import { useEffect, useState } from "react";
import ArticleCard from "../../components/user/ArticleCard";
import { userApi } from "../../services/api";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const [edits, setEdits] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    Promise.all([
      userApi.getProfile(),
      userApi.getMyArticles(),
      userApi.getMyEdits(),
      userApi.getMyComments(),
    ]).then(([profileData, articleList, editList, commentList]) => {
      setProfile(profileData);
      setArticles(articleList);
      setEdits(editList);
      setComments(commentList);
    });
  }, []);

  if (!profile) {
    return <div className="page-loading">Loading profile...</div>;
  }

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Profile page</p>
          <h1>{profile.username}</h1>
          <p>
            {profile.articleCount} articles, {profile.editCount} edits, and {profile.pendingEditCount} edits waiting for review.
          </p>
        </div>
      </section>

      <section className="page-grid page-grid-two">
        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Your articles</p>
              <h2>Authored articles</h2>
              <p>Article rows where `author_id` matches your account.</p>
            </div>
          </div>
          <div className="article-grid article-grid-profile">
            {articles.length ? (
              articles.map((article) => <ArticleCard key={article.id} article={article} showEdit />)
            ) : (
              <div className="table-empty-state">
                <h3>No authored articles</h3>
                <p>Your authored content will appear here.</p>
              </div>
            )}
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Edit history</p>
              <h2>Submitted edits</h2>
              <p>Recent `edits` rows created by your account.</p>
            </div>
          </div>
          <div className="stack-list">
            {edits.length ? (
              edits.map((edit) => (
                <article key={edit.id} className="stack-row">
                  <div>
                    <h3>{edit.title}</h3>
                    <p>{edit.summary}</p>
                  </div>
                  <div className="stack-row-meta">
                    <span className={`status-badge ${edit.status === "approved" ? "status-badge-success" : "status-badge-warning"}`}>
                      {edit.status}
                    </span>
                    <small>{formatDate(edit.created_at)}</small>
                  </div>
                </article>
              ))
            ) : (
              <div className="table-empty-state">
                <h3>No edits yet</h3>
                <p>Your edit history will appear here once you submit updates.</p>
              </div>
            )}
          </div>
        </section>
      </section>

      <section className="panel-card">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Comment history</p>
            <h2>Your recent comments</h2>
            <p>Comments tied to your account across article and edit discussions.</p>
          </div>
        </div>
        <div className="stack-list">
          {comments.length ? (
            comments.map((comment) => (
              <article key={comment.id} className="stack-row">
                <div>
                  <h3>{comment.commentable_type === "edit" ? "Edit comment" : "Article comment"}</h3>
                  <p>{comment.content}</p>
                </div>
                <div className="stack-row-meta">
                  <span className="status-badge status-badge-neutral">{comment.commentable_type}</span>
                  <small>{formatDate(comment.created_at)}</small>
                </div>
              </article>
            ))
          ) : (
            <div className="table-empty-state">
              <h3>No comments yet</h3>
              <p>Your recent discussion activity will appear here.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
