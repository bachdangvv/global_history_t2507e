import { useEffect, useState } from "react";
import { userApi, adminApi } from "../../services/api";

const initialForm = {
  categoryId: "",
  title: "",
  summary: "",
  content: "",
  imageUrl: "",
  country: "",
};

export default function CreateArticlePage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  useEffect(() => {
    adminApi.listCategories().then((categoryList) => {
      setCategories(categoryList);
      if (categoryList && categoryList.length > 0) {
        setForm((current) => ({
          ...current,
          categoryId: String(categoryList[0].id || categoryList[0].name),
        }));
      }
    });
  }, []);

  function handleChange(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await userApi.createArticle(form);
    setMessage("Article submitted successfully. It is now pending moderator approval.");
    setForm({
      ...initialForm,
      categoryId: String(categories[0]?.id || ""),
    });
  }

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Write new</p>
          <h1>Create an article</h1>
          <p>Submit a brand new historical article for the review queue.</p>
        </div>
      </section>

      {message ? <div className="notice-banner">{message}</div> : null}

      <section className="panel-card">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Article form</p>
            <h2>Drafting a new entry</h2>
            <p>Provide content for your new submission.</p>
          </div>
        </div>

        <form className="article-form" onSubmit={handleSubmit}>
          <div className="user-form-grid">
            <label className="admin-field">
              <span>Category</span>
              <select value={form.categoryId} onChange={(event) => handleChange("categoryId", event.target.value)}>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field">
              <span>Country (optional)</span>
              <input
                type="text"
                value={form.country}
                onChange={(event) => handleChange("country", event.target.value)}
                placeholder="e.g. Rome, Italy"
              />
            </label>
          </div>

          <label className="admin-field">
             <span>Image URL</span>
             <input
               type="url"
               value={form.imageUrl}
               onChange={(event) => handleChange("imageUrl", event.target.value)}
               placeholder="https://..."
             />
          </label>

          <label className="admin-field">
            <span>Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(event) => handleChange("title", event.target.value)}
              placeholder="Article title"
              required
            />
          </label>

          <label className="admin-field">
            <span>Summary</span>
            <textarea
              rows={3}
              value={form.summary}
              onChange={(event) => handleChange("summary", event.target.value)}
              placeholder="Short explanation or abstract"
              required
            />
          </label>

          <label className="admin-field">
            <span>Content</span>
            <textarea
              rows={10}
              value={form.content}
              onChange={(event) => handleChange("content", event.target.value)}
              placeholder="Write your article content here"
              required
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="button button-primary">
              Submit article
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
