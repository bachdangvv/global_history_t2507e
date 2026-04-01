import { useEffect, useState } from "react";
import { userApi } from "../../services/api";

const initialForm = {
  editableType: "article",
  editableId: "",
  title: "",
  summary: "",
  content: "",
};

export default function WriteArticlePage() {
  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all([userApi.getArticles(), userApi.getHistoricalEvents()]).then(([articleList, eventList]) => {
      setArticles(articleList);
      setEvents(eventList);
      setForm((current) => ({
        ...current,
        editableId: current.editableId || String(articleList[0]?.id || ""),
      }));
    });
  }, []);

  const targets = form.editableType === "article" ? articles : events;

  function handleChange(name, value) {
    if (name === "editableType") {
      const nextTargets = value === "article" ? articles : events;
      setForm((current) => ({
        ...current,
        editableType: value,
        editableId: String(nextTargets[0]?.id || ""),
      }));
      return;
    }

    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await userApi.createEdit(form);
    setMessage("Edit submitted successfully. It is now pending moderator approval.");
    setForm({
      ...initialForm,
      editableId: String(articles[0]?.id || ""),
    });
  }

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Write edit</p>
          <h1>Create a new edit</h1>
          <p>New submissions now map to the `edits` table and can target either an article or a historical event.</p>
        </div>
      </section>

      {message ? <div className="notice-banner">{message}</div> : null}

      <section className="panel-card">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Edit form</p>
            <h2>Submit a pending edit</h2>
            <p>Use this form to create a new record in the review queue.</p>
          </div>
        </div>

        <form className="article-form" onSubmit={handleSubmit}>
          <div className="user-form-grid">
            <label className="admin-field">
              <span>Target type</span>
              <select value={form.editableType} onChange={(event) => handleChange("editableType", event.target.value)}>
                <option value="article">Article</option>
                <option value="historical_event">Historical event</option>
              </select>
            </label>

            <label className="admin-field">
              <span>Target record</span>
              <select value={form.editableId} onChange={(event) => handleChange("editableId", event.target.value)}>
                {targets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="admin-field">
            <span>Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(event) => handleChange("title", event.target.value)}
              placeholder="Edit title"
            />
          </label>

          <label className="admin-field">
            <span>Summary</span>
            <textarea
              rows={3}
              value={form.summary}
              onChange={(event) => handleChange("summary", event.target.value)}
              placeholder="Short explanation of what changed and why"
            />
          </label>

          <label className="admin-field">
            <span>Content</span>
            <textarea
              rows={10}
              value={form.content}
              onChange={(event) => handleChange("content", event.target.value)}
              placeholder="Write your proposed update"
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
