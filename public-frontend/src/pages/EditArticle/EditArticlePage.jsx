import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import api, { fetchCategories, fetchArticleDetail, fetchBooks, fetchAuthors, fetchExhibitions } from '../../services/api';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import Sidebar from '../../components/Home/Sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import '../EditorPage.css';

const EditArticlePage = ({ sidebarOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const { addNotification } = useNotification();

  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
  const { data: books = [] } = useQuery({ queryKey: ['books'], queryFn: fetchBooks });
  const { data: authors = [] } = useQuery({ queryKey: ['authors'], queryFn: fetchAuthors });
  const { data: exhibitions = [] } = useQuery({ queryKey: ['exhibitions'], queryFn: fetchExhibitions });

  useEffect(() => {
    if (!loading && !user) {
      addNotification('Please login to edit an article.', 'error');
      navigate('/login', { state: { from: location } });
    }
  }, [user, loading, navigate, location, addNotification]);

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticleDetail(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (formData) => api.put(`/user/articles/${id}`, formData),
    onSuccess: () => {
      addNotification('Your revision were submitted for review!', 'success');
      navigate(`/article/${id}`);
    },
    onError: (error) => {
      addNotification(error?.response?.data?.message || 'Failed to submit revision. Please try again.', 'error');
    },
  });

  if (loading || !user) return null;

  return (
    <div className={`editor-page-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar */}
      <aside className="editor-sidebar-col">
        <Sidebar data={categories} books={books} authors={authors} exhibitions={exhibitions} sidebarOpen={sidebarOpen} />
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
