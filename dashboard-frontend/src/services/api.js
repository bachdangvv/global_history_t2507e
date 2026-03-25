export const USER_ROLE_OPTIONS = ["Admin", "Editor", "Moderator", "Contributor"];

const ARTICLE_STATUSES = ["published", "review", "draft", "archived"];

let idSeed = 1200;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function wait(value, ms = 120) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(clone(value)), ms);
  });
}

function buildId(prefix) {
  idSeed += 1;
  return `${prefix}-${idSeed}`;
}

function formatIso(value) {
  return new Date(value).toISOString();
}

const store = {
  categories: [
    {
      id: "cat-history",
      name: "History",
      description: "Long-form historical essays and contextual museum research.",
    },
    {
      id: "cat-artifact",
      name: "Artifacts",
      description: "Object records, provenance notes, and conservation-backed stories.",
    },
    {
      id: "cat-art",
      name: "Art",
      description: "Artwork interpretation, curatorial narratives, and exhibition text.",
    },
    {
      id: "cat-architecture",
      name: "Architecture",
      description: "Buildings, heritage spaces, and site-based documentation.",
    },
  ],
  tags: [
    {
      id: "tag-curation",
      name: "Curation",
      description: "Editorial and curatorial framing for public-facing interpretation.",
    },
    {
      id: "tag-ritual",
      name: "Ritual Practice",
      description: "Ceremonial use, symbolism, and social meaning.",
    },
    {
      id: "tag-ceramics",
      name: "Ceramics",
      description: "Kilns, glaze, restoration, and court production.",
    },
    {
      id: "tag-trade",
      name: "Trade Networks",
      description: "Exchange routes, circulation, and cultural transfer.",
    },
    {
      id: "tag-conservation",
      name: "Conservation",
      description: "Preservation methods, material care, and condition reporting.",
    },
    {
      id: "tag-cartography",
      name: "Cartography",
      description: "Maps, boundaries, and visual knowledge systems.",
    },
  ],
  countries: [
    { id: "country-vn", name: "Vietnam" },
    { id: "country-cn", name: "China" },
    { id: "country-jp", name: "Japan" },
    { id: "country-fr", name: "France" },
    { id: "country-it", name: "Italy" },
  ],
  users: [
    {
      id: "usr-001",
      name: "Ava Nguyen",
      email: "ava.nguyen@example.com",
      role: "Admin",
      isLocked: false,
      lastActive: formatIso("2026-03-25T08:32:00+07:00"),
    },
    {
      id: "usr-002",
      name: "Liam Pham",
      email: "liam.pham@example.com",
      role: "Editor",
      isLocked: false,
      lastActive: formatIso("2026-03-25T07:50:00+07:00"),
    },
    {
      id: "usr-003",
      name: "Mia Le",
      email: "mia.le@example.com",
      role: "Moderator",
      isLocked: false,
      lastActive: formatIso("2026-03-24T18:15:00+07:00"),
    },
    {
      id: "usr-004",
      name: "Noah Tran",
      email: "noah.tran@example.com",
      role: "Contributor",
      isLocked: false,
      lastActive: formatIso("2026-03-24T15:45:00+07:00"),
    },
    {
      id: "usr-005",
      name: "Emma Sato",
      email: "emma.sato@example.com",
      role: "Contributor",
      isLocked: true,
      lastActive: formatIso("2026-03-22T20:10:00+07:00"),
    },
  ],
  articles: [
    {
      id: "art-1001",
      title: "Dong Son Bronze Drum Collection",
      summary:
        "A survey of ceremonial bronze drums, their iconography, and the evolution of casting methods across northern Vietnam.",
      content:
        "This article traces the material culture of Dong Son bronze drums with emphasis on ritual use, regional circulation, and the symbolic meaning of starburst motifs in museum interpretation.",
      categoryId: "cat-artifact",
      tagIds: ["tag-curation", "tag-ritual"],
      authorId: "usr-002",
      country: "Vietnam",
      status: "published",
      likes: 428,
      dislikes: 14,
      updatedAt: formatIso("2026-03-24T09:15:00+07:00"),
      publishedAt: formatIso("2026-02-20T09:00:00+07:00"),
    },
    {
      id: "art-1002",
      title: "Imperial Ceramics of Hue",
      summary:
        "A curatorial overview of court ceramics, workshop production, and royal symbolism in the Nguyen era.",
      content:
        "The article maps glaze palettes, inscriptions, and restoration observations from pieces held in the imperial collection, alongside archival notes from court-managed kilns.",
      categoryId: "cat-art",
      tagIds: ["tag-ceramics", "tag-curation"],
      authorId: "usr-003",
      country: "Vietnam",
      status: "review",
      likes: 311,
      dislikes: 12,
      updatedAt: formatIso("2026-03-22T11:20:00+07:00"),
      publishedAt: formatIso("2026-01-28T07:10:00+07:00"),
    },
    {
      id: "art-1003",
      title: "Silk Road Trade Routes",
      summary:
        "An illustrated history of trade corridors, material exchange, and the movement of artistic motifs across Asia.",
      content:
        "This feature connects trade itineraries with ceramics, textiles, and manuscripts that moved between imperial courts, port cities, and inland exchange networks.",
      categoryId: "cat-history",
      tagIds: ["tag-trade", "tag-cartography"],
      authorId: "usr-004",
      country: "China",
      status: "published",
      likes: 502,
      dislikes: 20,
      updatedAt: formatIso("2026-03-18T15:35:00+07:00"),
      publishedAt: formatIso("2026-01-11T06:45:00+07:00"),
    },
    {
      id: "art-1004",
      title: "Japanese Folding Screens",
      summary:
        "Notes on narrative screens, lacquer framing, and conservation concerns in Edo-period collections.",
      content:
        "The draft compares screen painting techniques, handling protocols, and the challenge of translating sequential imagery for online audiences.",
      categoryId: "cat-art",
      tagIds: ["tag-conservation", "tag-curation"],
      authorId: "usr-005",
      country: "Japan",
      status: "draft",
      likes: 156,
      dislikes: 5,
      updatedAt: formatIso("2026-03-15T13:15:00+07:00"),
      publishedAt: "",
    },
    {
      id: "art-1005",
      title: "Colonial Maps of Indochina",
      summary:
        "A research feature on cartographic power, territorial naming, and how maps shape public memory.",
      content:
        "The article reviews survey maps, annotation systems, and the politics of archival presentation inside colonial-era collections and public history spaces.",
      categoryId: "cat-history",
      tagIds: ["tag-cartography", "tag-trade"],
      authorId: "usr-001",
      country: "France",
      status: "published",
      likes: 267,
      dislikes: 18,
      updatedAt: formatIso("2026-03-10T09:05:00+07:00"),
      publishedAt: formatIso("2025-12-04T04:30:00+07:00"),
    },
    {
      id: "art-1006",
      title: "Royal Court Music Instruments",
      summary:
        "A working draft about ceremonial ensembles, instrument construction, and royal performance traditions.",
      content:
        "The current draft outlines naming conventions, instrument groups, and conservation notes from palace collections, with a focus on performance context.",
      categoryId: "cat-artifact",
      tagIds: ["tag-ritual", "tag-conservation"],
      authorId: "usr-004",
      country: "Vietnam",
      status: "review",
      likes: 198,
      dislikes: 7,
      updatedAt: formatIso("2026-03-25T07:05:00+07:00"),
      publishedAt: "",
    },
  ],
  currentUserId: "usr-004",
  revisions: [
    {
      id: "rev-2001",
      articleId: "art-1003",
      title: "Silk Road Trade Routes",
      content:
        "Expanded the section on maritime links and added more context on exchange through Southeast Asian ports.",
      categoryId: "cat-history",
      country: "China",
      editSummary: "Expanded maritime trade context.",
      status: "pending",
      authorId: "usr-004",
      createdAt: formatIso("2026-03-24T11:00:00+07:00"),
    },
    {
      id: "rev-2002",
      articleId: "art-1006",
      title: "Royal Court Music Instruments",
      content:
        "Added glossary notes for instrument families and clarified ceremonial performance order in the palace setting.",
      categoryId: "cat-artifact",
      country: "Vietnam",
      editSummary: "Added glossary terms and performance order.",
      status: "pending",
      authorId: "usr-004",
      createdAt: formatIso("2026-03-23T14:20:00+07:00"),
    },
  ],
  articleVotes: [
    {
      id: "vote-001",
      articleId: "art-1001",
      userId: "usr-004",
      voteType: "like",
      createdAt: formatIso("2026-03-24T10:30:00+07:00"),
    },
  ],
  notifications: [
    {
      id: "note-001",
      userId: "usr-004",
      title: "Article approved",
      message: "Your latest update to Silk Road Trade Routes was approved by the editorial team.",
      type: "approval",
      createdAt: formatIso("2026-03-24T13:00:00+07:00"),
      read: false,
    },
    {
      id: "note-002",
      userId: "usr-004",
      title: "New vote received",
      message: "A reader reacted to Royal Court Music Instruments.",
      type: "vote",
      createdAt: formatIso("2026-03-23T17:40:00+07:00"),
      read: false,
    },
    {
      id: "note-003",
      userId: "usr-004",
      title: "Article updated by collaborator",
      message: "A collaborator suggested changes for Silk Road Trade Routes.",
      type: "revision",
      createdAt: formatIso("2026-03-22T09:20:00+07:00"),
      read: true,
    },
  ],
};

function getCategoryName(categoryId) {
  return store.categories.find((item) => item.id === categoryId)?.name || "Unassigned";
}

function getUserName(userId) {
  return store.users.find((item) => item.id === userId)?.name || "Unknown user";
}

function getCurrentUser() {
  return store.users.find((item) => item.id === store.currentUserId) || store.users[0];
}

function getTagNames(tagIds = []) {
  return tagIds
    .map((tagId) => store.tags.find((tag) => tag.id === tagId)?.name)
    .filter(Boolean);
}

function getArticleCountByCategory(categoryId) {
  return store.articles.filter((article) => article.categoryId === categoryId).length;
}

function getArticleCountByTag(tagId) {
  return store.articles.filter((article) => article.tagIds.includes(tagId)).length;
}

function getArticleCountByAuthor(authorId) {
  return store.articles.filter((article) => article.authorId === authorId).length;
}

function decorateArticle(article) {
  const currentVote = store.articleVotes.find(
    (vote) => vote.articleId === article.id && vote.userId === store.currentUserId,
  );

  return {
    ...article,
    categoryName: getCategoryName(article.categoryId),
    tagNames: getTagNames(article.tagIds),
    authorName: getUserName(article.authorId),
    reactionTotal: Number(article.likes || 0) + Number(article.dislikes || 0),
    currentUserVote: currentVote?.voteType || "",
  };
}

function decorateRevision(revision) {
  return {
    ...revision,
    authorName: getUserName(revision.authorId),
    categoryName: getCategoryName(revision.categoryId),
  };
}

function getSortedArticles() {
  return store.articles
    .map((article) => decorateArticle(article))
    .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime());
}

function getMonthlyTrend() {
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short" });
  const anchor = new Date("2026-03-25T09:00:00+07:00");
  const months = [];

  for (let offset = 5; offset >= 0; offset -= 1) {
    const date = new Date(anchor.getFullYear(), anchor.getMonth() - offset, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    months.push({
      key,
      month: formatter.format(date),
      articles: 0,
    });
  }

  store.articles.forEach((article) => {
    const date = new Date(article.updatedAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const bucket = months.find((item) => item.key === key);

    if (bucket) {
      bucket.articles += 1;
    }
  });

  return months.map(({ key, ...item }) => item);
}

function buildDashboardOverview() {
  const articles = getSortedArticles();
  const totalReactions = articles.reduce(
    (sum, article) => sum + Number(article.likes || 0) + Number(article.dislikes || 0),
    0,
  );

  return {
    stats: {
      totalUsers: store.users.length,
      totalArticles: store.articles.length,
      totalCategories: store.categories.length,
      totalTags: store.tags.length,
      totalReactions,
    },
    articleStatus: ARTICLE_STATUSES.map((status) => ({
      name: status[0].toUpperCase() + status.slice(1),
      value: store.articles.filter((article) => article.status === status).length,
    })),
    categoryBreakdown: store.categories.map((category) => ({
      name: category.name,
      articles: getArticleCountByCategory(category.id),
    })),
    monthlyActivity: getMonthlyTrend(),
    recentArticles: articles.slice(0, 5),
  };
}

function listCategories() {
  return store.categories
    .map((category) => ({
      ...category,
      articleCount: getArticleCountByCategory(category.id),
    }))
    .sort((left, right) => right.articleCount - left.articleCount || left.name.localeCompare(right.name));
}

function listTags() {
  return store.tags
    .map((tag) => ({
      ...tag,
      articleCount: getArticleCountByTag(tag.id),
    }))
    .sort((left, right) => right.articleCount - left.articleCount || left.name.localeCompare(right.name));
}

function listUsers() {
  return store.users
    .map((user) => ({
      ...user,
      articleCount: getArticleCountByAuthor(user.id),
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

function findArticleOrThrow(articleId) {
  const article = store.articles.find((item) => item.id === articleId);

  if (!article) {
    throw new Error("Article not found.");
  }

  return article;
}

function findCategoryOrThrow(categoryId) {
  const category = store.categories.find((item) => item.id === categoryId);

  if (!category) {
    throw new Error("Category not found.");
  }

  return category;
}

function findTagOrThrow(tagId) {
  const tag = store.tags.find((item) => item.id === tagId);

  if (!tag) {
    throw new Error("Tag not found.");
  }

  return tag;
}

function findUserOrThrow(userId) {
  const user = store.users.find((item) => item.id === userId);

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}

function normalizeName(value, fallback) {
  return String(value || fallback || "")
    .trim()
    .replace(/\s+/g, " ");
}

function sortByNewest(collection, key) {
  return [...collection].sort(
    (left, right) => new Date(right[key]).getTime() - new Date(left[key]).getTime(),
  );
}

function createNotification(entry) {
  const nextNotification = {
    id: buildId("note"),
    read: false,
    createdAt: formatIso(new Date()),
    ...entry,
  };

  store.notifications = [nextNotification, ...store.notifications];
  return nextNotification;
}

export const adminApi = {
  async getDashboardOverview() {
    return wait(buildDashboardOverview());
  },

  async getArticles() {
    return wait(getSortedArticles());
  },

  async getArticle(articleId) {
    return wait(decorateArticle(findArticleOrThrow(articleId)));
  },

  async deleteArticle(articleId) {
    findArticleOrThrow(articleId);
    store.articles = store.articles.filter((article) => article.id !== articleId);
    return wait({ success: true });
  },

  async getCategories() {
    return wait(listCategories());
  },

  async createCategory(payload) {
    const category = {
      id: buildId("cat"),
      name: normalizeName(payload.name, "New category"),
      description: normalizeName(payload.description, ""),
    };

    store.categories = [category, ...store.categories];
    return wait(category);
  },

  async updateCategory(categoryId, payload) {
    const category = findCategoryOrThrow(categoryId);
    category.name = normalizeName(payload.name, category.name);
    category.description = normalizeName(payload.description, category.description);
    return wait(category);
  },

  async deleteCategory(categoryId) {
    findCategoryOrThrow(categoryId);
    store.categories = store.categories.filter((category) => category.id !== categoryId);
    store.articles = store.articles.map((article) =>
      article.categoryId === categoryId
        ? {
            ...article,
            categoryId: "",
            updatedAt: formatIso(new Date()),
          }
        : article,
    );
    return wait({ success: true });
  },

  async getTags() {
    return wait(listTags());
  },

  async createTag(payload) {
    const tag = {
      id: buildId("tag"),
      name: normalizeName(payload.name, "New tag"),
      description: normalizeName(payload.description, ""),
    };

    store.tags = [tag, ...store.tags];
    return wait(tag);
  },

  async updateTag(tagId, payload) {
    const tag = findTagOrThrow(tagId);
    tag.name = normalizeName(payload.name, tag.name);
    tag.description = normalizeName(payload.description, tag.description);
    return wait(tag);
  },

  async deleteTag(tagId) {
    findTagOrThrow(tagId);
    store.tags = store.tags.filter((tag) => tag.id !== tagId);
    store.articles = store.articles.map((article) =>
      article.tagIds.includes(tagId)
        ? {
            ...article,
            tagIds: article.tagIds.filter((item) => item !== tagId),
            updatedAt: formatIso(new Date()),
          }
        : article,
    );
    return wait({ success: true });
  },

  async getUsers() {
    return wait(listUsers());
  },

  async updateUserRole(userId, role) {
    const user = findUserOrThrow(userId);
    user.role = role;
    return wait(user);
  },

  async toggleUserLock(userId) {
    const user = findUserOrThrow(userId);
    user.isLocked = !user.isLocked;
    return wait(user);
  },
};

export const userApi = {
  async getArticles(filters = {}) {
    const keyword = String(filters.keyword || "").trim().toLowerCase();
    const category = String(filters.category || "").trim().toLowerCase();
    const country = String(filters.country || "").trim().toLowerCase();

    const results = getSortedArticles().filter((article) => {
      const matchesPublished = article.status === "published";
      const matchesKeyword = !keyword || article.title.toLowerCase().includes(keyword);
      const matchesCategory =
        !category || category === "all" || article.categoryName.toLowerCase() === category;
      const matchesCountry =
        !country || country === "all" || article.country.toLowerCase() === country;

      return matchesPublished && matchesKeyword && matchesCategory && matchesCountry;
    });

    return wait(results);
  },

  async getArticle(articleId) {
    return wait(decorateArticle(findArticleOrThrow(articleId)));
  },

  async voteArticle(articleId, voteType) {
    const article = findArticleOrThrow(articleId);
    const existingVote = store.articleVotes.find(
      (vote) => vote.articleId === articleId && vote.userId === store.currentUserId,
    );

    if (existingVote?.voteType === "like") {
      article.likes = Math.max(0, Number(article.likes || 0) - 1);
    }

    if (existingVote?.voteType === "dislike") {
      article.dislikes = Math.max(0, Number(article.dislikes || 0) - 1);
    }

    if (existingVote) {
      existingVote.voteType = voteType;
      existingVote.createdAt = formatIso(new Date());
    } else {
      store.articleVotes.push({
        id: buildId("vote"),
        articleId,
        userId: store.currentUserId,
        voteType,
        createdAt: formatIso(new Date()),
      });
    }

    if (voteType === "like") {
      article.likes = Number(article.likes || 0) + 1;
    } else {
      article.dislikes = Number(article.dislikes || 0) + 1;
    }

    createNotification({
      userId: store.currentUserId,
      title: "Vote saved",
      message: `Your ${voteType} vote for ${article.title} was recorded.`,
      type: "vote",
    });

    return wait(decorateArticle(article));
  },

  async createRevision(payload) {
    const baseArticle = payload.articleId ? findArticleOrThrow(payload.articleId) : null;
    const revision = {
      id: buildId("rev"),
      articleId: payload.articleId || buildId("article"),
      title: normalizeName(payload.title, baseArticle?.title || "Untitled article"),
      content: normalizeName(payload.content, baseArticle?.content || ""),
      categoryId: payload.categoryId || baseArticle?.categoryId || "",
      country: payload.country || baseArticle?.country || "",
      editSummary: normalizeName(
        payload.editSummary,
        payload.articleId ? "Article update submitted." : "New article submitted.",
      ),
      status: "pending",
      authorId: store.currentUserId,
      createdAt: formatIso(new Date()),
    };

    store.revisions = [revision, ...store.revisions];
    createNotification({
      userId: store.currentUserId,
      title: "Revision submitted",
      message: `${revision.title} is now waiting for admin review.`,
      type: "revision",
    });

    return wait(decorateRevision(revision));
  },

  async getMyArticles() {
    const currentUser = getCurrentUser();
    return wait(getSortedArticles().filter((article) => article.authorId === currentUser.id));
  },

  async getMyRevisions() {
    return wait(
      sortByNewest(
        store.revisions
          .filter((revision) => revision.authorId === store.currentUserId)
          .map((revision) => decorateRevision(revision)),
        "createdAt",
      ),
    );
  },

  async getNotifications() {
    return wait(
      sortByNewest(
        store.notifications.filter((notification) => notification.userId === store.currentUserId),
        "createdAt",
      ),
    );
  },

  async getProfile() {
    const currentUser = getCurrentUser();

    return wait({
      ...currentUser,
      articleCount: getArticleCountByAuthor(currentUser.id),
      revisionCount: store.revisions.filter((revision) => revision.authorId === currentUser.id).length,
    });
  },

  async getCategories() {
    return wait(listCategories());
  },

  async getCountries() {
    return wait(store.countries);
  },
};
