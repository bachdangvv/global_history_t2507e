import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreateArticlePage from './pages/CreateArticle/CreateArticlePage';
import EditArticlePage from './pages/EditArticle/EditArticlePage';
import './index.css';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar onToggleSidebar={toggleSidebar} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home sidebarOpen={sidebarOpen} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/submit" element={<CreateArticlePage sidebarOpen={sidebarOpen} />} />
            <Route path="/articles/:id/edit" element={<EditArticlePage sidebarOpen={sidebarOpen} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
