import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
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

const ArticleForm = ({ initialData, onSubmit, isPending }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: initialData?.title || '',
      summary: initialData?.summary || '',
      content: initialData?.content || '',
    },
  });

  const titleValue = watch('title', '');
  const summaryValue = watch('summary', '');

  return (
    <form className="article-form" onSubmit={handleSubmit(onSubmit)}>
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

      {/* Submit Button */}
      <button
        type="submit"
        className="form-submit-btn"
        disabled={isPending}
      >
        {isPending ? (
          <span className="btn-loading">
            <span className="btn-spinner" />
            Loading...
          </span>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};

export default ArticleForm;
