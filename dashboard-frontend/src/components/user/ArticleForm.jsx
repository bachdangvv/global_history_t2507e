export default function ArticleForm({
  title,
  description,
  values,
  categories,
  onChange,
  onSubmit,
  submitLabel,
}) {
  return (
    <section className="panel-card">
      <div className="panel-heading">
        <div>
          <p className="section-kicker">Revision form</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <form className="article-form" onSubmit={onSubmit}>
        <label className="admin-field">
          <span>Title</span>
          <input
            type="text"
            value={values.title}
            onChange={(event) => onChange("title", event.target.value)}
            placeholder="Article title"
          />
        </label>

        <label className="admin-field">
          <span>Summary</span>
          <textarea
            rows={3}
            value={values.summary}
            onChange={(event) => onChange("summary", event.target.value)}
            placeholder="Write a brief summary of the article..."
          />
        </label>

        <label className="admin-field">
          <span>Image URL</span>
          <input
            type="url"
            value={values.imageUrl}
            onChange={(event) => onChange("imageUrl", event.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </label>

        <div className="user-form-grid">
          <label className="admin-field">
            <span>Category</span>
            <select
              value={values.categoryId || ''}
              onChange={(event) => onChange("categoryId", event.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="admin-field">
            <span>Country</span>
            <input
              type="text"
              value={values.country || ''}
              onChange={(event) => onChange("country", event.target.value)}
              placeholder="e.g. Vietnam, Global"
            />
          </label>
        </div>

        <label className="admin-field">
          <span>Content</span>
          <textarea
            rows={10}
            value={values.content}
            onChange={(event) => onChange("content", event.target.value)}
            placeholder="Write your article or revision content"
          />
        </label>

        <label className="admin-field">
          <span>Edit summary</span>
          <textarea
            rows={3}
            value={values.editSummary}
            onChange={(event) => onChange("editSummary", event.target.value)}
            placeholder="What changed and why?"
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="button button-primary">
            {submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
}
