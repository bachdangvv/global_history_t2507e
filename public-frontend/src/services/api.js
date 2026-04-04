import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Add interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Master Data ──────────────────────────────────────
export async function fetchCategories() {
  const { data } = await api.get('/categories');
  return data;
}

export async function fetchEvents() {
  const { data } = await api.get('/historical-events');
  return data;
}

// ── Articles ────────────────────────────────────────

// ── Helper to map ArticleResponse to classic mock shape ────────
const mapArticle = (a) => {
  if (!a) return a;
  return {
    ...a,
    image: a.imageUrl || 'https://via.placeholder.com/800x400?text=No+Image',
    views: a.viewCount || 0,
    likes: a.likeCount || 0,
    category: a.categoryName || 'Uncategorized',
    author: a.authorName || 'Anonymous',
    description: a.summary || ''
  };
};

export async function fetchSearchResults(query) {
  const { data } = await api.get('/articles/search', { params: { q: query } });
  return Array.isArray(data) ? data.map(mapArticle) : [];
}

export async function fetchTopArticles() {
  const { data } = await api.get('/articles/top');
  return Array.isArray(data) ? data.map(mapArticle) : [];
}

export async function fetchRecommendedArticles() {
  const { data } = await api.get('/articles/recommended');
  return Array.isArray(data) ? data.map(mapArticle) : [];
}

export async function fetchArticleDetail(id) {
  const { data } = await api.get(`/articles/${id}`);
  return mapArticle(data);
}

// ── Likes ───────────────────────────────────────────

export async function toggleArticleLike(id) {
  const { data } = await api.post(`/user/articles/${id}/like`);
  return data; // { liked: bool, likeCount: number }
}

// ── Comments ────────────────────────────────────────

export async function fetchComments(articleId) {
  const { data } = await api.get(`/articles/${articleId}/comments`);
  return data;
}

export async function postComment(articleId, { content }) {
  // We use the authenticated user endpoint since we require auth to comment
  const { data } = await api.post(`/user/articles/${articleId}/comments`, { content });
  return data;
}

export default api;
