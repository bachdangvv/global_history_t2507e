import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminApi = {
  getDashboardOverview: async () => {
    const [stats, articles, categories, topics, tags, events, users, pendingEdits] = await Promise.all([
      api.get("/admin/dashboard").then((response) => response.data).catch(() => null),
      api.get("/admin/articles").then((response) => response.data).catch(() => []),
      api.get("/admin/categories").then((response) => response.data).catch(() => []),
      api.get("/admin/topics").then((response) => response.data).catch(() => []),
      api.get("/admin/tags").then((response) => response.data).catch(() => []),
      api.get("/historical-events").then((response) => response.data).catch(() => []),
      api.get("/admin/users").then((response) => response.data).catch(() => []),
      api.get("/admin/edits/pending").then((response) => response.data).catch(() => []),
    ]);

    const totalReactions = articles.reduce(
      (sum, article) => sum + (article.likeCount || 0) + (article.dislikeCount || 0),
      0,
    );

    const months = [];
    for (let index = 5; index >= 0; index -= 1) {
      const date = new Date();
      date.setMonth(date.getMonth() - index);

      const articleCount = articles.filter((article) => {
        if (!article.createdAt) {
          return false;
        }

        const createdAt = new Date(article.createdAt);
        return createdAt.getFullYear() === date.getFullYear() && createdAt.getMonth() === date.getMonth();
      }).length;

      months.push({
        key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
        month: date.toLocaleString("default", { month: "short" }),
        articles: articleCount,
        edits: 0,
      });
    }

    const statusCounts = {};
    articles.forEach((article) => {
      const status = article.status || "unknown";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    const articleStatus = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
    const topicBreakdown = categories.map((category) => ({
      name: category.name || "Unnamed",
      articles: articles.filter((article) => article.categoryId === category.id).length,
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
      articleStatus: articleStatus.length ? articleStatus : [{ name: "No data", value: 0 }],
      topicBreakdown,
      monthlyActivity: months,
      pendingEditQueue: pendingEdits.slice(0, 5).map((edit) => ({
        id: edit.id,
        title: edit.title,
        summary: edit.summary,
        editable_type: edit.editableType,
        editorName: edit.editorName,
        created_at: edit.createdAt,
      })),
      recentArticles: articles.slice(0, 5).map((article) => ({
        ...article,
        topicNames: article.topics ? article.topics.map((topic) => topic.name) : [article.categoryName || "Uncategorized"],
        pendingEditCount: 0,
        updated_at: article.updatedAt || article.createdAt || new Date().toISOString(),
      })),
      recentNotifications: [],
      eventHighlights: events.slice(0, 3).map((eventItem) => ({
        id: eventItem.id,
        title: eventItem.title,
        summary: eventItem.summary,
        event_year: eventItem.eventYear,
        currentEditStatus: "approved",
      })),
    };
  },

  getArticles: async () => {
    const { data } = await api.get("/admin/articles");
    return (Array.isArray(data) ? data : []).map((article) => ({
      ...article,
      summary: article.summary || "",
      topicNames:
        Array.isArray(article.topics) && article.topics.length > 0
          ? article.topics.map((topic) => topic.name)
          : (article.categoryName ? [article.categoryName] : []),
      linkedEvents: [],
      pendingEditCount: 0,
      updated_at: article.updatedAt || article.createdAt || new Date().toISOString(),
      like_count: article.likeCount || 0,
      dislike_count: article.dislikeCount || 0,
    }));
  },

  getArticle: async (id) => {
    const data = await api
      .get(`/admin/articles/${id}`)
      .then((response) => response.data)
      .catch(() => api.get(`/articles/${id}`).then((response) => response.data));

    const topicNames =
      Array.isArray(data.topics) && data.topics.length > 0
        ? data.topics.map((topic) => topic.name)
        : (data.categoryName ? [data.categoryName] : []);

    const linkedEventsSource = Array.isArray(data.linkedEvents)
      ? data.linkedEvents
      : Array.isArray(data.events)
        ? data.events
        : Array.isArray(data.historicalEvents)
          ? data.historicalEvents
          : [];

    return {
      ...data,
      summary: data.summary || "",
      content: data.content || "",
      authorName: data.authorName || data.author?.username || data.author?.name || "Unknown",
      topicNames,
      linkedEvents: linkedEventsSource.map((eventItem) => ({
        id: eventItem.id,
        title: eventItem.title || eventItem.name || "Untitled event",
      })),
      pendingEditCount: data.pendingEditCount || 0,
      updated_at: data.updatedAt || data.createdAt || new Date().toISOString(),
      created_at: data.createdAt || data.updatedAt || new Date().toISOString(),
      like_count: data.likeCount || 0,
      dislike_count: data.dislikeCount || 0,
      currentEdit: data.currentEdit
        ? {
            ...data.currentEdit,
            summary: data.currentEdit.summary || data.currentEdit.content || "No current edit record",
            content: data.currentEdit.content || "",
          }
        : null,
    };
  },

  listArticles: async () => {
    const { data } = await api.get("/admin/articles");
    return Array.isArray(data) ? data : [];
  },

  updateArticleStatus: async (id, status) => {
    const { data } = await api.put(`/admin/articles/${id}/status`, { status });
    return data;
  },

  approveArticle: async (id) => {
    const { data } = await api.put(`/admin/articles/${id}/status`, { status: "published" });
    return data;
  },

  deleteArticle: async (id) => {
    await api.delete(`/admin/articles/${id}`);
  },

  getCategories: async () => {
    const { data } = await api.get("/admin/categories");
    return Array.isArray(data) ? data : [];
  },

  listCategories: async () => {
    const { data } = await api.get("/admin/categories");
    return Array.isArray(data) ? data : [];
  },

  createCategory: async (payload) => {
    const { data } = await api.post("/admin/categories", payload);
    return data;
  },

  updateCategory: async (id, payload) => {
    const { data } = await api.put(`/admin/categories/${id}`, payload);
    return data;
  },

  deleteCategory: async (id) => {
    await api.delete(`/admin/categories/${id}`);
  },

  getTopics: async () => {
    const { data } = await api.get("/admin/topics");
    return Array.isArray(data) ? data : [];
  },

  listTopics: async () => {
    const { data } = await api.get("/admin/topics");
    return Array.isArray(data) ? data : [];
  },

  createTopic: async (payload) => {
    const { data } = await api.post("/admin/topics", payload);
    return data;
  },

  updateTopic: async (id, payload) => {
    const { data } = await api.put(`/admin/topics/${id}`, payload);
    return data;
  },

  deleteTopic: async (id) => {
    await api.delete(`/admin/topics/${id}`);
  },

  getTags: async () => {
    const { data } = await api.get("/admin/tags");
    return Array.isArray(data) ? data : [];
  },

  listTags: async () => {
    const { data } = await api.get("/admin/tags");
    return Array.isArray(data) ? data : [];
  },

  createTag: async (payload) => {
    const { data } = await api.post("/admin/tags", payload);
    return data;
  },

  updateTag: async (id, payload) => {
    const { data } = await api.put(`/admin/tags/${id}`, payload);
    return data;
  },

  deleteTag: async (id) => {
    await api.delete(`/admin/tags/${id}`);
  },

  getEvents: async () => {
    const { data } = await api.get("/historical-events");
    return (Array.isArray(data) ? data : []).map((eventItem) => ({
      ...eventItem,
      event_year: eventItem.eventYear,
      event_date: eventItem.eventDate,
      linkedArticleCount: 0,
      topicCount: 0,
      currentEditStatus: "approved",
    }));
  },

  listEvents: async () => {
    const { data } = await api.get("/historical-events");
    return Array.isArray(data) ? data : [];
  },

  createEvent: async (payload) => {
    const body = {
      title: payload.title,
      summary: payload.summary,
      eventYear: payload.event_year ? Number(payload.event_year) : null,
      eventDate: payload.event_date || null,
      imageUrl: payload.imageUrl || null,
    };
    const { data } = await api.post("/admin/events", body);
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
    const { data } = await api.post(`/admin/events/${eventId}/articles`, { articleId });
    return data;
  },

  getUsers: async () => {
    const { data } = await api.get("/admin/users");
    return (Array.isArray(data) ? data : []).map((user) => ({
      ...user,
      is_locked: user.isLocked || false,
      last_active_at: user.lastActiveAt || user.createdAt || new Date().toISOString(),
      articleCount: 0,
      editCount: 0,
      pendingEditCount: 0,
    }));
  },

  listUsers: async () => {
    const { data } = await api.get("/admin/users");
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

  listEdits: async () => {
    const { data } = await api.get("/admin/edits/pending");
    return Array.isArray(data) ? data : [];
  },

  getPendingEdits: async () => {
    const { data } = await api.get("/admin/edits/pending");
    return (Array.isArray(data) ? data : []).map((edit) => ({
      ...edit,
      editable_type: edit.editableType,
      upvote_count: edit.upvoteCount || 0,
      downvote_count: edit.downvoteCount || 0,
      created_at: edit.createdAt,
      baseRecord: null,
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

export const userApi = {
  getHomePage: async () => {
    const articles = await api.get("/articles/recommended").then((response) => response.data).catch(() => []);
    return {
      stats: {
        totalViews: 0,
        totalLikes: articles.reduce((sum, article) => sum + (article.likeCount || 0), 0),
        totalEdits: 0,
      },
      recentArticles: articles.slice(0, 3),
    };
  },

  listArticles: async () => {
    const { data } = await api.get("/articles/search?q=");
    return Array.isArray(data) ? data : [];
  },

  getArticles: async () => {
    const { data } = await api.get("/articles/search?q=");
    return Array.isArray(data) ? data : [];
  },

  getTopics: async () => {
    const { data } = await api.get("/topics");
    return Array.isArray(data) ? data : [];
  },

  getCategories: async () => {
    const { data } = await api.get("/categories");
    return Array.isArray(data) ? data : [];
  },

  getTags: async () => {
    const { data } = await api.get("/tags");
    return Array.isArray(data) ? data : [];
  },

  getHistoricalEvents: async () => {
    const { data } = await api.get("/historical-events");
    return (Array.isArray(data) ? data : []).map((eventItem) => ({
      ...eventItem,
      event_year: eventItem.eventYear,
      event_date: eventItem.eventDate,
      created_at: eventItem.createdAt,
    }));
  },

  getArticle: async (id) => {
    const [articleResponse, commentResponse, editResponse] = await Promise.all([
      api.get(`/articles/${id}`),
      api.get(`/articles/${id}/comments`).catch(() => ({ data: [] })),
      api.get(`/articles/${id}/edits`).catch(() => ({ data: [] })),
    ]);

    const data = articleResponse.data;
    const comments = Array.isArray(commentResponse.data) ? commentResponse.data : [];
    const relatedEdits = Array.isArray(editResponse.data) ? editResponse.data : [];

    return {
      ...data,
      summary: data.summary || "",
      content: data.content || "",
      imageUrl: data.imageUrl || "",
      authorName: data.authorName || "Unknown",
      categoryName: data.categoryName || "",
      topicNames: Array.isArray(data.topics) ? data.topics.map((topic) => topic.name) : [],
      linkedEvents: Array.isArray(data.linkedEvents) ? data.linkedEvents : [],
      like_count: data.likeCount || 0,
      dislike_count: data.dislikeCount || 0,
      currentUserVote: data.currentUserVote || null,
      currentEdit: data.currentEdit
        ? {
            ...data.currentEdit,
            summary: data.currentEdit.summary || data.currentEdit.content || "",
            content: data.currentEdit.content || "",
          }
        : null,
      comments: comments.map((comment) => ({
        ...comment,
        created_at: comment.createdAt || comment.created_at || new Date().toISOString(),
        authorName: comment.authorName || comment.username || "Anonymous",
      })),
      relatedEdits: relatedEdits.map((edit) => ({
        ...edit,
        created_at: edit.createdAt || edit.created_at || new Date().toISOString(),
        editable_type: edit.editableType || edit.editable_type || "article",
        upvote_count: edit.upvoteCount || edit.upvote_count || 0,
        downvote_count: edit.downvoteCount || edit.downvote_count || 0,
        currentUserVote: edit.currentUserVote || null,
        summary: edit.summary || "",
      })),
    };
  },

  getMyArticles: async () => {
    const { data } = await api.get("/user/my/articles");
    return (Array.isArray(data) ? data : []).map((article) => ({
      ...article,
      summary: article.summary || "",
      imageUrl: article.imageUrl || "",
      topicNames: Array.isArray(article.topics) ? article.topics.map((topic) => topic.name) : [],
      linkedEvents: Array.isArray(article.linkedEvents) ? article.linkedEvents : [],
      like_count: article.likeCount || 0,
      dislike_count: article.dislikeCount || 0,
      authorName: article.authorName || "You",
    }));
  },

  getMyEdits: async () => {
    const { data } = await api.get("/user/my/edits");
    return (Array.isArray(data) ? data : []).map((edit) => ({
      ...edit,
      created_at: edit.createdAt,
      editable_type: edit.editableType,
      upvote_count: edit.upvoteCount || 0,
      downvote_count: edit.downvoteCount || 0,
    }));
  },

  getMyComments: async () => {
    const { data } = await api.get("/user/my/comments");
    return (Array.isArray(data) ? data : []).map((comment) => ({
      ...comment,
      created_at: comment.createdAt || comment.created_at || new Date().toISOString(),
      authorName: comment.authorName || comment.username || "Anonymous",
      commentable_type: comment.commentableType || comment.commentable_type || "article",
    }));
  },

  getNotifications: async () => {
    const { data } = await api.get("/user/notifications");
    return (Array.isArray(data) ? data : []).map((notification) => ({
      ...notification,
      is_read: notification.isRead || false,
      related_type: notification.relatedType,
      created_at: notification.createdAt,
    }));
  },

  markNotificationRead: async (id) => {
    const { data } = await api.post(`/user/notifications/${id}/read`);
    return data;
  },

  getProfile: async () => {
    const data = await api
      .get("/user/profile")
      .then((response) => response.data)
      .catch(() => api.get("/auth/me").then((response) => response.data));

    return {
      ...data,
      username: data.username || data.userName || data.name || "",
      email: data.email || "",
      avatar: data.avatar || data.avatarUrl || "",
      bio: data.bio || "",
      articleCount: 0,
      editCount: 0,
      pendingEditCount: 0,
    };
  },

  updateProfile: async (payload) => {
    const body = {
      username: payload.username,
      email: payload.email,
      avatarUrl: payload.avatar,
      bio: payload.bio,
    };

    const requests = [
      () => api.put("/user/profile", body),
      () => api.put("/users/me", body),
      () => api.put("/auth/me", body),
      () => api.patch("/user/profile", body),
      () => api.patch("/users/me", body),
      () => api.patch("/auth/me", body),
    ];

    let lastError = null;

    for (const request of requests) {
      try {
        const { data } = await request();
        return {
          ...data,
          username: data.username || data.userName || data.name || body.username || "",
          email: data.email || body.email || "",
          avatar: data.avatar || data.avatarUrl || body.avatarUrl || "",
          bio: data.bio || body.bio || "",
        };
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("Unable to update profile.");
  },

  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post("/user/profile/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      ...data,
      username: data.username || data.userName || data.name || "",
      email: data.email || "",
      avatar: data.avatar || data.avatarUrl || "",
      bio: data.bio || "",
    };
  },

  createArticle: async (payload) => {
    const { data } = await api.post("/user/articles", payload);
    return data;
  },

  uploadArticleImage: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post("/user/articles/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data?.imageUrl || "";
  },

  updateArticle: async (id, payload) => {
    const { data } = await api.put(`/user/articles/${id}`, payload);
    return data;
  },

  createEdit: async (payload) => {
    const { data } = await api.post("/user/edits", payload);
    return data;
  },

  voteArticle: async (id, voteType = "like") => {
    const voteResult = await api
      .post(`/user/articles/${id}/vote`, { voteType })
      .then((response) => response.data)
      .catch(async () => {
        if (voteType === "like") {
          const { data } = await api.post(`/user/articles/${id}/like`);
          return data;
        }

        throw new Error("Dislike voting is not available.");
      });

    const refreshedArticle = await userApi.getArticle(id);
    return {
      ...refreshedArticle,
      currentUserVote: voteResult?.action === "removed" ? null : voteType,
    };
  },

  voteEdit: async (id, voteType) => {
    const { data } = await api.post(`/user/edits/${id}/vote`, { voteType });
    return data;
  },

  // ── Reading list (saved/bookmarked articles) ─────────
  getReadingList: async () => {
    const { data } = await api.get("/user/my/reading-list");
    return (Array.isArray(data) ? data : []).map((article) => ({
      ...article,
      summary: article.summary || "",
      imageUrl: article.imageUrl || "",
      topicNames: Array.isArray(article.topics) ? article.topics.map((t) => t.name) : [],
      like_count: article.likeCount || 0,
      dislike_count: article.dislikeCount || 0,
      authorName: article.authorName || "Unknown",
    }));
  },

  addToReadingList: async (articleId) => {
    await api.post(`/user/my/reading-list/${articleId}`);
  },

  removeFromReadingList: async (articleId) => {
    await api.delete(`/user/my/reading-list/${articleId}`);
  },
};

// ── Recently viewed (localStorage-based) ──────────────────
const RECENTLY_VIEWED_KEY = "gh_recently_viewed";
const MAX_RECENTLY_VIEWED = 10;

export function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addRecentlyViewed(article) {
  const list = getRecentlyViewed().filter((item) => item.id !== article.id);
  list.unshift({
    id: article.id,
    title: article.title,
    categoryName: article.categoryName || "",
    viewedAt: new Date().toISOString(),
  });
  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(list.slice(0, MAX_RECENTLY_VIEWED)));
}

export const USER_ROLE_OPTIONS = ["ADMIN", "USER"];
