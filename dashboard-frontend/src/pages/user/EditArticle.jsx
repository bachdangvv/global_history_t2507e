import { ArrowLeft, FilePenLine, ImagePlus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { userApi } from "../../services/api";

function getImageSource(value) {
  if (!value) {
    return "";
  }

  return value.startsWith("/") ? `http://localhost:8080${value}` : value;
}

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function EditArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [form, setForm] = useState({
    editableType: "article",
    editableId: id,
    title: "",
    summary: "",
    content: "",
    thumbnail: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageFileName, setImageFileName] = useState("");

  useEffect(() => {
    async function loadArticle() {
      setError("");

      try {
        const articleData = await userApi.getArticle(id);

        setArticle(articleData);
        setForm({
          editableType: "article",
          editableId: String(articleData.id),
          title: articleData.title || "",
          summary: articleData.currentEdit?.summary || articleData.summary || "",
          content: articleData.currentEdit?.content || articleData.content || "",
          thumbnail: articleData.imageUrl || articleData.currentEdit?.thumbnail || "",
        });
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load the edit form.");
      }
    }

    void loadArticle();
  }, [id]);

  const selectedTopics = useMemo(
    () => article?.topicNames?.join(", ") || "No topics assigned",
    [article],
  );

  function handleFieldChange(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleReset() {
    if (!article) {
      return;
    }

    setMessage("");
    setError("");
    setImageFileName("");
    setForm({
      editableType: "article",
      editableId: String(article.id),
      title: article.title || "",
      summary: article.currentEdit?.summary || article.summary || "",
      content: article.currentEdit?.content || article.content || "",
      thumbnail: article.imageUrl || article.currentEdit?.thumbnail || "",
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
      handleFieldChange("thumbnail", imageUrl);
      setImageFileName(file.name);
      setMessage("Cover image uploaded successfully.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to upload the cover image.");
    } finally {
      setIsUploadingImage(false);
    }
  }

  function handleRemoveImage() {
    handleFieldChange("thumbnail", "");
    setImageFileName("");
    setMessage("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSaving(true);

    try {
      await userApi.createEdit({
        editableType: "article",
        editableId: Number(form.editableId),
        title: form.title.trim(),
        summary: form.summary.trim(),
        content: form.content.trim(),
        thumbnail: form.thumbnail || null,
      });

      setMessage("Your edit was submitted for moderator review.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit your edit.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!article) {
    return (
      <div className="page-shell">
        {error ? <div className="notice-banner notice-banner-danger">{error}</div> : null}
        <div className="page-loading">Loading article edit form...</div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div>
          <p className="section-kicker">Edit article</p>
          <h1>Revise "{article.title}"</h1>
          <p>Changes are stored as a pending edit. Moderators review them before anything replaces the published article.</p>
        </div>
        <div className="detail-actions">
          <Link className="button button-secondary" to="/user/write">
            <ArrowLeft size={16} />
            Back to edit workspace
          </Link>
        </div>
      </section>

      {message ? <div className="notice-banner">{message}</div> : null}
      {error ? <div className="notice-banner notice-banner-danger">{error}</div> : null}

      <section className="page-grid page-grid-home">
        <section className="panel-card panel-card-wide">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Edit form</p>
              <h2>Submit a pending revision</h2>
              <p>Refine the live article title, summary, content, and cover image. This request will appear in the moderator queue.</p>
            </div>
          </div>

          <form className="article-form" onSubmit={handleSubmit}>
            <label className="admin-field">
              <span>Title</span>
              <input
                type="text"
                value={form.title}
                onChange={(event) => handleFieldChange("title", event.target.value)}
                placeholder="Article title"
                required
              />
            </label>

            <div className="admin-field">
              <span>Cover image</span>
              <div className="create-image-manager">
                <div className="create-image-preview-shell">
                  {form.thumbnail ? (
                    <img
                      src={getImageSource(form.thumbnail)}
                      alt={form.title || "Article cover"}
                      className="create-preview-image"
                    />
                  ) : (
                    <div className="create-preview-placeholder">
                      <ImagePlus size={18} />
                      No cover image
                    </div>
                  )}

                  <div className="create-image-caption">
                    <p>Upload a replacement cover image if the edit needs a new visual for cards and detail view.</p>
                    <small>
                      {isUploadingImage
                        ? "Uploading cover image..."
                        : imageFileName
                          ? `Selected file: ${imageFileName}`
                          : form.thumbnail
                            ? "Current cover image stored on the server."
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
                  {form.thumbnail ? (
                    <button type="button" className="button button-secondary" onClick={handleRemoveImage}>
                      Remove image
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            <label className="admin-field">
              <span>Edit summary</span>
              <textarea
                rows={4}
                value={form.summary}
                onChange={(event) => handleFieldChange("summary", event.target.value)}
                placeholder="Explain what changed and why this update matters."
              />
            </label>

            <label className="admin-field">
              <span>Content</span>
              <textarea
                rows={14}
                value={form.content}
                onChange={(event) => handleFieldChange("content", event.target.value)}
                placeholder="Write the updated article body."
                required
              />
            </label>

            <div className="form-actions">
              <button type="submit" className="button button-primary" disabled={isSaving || isUploadingImage}>
                <FilePenLine size={16} />
                {isSaving ? "Submitting..." : "Submit edit"}
              </button>
              <button type="button" className="button button-secondary" onClick={handleReset} disabled={isSaving || isUploadingImage}>
                Reset
              </button>
            </div>
          </form>
        </section>

        <aside className="stack-list home-side-stack">
          <section className="panel-card">
            <div className="panel-heading panel-heading-compact">
              <div>
                <p className="section-kicker">Current record</p>
                <h2>Live article snapshot</h2>
              </div>
            </div>

            <article className="create-preview-card">
              {article.imageUrl ? (
                <img src={getImageSource(article.imageUrl)} alt={article.title} className="create-preview-image" />
              ) : (
                <div className="create-preview-placeholder">No cover image</div>
              )}

              <div className="article-chip-list">
                <span className="status-badge status-badge-neutral">{article.status}</span>
                {article.categoryName ? <span className="status-badge status-badge-accent">{article.categoryName}</span> : null}
              </div>

              <div className="article-card-content">
                <h3>{article.title}</h3>
                <p>{article.summary || "No summary available for the current live article."}</p>
              </div>

              <div className="stack-list">
                <div className="detail-card">
                  <span className="detail-label">Topics</span>
                  <p>{selectedTopics}</p>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Last updated</span>
                  <p>{formatDate(article.updated_at || article.created_at)}</p>
                </div>
              </div>
            </article>
          </section>

          <section className="panel-card">
            <div className="panel-heading panel-heading-compact">
              <div>
                <p className="section-kicker">Reviewer context</p>
                <h2>What moderators will check</h2>
              </div>
            </div>

            <div className="stack-list">
              <article className="stack-row">
                <div>
                  <h3>Accuracy</h3>
                  <p>Make the summary and body specific enough that a moderator can verify the change quickly.</p>
                </div>
              </article>
              <article className="stack-row">
                <div>
                  <h3>Clarity</h3>
                  <p>Use the edit summary to explain exactly what you changed instead of repeating the article title.</p>
                </div>
              </article>
              <article className="stack-row">
                <div>
                  <h3>Presentation</h3>
                  <p>Only replace the cover image when it improves the record and is relevant to the article subject.</p>
                </div>
              </article>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
