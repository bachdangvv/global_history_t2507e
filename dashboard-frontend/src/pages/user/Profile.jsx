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
  const [revisions, setRevisions] = useState([]);

  useEffect(() => {
    Promise.all([userApi.getProfile(), userApi.getMyArticles(), userApi.getMyRevisions()]).then(
      ([profileData, articleList, revisionList]) => {
        setProfile(profileData);
        setArticles(articleList);
        setRevisions(revisionList);
      },
    );
  }, []);

  if (!profile) {
    return <div className="page-loading">Loading profile...</div>;
  }

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Profile page</p>
          <h1>{profile.name}</h1>
          <p>
            {profile.articleCount} articles authored and {profile.revisionCount} revisions submitted.
          </p>
        </div>
      </section>

      <section className="page-grid page-grid-two">
        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Your articles</p>
              <h2>Written articles</h2>
              <p>Articles currently associated with your account.</p>
            </div>
          </div>
          <div className="article-grid article-grid-profile">
            {articles.length ? (
              articles.map((article) => (
                <ArticleCard key={article.id} article={article} showEdit />
              ))
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
              <p className="section-kicker">Revision history</p>
              <h2>Submitted revisions</h2>
              <p>Recent edits and new article submissions awaiting review.</p>
            </div>
          </div>
          <div className="stack-list">
            {revisions.length ? (
              revisions.map((revision) => (
                <article key={revision.id} className="stack-row">
                  <div>
                    <h3>{revision.title}</h3>
                    <p>{revision.editSummary}</p>
                  </div>
                  <div className="stack-row-meta">
                    <span className="status-badge status-badge-warning">{revision.status}</span>
                    <small>{formatDate(revision.createdAt)}</small>
                  </div>
                </article>
              ))
            ) : (
              <div className="table-empty-state">
                <h3>No revisions yet</h3>
                <p>Your revision history will appear here once you submit edits.</p>
              </div>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
