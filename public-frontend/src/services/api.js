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

export async function fetchEventDetail(id) {
  const { data } = await api.get(`/historical-events/${id}`);
  return data;
}

export async function fetchBooks() {
  try {
    const { data } = await api.get('/books');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchAuthors() {
  try {
    const { data } = await api.get('/authors');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchExhibitions() {
  try {
    const { data } = await api.get('/exhibitions');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchRelatedBooks(articleId) {
  try {
    const { data } = await api.get(`/articles/${articleId}/books`);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchRelatedAuthors(articleId) {
  try {
    const { data } = await api.get(`/articles/${articleId}/authors`);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchRelatedExhibitions(articleId) {
  try {
    const { data } = await api.get(`/articles/${articleId}/exhibitions`);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchTags() {
  try {
    const { data } = await api.get('/tags');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchTopics() {
  try {
    const { data } = await api.get('/topics');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function createTag(name) {
  const { data } = await api.post('/user/tags', { name });
  return data;
}

export async function createTopic(name, description = '') {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const { data } = await api.post('/user/topics', { name, slug, description });
  return data;
}

export async function uploadArticleImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await api.post('/user/articles/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data?.imageUrl || '';
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
    dislikes: a.dislikeCount || 0,
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

export async function fetchUserArticleVote(id) {
  try {
    const { data } = await api.get(`/user/articles/${id}/vote`);
    return data?.voteType || null; // 'like', 'dislike', or null
  } catch {
    return null;
  }
}

export async function toggleArticleVote(id, voteType = 'like') {
  const { data } = await api.post(`/user/articles/${id}/vote`, { voteType });
  return data; // { action: string, voteType: string }
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

// ── Edits ───────────────────────────────────────────

export async function submitEdit({ editableId, editableType, title, summary, content, thumbnail }) {
  const { data } = await api.post('/user/edits', {
    editableId,
    editableType: editableType || 'article',
    title,
    summary,
    content,
    thumbnail,
  });
  return data;
}

export async function fetchArticleEdits(articleId) {
  try {
    const { data } = await api.get(`/articles/${articleId}/edits`);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchRecentEdits() {
  try {
    const { data } = await api.get('/edits/recent');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function fetchEditDetail(id) {
  const { data } = await api.get(`/edits/${id}`);
  return data;
}

export async function fetchUserEditVote(id) {
  try {
    const { data } = await api.get(`/user/edits/${id}/vote`);
    return data?.voteType || null; // 'upvote', 'downvote', or null
  } catch {
    return null;
  }
}

export async function toggleEditVote(id, voteType) {
  const { data } = await api.post(`/user/edits/${id}/vote`, { voteType });
  return data; // { action: string, voteType: string }
}

export default api;
