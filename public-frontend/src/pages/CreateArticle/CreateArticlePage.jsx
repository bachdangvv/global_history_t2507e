import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import Sidebar from '../../components/Home/Sidebar/Sidebar';
import { mockData } from '../../mockData';
import '../EditorPage.css';

const CreateArticlePage = ({ sidebarOpen }) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => axios.post('/api/articles', data),
    onSuccess: () => {
      alert('Article created successfully!');
      navigate('/');
    },
    onError: (error) => {
      alert(error?.response?.data?.message || 'Failed to create article. Please try again.');
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
