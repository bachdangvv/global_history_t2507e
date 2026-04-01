import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import ArticleDetail from './pages/ArticleDetail/ArticleDetail';
// import Articles from './pages/Articles';
// import ArticleDetail from './pages/ArticleDetail';
// import Categories from './pages/Categories';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
// import SubmitArticle from './pages/SubmitArticle';
import './index.css';
import './App.css';

function App() {
  return (
    // <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              {/* <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/categories" element={<Categories />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/submit" element={<SubmitArticle />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
