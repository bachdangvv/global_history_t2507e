const API_BASE = import.meta.env.VITE_ADMIN_API_BASE || "/api/admin";
const USER_API_BASE = import.meta.env.VITE_USER_API_BASE || "/api";

function titleCase(value) {
  return String(value || "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
}

function unwrapObject(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {};
  }

  if (payload.data && typeof payload.data === "object" && !Array.isArray(payload.data)) {
    return payload.data;
  }

  return payload;
}

function unwrapCollection(payload, keys = []) {
  if (Array.isArray(payload)) {
    return payload;
  }

  const root = unwrapObject(payload);

  for (const key of keys) {
    if (Array.isArray(root[key])) {
      return root[key];
    }
  }

  if (Array.isArray(root.items)) {
    return root.items;
  }

  if (Array.isArray(root.results)) {
    return root.results;
  }

  return [];
}

function buildId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function formatTimestamp(dateInput = new Date()) {
  return new Date(dateInput).toISOString();
}

function sortByDate(list, key) {
  return [...list].sort(
    (left, right) => new Date(right[key]).getTime() - new Date(left[key]).getTime(),
  );
}

function syncDerivedState(state) {
  const articleCountByCategory = {};
  const articleCountByCountry = {};
  const articleCountByAuthor = {};

  state.articles.forEach((article) => {
    articleCountByCategory[article.categoryId] =
      (articleCountByCategory[article.categoryId] || 0) + 1;
    articleCountByCountry[article.countryId] =
      (articleCountByCountry[article.countryId] || 0) + 1;
    articleCountByAuthor[article.authorId] =
      (articleCountByAuthor[article.authorId] || 0) + 1;
  });

  state.categories = state.categories.map((category) => ({
    ...category,
    articleCount: articleCountByCategory[category.id] || 0,
  }));

  state.countries = state.countries.map((country) => ({
    ...country,
    articleCount: articleCountByCountry[country.id] || 0,
  }));

  state.users = state.users.map((user) => ({
    ...user,
    articlesCount: articleCountByAuthor[user.id] || 0,
  }));

  return state;
}

function getRecentMonths() {
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short" });
  const months = [];
  const anchor = new Date();

  for (let offset = 5; offset >= 0; offset -= 1) {
    const monthDate = new Date(anchor.getFullYear(), anchor.getMonth() - offset, 1);
    months.push({
      key: `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`,
      label: formatter.format(monthDate),
      articles: 0,
      revisions: 0,
      approvals: 0,
    });
  }

  return months;
}

function bucketByMonth(list, field, collectionKey, base) {
  list.forEach((item) => {
    const date = new Date(item[field]);
    if (Number.isNaN(date.getTime())) {
      return;
    }

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthBucket = base.find((entry) => entry.key === key);

    if (monthBucket) {
      monthBucket[collectionKey] += 1;
    }
  });
}

function createInitialState() {
  return syncDerivedState({
    users: [
      {
        id: "usr-001",
        name: "Ava Nguyen",
        email: "ava.nguyen@example.com",
        role: "admin",
        locked: false,
        articlesCount: 0,
        lastSeen: "2026-03-18T02:15:00.000Z",
        countryId: "country-vn",
      },
      {
        id: "usr-002",
        name: "Liam Pham",
        email: "liam.pham@example.com",
        role: "editor",
        locked: false,
        articlesCount: 0,
        lastSeen: "2026-03-18T01:32:00.000Z",
        countryId: "country-vn",
      },
      {
        id: "usr-003",
        name: "Mia Le",
        email: "mia.le@example.com",
        role: "reviewer",
        locked: false,
        articlesCount: 0,
        lastSeen: "2026-03-17T22:40:00.000Z",
        countryId: "country-fr",
      },
      {
        id: "usr-004",
        name: "Noah Tran",
        email: "noah.tran@example.com",
        role: "contributor",
        locked: false,
        articlesCount: 0,
        lastSeen: "2026-03-17T20:10:00.000Z",
        countryId: "country-vn",
      },
      {
        id: "usr-005",
        name: "Emma Sato",
        email: "emma.sato@example.com",
        role: "contributor",
        locked: true,
        articlesCount: 0,
        lastSeen: "2026-03-16T16:25:00.000Z",
        countryId: "country-jp",
      },
      {
        id: "usr-006",
        name: "Lucas Martin",
        email: "lucas.martin@example.com",
        role: "editor",
        locked: false,
        articlesCount: 0,
        lastSeen: "2026-03-18T00:05:00.000Z",
        countryId: "country-fr",
      },
    ],
    categories: [
      {
        id: "cat-history",
        name: "History",
        description: "Long-form historical research and editorial essays.",
        articleCount: 0,
      },
      {
        id: "cat-artifact",
        name: "Artifact",
        description: "Object profiles, provenance notes, and restoration records.",
        articleCount: 0,
      },
      {
        id: "cat-art",
        name: "Art",
        description: "Artwork interpretation, curatorial framing, and exhibition text.",
        articleCount: 0,
      },
      {
        id: "cat-architecture",
        name: "Architecture",
        description: "Buildings, spatial heritage, and site-specific documentation.",
        articleCount: 0,
      },
    ],
    countries: [
      {
        id: "country-vn",
        name: "Vietnam",
        code: "VN",
        articleCount: 0,
      },
      {
        id: "country-jp",
        name: "Japan",
        code: "JP",
        articleCount: 0,
      },
      {
        id: "country-cn",
        name: "China",
        code: "CN",
        articleCount: 0,
      },
      {
        id: "country-fr",
        name: "France",
        code: "FR",
        articleCount: 0,
      },
      {
        id: "country-kh",
        name: "Cambodia",
        code: "KH",
        articleCount: 0,
      },
    ],
    articles: [
      {
        id: "art-1001",
        title: "Dong Son Bronze Drum Collection",
        summary:
          "A survey of ceremonial bronze drums, their iconography, and how casting methods evolved across northern Vietnam.",
        content:
          "This article traces the material culture of Dong Son bronze drums, with emphasis on ritual use, regional circulation, and the symbolic meaning of starburst motifs.",
        categoryId: "cat-artifact",
        countryId: "country-vn",
        status: "published",
        currentRevisionId: "rev-510",
        likes: 428,
        dislikes: 14,
        authorId: "usr-002",
        updatedAt: "2026-03-17T10:00:00.000Z",
        publishedAt: "2026-02-20T09:00:00.000Z",
      },
      {
        id: "art-1002",
        title: "Imperial Ceramics of Hue",
        summary:
          "A curatorial overview of court ceramics, workshop production, and royal symbolism in the Nguyen era.",
        content:
          "The article maps out glaze palettes, inscriptions, and restoration observations from pieces held in the imperial collection.",
        categoryId: "cat-art",
        countryId: "country-vn",
        status: "review",
        currentRevisionId: "rev-511",
        likes: 311,
        dislikes: 12,
        authorId: "usr-003",
        updatedAt: "2026-03-16T11:20:00.000Z",
        publishedAt: "2026-01-28T07:10:00.000Z",
      },
      {
        id: "art-1003",
        title: "Silk Road Trade Routes",
        summary:
          "An illustrated history of trade corridors, material exchange, and the flow of artistic motifs across Asia.",
        content:
          "This feature connects trade itineraries with ceramics, textiles, and religious manuscripts that moved between imperial courts and port cities.",
        categoryId: "cat-history",
        countryId: "country-cn",
        status: "published",
        currentRevisionId: "rev-512",
        likes: 502,
        dislikes: 20,
        authorId: "usr-004",
        updatedAt: "2026-03-14T15:35:00.000Z",
        publishedAt: "2026-01-11T06:45:00.000Z",
      },
      {
        id: "art-1004",
        title: "Japanese Folding Screens",
        summary:
          "Notes on narrative screens, lacquer framing, and conservation concerns in Edo-period collections.",
        content:
          "The draft compares screen painting techniques, handling protocols, and the challenge of translating sequential imagery for online audiences.",
        categoryId: "cat-art",
        countryId: "country-jp",
        status: "draft",
        currentRevisionId: "rev-513",
        likes: 156,
        dislikes: 5,
        authorId: "usr-005",
        updatedAt: "2026-03-12T13:15:00.000Z",
        publishedAt: "",
      },
      {
        id: "art-1005",
        title: "Colonial Maps of Indochina",
        summary:
          "A research feature on cartographic power, territorial naming, and how maps shape public memory.",
        content:
          "The article reviews survey maps, annotation systems, and the politics of archival presentation within colonial-era collections.",
        categoryId: "cat-history",
        countryId: "country-fr",
        status: "published",
        currentRevisionId: "rev-514",
        likes: 267,
        dislikes: 18,
        authorId: "usr-006",
        updatedAt: "2026-03-10T09:05:00.000Z",
        publishedAt: "2025-12-04T04:30:00.000Z",
      },
      {
        id: "art-1006",
        title: "Court Music Instruments",
        summary:
          "A working draft about ceremonial ensembles, instrument construction, and royal performance traditions.",
        content:
          "The current draft outlines naming conventions, instrument groups, and conservation notes from palace collections.",
        categoryId: "cat-artifact",
        countryId: "country-vn",
        status: "review",
        currentRevisionId: "rev-515",
        likes: 198,
        dislikes: 7,
        authorId: "usr-004",
        updatedAt: "2026-03-18T01:05:00.000Z",
        publishedAt: "",
      },
    ],
    revisions: [
      {
        id: "rev-701",
        articleId: "art-1002",
        articleTitle: "Imperial Ceramics of Hue",
        submittedBy: "usr-004",
        submittedByName: "Noah Tran",
        submittedAt: "2026-03-18T02:40:00.000Z",
        summary: "Expands provenance notes and clarifies kiln references.",
        status: "pending",
        likes: 9,
        dislikes: 1,
        reviewNote: "",
        current: {
          title: "Imperial Ceramics of Hue",
          summary:
            "A curatorial overview of court ceramics, workshop production, and royal symbolism in the Nguyen era.",
          content:
            "The article maps out glaze palettes, inscriptions, and restoration observations from pieces held in the imperial collection.",
          categoryId: "cat-art",
          countryId: "country-vn",
        },
        proposed: {
          title: "Imperial Ceramics of Hue",
          summary:
            "A curatorial overview of court ceramics with expanded provenance notes, court workshop references, and kiln attributions.",
          content:
            "The revised article maps glaze palettes, workshop marks, kiln attributions, and restoration observations from the imperial collection, with added references to archival inventories.",
          categoryId: "cat-art",
          countryId: "country-vn",
        },
      },
      {
        id: "rev-702",
        articleId: "art-1004",
        articleTitle: "Japanese Folding Screens",
        submittedBy: "usr-003",
        submittedByName: "Mia Le",
        submittedAt: "2026-03-17T22:05:00.000Z",
        summary: "Refines the article framing and moves it toward publication.",
        status: "pending",
        likes: 4,
        dislikes: 0,
        reviewNote: "",
        current: {
          title: "Japanese Folding Screens",
          summary:
            "Notes on narrative screens, lacquer framing, and conservation concerns in Edo-period collections.",
          content:
            "The draft compares screen painting techniques, handling protocols, and the challenge of translating sequential imagery for online audiences.",
          categoryId: "cat-art",
          countryId: "country-jp",
        },
        proposed: {
          title: "Japanese Folding Screens and Narrative Space",
          summary:
            "A sharper introduction to narrative screens, lacquer framing, and the conservation concerns shaping Edo-period display strategies.",
          content:
            "The revision compares screen painting techniques, handling protocols, and the challenge of translating sequential imagery for digital audiences, with added notes on viewer movement and spatial reading.",
          categoryId: "cat-art",
          countryId: "country-jp",
        },
      },
      {
        id: "rev-703",
        articleId: "art-1006",
        articleTitle: "Court Music Instruments",
        submittedBy: "usr-002",
        submittedByName: "Liam Pham",
        submittedAt: "2026-03-17T20:50:00.000Z",
        summary: "Adds missing glossary definitions and updates the lead title.",
        status: "pending",
        likes: 6,
        dislikes: 1,
        reviewNote: "",
        current: {
          title: "Court Music Instruments",
          summary:
            "A working draft about ceremonial ensembles, instrument construction, and royal performance traditions.",
          content:
            "The current draft outlines naming conventions, instrument groups, and conservation notes from palace collections.",
          categoryId: "cat-artifact",
          countryId: "country-vn",
        },
        proposed: {
          title: "Royal Court Music Instruments",
          summary:
            "A working draft about ceremonial ensembles, instrument construction, glossary terms, and performance traditions at court.",
          content:
            "The revised draft outlines naming conventions, instrument groups, glossary definitions, and conservation notes from palace collections, with extra context on court performance order.",
          categoryId: "cat-artifact",
          countryId: "country-vn",
        },
      },
      {
        id: "rev-704",
        articleId: "art-1003",
        articleTitle: "Silk Road Trade Routes",
        submittedBy: "usr-006",
        submittedByName: "Lucas Martin",
        submittedAt: "2026-03-16T18:20:00.000Z",
        summary: "Updates the geographic framing and expands Southeast Asia references.",
        status: "pending",
        likes: 7,
        dislikes: 2,
        reviewNote: "",
        current: {
          title: "Silk Road Trade Routes",
          summary:
            "An illustrated history of trade corridors, material exchange, and the flow of artistic motifs across Asia.",
          content:
            "This feature connects trade itineraries with ceramics, textiles, and religious manuscripts that moved between imperial courts and port cities.",
          categoryId: "cat-history",
          countryId: "country-cn",
        },
        proposed: {
          title: "Silk Road Trade Routes",
          summary:
            "An illustrated history of trade corridors, material exchange, and the flow of artistic motifs across Asia and Southeast Asia.",
          content:
            "The updated feature connects trade itineraries with ceramics, textiles, and religious manuscripts moving between imperial courts, maritime ports, and mainland Southeast Asian networks.",
          categoryId: "cat-history",
          countryId: "country-kh",
        },
      },
    ],
    notifications: [
      {
        id: "note-9001",
        title: "Revision queued for approval",
        message: "Noah Tran submitted a revision for Imperial Ceramics of Hue.",
        type: "revision",
        read: false,
        createdAt: "2026-03-18T02:41:00.000Z",
      },
      {
        id: "note-9002",
        title: "User account locked",
        message: "Emma Sato was locked after repeated failed sign-in attempts.",
        type: "user",
        read: false,
        createdAt: "2026-03-17T19:00:00.000Z",
      },
      {
        id: "note-9003",
        title: "New article published",
        message: "Dong Son Bronze Drum Collection passed final review and was published.",
        type: "article",
        read: true,
        createdAt: "2026-03-17T10:02:00.000Z",
      },
      {
        id: "note-9004",
        title: "Category updated",
        message: "The Art category description was refined by Lucas Martin.",
        type: "category",
        read: true,
        createdAt: "2026-03-16T13:30:00.000Z",
      },
    ],
    currentUserId: "usr-004",
    articleVotes: [
      {
        id: "article-vote-001",
        articleId: "art-1001",
        userId: "usr-004",
        value: "like",
        createdAt: "2026-03-18T01:12:00.000Z",
      },
      {
        id: "article-vote-002",
        articleId: "art-1002",
        userId: "usr-004",
        value: "dislike",
        createdAt: "2026-03-18T01:22:00.000Z",
      },
    ],
    revisionVotes: [
      {
        id: "revision-vote-001",
        revisionId: "rev-701",
        userId: "usr-004",
        value: "like",
        createdAt: "2026-03-18T02:55:00.000Z",
      },
    ],
    userNotifications: [
      {
        id: "user-note-001",
        title: "Revision submitted",
        message: "Your update for Imperial Ceramics of Hue is waiting for admin approval.",
        type: "revision",
        read: false,
        createdAt: "2026-03-18T02:42:00.000Z",
      },
      {
        id: "user-note-002",
        title: "Article feedback received",
        message: "Readers are actively engaging with Dong Son Bronze Drum Collection.",
        type: "article",
        read: false,
        createdAt: "2026-03-17T11:00:00.000Z",
      },
      {
        id: "user-note-003",
        title: "Profile activity synced",
        message: "Your writing statistics were refreshed in the dashboard.",
        type: "profile",
        read: true,
        createdAt: "2026-03-16T09:40:00.000Z",
      },
    ],
  });
}

let mockState = createInitialState();

function addNotification({ title, message, type = "system", read = false }) {
  mockState.notifications = [
    {
      id: buildId("note"),
      title,
      message,
      type,
      read,
      createdAt: formatTimestamp(),
    },
    ...mockState.notifications,
  ];
}

function addUserNotification({ title, message, type = "system", read = false }) {
  mockState.userNotifications = [
    {
      id: buildId("user-note"),
      title,
      message,
      type,
      read,
      createdAt: formatTimestamp(),
    },
    ...mockState.userNotifications,
  ];
}

function getCurrentUser() {
  return mockState.users.find((user) => user.id === mockState.currentUserId) || mockState.users[0];
}

function findUserVote(collection, key, targetId) {
  return collection.find(
    (vote) => vote.userId === mockState.currentUserId && vote[key] === targetId,
  );
}

function getUserName(userId) {
  return mockState.users.find((user) => user.id === userId)?.name || "Unknown user";
}

function getCategoryName(categoryId) {
  return (
    mockState.categories.find((category) => category.id === categoryId)?.name || "Uncategorized"
  );
}

function getCountryName(countryId) {
  return mockState.countries.find((country) => country.id === countryId)?.name || "Not assigned";
}

function decorateArticle(article) {
  return {
    ...article,
    authorName: getUserName(article.authorId),
    categoryName: getCategoryName(article.categoryId),
    countryName: getCountryName(article.countryId),
    currentUserVote: findUserVote(mockState.articleVotes, "articleId", article.id)?.value || "",
  };
}

function decorateRevision(revision) {
  return {
    ...revision,
    articleTitle:
      revision.articleTitle ||
      mockState.articles.find((article) => article.id === revision.articleId)?.title ||
      "Untitled article",
    submittedByName: revision.submittedByName || getUserName(revision.submittedBy),
    currentUserVote: findUserVote(mockState.revisionVotes, "revisionId", revision.id)?.value || "",
  };
}

function buildDashboardFromMock() {
  syncDerivedState(mockState);

  const totalLikes = mockState.articles.reduce((sum, article) => sum + Number(article.likes || 0), 0);
  const totalDislikes = mockState.articles.reduce(
    (sum, article) => sum + Number(article.dislikes || 0),
    0,
  );
  const revisionsPending = mockState.revisions.filter(
    (revision) => revision.status === "pending",
  ).length;

  const trends = getRecentMonths();
  bucketByMonth(mockState.articles, "updatedAt", "articles", trends);
  bucketByMonth(mockState.revisions, "submittedAt", "revisions", trends);
  bucketByMonth(
    mockState.revisions.filter((revision) => revision.status === "approved"),
    "reviewedAt",
    "approvals",
    trends,
  );

  const categoryBreakdown = mockState.categories
    .filter((category) => category.articleCount > 0)
    .map((category) => ({
      name: category.name,
      value: category.articleCount,
    }));

  const engagement = [...mockState.articles]
    .sort(
      (left, right) =>
        Number(right.likes || 0) + Number(right.dislikes || 0) -
        (Number(left.likes || 0) + Number(left.dislikes || 0)),
    )
    .slice(0, 5)
    .map((article) => ({
      name: article.title,
      likes: Number(article.likes || 0),
      dislikes: Number(article.dislikes || 0),
    }));

  const recentActivity = sortByDate(
    [
      ...mockState.revisions
        .filter((revision) => revision.status === "pending")
        .map((revision) => ({
          id: revision.id,
          title: `Revision pending: ${revision.articleTitle}`,
          message: revision.summary,
          createdAt: revision.submittedAt,
          tone: "warning",
        })),
      ...mockState.notifications.map((notification) => ({
        id: notification.id,
        title: notification.title,
        message: notification.message,
        createdAt: notification.createdAt,
        tone: notification.read ? "neutral" : "info",
      })),
    ],
    "createdAt",
  ).slice(0, 6);

  return {
    totalUsers: mockState.users.length,
    totalArticles: mockState.articles.length,
    revisionsPending,
    totalLikes,
    totalDislikes,
    trends: trends.map(({ key: _, ...rest }) => rest), // eslint-disable-line no-unused-vars
    categoryBreakdown,
    engagement,
    recentActivity,
  };
}

function buildUserActivity() {
  const currentUser = getCurrentUser();

  return sortByDate(
    [
      ...mockState.revisions
        .filter((revision) => revision.submittedBy === currentUser.id)
        .map((revision) => ({
          id: `activity-revision-${revision.id}`,
          title: `Submitted revision ${revision.id}`,
          message: `Revision created for ${revision.articleTitle}.`,
          createdAt: revision.submittedAt,
          tone: "warning",
        })),
      ...mockState.articleVotes
        .filter((vote) => vote.userId === currentUser.id)
        .map((vote) => ({
          id: `activity-article-vote-${vote.id}`,
          title: `Voted on article ${vote.articleId}`,
          message: `Recorded a ${vote.value} on ${mockState.articles.find((article) => article.id === vote.articleId)?.title || "an article"}.`,
          createdAt: vote.createdAt,
          tone: vote.value === "like" ? "success" : "danger",
        })),
      ...mockState.revisionVotes
        .filter((vote) => vote.userId === currentUser.id)
        .map((vote) => ({
          id: `activity-revision-vote-${vote.id}`,
          title: `Voted on revision ${vote.revisionId}`,
          message: `Recorded a ${vote.value} on revision ${vote.revisionId}.`,
          createdAt: vote.createdAt,
          tone: vote.value === "like" ? "success" : "danger",
        })),
      ...mockState.userNotifications.map((notification) => ({
        id: `activity-notification-${notification.id}`,
        title: notification.title,
        message: notification.message,
        createdAt: notification.createdAt,
        tone: notification.read ? "neutral" : "info",
      })),
    ],
    "createdAt",
  ).slice(0, 10);
}

function normalizeDashboard(payload) {
  const data = unwrapObject(payload);

  return {
    totalUsers: Number(data.totalUsers ?? data.users ?? data.userCount ?? 0),
    totalArticles: Number(data.totalArticles ?? data.articles ?? data.articleCount ?? 0),
    revisionsPending: Number(
      data.revisionsPending ?? data.pendingRevisions ?? data.pending_revision_count ?? 0,
    ),
    totalLikes: Number(data.totalLikes ?? data.likes ?? data.likeCount ?? 0),
    totalDislikes: Number(data.totalDislikes ?? data.dislikes ?? data.dislikeCount ?? 0),
    trends: Array.isArray(data.trends) ? data.trends : [],
    categoryBreakdown: Array.isArray(data.categoryBreakdown) ? data.categoryBreakdown : [],
    engagement: Array.isArray(data.engagement) ? data.engagement : [],
    recentActivity: Array.isArray(data.recentActivity) ? data.recentActivity : [],
  };
}

function normalizeArticle(article) {
  return {
    id: article.id ?? article.article_id ?? article.articleId ?? buildId("article"),
    title: article.title ?? article.name ?? "Untitled article",
    summary: article.summary ?? article.excerpt ?? article.description ?? "",
    content: article.content ?? article.body ?? "",
    categoryId: article.categoryId ?? article.category_id ?? article.category?.id ?? "",
    categoryName: article.categoryName ?? article.category_name ?? article.category?.name ?? "",
    countryId: article.countryId ?? article.country_id ?? article.country?.id ?? "",
    countryName: article.countryName ?? article.country_name ?? article.country?.name ?? "",
    status: article.status ?? article.reviewStatus ?? "draft",
    currentRevisionId:
      article.currentRevisionId ?? article.current_revision_id ?? article.currentRevisionID ?? "",
    likes: Number(article.likes ?? article.like_count ?? 0),
    dislikes: Number(article.dislikes ?? article.dislike_count ?? 0),
    currentUserVote: article.currentUserVote ?? article.current_user_vote ?? "",
    authorId: article.authorId ?? article.author_id ?? article.author?.id ?? "",
    authorName: article.authorName ?? article.author_name ?? article.author?.name ?? "",
    updatedAt: article.updatedAt ?? article.updated_at ?? article.modified_at ?? formatTimestamp(),
    publishedAt: article.publishedAt ?? article.published_at ?? "",
  };
}

function normalizeRevision(revision) {
  return {
    id: revision.id ?? revision.revision_id ?? revision.revisionId ?? buildId("revision"),
    articleId: revision.articleId ?? revision.article_id ?? revision.article?.id ?? "",
    articleTitle:
      revision.articleTitle ?? revision.article_title ?? revision.article?.title ?? "Untitled article",
    submittedBy: revision.submittedBy ?? revision.submitted_by ?? revision.user_id ?? "",
    submittedByName:
      revision.submittedByName ??
      revision.submitted_by_name ??
      revision.user?.name ??
      revision.author?.name ??
      "",
    submittedAt:
      revision.submittedAt ?? revision.submitted_at ?? revision.created_at ?? formatTimestamp(),
    summary: revision.summary ?? revision.description ?? revision.note ?? "",
    status: revision.status ?? "pending",
    likes: Number(revision.likes ?? revision.like_count ?? 0),
    dislikes: Number(revision.dislikes ?? revision.dislike_count ?? 0),
    currentUserVote: revision.currentUserVote ?? revision.current_user_vote ?? "",
    reviewNote: revision.reviewNote ?? revision.review_note ?? "",
    current: {
      title: revision.current?.title ?? revision.current_title ?? revision.previous_title ?? "",
      summary:
        revision.current?.summary ?? revision.current_summary ?? revision.previous_summary ?? "",
      content:
        revision.current?.content ?? revision.current_content ?? revision.previous_content ?? "",
      categoryId:
        revision.current?.categoryId ??
        revision.current?.category_id ??
        revision.previous_category_id ??
        "",
      countryId:
        revision.current?.countryId ??
        revision.current?.country_id ??
        revision.previous_country_id ??
        "",
    },
    proposed: {
      title: revision.proposed?.title ?? revision.proposed_title ?? revision.title ?? "",
      summary:
        revision.proposed?.summary ?? revision.proposed_summary ?? revision.summary ?? "",
      content:
        revision.proposed?.content ?? revision.proposed_content ?? revision.content ?? "",
      categoryId:
        revision.proposed?.categoryId ??
        revision.proposed?.category_id ??
        revision.category_id ??
        "",
      countryId:
        revision.proposed?.countryId ??
        revision.proposed?.country_id ??
        revision.country_id ??
        "",
    },
    reviewedAt: revision.reviewedAt ?? revision.reviewed_at ?? "",
  };
}

function normalizeUser(user) {
  return {
    id: user.id ?? user.user_id ?? user.userId ?? buildId("user"),
    name: user.name ?? user.full_name ?? user.username ?? "Unknown user",
    email: user.email ?? "",
    role: user.role ?? "contributor",
    locked: Boolean(user.locked ?? user.is_locked ?? false),
    articlesCount: Number(user.articlesCount ?? user.article_count ?? 0),
    lastSeen: user.lastSeen ?? user.last_seen ?? user.updated_at ?? formatTimestamp(),
    countryId: user.countryId ?? user.country_id ?? user.country?.id ?? "",
    countryName: user.countryName ?? user.country_name ?? user.country?.name ?? "",
  };
}

function normalizeCategory(category) {
  return {
    id: category.id ?? category.category_id ?? category.categoryId ?? buildId("category"),
    name: category.name ?? titleCase(category.slug ?? "Untitled"),
    description: category.description ?? "",
    articleCount: Number(category.articleCount ?? category.article_count ?? 0),
  };
}

function normalizeCountry(country) {
  return {
    id: country.id ?? country.country_id ?? country.countryId ?? buildId("country"),
    name: country.name ?? "Unknown country",
    code: String(country.code ?? country.iso_code ?? "").toUpperCase(),
    articleCount: Number(country.articleCount ?? country.article_count ?? 0),
  };
}

function normalizeNotification(notification) {
  return {
    id: notification.id ?? notification.notification_id ?? buildId("notification"),
    title: notification.title ?? "System notification",
    message: notification.message ?? notification.body ?? "",
    type: notification.type ?? "system",
    read: Boolean(notification.read ?? notification.is_read ?? false),
    createdAt:
      notification.createdAt ?? notification.created_at ?? notification.updated_at ?? formatTimestamp(),
  };
}

async function request(path, { method = "GET", body, base = API_BASE } = {}) {
  const response = await fetch(`${base}${path}`, {
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return null;
  }

  return response.json();
}

async function withFallback(liveHandler, mockHandler) {
  try {
    return {
      data: await liveHandler(),
      source: "live",
    };
  } catch (error) {
    return {
      data: mockHandler(),
      source: "mock",
      error,
    };
  }
}

export const adminApi = {
  async getDashboard() {
    return withFallback(
      async () => normalizeDashboard(await request("/dashboard")),
      () => buildDashboardFromMock(),
    );
  },

  async getArticles() {
    return withFallback(
      async () =>
        unwrapCollection(await request("/articles"), ["articles"]).map((article) =>
          normalizeArticle(article),
        ),
      () => mockState.articles.map((article) => decorateArticle(article)),
    );
  },

  async getArticle(articleId) {
    return withFallback(
      async () => normalizeArticle(await request(`/articles/${articleId}`)),
      () => {
        const article = mockState.articles.find((entry) => entry.id === articleId);
        return article ? decorateArticle(article) : null;
      },
    );
  },

  async deleteArticle(articleId) {
    return withFallback(
      async () => request(`/articles/${articleId}`, { method: "DELETE" }),
      () => {
        const article = mockState.articles.find((entry) => entry.id === articleId);
        mockState.articles = mockState.articles.filter((entry) => entry.id !== articleId);
        mockState.revisions = mockState.revisions.filter((revision) => revision.articleId !== articleId);
        syncDerivedState(mockState);

        if (article) {
          addNotification({
            title: "Article deleted",
            message: `${article.title} was removed from the admin dashboard.`,
            type: "article",
          });
        }

        return { success: true };
      },
    );
  },

  async getPendingRevisions() {
    return withFallback(
      async () =>
        unwrapCollection(await request("/revisions/pending"), ["revisions"]).map((revision) =>
          normalizeRevision(revision),
        ),
      () =>
        mockState.revisions
          .filter((revision) => revision.status === "pending")
          .map((revision) => decorateRevision(revision)),
    );
  },

  async approveRevision(revisionId, reviewNote = "") {
    return withFallback(
      async () => request(`/revisions/${revisionId}/approve`, { method: "PUT" }),
      () => {
        const revision = mockState.revisions.find((entry) => entry.id === revisionId);

        if (!revision) {
          throw new Error("Revision not found.");
        }

        revision.status = "approved";
        revision.reviewNote = reviewNote;
        revision.reviewedAt = formatTimestamp();

        let article = mockState.articles.find((entry) => entry.id === revision.articleId);

        if (article) {
          article.title = revision.proposed.title || article.title;
          article.summary = revision.proposed.summary || article.summary;
          article.content = revision.proposed.content || article.content;
          article.categoryId = revision.proposed.categoryId || article.categoryId;
          article.countryId = revision.proposed.countryId || article.countryId;
          article.currentRevisionId = revision.id;
          article.status = "published";
          article.updatedAt = revision.reviewedAt;
          article.publishedAt = article.publishedAt || revision.reviewedAt;
        } else {
          article = {
            id: revision.articleId || buildId("art"),
            title: revision.proposed.title || revision.articleTitle || "Untitled article",
            summary: revision.proposed.summary || "",
            content: revision.proposed.content || "",
            categoryId: revision.proposed.categoryId || "",
            countryId: revision.proposed.countryId || "",
            status: "published",
            currentRevisionId: revision.id,
            likes: 0,
            dislikes: 0,
            authorId: revision.submittedBy || mockState.currentUserId,
            updatedAt: revision.reviewedAt,
            publishedAt: revision.reviewedAt,
          };
          mockState.articles = [article, ...mockState.articles];
          revision.articleId = article.id;
          revision.articleTitle = article.title;
        }

        syncDerivedState(mockState);
        addNotification({
          title: "Revision approved",
          message: `${revision.articleTitle} is now synced to revision ${revision.id}.`,
          type: "revision",
        });

        if (revision.submittedBy === mockState.currentUserId) {
          addUserNotification({
            title: "Revision approved",
            message: `${revision.articleTitle} was approved and is now the current article version.`,
            type: "revision",
          });
        }

        return decorateRevision(revision);
      },
    );
  },

  async rejectRevision(revisionId, reviewNote = "") {
    return withFallback(
      async () => request(`/revisions/${revisionId}/reject`, { method: "PUT" }),
      () => {
        const revision = mockState.revisions.find((entry) => entry.id === revisionId);

        if (!revision) {
          throw new Error("Revision not found.");
        }

        revision.status = "rejected";
        revision.reviewNote = reviewNote;
        revision.reviewedAt = formatTimestamp();

        addNotification({
          title: "Revision rejected",
          message: `${revision.articleTitle} was sent back for another edit cycle.`,
          type: "revision",
        });

        if (revision.submittedBy === mockState.currentUserId) {
          addUserNotification({
            title: "Revision rejected",
            message: `${revision.articleTitle} needs another editing pass before approval.`,
            type: "revision",
          });
        }

        return decorateRevision(revision);
      },
    );
  },

  async getUsers() {
    return withFallback(
      async () => unwrapCollection(await request("/users"), ["users"]).map((user) => normalizeUser(user)),
      () =>
        mockState.users.map((user) => ({
          ...user,
          countryName: getCountryName(user.countryId),
        })),
    );
  },

  async updateUserRole(userId, role) {
    return withFallback(
      async () => request(`/users/${userId}/role`, { method: "PUT", body: { role } }),
      () => {
        const user = mockState.users.find((entry) => entry.id === userId);

        if (!user) {
          throw new Error("User not found.");
        }

        user.role = role;
        addNotification({
          title: "Role updated",
          message: `${user.name} is now assigned the ${titleCase(role)} role.`,
          type: "user",
        });

        return {
          ...user,
          countryName: getCountryName(user.countryId),
        };
      },
    );
  },

  async lockUser(userId, locked) {
    return withFallback(
      async () => request(`/users/${userId}/lock`, { method: "PUT", body: { locked } }),
      () => {
        const user = mockState.users.find((entry) => entry.id === userId);

        if (!user) {
          throw new Error("User not found.");
        }

        user.locked = locked;
        addNotification({
          title: locked ? "User locked" : "User restored",
          message: `${user.name} was ${locked ? "locked" : "unlocked"} by an admin.`,
          type: "user",
        });

        return {
          ...user,
          countryName: getCountryName(user.countryId),
        };
      },
    );
  },

  async getCategories() {
    return withFallback(
      async () =>
        unwrapCollection(await request("/categories"), ["categories"]).map((category) =>
          normalizeCategory(category),
        ),
      () => mockState.categories.map((category) => ({ ...category })),
    );
  },

  async createCategory(payload) {
    return withFallback(
      async () => request("/categories", { method: "POST", body: payload }),
      () => {
        const nextCategory = {
          id: buildId(`cat-${slugify(payload.name) || "category"}`),
          name: payload.name,
          description: payload.description || "",
          articleCount: 0,
        };

        mockState.categories = [nextCategory, ...mockState.categories];
        addNotification({
          title: "Category created",
          message: `${payload.name} is now available for article assignment.`,
          type: "category",
        });

        return nextCategory;
      },
    );
  },

  async updateCategory(categoryId, payload) {
    return withFallback(
      async () => request(`/categories/${categoryId}`, { method: "PUT", body: payload }),
      () => {
        mockState.categories = mockState.categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                name: payload.name,
                description: payload.description || "",
              }
            : category,
        );

        addNotification({
          title: "Category updated",
          message: `${payload.name} was updated in category management.`,
          type: "category",
        });

        return mockState.categories.find((category) => category.id === categoryId) || null;
      },
    );
  },

  async deleteCategory(categoryId) {
    return withFallback(
      async () => request(`/categories/${categoryId}`, { method: "DELETE" }),
      () => {
        const category = mockState.categories.find((entry) => entry.id === categoryId);
        mockState.categories = mockState.categories.filter((entry) => entry.id !== categoryId);
        mockState.articles = mockState.articles.map((article) =>
          article.categoryId === categoryId
            ? {
                ...article,
                categoryId: "",
                updatedAt: formatTimestamp(),
              }
            : article,
        );

        syncDerivedState(mockState);

        if (category) {
          addNotification({
            title: "Category deleted",
            message: `${category.name} was removed and affected articles were uncategorized.`,
            type: "category",
          });
        }

        return { success: true };
      },
    );
  },

  async getCountries() {
    return withFallback(
      async () =>
        unwrapCollection(await request("/countries"), ["countries"]).map((country) =>
          normalizeCountry(country),
        ),
      () => mockState.countries.map((country) => ({ ...country })),
    );
  },

  async createCountry(payload) {
    return withFallback(
      async () => request("/countries", { method: "POST", body: payload }),
      () => {
        const nextCountry = {
          id: buildId(`country-${slugify(payload.code || payload.name) || "country"}`),
          name: payload.name,
          code: String(payload.code || "").toUpperCase(),
          articleCount: 0,
        };

        mockState.countries = [nextCountry, ...mockState.countries];
        addNotification({
          title: "Country added",
          message: `${payload.name} is now available for article metadata.`,
          type: "country",
        });

        return nextCountry;
      },
    );
  },

  async getNotifications() {
    return withFallback(
      async () =>
        unwrapCollection(await request("/notifications"), ["notifications"]).map((notification) =>
          normalizeNotification(notification),
        ),
      () => sortByDate(mockState.notifications, "createdAt"),
    );
  },

  async markNotificationRead(notificationId) {
    return withFallback(
      async () => request(`/notifications/${notificationId}/read`, { method: "PUT" }),
      () => {
        mockState.notifications = mockState.notifications.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                read: true,
              }
            : notification,
        );

        return (
          mockState.notifications.find((notification) => notification.id === notificationId) || null
        );
      },
    );
  },
};

function applyVote(target, collection, voteKey, targetId, value) {
  const existingVote = collection.find(
    (vote) => vote.userId === mockState.currentUserId && vote[voteKey] === targetId,
  );

  if (existingVote) {
    if (existingVote.value === "like") {
      target.likes = Math.max(0, Number(target.likes || 0) - 1);
    }

    if (existingVote.value === "dislike") {
      target.dislikes = Math.max(0, Number(target.dislikes || 0) - 1);
    }

    existingVote.value = value;
    existingVote.createdAt = formatTimestamp();
  } else {
    collection.push({
      id: buildId(`${voteKey}-vote`),
      [voteKey]: targetId,
      userId: mockState.currentUserId,
      value,
      createdAt: formatTimestamp(),
    });
  }

  if (value === "like") {
    target.likes = Number(target.likes || 0) + 1;
  } else {
    target.dislikes = Number(target.dislikes || 0) + 1;
  }
}

export const userApi = {
  async getArticles() {
    return withFallback(
      async () =>
        unwrapCollection(await request("/articles", { base: USER_API_BASE }), ["articles"]).map(
          (article) => normalizeArticle(article),
        ),
      () => mockState.articles.map((article) => decorateArticle(article)),
    );
  },

  async getArticle(articleId) {
    return withFallback(
      async () =>
        normalizeArticle(await request(`/articles/${articleId}`, { base: USER_API_BASE })),
      () => {
        const article = mockState.articles.find((entry) => entry.id === articleId);
        return article ? decorateArticle(article) : null;
      },
    );
  },

  async voteArticle(articleId, value) {
    return withFallback(
      async () =>
        request(`/articles/${articleId}/vote`, {
          method: "POST",
          body: { value },
          base: USER_API_BASE,
        }),
      () => {
        const article = mockState.articles.find((entry) => entry.id === articleId);

        if (!article) {
          throw new Error("Article not found.");
        }

        applyVote(article, mockState.articleVotes, "articleId", articleId, value);
        addUserNotification({
          title: "Article vote recorded",
          message: `Your ${value} vote for ${article.title} has been saved.`,
          type: "article",
        });

        return decorateArticle(article);
      },
    );
  },

  async createRevision(payload) {
    return withFallback(
      async () => request("/revisions", { method: "POST", body: payload, base: USER_API_BASE }),
      () => {
        const baseArticle = mockState.articles.find((article) => article.id === payload.articleId);
        const revision = {
          id: buildId("rev"),
          articleId: payload.articleId || buildId("art"),
          articleTitle: payload.title || baseArticle?.title || "Untitled article",
          submittedBy: mockState.currentUserId,
          submittedByName: getCurrentUser().name,
          submittedAt: formatTimestamp(),
          summary: payload.summary || "New revision submitted from the user dashboard.",
          status: "pending",
          likes: 0,
          dislikes: 0,
          reviewNote: "",
          current: {
            title: baseArticle?.title || "",
            summary: baseArticle?.summary || "",
            content: baseArticle?.content || "",
            categoryId: baseArticle?.categoryId || payload.categoryId || "",
            countryId: baseArticle?.countryId || payload.countryId || "",
          },
          proposed: {
            title: payload.title || baseArticle?.title || "Untitled article",
            summary: payload.summary || baseArticle?.summary || "",
            content: payload.content || baseArticle?.content || "",
            categoryId: payload.categoryId || baseArticle?.categoryId || "",
            countryId: payload.countryId || baseArticle?.countryId || "",
          },
        };

        mockState.revisions = [revision, ...mockState.revisions];
        addNotification({
          title: "New revision submitted",
          message: `${revision.submittedByName} submitted ${revision.id} for approval.`,
          type: "revision",
        });
        addUserNotification({
          title: "Revision submitted",
          message: `${revision.articleTitle} is now waiting for admin approval.`,
          type: "revision",
        });

        return decorateRevision(revision);
      },
    );
  },

  async getRevisionFeed() {
    return withFallback(
      async () => {
        const articles = unwrapCollection(await request("/articles", { base: USER_API_BASE }), [
          "articles",
        ]);

        return articles.flatMap((article) => {
          const nestedRevisions =
            article.revisions || article.pendingRevisions || article.pending_revisions || [];

          if (!Array.isArray(nestedRevisions)) {
            return [];
          }

          return nestedRevisions.map((revision) =>
            normalizeRevision({
              ...revision,
              articleId: revision.articleId ?? revision.article_id ?? article.id,
              articleTitle:
                revision.articleTitle ?? revision.article_title ?? article.title ?? "Untitled article",
            }),
          );
        });
      },
      () => sortByDate(mockState.revisions.map((revision) => decorateRevision(revision)), "submittedAt"),
    );
  },

  async voteRevision(revisionId, value) {
    return withFallback(
      async () =>
        request(`/revisions/${revisionId}/vote`, {
          method: "POST",
          body: { value },
          base: USER_API_BASE,
        }),
      () => {
        const revision = mockState.revisions.find((entry) => entry.id === revisionId);

        if (!revision) {
          throw new Error("Revision not found.");
        }

        applyVote(revision, mockState.revisionVotes, "revisionId", revisionId, value);
        addUserNotification({
          title: "Revision vote recorded",
          message: `Your ${value} vote for ${revision.id} has been saved.`,
          type: "revision",
        });

        return decorateRevision(revision);
      },
    );
  },

  async getMyProfile() {
    return withFallback(
      async () => {
        const profile = normalizeUser(await request("/users/me", { base: USER_API_BASE }));
        return {
          ...profile,
          activity: unwrapCollection(profile.activity || [], []),
        };
      },
      () => {
        const currentUser = getCurrentUser();
        const myArticles = mockState.articles.filter((article) => article.authorId === currentUser.id);
        const myRevisions = mockState.revisions.filter((revision) => revision.submittedBy === currentUser.id);

        return {
          ...currentUser,
          countryName: getCountryName(currentUser.countryId),
          stats: {
            totalArticles: myArticles.length,
            totalRevisions: myRevisions.length,
            totalArticleVotes: mockState.articleVotes.filter(
              (vote) => vote.userId === currentUser.id,
            ).length,
            totalRevisionVotes: mockState.revisionVotes.filter(
              (vote) => vote.userId === currentUser.id,
            ).length,
          },
          activity: buildUserActivity(),
        };
      },
    );
  },

  async getMyArticles() {
    return withFallback(
      async () =>
        unwrapCollection(await request("/users/me/articles", { base: USER_API_BASE }), [
          "articles",
        ]).map((article) => normalizeArticle(article)),
      () =>
        mockState.articles
          .filter((article) => article.authorId === mockState.currentUserId)
          .map((article) => decorateArticle(article)),
    );
  },

  async getNotifications() {
    return withFallback(
      async () =>
        unwrapCollection(await request("/notifications", { base: USER_API_BASE }), [
          "notifications",
        ]).map((notification) => normalizeNotification(notification)),
      () => sortByDate(mockState.userNotifications, "createdAt"),
    );
  },

  async markNotificationRead(notificationId) {
    return withFallback(
      async () =>
        request(`/notifications/${notificationId}/read`, {
          method: "PUT",
          base: USER_API_BASE,
        }),
      () => {
        mockState.userNotifications = mockState.userNotifications.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                read: true,
              }
            : notification,
        );

        return (
          mockState.userNotifications.find((notification) => notification.id === notificationId) ||
          null
        );
      },
    );
  },
};
