export default function AdminForm({
  title,
  description,
  fields,
  values,
  onChange,
  onSubmit,
  submitLabel,
  onCancel,
  cancelLabel = "Cancel",
  busy = false,
}) {
  return (
    <section className="panel-card">
      <div className="panel-heading">
        <div>
          <p className="section-kicker">CRUD Form</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <form className="admin-form" onSubmit={onSubmit}>
        {fields.map((field) => (
          <label key={field.name} className="admin-field">
            <span>{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                rows={field.rows || 4}
                name={field.name}
                value={values[field.name] || ""}
                onChange={(event) => onChange(field.name, event.target.value)}
                placeholder={field.placeholder}
              />
            ) : (
              <input
                type={field.type || "text"}
                name={field.name}
                value={values[field.name] || ""}
                onChange={(event) => onChange(field.name, event.target.value)}
                placeholder={field.placeholder}
              />
            )}
          </label>
        ))}

        <div className="form-actions">
          <button type="submit" className="button button-primary" disabled={busy}>
            {submitLabel}
          </button>
          {onCancel ? (
            <button type="button" className="button button-secondary" onClick={onCancel}>
              {cancelLabel}
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}
