import { useEffect, useMemo, useState } from "react";
import { userApi } from "../../services/api";

const initialForm = {
  categoryId: "",
  title: "",
  summary: "",
  content: "",
  imageUrl: "",
  country: "",
  tagIds: [],
};

function createPayload(form) {
  return {
    categoryId: form.categoryId ? Number(form.categoryId) : null,
    title: form.title.trim(),
    summary: form.summary.trim(),
    content: form.content.trim(),
    imageUrl: form.imageUrl.trim() || null,
    country: form.country.trim() || null,
    tagIds: form.tagIds.map((tagId) => Number(tagId)),
  };
}

function getImageSource(value) {
  if (!value) {
    return "";
  }

  return value.startsWith("/") ? `http://localhost:8080${value}` : value;
}

export default function CreateArticlePage() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoadingMeta, setIsLoadingMeta] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageFileName, setImageFileName] = useState("");

  useEffect(() => {
    async function loadMeta() {
      setIsLoadingMeta(true);
      setError("");

      try {
        const [categoryList, tagList] = await Promise.all([
          userApi.getCategories(),
          userApi.getTags(),
        ]);

        setCategories(categoryList);
        setTags(tagList);
        setForm((current) => ({
          ...current,
          categoryId: current.categoryId || String(categoryList[0]?.id || ""),
        }));
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load article form options.");
      } finally {
        setIsLoadingMeta(false);
      }
    }

    void loadMeta();
  }, []);

  const selectedCategory = useMemo(
    () => categories.find((item) => String(item.id) === String(form.categoryId)),
    [categories, form.categoryId],
  );

  function handleChange(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleToggleTag(tagId) {
    setForm((current) => {
      const nextTagIds = current.tagIds.includes(tagId)
        ? current.tagIds.filter((item) => item !== tagId)
        : [...current.tagIds, tagId];

      return {
        ...current,
        tagIds: nextTagIds,
      };
    });
  }

  function handleReset() {
    setMessage("");
    setError("");
    setImageFileName("");
    setForm({
      ...initialForm,
      categoryId: String(categories[0]?.id || ""),
    });
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    setMessage("");
    setError("");
    setIsUploadingImage(true);

    try {
      const imageUrl = await userApi.uploadArticleImage(file);
      handleChange("imageUrl", imageUrl);
      setImageFileName(file.name);
      setMessage("Cover image uploaded successfully.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to upload the cover image.");
    } finally {
      setIsUploadingImage(false);
    }
  }

  function handleRemoveImage() {
    handleChange("imageUrl", "");
    setImageFileName("");
    setMessage("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!form.categoryId) {
      setError("Please select a category before submitting.");
      return;
    }

    setIsSaving(true);

    try {
      await userApi.createArticle(createPayload(form));
      setMessage("Article submitted successfully. It is now pending moderator approval.");
      setImageFileName("");
      setForm({
        ...initialForm,
        categoryId: String(categories[0]?.id || ""),
      });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to submit your article.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Create article</p>
          <h1>Draft a new article</h1>
          <p>Start a fresh submission with cleaner metadata, optional cover art, and a live preview before you send it for review.</p>
        </div>
      </section>

      {message ? <div className="notice-banner">{message}</div> : null}
      {error ? <div className="notice-banner notice-banner-danger">{error}</div> : null}

      <section className="page-grid page-grid-home">
        <section className="panel-card panel-card-wide">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Article form</p>
              <h2>New submission</h2>
              <p>Fill in the core article details. Optional fields can be added now or refined later during revision.</p>
            </div>
          </div>

          {isLoadingMeta ? (
            <div className="table-empty-state">
              <h3>Loading form</h3>
              <p>Fetching categories and tags for your submission.</p>
            </div>
          ) : (
            <form className="article-form" onSubmit={handleSubmit}>
              <div className="user-form-grid">
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
                  <span>Category</span>
                  <select
                    value={form.categoryId}
                    onChange={(event) => handleChange("categoryId", event.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="user-form-grid">
                <label className="admin-field">
                  <span>Country or region</span>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(event) => handleChange("country", event.target.value)}
                    placeholder="e.g. Italy, Vietnam, Central Asia"
                  />
                </label>
              </div>

              <div className="admin-field">
                <span>Cover image</span>
                <div className="create-image-manager">
                  <div className="create-image-preview-shell">
                    {form.imageUrl ? (
                      <img src={getImageSource(form.imageUrl)} alt={form.title || "Article cover"} className="create-preview-image" />
                    ) : (
                      <div className="create-preview-placeholder">No cover image</div>
                    )}

                    <div className="create-image-caption">
                      <p>Upload a JPG, PNG, WEBP, or GIF image for the article card and detail header.</p>
                      <small>
                        {isUploadingImage
                          ? "Uploading cover image..."
                          : imageFileName
                            ? `Selected file: ${imageFileName}`
                            : form.imageUrl
                              ? "Cover image stored on the server."
                              : "No cover image selected."}
                      </small>
                    </div>
                  </div>

                  <div className="form-actions">
                    <label className="button button-secondary profile-upload-button">
                      {isUploadingImage ? "Uploading..." : "Upload image"}
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif"
                        className="profile-file-input"
                        onChange={handleImageUpload}
                      />
                    </label>
                    {form.imageUrl ? (
                      <button type="button" className="button button-secondary" onClick={handleRemoveImage}>
                        Remove image
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>

              <label className="admin-field">
                <span>Summary</span>
                <textarea
                  rows={4}
                  value={form.summary}
                  onChange={(event) => handleChange("summary", event.target.value)}
                  placeholder="A short explanation that helps readers understand the article at a glance."
                />
              </label>

              <label className="admin-field">
                <span>Content</span>
                <textarea
                  rows={12}
                  value={form.content}
                  onChange={(event) => handleChange("content", event.target.value)}
                  placeholder="Write the full article content here."
                  required
                />
              </label>

              <div className="admin-field">
                <span>Tags</span>
                <div className="selection-chip-grid">
                  {tags.length ? (
                    tags.map((tag) => {
                      const isSelected = form.tagIds.includes(tag.id);

                      return (
                        <button
                          key={tag.id}
                          type="button"
                          className={isSelected ? "selection-chip selection-chip-active" : "selection-chip"}
                          onClick={() => handleToggleTag(tag.id)}
                        >
                          {tag.name}
                        </button>
                      );
                    })
                  ) : (
                    <div className="selection-chip-empty">No tags available yet.</div>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="button button-primary" disabled={isSaving || isUploadingImage}>
                  {isSaving ? "Submitting..." : "Submit article"}
                </button>
                <button type="button" className="button button-secondary" onClick={handleReset} disabled={isSaving || isUploadingImage}>
                  Reset
                </button>
              </div>
            </form>
          )}
        </section>

        <aside className="stack-list home-side-stack">
          <section className="panel-card">
            <div className="panel-heading panel-heading-compact">
              <div>
                <p className="section-kicker">Live preview</p>
                <h2>Submission card</h2>
              </div>
            </div>

            <article className="create-preview-card">
              {form.imageUrl ? (
                <img src={getImageSource(form.imageUrl)} alt={form.title || "Article cover"} className="create-preview-image" />
              ) : (
                <div className="create-preview-placeholder">No cover image</div>
              )}

              <div className="article-chip-list">
                {selectedCategory?.name ? <span className="status-badge status-badge-accent">{selectedCategory.name}</span> : null}
                {form.country ? <span className="status-badge status-badge-neutral">{form.country}</span> : null}
              </div>

              <div className="article-card-content">
                <h3>{form.title || "Your article title will appear here"}</h3>
                <p>{form.summary || "Add a summary to preview how the article intro will read to reviewers."}</p>
              </div>

              <div className="article-chip-list">
                {form.tagIds.length ? (
                  tags
                    .filter((tag) => form.tagIds.includes(tag.id))
                    .map((tag) => (
                      <span key={tag.id} className="status-badge status-badge-neutral">
                        {tag.name}
                      </span>
                    ))
                ) : (
                  <span className="status-badge status-badge-neutral">No tags selected</span>
                )}
              </div>
            </article>
          </section>

          <section className="panel-card">
            <div className="panel-heading panel-heading-compact">
              <div>
                <p className="section-kicker">Checklist</p>
                <h2>Before you submit</h2>
              </div>
            </div>

            <div className="stack-list">
              <article className="stack-row">
                <div>
                  <h3>Clear title</h3>
                  <p>Use a title that identifies the historical subject quickly and unambiguously.</p>
                </div>
              </article>
              <article className="stack-row">
                <div>
                  <h3>Useful summary</h3>
                  <p>Keep the summary short, factual, and helpful for reviewers scanning many submissions.</p>
                </div>
              </article>
              <article className="stack-row">
                <div>
                  <h3>Solid first draft</h3>
                  <p>Main content can be improved later, but reviewers should already see the article structure and purpose.</p>
                </div>
              </article>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
