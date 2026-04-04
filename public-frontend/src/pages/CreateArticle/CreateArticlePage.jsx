import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import api, { fetchCategories } from '../../services/api';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import Sidebar from '../../components/Home/Sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import '../EditorPage.css';

const CreateArticlePage = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const { addNotification } = useNotification();

  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });

  useEffect(() => {
    if (!loading && !user) {
      addNotification('Please login to create an article.', 'error');
      navigate('/login', { state: { from: location } });
    }
  }, [user, loading, navigate, location, addNotification]);

  const mutation = useMutation({
    mutationFn: (data) => api.post('/user/articles', data),
    onSuccess: () => {
      addNotification('Article created successfully! It is pending moderation.', 'success');
      navigate('/');
    },
    onError: (error) => {
      addNotification(error?.response?.data?.message || 'Failed to create article. Please try again.', 'error');
    },
  });

  if (loading || !user) return null;

  return (
    <div className={`editor-page-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar */}
      <aside className="editor-sidebar-col">
        <Sidebar data={categories} sidebarOpen={sidebarOpen} />
      </aside>

      {/* Main Editor Area */}
      <div className="editor-main">
        <div className="editor-page-header">
          <h1 className="editor-page-title">Create New Article</h1>
          <p className="editor-page-subtitle">
            Share your knowledge with the Global History community. Your article will be reviewed before publication.
          </p>
        </div>

        <ArticleForm
          onSubmit={(formData) => mutation.mutate(formData)}
          isPending={mutation.isPending}
        />
      </div>
    </div>
  );
};

export default CreateArticlePage;
