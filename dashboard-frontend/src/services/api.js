import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ==============================================================
   Admin API endpoints
   ============================================================== */
export const adminApi = {
  // ── Dashboard overview ─────────────────────────────────
  getDashboardOverview: async () => {
    // Fetch all data in parallel from the real backend endpoints
    const [stats, articles, categories, topics, tags, events, users, pendingEdits] = await Promise.all([
      api.get('/admin/dashboard').then(r => r.data).catch(() => null),
      api.get('/admin/articles').then(r => r.data).catch(() => []),
      api.get('/admin/categories').then(r => r.data).catch(() => []),
      api.get('/admin/topics').then(r => r.data).catch(() => []),
      api.get('/admin/tags').then(r => r.data).catch(() => []),
      api.get('/historical-events').then(r => r.data).catch(() => []),
      api.get('/admin/users').then(r => r.data).catch(() => []),
      api.get('/admin/edits/pending').then(r => r.data).catch(() => []),
    ]);

    // Calculate total reactions from articles
    const totalReactions = articles.reduce((sum, a) => (sum + (a.likeCount || 0) + (a.dislikeCount || 0)), 0);

    // Build monthly activity chart (last 6 months)
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = d.toLocaleString('default', { month: 'short' });

      // Count articles created in this month
      const articleCount = articles.filter(a => {
        if (!a.createdAt) return false;
        const created = new Date(a.createdAt);
        return created.getFullYear() === d.getFullYear() && created.getMonth() === d.getMonth();
      }).length;

      months.push({
        key: monthKey,
        month: monthLabel,
        articles: articleCount,
        edits: 0
      });
    }

    // Build article status breakdown
    const statusCounts = {};
    articles.forEach(a => {
      const s = a.status || 'unknown';
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    });
    const articleStatus = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

    // Build topic breakdown
    const topicBreakdown = categories.map(c => ({
      name: c.name || 'Unnamed',
      articles: articles.filter(a => a.categoryId === c.id).length
    }));

    return {
      stats: {
        totalUsers: stats?.totalUsers ?? users.length,
        totalArticles: stats?.totalArticles ?? articles.length,
        totalCategories: stats ? 0 : categories.length,
        totalTags: tags.length,
        totalEvents: stats?.totalEvents ?? events.length,
        totalTopics: topics.length,
        totalReactions,
        pendingEdits: stats?.pendingEdits ?? pendingEdits.length,
      },
      articleStatus: articleStatus.length > 0 ? articleStatus : [{ name: 'No data', value: 0 }],
      topicBreakdown,
      monthlyActivity: months,
      pendingEditQueue: pendingEdits.slice(0, 5).map(e => ({
        id: e.id,
        title: e.title,
        summary: e.summary,
        editable_type: e.editableType,
        editorName: e.editorName,
        created_at: e.createdAt,
      })),
      recentArticles: articles.slice(0, 5).map(a => ({
        ...a,
        topicNames: a.topics ? a.topics.map(t => t.name) : [a.categoryName || 'Uncategorized'],
        pendingEditCount: 0,
        updated_at: a.updatedAt || a.createdAt || new Date().toISOString(),
      })),
      recentNotifications: [],
      eventHighlights: events.slice(0, 3).map(e => ({
        id: e.id,
        title: e.title,
        summary: e.summary,
        event_year: e.eventYear,
        currentEditStatus: 'approved',
      })),
    };
  },

  getArticles: async () => {
    const { data } = await api.get('/admin/articles');
    return (Array.isArray(data) ? data : []).map(a => ({
      ...a,
      // summary can be null → filter crashes on .toLowerCase()
      summary: a.summary || '',
      // topicNames must be a non-null array — filter uses .some()
      topicNames: Array.isArray(a.topics) && a.topics.length > 0
        ? a.topics.map(t => t.name)
        : (a.categoryName ? [a.categoryName] : []),
      // linkedEvents must be a non-null array — filter uses .some()
      linkedEvents: [],
      pendingEditCount: 0,
      updated_at: a.updatedAt || a.createdAt || new Date().toISOString(),
      like_count: a.likeCount || 0,
      dislike_count: a.dislikeCount || 0,
    }));
  },
  listArticles: async () => {
    const { data } = await api.get('/admin/articles');
    return Array.isArray(data) ? data : [];
  },
  updateArticleStatus: async (id, status) => {
    const { data } = await api.put(`/admin/articles/${id}/status`, { status });
    return data;
  },
  deleteArticle: async (id) => {
    await api.delete(`/admin/articles/${id}`);
  },

  // ── Categories ─────────────────────────────────────────
  getCategories: async () => {
    const { data } = await api.get('/admin/categories');
    return Array.isArray(data) ? data : [];
  },
  listCategories: async () => {
    const { data } = await api.get('/admin/categories');
    return Array.isArray(data) ? data : [];
  },
  createCategory: async (payload) => {
    const { data } = await api.post('/admin/categories', payload);
    return data;
  },
  updateCategory: async (id, payload) => {
    const { data } = await api.put(`/admin/categories/${id}`, payload);
    return data;
  },
  deleteCategory: async (id) => {
    await api.delete(`/admin/categories/${id}`);
  },

  // ── Topics ─────────────────────────────────────────────
  getTopics: async () => {
    const { data } = await api.get('/admin/topics');
    return Array.isArray(data) ? data : [];
  },
  listTopics: async () => {
    const { data } = await api.get('/admin/topics');
    return Array.isArray(data) ? data : [];
  },
  createTopic: async (payload) => {
    const { data } = await api.post('/admin/topics', payload);
    return data;
  },
  updateTopic: async (id, payload) => {
    const { data } = await api.put(`/admin/topics/${id}`, payload);
    return data;
  },
  deleteTopic: async (id) => {
    await api.delete(`/admin/topics/${id}`);
  },

  // ── Tags ───────────────────────────────────────────────
  getTags: async () => {
    const { data } = await api.get('/admin/tags');
    return Array.isArray(data) ? data : [];
  },
  listTags: async () => {
    const { data } = await api.get('/admin/tags');
    return Array.isArray(data) ? data : [];
  },
  createTag: async (payload) => {
    const { data } = await api.post('/admin/tags', payload);
    return data;
  },
  updateTag: async (id, payload) => {
    const { data } = await api.put(`/admin/tags/${id}`, payload);
    return data;
  },
  deleteTag: async (id) => {
    await api.delete(`/admin/tags/${id}`);
  },

  // ── Historical Events ─────────────────────────────────
  getEvents: async () => {
    const { data } = await api.get('/historical-events');
    return (Array.isArray(data) ? data : []).map(e => ({
      ...e,
      event_year: e.eventYear,
      event_date: e.eventDate,
      linkedArticleCount: 0,
      topicCount: 0,
      currentEditStatus: 'approved',
    }));
  },
  listEvents: async () => {
    const { data } = await api.get('/historical-events');
    return Array.isArray(data) ? data : [];
  },
  createEvent: async (payload) => {
    // Map frontend field names → backend DTO field names
    const body = {
      title: payload.title,
      summary: payload.summary,
      eventYear: payload.event_year ? Number(payload.event_year) : null,
      eventDate: payload.event_date || null,
      imageUrl: payload.imageUrl || null,
    };
    const { data } = await api.post('/admin/events', body);
    return data;
  },
  updateEvent: async (id, payload) => {
    const body = {
      title: payload.title,
      summary: payload.summary,
      eventYear: payload.event_year ? Number(payload.event_year) : null,
      eventDate: payload.event_date || null,
      imageUrl: payload.imageUrl || null,
    };
    const { data } = await api.put(`/admin/events/${id}`, body);
    return data;
  },
  deleteEvent: async (id) => {
    await api.delete(`/admin/events/${id}`);
  },
  linkArticleToEvent: async (eventId, articleId) => {
    // Placeholder — no backend endpoint for linking yet
    console.warn('linkArticleToEvent: backend endpoint not yet implemented');
    return {};
  },

  // ── Users ──────────────────────────────────────────────
  getUsers: async () => {
    const { data } = await api.get('/admin/users');
    return (Array.isArray(data) ? data : []).map(u => ({
      ...u,
      is_locked: u.isLocked || false,
      last_active_at: u.lastActiveAt || u.createdAt || new Date().toISOString(),
      articleCount: 0,
      editCount: 0,
      pendingEditCount: 0,
    }));
  },
  listUsers: async () => {
    const { data } = await api.get('/admin/users');
    return Array.isArray(data) ? data : [];
  },
  updateUserRole: async (userId, role) => {
    const { data } = await api.put(`/admin/users/${userId}/role`, { role });
    return data;
  },
  toggleUserLock: async (userId) => {
    const { data } = await api.post(`/admin/users/${userId}/toggle-lock`);
    return data;
  },

  // ── Edits ──────────────────────────────────────────────
  listEdits: async () => {
    const { data } = await api.get('/admin/edits/pending');
    return Array.isArray(data) ? data : [];
  },
  getPendingEdits: async () => {
    const { data } = await api.get('/admin/edits/pending');
    return (Array.isArray(data) ? data : []).map(e => ({
      ...e,
      editable_type: e.editableType,
      upvote_count: e.upvoteCount || 0,
      downvote_count: e.downvoteCount || 0,
      created_at: e.createdAt,
      baseRecord: null, // Would need an additional fetch per edit
    }));
  },
  approveEdit: async (editId) => {
    const { data } = await api.post(`/admin/edits/${editId}/approve`);
    return data;
  },
  rejectEdit: async (editId) => {
    const { data } = await api.post(`/admin/edits/${editId}/reject`);
    return data;
  },
};

/* ==============================================================
   User API endpoints (Contributor level functions)
   ============================================================== */
export const userApi = {
  getHomePage: async () => {
    const articles = await api.get('/articles/recommended').then(r => r.data).catch(() => []);
    return {
      stats: {
        totalViews: 0,
        totalLikes: articles.reduce((s, a) => s + (a.likeCount || 0), 0),
        totalEdits: 0
      },
      recentArticles: articles.slice(0, 3)
    };
  },
  listArticles: async () => {
    const { data } = await api.get('/articles/search?q=');
    return Array.isArray(data) ? data : [];
  },
  getArticles: async () => {
    const { data } = await api.get('/articles/search?q=');
    return Array.isArray(data) ? data : [];
  },
  getTopics: async () => {
    const { data } = await api.get('/topics');
    return Array.isArray(data) ? data : [];
  },
  getHistoricalEvents: async () => {
    const { data } = await api.get('/historical-events');
    return (Array.isArray(data) ? data : []).map(e => ({
      ...e,
      event_year: e.eventYear,
      event_date: e.eventDate,
      created_at: e.createdAt,
    }));
  },
  getArticle: async (id) => {
    const { data } = await api.get(`/articles/${id}`);
    return data;
  },
  getMyArticles: async () => {
    const { data } = await api.get('/user/my/articles');
    return Array.isArray(data) ? data : [];
  },
  getMyEdits: async () => {
    const { data } = await api.get('/user/my/edits');
    return (Array.isArray(data) ? data : []).map(e => ({
      ...e,
      created_at: e.createdAt,
      editable_type: e.editableType,
      upvote_count: e.upvoteCount || 0,
      downvote_count: e.downvoteCount || 0,
    }));
  },
  getMyComments: async () => {
    const { data } = await api.get('/user/my/comments');
    return Array.isArray(data) ? data : [];
  },
  getNotifications: async () => {
    const { data } = await api.get('/user/notifications');
    return (Array.isArray(data) ? data : []).map(n => ({
      ...n,
      is_read: n.isRead || false,
      related_type: n.relatedType,
      created_at: n.createdAt,
    }));
  },
  markNotificationRead: async (id) => {
    const { data } = await api.post(`/user/notifications/${id}/read`);
    return data;
  },
  getProfile: async () => {
    const { data } = await api.get('/auth/me');
    return {
      ...data,
      articleCount: 0,
      editCount: 0,
      pendingEditCount: 0
    };
  },
  createArticle: async (payload) => {
    const { data } = await api.post('/user/articles', payload);
    return data;
  },
  updateArticle: async (id, payload) => {
    const { data } = await api.put(`/user/articles/${id}`, payload);
    return data;
  },
  createEdit: async (payload) => {
    const { data } = await api.post('/user/edits', payload);
    return data;
  },
  voteArticle: async (id) => {
    const { data } = await api.post(`/user/articles/${id}/like`);
    return data;
  },
};

export const USER_ROLE_OPTIONS = ["ADMIN", "USER"];