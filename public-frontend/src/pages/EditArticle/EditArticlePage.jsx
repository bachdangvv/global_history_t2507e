import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import Sidebar from '../../components/Home/Sidebar/Sidebar';
import { mockData } from '../../mockData';
import '../EditorPage.css';

const EditArticlePage = ({ sidebarOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ['article', id],
    queryFn: () => axios.get(`/api/articles/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (formData) =>
      axios.post('/api/edits', {
        editable_id: parseInt(id),
        editable_type: 'ARTICLE',
        ...formData,
      }),
    onSuccess: () => {
      alert('Your revision were submitted for review!');
      navigate(`/articles/${id}`);
    },
    onError: (error) => {
      alert(error?.response?.data?.message || 'Failed to submit revision. Please try again.');
    },
  });

  return (
    <div className={`editor-page-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar */}
      <aside className="editor-sidebar-col">
        <Sidebar data={mockData.categories} sidebarOpen={sidebarOpen} />
      </aside>

      {/* Main Editor Area */}
      <div className="editor-main">
        <div className="editor-page-header">
          <h1 className="editor-page-title">Edit Article</h1>
          <p className="editor-page-subtitle">
            Propose changes to this article. Your revision will be submitted for review by moderators.
          </p>
        </div>

        {isLoading && (
          <div className="editor-loading">
            <div className="editor-loading-spinner" />
            <span className="editor-loading-text">Loading data...</span>
          </div>
        )}

        {isError && (
          <div className="editor-error">
            Failed to load article. Please check the article ID and try again.
          </div>
        )}

        {!isLoading && !isError && article && (
          <>
            <div className="editor-edit-badge">
              📝 Editing article <strong>#{id}</strong>
            </div>
            <ArticleForm
              initialData={article}
              onSubmit={(formData) => mutation.mutate(formData)}
              isPending={mutation.isPending}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default EditArticlePage;
