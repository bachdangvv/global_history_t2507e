import { useEffect, useMemo, useState } from "react";
import ArticleCard from "../../components/user/ArticleCard";
import { userApi } from "../../services/api";

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

export default function WriteArticlePage() {
  const [articles, setArticles] = useState([]);
  const [edits, setEdits] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEditWorkspace() {
      setError("");

      try {
        const [articleList, editList] = await Promise.all([
          userApi.getMyArticles(),
          userApi.getMyEdits(),
        ]);

        setArticles(articleList);
        setEdits(editList);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load your edit workspace.");
      }
    }

    void loadEditWorkspace();
  }, []);

  const pendingCount = useMemo(
    () => edits.filter((edit) => edit.status === "pending").length,
    [edits],
  );

  const approvedCount = useMemo(
    () => edits.filter((edit) => edit.status === "approved").length,
    [edits],
  );

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Edit workspace</p>
          <h1>Update your published record</h1>
          <p>Choose one of your articles, open the dedicated edit form, and submit a revision that will go through moderator review.</p>
        </div>
      </section>

      {error ? <div className="notice-banner notice-banner-danger">{error}</div> : null}

      <section className="metric-grid metric-grid-user-home">
        <article className="metric-card">
          <div>
            <p>Editable articles</p>
            <h3>{articles.length}</h3>
            <span>Articles you can update</span>
          </div>
        </article>
        <article className="metric-card">
          <div>
            <p>Pending edits</p>
            <h3>{pendingCount}</h3>
            <span>Waiting for moderator review</span>
          </div>
        </article>
        <article className="metric-card">
          <div>
            <p>Approved edits</p>
            <h3>{approvedCount}</h3>
            <span>Changes already accepted</span>
          </div>
        </article>
        <article className="metric-card">
          <div>
            <p>Total edits</p>
            <h3>{edits.length}</h3>
            <span>Your full revision history</span>
          </div>
        </article>
      </section>

      <section className="page-grid page-grid-home">
        <section className="panel-card panel-card-wide">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Choose article</p>
              <h2>Start a new edit</h2>
              <p>Open any article below to submit a structured edit request with title, summary, content, and cover image changes.</p>
            </div>
          </div>

          <div className="article-grid article-grid-profile">
            {articles.length ? (
              articles.map((article) => <ArticleCard key={article.id} article={article} showEdit />)
            ) : (
              <div className="table-empty-state">
                <h3>No editable articles</h3>
                <p>Create an article first, then come back here when you want to propose updates.</p>
              </div>
            )}
          </div>
        </section>

        <aside className="stack-list home-side-stack">
          <section className="panel-card">
            <div className="panel-heading panel-heading-compact">
              <div>
                <p className="section-kicker">Recent edits</p>
                <h2>Revision queue</h2>
              </div>
            </div>

            <div className="stack-list">
              {edits.length ? (
                edits.slice(0, 5).map((edit) => (
                  <article key={edit.id} className="stack-row">
                    <div>
                      <h3>{edit.title}</h3>
                      <p>{edit.summary || "No edit summary provided."}</p>
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
                      <small>{formatDate(edit.created_at)}</small>
                    </div>
                  </article>
                ))
              ) : (
                <div className="table-empty-state">
                  <h3>No edits yet</h3>
                  <p>Your latest revision requests will appear here.</p>
                </div>
              )}
            </div>
          </section>

          <section className="panel-card">
            <div className="panel-heading panel-heading-compact">
              <div>
                <p className="section-kicker">How it works</p>
                <h2>Edit flow</h2>
              </div>
            </div>

            <div className="stack-list">
              <article className="stack-row">
                <div>
                  <h3>1. Open article form</h3>
                  <p>Pick one of your articles and jump into the dedicated edit page.</p>
                </div>
              </article>
              <article className="stack-row">
                <div>
                  <h3>2. Submit a pending edit</h3>
                  <p>Your changes are stored as a revision request, not applied directly to the live article.</p>
                </div>
              </article>
              <article className="stack-row">
                <div>
                  <h3>3. Wait for review</h3>
                  <p>Moderators approve or reject the revision, and notifications will tell you the outcome.</p>
                </div>
              </article>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
