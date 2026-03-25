export default function ArticleForm({
  title,
  description,
  values,
  categories,
  countries,
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

        <div className="user-form-grid">
          <label className="admin-field">
            <span>Category</span>
            <select
              value={values.categoryId}
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
            <select value={values.country} onChange={(event) => onChange("country", event.target.value)}>
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
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
