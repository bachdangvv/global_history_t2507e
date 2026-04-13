import { useState, useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { uploadArticleImage, createTag, createTopic } from '../../services/api';
import './ArticleForm.css';

const articleSchema = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(255, 'Title must not exceed 255 characters'),
  summary: z
    .string()
    .min(20, 'Summary must be at least 20 characters')
    .max(500, 'Summary must not exceed 500 characters'),
  content: z
    .string()
    .min(50, 'Content must be at least 50 characters')
    .refine((val) => val.replace(/<[^>]*>/g, '').trim().length >= 50, {
      message: 'Content must be at least 50 characters (excluding HTML tags)',
    }),
  categoryId: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().positive('Please select a category')
  ),
  country: z
    .string()
    .min(1, 'Country is required'),
  imageUrl: z.string().optional(),
  editSummary: z.string().optional(),
});

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'blockquote', 'code-block',
  'link', 'image',
];

const convertLegacyToHtml = (text) => {
  if (!text) return '';
  // If already HTML, return as is
  if (text.includes('<p>') || text.includes('<h') || text.includes('<ul>') || text.includes('<li>')) {
    return text;
  }
  
  const lines = text.split('\n');
  let inList = false;
  let html = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += `<li>${line.substring(2).trim()}</li>`;
    } else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      
      if (line.startsWith('## ')) {
        html += `<h2>${line.substring(3).trim()}</h2>`;
      } else if (line.startsWith('### ')) {
        html += `<h3>${line.substring(4).trim()}</h3>`;
      } else if (line.trim() !== '') {
        html += `<p>${line.trim()}</p>`;
      } else {
        html += '<p><br></p>';
      }
    }
  }

  if (inList) {
    html += '</ul>';
  }

  return html;
};

function getImageSource(value) {
  if (!value) return '';
  return value.startsWith('/') ? `http://localhost:8080${value}` : value;
}

const ArticleForm = ({ initialData, onSubmit, isPending, categories = [], tags = [], topics = [], isEditMode = false }) => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageFileName, setImageFileName] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [localTags, setLocalTags] = useState(tags);
  const [localTopics, setLocalTopics] = useState(topics);

  // Initialize from props (when they load)
  useEffect(() => { setLocalTags(tags); }, [tags]);
  useEffect(() => { setLocalTopics(topics); }, [topics]);

  const [newTopicName, setNewTopicName] = useState('');
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [isCreatingTag, setIsCreatingTag] = useState(false);

  const [selectedTagIds, setSelectedTagIds] = useState(initialData?.tagIds || []);
  const [selectedTopicIds, setSelectedTopicIds] = useState(initialData?.topicIds || []);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: initialData?.title || '',
      summary: initialData?.summary || '',
      content: convertLegacyToHtml(initialData?.content) || '',
      categoryId: initialData?.categoryId || '',
      country: initialData?.country || '',
      imageUrl: initialData?.thumbnail || initialData?.imageUrl || '',
      editSummary: '',
    },
  });

  const titleValue = watch('title', '');
  const summaryValue = watch('summary', '');
  const imageUrlValue = watch('imageUrl', '');
  const categoryIdValue = watch('categoryId', '');
  const countryValue = watch('country', '');

  const selectedCategory = useMemo(
    () => categories.find((cat) => String(cat.id) === String(categoryIdValue)),
    [categories, categoryIdValue],
  );

  function handleToggleTag(tagId) {
    setSelectedTagIds((current) =>
      current.includes(tagId)
        ? current.filter((id) => id !== tagId)
        : [...current, tagId]
    );
  }

  function handleToggleTopic(topicId) {
    setSelectedTopicIds((current) =>
      current.includes(topicId)
        ? current.filter((id) => id !== topicId)
        : [...current, topicId]
    );
  }

  async function handleCreateTopic() {
    if (!newTopicName.trim() || isCreatingTopic) return;
    setIsCreatingTopic(true);
    try {
      const topic = await createTopic(newTopicName.trim());
      setLocalTopics((prev) => [...prev, topic]);
      setSelectedTopicIds((current) => [...current, topic.id]);
      setNewTopicName('');
    } catch {
      // In a real app, maybe show an error toast
    } finally {
      setIsCreatingTopic(false);
    }
  }

  async function handleCreateTag() {
    if (!newTagName.trim() || isCreatingTag) return;
    setIsCreatingTag(true);
    try {
      const tag = await createTag(newTagName.trim());
      setLocalTags((prev) => [...prev, tag]);
      setSelectedTagIds((current) => [...current, tag.id]);
      setNewTagName('');
    } catch {
      // In a real app, maybe show an error toast
    } finally {
      setIsCreatingTag(false);
    }
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose an image file.');
      return;
    }

    setUploadMessage('');
    setUploadError('');
    setIsUploadingImage(true);

    try {
      const imageUrl = await uploadArticleImage(file);
      setValue('imageUrl', imageUrl);
      setImageFileName(file.name);
      setUploadMessage('Cover image uploaded successfully.');
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Unable to upload the cover image.');
    } finally {
      setIsUploadingImage(false);
    }
  }

  function handleRemoveImage() {
    setValue('imageUrl', '');
    setImageFileName('');
    setUploadMessage('');
    setUploadError('');
  }

  function onFormSubmit(data) {
    onSubmit({
      ...data,
      tagIds: selectedTagIds.map((id) => Number(id)),
      topicIds: selectedTopicIds.map((id) => Number(id)),
    });
  }

  return (
    <div className="af-layout">
      {/* ── Main Form Column ── */}
      <div className="af-form-column">
        <form className="article-form" onSubmit={handleSubmit(onFormSubmit)}>
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="article-title" className="form-label">Title</label>
            <input
              id="article-title"
              type="text"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="Enter a descriptive title for your article..."
              {...register('title')}
            />
            <div className="char-counter">{titleValue.length} / 255</div>
            {errors.title && (
              <span className="field-error">⚠ {errors.title.message}</span>
            )}
          </div>

          {/* Summary Field */}
          <div className="form-group">
            <label htmlFor="article-summary" className="form-label">Summary</label>
            <textarea
              id="article-summary"
              className={`form-textarea ${errors.summary ? 'input-error' : ''}`}
              placeholder="Write a brief summary of the article..."
              rows={3}
              {...register('summary')}
            />
            <div className="char-counter">{summaryValue.length} / 500</div>
            {errors.summary && (
              <span className="field-error">⚠ {errors.summary.message}</span>
            )}
          </div>

          {/* Category + Country Row */}
          <div className="af-field-row">
            <div className="form-group">
              <label htmlFor="article-category" className="form-label">Category</label>
              <select
                id="article-category"
                className={`form-input ${errors.categoryId ? 'input-error' : ''}`}
                {...register('categoryId')}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <span className="field-error">⚠ {errors.categoryId.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="article-country" className="form-label">Country or region</label>
              <input
                id="article-country"
                type="text"
                className={`form-input ${errors.country ? 'input-error' : ''}`}
                placeholder="e.g. Vietnam, Italy, Central Asia"
                {...register('country')}
              />
              {errors.country && (
                <span className="field-error">⚠ {errors.country.message}</span>
              )}
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="form-group">
            <label className="form-label">Cover image</label>
            <div className="af-image-manager">
              <div className="af-image-preview-shell">
                {imageUrlValue ? (
                  <img
                    src={getImageSource(imageUrlValue)}
                    alt={titleValue || 'Article cover'}
                    className="af-preview-image"
                  />
                ) : (
                  <div className="af-preview-placeholder">No cover image</div>
                )}

                <div className="af-image-caption">
                  <p>Upload a JPG, PNG, WEBP, or GIF image for the article card and detail header.</p>
                  <small>
                    {isUploadingImage
                      ? 'Uploading cover image...'
                      : imageFileName
                        ? `Selected file: ${imageFileName}`
                        : imageUrlValue
                          ? 'Cover image stored on the server.'
                          : 'No cover image selected.'}
                  </small>
                </div>
              </div>

              {uploadMessage && <div className="af-upload-message af-upload-success">{uploadMessage}</div>}
              {uploadError && <div className="af-upload-message af-upload-error">{uploadError}</div>}

              <div className="af-image-actions">
                <label className="af-upload-btn">
                  {isUploadingImage ? 'Uploading...' : 'Upload image'}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    className="af-file-input"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                  />
                </label>
                {imageUrlValue && (
                  <button type="button" className="af-remove-btn" onClick={handleRemoveImage}>
                    Remove image
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content Field (Rich Text) */}
          <div className="form-group">
            <label className="form-label">Content</label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <div className={`quill-wrapper ${errors.content ? 'quill-error' : ''}`}>
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Write your article content here..."
                  />
                </div>
              )}
            />
            {errors.content && (
              <span className="field-error">⚠ {errors.content.message}</span>
            )}
          </div>

          {/* Topics Selection */}
          <div className="form-group">
            <label className="form-label">Topics</label>
            <div className="af-tag-grid">
              {localTopics.map((topic) => {
                const isSelected = selectedTopicIds.includes(topic.id);
                return (
                  <button
                    key={topic.id}
                    type="button"
                    className={`af-tag-chip ${isSelected ? 'af-tag-chip-active' : ''}`}
                    onClick={() => handleToggleTopic(topic.id)}
                  >
                    {topic.name}
                  </button>
                );
              })}
            </div>
            {/* Inline create topic */}
            <div className="af-inline-create">
              <input
                type="text"
                placeholder="Or create a new topic..."
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleCreateTopic())}
                className="form-input form-input-small"
              />
              <button
                type="button"
                className="af-inline-create-btn"
                onClick={handleCreateTopic}
                disabled={isCreatingTopic || !newTopicName.trim()}
              >
                {isCreatingTopic ? 'Creating...' : '+ Add'}
              </button>
            </div>
          </div>

          {/* Tags Selection */}
          <div className="form-group">
            <label className="form-label">Tags</label>
            <div className="af-tag-grid">
              {localTags.map((tag) => {
                const isSelected = selectedTagIds.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    className={`af-tag-chip ${isSelected ? 'af-tag-chip-active' : ''}`}
                    onClick={() => handleToggleTag(tag.id)}
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
            {/* Inline create tag */}
            <div className="af-inline-create">
              <input
                type="text"
                placeholder="Or create a new tag..."
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleCreateTag())}
                className="form-input form-input-small"
              />
              <button
                type="button"
                className="af-inline-create-btn"
                onClick={handleCreateTag}
                disabled={isCreatingTag || !newTagName.trim()}
              >
                {isCreatingTag ? 'Creating...' : '+ Add'}
              </button>
            </div>
          </div>

          {/* Edit Summary Field (Only in edit mode) */}
          {isEditMode && (
            <div className="form-group">
              <label htmlFor="article-edit-summary" className="form-label">Edit Summary</label>
              <textarea
                id="article-edit-summary"
                className="form-textarea"
                placeholder="Briefly explain what you changed and why..."
                rows={2}
                {...register('editSummary')}
              />
              {errors.editSummary && (
                <span className="field-error">⚠ {errors.editSummary.message}</span>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="af-form-actions">
            <button
              type="submit"
              className="form-submit-btn"
              disabled={isPending || isUploadingImage}
            >
              {isPending ? (
                <span className="btn-loading">
                  <span className="btn-spinner" />
                  Submitting...
                </span>
              ) : (
                isEditMode ? 'Submit revision' : 'Submit article'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ── Live Preview Sidebar ── */}
      <aside className="af-preview-sidebar">
        <div className="af-preview-panel">
          <div className="af-preview-panel-header">
            <span className="af-preview-kicker">Live preview</span>
            <h3 className="af-preview-panel-title">Submission card</h3>
          </div>

          <article className="af-preview-card">
            {imageUrlValue ? (
              <img
                src={getImageSource(imageUrlValue)}
                alt={titleValue || 'Article cover'}
                className="af-preview-card-image"
              />
            ) : (
              <div className="af-preview-card-placeholder">No cover image</div>
            )}

            <div className="af-preview-chip-list">
              {selectedCategory?.name && (
                <span className="af-preview-chip af-preview-chip-accent">{selectedCategory.name}</span>
              )}
              {countryValue && (
                <span className="af-preview-chip">{countryValue}</span>
              )}
            </div>

            <div className="af-preview-card-content">
              <h4>{titleValue || 'Your article title will appear here'}</h4>
              <p>{summaryValue || 'Add a summary to preview how the article intro will read to reviewers.'}</p>
            </div>

            <div className="af-preview-chip-list">
              {selectedTopicIds.length > 0 ? (
                localTopics
                  .filter((topic) => selectedTopicIds.includes(topic.id))
                  .map((topic) => (
                    <span key={topic.id} className="af-preview-chip af-preview-chip-accent">{topic.name}</span>
                  ))
              ) : null}
              {selectedTagIds.length > 0 ? (
                localTags
                  .filter((tag) => selectedTagIds.includes(tag.id))
                  .map((tag) => (
                    <span key={tag.id} className="af-preview-chip">{tag.name}</span>
                  ))
              ) : (
                selectedTopicIds.length === 0 && <span className="af-preview-chip af-preview-chip-muted">No topics or tags selected</span>
              )}
            </div>
          </article>
        </div>

        {/* Checklist */}
        <div className="af-preview-panel">
          <div className="af-preview-panel-header">
            <span className="af-preview-kicker">Checklist</span>
            <h3 className="af-preview-panel-title">Before you submit</h3>
          </div>

          <div className="af-checklist">
            <div className="af-checklist-item">
              <span className="af-checklist-icon">{titleValue.length >= 10 ? '✅' : '⬜'}</span>
              <div>
                <strong>Clear title</strong>
                <p>Use a title that identifies the historical subject quickly and unambiguously.</p>
              </div>
            </div>
            <div className="af-checklist-item">
              <span className="af-checklist-icon">{summaryValue.length >= 20 ? '✅' : '⬜'}</span>
              <div>
                <strong>Useful summary</strong>
                <p>Keep the summary short, factual, and helpful for reviewers scanning many submissions.</p>
              </div>
            </div>
            <div className="af-checklist-item">
              <span className="af-checklist-icon">{imageUrlValue ? '✅' : '⬜'}</span>
              <div>
                <strong>Cover image</strong>
                <p>Upload a relevant image to make your article stand out in listings.</p>
              </div>
            </div>
            <div className="af-checklist-item">
              <span className="af-checklist-icon">{categoryIdValue ? '✅' : '⬜'}</span>
              <div>
                <strong>Category selected</strong>
                <p>Assign a category so readers can discover your article more easily.</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ArticleForm;
