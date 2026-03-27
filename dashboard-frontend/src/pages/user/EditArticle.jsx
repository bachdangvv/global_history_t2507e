import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userApi } from "../../services/api";

export default function EditArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [form, setForm] = useState({
    editableType: "article",
    editableId: id,
    title: "",
    summary: "",
    content: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    userApi.getArticle(id).then((articleData) => {
      setArticle(articleData);
      setForm({
        editableType: "article",
        editableId: String(articleData.id),
        title: articleData.title,
        summary: articleData.currentEdit?.summary || "",
        content: articleData.content,
      });
    });
  }, [id]);

  function handleChange(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await userApi.createEdit(form);
    setMessage("Your article edit was submitted as a pending edit record.");
  }

  if (!article) {
    return <div className="page-loading">Loading article edit form...</div>;
  }

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Edit article</p>
          <h1>{article.title}</h1>
          <p>Edits are saved in the `edits` table and must be reviewed before they affect the article.</p>
        </div>
      </section>

      {message ? <div className="notice-banner">{message}</div> : null}

      <section className="panel-card">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Pending edit</p>
            <h2>Submit article changes</h2>
            <p>Update the article content and describe what changed in the summary field.</p>
          </div>
        </div>

        <form className="article-form" onSubmit={handleSubmit}>
          <label className="admin-field">
            <span>Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(event) => handleChange("title", event.target.value)}
              placeholder="Article title"
            />
          </label>

          <label className="admin-field">
            <span>Edit summary</span>
            <textarea
              rows={3}
              value={form.summary}
              onChange={(event) => handleChange("summary", event.target.value)}
              placeholder="What changed and why?"
            />
          </label>

          <label className="admin-field">
            <span>Content</span>
            <textarea
              rows={10}
              value={form.content}
              onChange={(event) => handleChange("content", event.target.value)}
              placeholder="Write your updated content"
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="button button-primary">
              Submit edit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
