import { useEffect, useState } from "react";
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

function isImageAvatar(value) {
  return typeof value === "string" && /^data:image\/|^https?:\/\/|^\//.test(value.trim());
}

function getAvatarImageSrc(value) {
  if (typeof value !== "string") {
    return "";
  }

  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return "";
  }

  if (trimmedValue.startsWith("/")) {
    return `http://localhost:8080${trimmedValue}`;
  }

  return trimmedValue;
}

function getAvatarInitials(value) {
  const source = (value || "").trim();
  if (!source) {
    return "U";
  }

  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function renderAvatar(value, fallbackLabel, sizeClass = "") {
  const className = ["profile-avatar", sizeClass, isImageAvatar(value) ? "profile-avatar-has-image" : ""]
    .filter(Boolean)
    .join(" ");

  if (isImageAvatar(value)) {
    return (
      <div className={className}>
        <img src={getAvatarImageSrc(value)} alt={`${fallbackLabel} avatar`} className="profile-avatar-image" />
      </div>
    );
  }

  return <div className={className}>{getAvatarInitials(value || fallbackLabel || "User")}</div>;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const [edits, setEdits] = useState([]);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    avatar: "",
    bio: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarFileName, setAvatarFileName] = useState("");

  function buildProfileState(profileData, articleList, editList) {
    return {
      ...profileData,
      username: profileData.username || "Contributor",
      email: profileData.email || "",
      avatar: profileData.avatar || "",
      bio: profileData.bio || "",
      articleCount: profileData.articleCount || articleList.length,
      editCount: profileData.editCount || editList.length,
      pendingEditCount:
        profileData.pendingEditCount || editList.filter((edit) => edit.status === "pending").length,
    };
  }

  async function loadProfilePage() {
    setError("");

    try {
      const [profileData, articleList, editList, commentList] = await Promise.all([
        userApi.getProfile(),
        userApi.getMyArticles(),
        userApi.getMyEdits(),
        userApi.getMyComments(),
      ]);

      const nextProfile = buildProfileState(profileData, articleList, editList);

      setProfile(nextProfile);
      setArticles(articleList);
      setEdits(editList);
      setComments(commentList);
      setForm({
        username: nextProfile.username,
        email: nextProfile.email,
        avatar: nextProfile.avatar,
        bio: nextProfile.bio,
      });
      setAvatarFileName("");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load your profile.");
    }
  }

  useEffect(() => {
    void loadProfilePage();
  }, []);

  function handleFieldChange(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleReset() {
    if (!profile) {
      return;
    }

    setMessage("");
    setError("");
    setForm({
      username: profile.username || "",
      email: profile.email || "",
      avatar: profile.avatar || "",
      bio: profile.bio || "",
    });
    setAvatarFileName("");
  }

  async function handleAvatarUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file for your avatar.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Avatar image must be smaller than 5 MB.");
      return;
    }

    setMessage("");
    setError("");
    setIsUploadingAvatar(true);

    try {
      const uploadedProfile = await userApi.uploadAvatar(file);
      const nextAvatar = uploadedProfile.avatar || "";

      setProfile((current) =>
        current
          ? {
              ...current,
              ...uploadedProfile,
              avatar: nextAvatar,
            }
          : current,
      );
      handleFieldChange("avatar", nextAvatar);
      setAvatarFileName(file.name);
      setMessage("Avatar uploaded successfully.");
    } catch (fileError) {
      setError(fileError instanceof Error ? fileError.message : "Unable to upload your avatar.");
    } finally {
      setIsUploadingAvatar(false);
    }
  }

  function handleRemoveAvatar() {
    setMessage("");
    setError("");
    handleFieldChange("avatar", "");
    setAvatarFileName("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSaving(true);

    try {
      const updatedProfile = await userApi.updateProfile(form);
      const nextProfile = {
        ...profile,
        ...updatedProfile,
        username: updatedProfile.username || form.username,
        email: updatedProfile.email || form.email,
        avatar: updatedProfile.avatar || form.avatar,
        bio: updatedProfile.bio || form.bio,
      };

      setProfile(nextProfile);
      setForm({
        username: nextProfile.username || "",
        email: nextProfile.email || "",
        avatar: nextProfile.avatar || "",
        bio: nextProfile.bio || "",
      });
      setAvatarFileName("");
      setMessage("Profile updated successfully.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to update your profile.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!profile) {
    return <div className="page-loading">Loading profile...</div>;
  }

  return (
    <div className="page-shell">
      <section className="page-hero user-hero">
        <div className="profile-hero">
          {renderAvatar(profile.avatar, profile.username)}
          <div>
            <p className="section-kicker">Profile settings</p>
            <h1>{profile.username}</h1>
            <p>
              Update your account details, contributor bio, and public profile information without leaving your workspace.
            </p>
          </div>
        </div>
      </section>

      {message ? <div className="notice-banner">{message}</div> : null}
      {error ? <div className="notice-banner notice-banner-danger">{error}</div> : null}

      <section className="page-grid page-grid-two">
        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Personal info</p>
              <h2>Edit profile</h2>
              <p>Keep your contributor identity up to date for readers and moderators.</p>
            </div>
          </div>

          <form className="article-form" onSubmit={handleSubmit}>
            <div className="user-form-grid">
              <label className="admin-field">
                <span>Username</span>
                <input
                  type="text"
                  value={form.username}
                  onChange={(event) => handleFieldChange("username", event.target.value)}
                  placeholder="Your username"
                  required
                />
              </label>

              <label className="admin-field">
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => handleFieldChange("email", event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>

            <div className="admin-field">
              <span>Avatar image</span>
              <div className="profile-avatar-editor">
                <div className="profile-avatar-preview">
                  {renderAvatar(form.avatar, form.username, "profile-avatar-large")}
                  <div className="profile-avatar-preview-copy">
                    <p>Upload a JPG, PNG, or WebP image to use as your profile picture.</p>
                    <small>
                      {isUploadingAvatar
                        ? "Uploading avatar to the server..."
                        : avatarFileName
                          ? `Selected file: ${avatarFileName}`
                          : form.avatar && isImageAvatar(form.avatar)
                            ? "Current avatar image is stored on the server."
                            : "No avatar image selected."}
                    </small>
                  </div>
                </div>

                <div className="form-actions">
                  <label className="button button-secondary profile-upload-button">
                    {isUploadingAvatar ? "Uploading..." : "Upload avatar"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      className="profile-file-input"
                      onChange={handleAvatarUpload}
                    />
                  </label>
                  {form.avatar ? (
                    <button type="button" className="button button-secondary" onClick={handleRemoveAvatar}>
                      Remove
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            <label className="admin-field">
              <span>Bio</span>
              <textarea
                value={form.bio}
                onChange={(event) => handleFieldChange("bio", event.target.value)}
                placeholder="Tell other contributors what you focus on."
              />
            </label>

            <div className="form-actions">
              <button type="submit" className="button button-primary" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save profile"}
              </button>
              <button type="button" className="button button-secondary" onClick={handleReset} disabled={isSaving || isUploadingAvatar}>
                Reset
              </button>
            </div>
          </form>
        </section>

        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Account snapshot</p>
              <h2>Profile overview</h2>
              <p>Your current contributor details and publishing activity at a glance.</p>
            </div>
          </div>

          <div className="profile-summary-card">
            <div className="profile-summary-header">
              {renderAvatar(profile.avatar, profile.username, "profile-avatar-large")}
              <div className="profile-summary-copy">
                <h3>{profile.username}</h3>
                <p>{profile.email || "No email available"}</p>
              </div>
            </div>

            <div className="profile-stat-grid">
              <article className="profile-stat-card">
                <span>Articles</span>
                <strong>{profile.articleCount}</strong>
              </article>
              <article className="profile-stat-card">
                <span>Edits</span>
                <strong>{profile.editCount}</strong>
              </article>
              <article className="profile-stat-card">
                <span>Pending</span>
                <strong>{profile.pendingEditCount}</strong>
              </article>
            </div>

            <div className="detail-card">
              <span className="detail-label">Bio</span>
              <p>{profile.bio || "No bio added yet."}</p>
            </div>
          </div>
        </section>
      </section>

      <section className="page-grid page-grid-two">
        <section className="panel-card">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Your articles</p>
              <h2>Authored articles</h2>
              <p>Article rows where `author_id` matches your account.</p>
            </div>
          </div>
          <div className="article-grid article-grid-profile">
            {articles.length ? (
              articles.map((article) => <ArticleCard key={article.id} article={article} showEdit />)
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
              <p className="section-kicker">Edit history</p>
              <h2>Submitted edits</h2>
              <p>Recent `edits` rows created by your account.</p>
            </div>
          </div>
          <div className="stack-list">
            {edits.length ? (
              edits.map((edit) => (
                <article key={edit.id} className="stack-row">
                  <div>
                    <h3>{edit.title}</h3>
                    <p>{edit.summary}</p>
                  </div>
                  <div className="stack-row-meta">
                    <span className={`status-badge ${edit.status === "approved" ? "status-badge-success" : "status-badge-warning"}`}>
                      {edit.status}
                    </span>
                    <small>{formatDate(edit.created_at)}</small>
                  </div>
                </article>
              ))
            ) : (
              <div className="table-empty-state">
                <h3>No edits yet</h3>
                <p>Your edit history will appear here once you submit updates.</p>
              </div>
            )}
          </div>
        </section>
      </section>

      <section className="panel-card">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Comment history</p>
            <h2>Your recent comments</h2>
            <p>Comments tied to your account across article and edit discussions.</p>
          </div>
        </div>
        <div className="stack-list">
          {comments.length ? (
            comments.map((comment) => (
              <article key={comment.id} className="stack-row">
                <div>
                  <h3>{comment.commentable_type === "edit" ? "Edit comment" : "Article comment"}</h3>
                  <p>{comment.content}</p>
                </div>
                <div className="stack-row-meta">
                  <span className="status-badge status-badge-neutral">{comment.commentable_type}</span>
                  <small>{formatDate(comment.created_at)}</small>
                </div>
              </article>
            ))
          ) : (
            <div className="table-empty-state">
              <h3>No comments yet</h3>
              <p>Your recent discussion activity will appear here.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
