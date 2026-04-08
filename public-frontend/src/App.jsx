import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import Toast from './components/Toast/Toast';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import CreateArticlePage from './pages/CreateArticle/CreateArticlePage';
import EditArticlePage from './pages/EditArticle/EditArticlePage';
import Search from './pages/Search/Search';
import ArticleDetail from './pages/ArticleDetail/ArticleDetail';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import About from './pages/Static/About';
import PrivacyPolicy from './pages/Static/PrivacyPolicy';
import Contact from './pages/Static/Contact';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <div className="app-container">
            <Navbar onToggleSidebar={toggleSidebar} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home sidebarOpen={sidebarOpen} />} />
                <Route path="/articles/:id/edit" element={<EditArticlePage sidebarOpen={sidebarOpen} />} />
                <Route path="/search" element={<Search />} />
                <Route path="/article/:id" element={<ArticleDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/submit" element={<CreateArticlePage />} />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </div>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
