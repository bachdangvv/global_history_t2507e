export const USER_ROLE_OPTIONS = ["Admin", "Contributor"];

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

const userStore = {
  currentUserId: 7,
  users: [
    {
      id: 7,
      username: "linh.nguyen",
      email: "linh.nguyen@globalhistory.org",
      avatar: "LN",
      is_admin: false,
      is_locked: false,
      last_active_at: formatIso("2026-03-26T09:10:00+07:00"),
      bio: "Researcher focused on maritime exchange, public history, and editorial collaboration.",
      created_at: formatIso("2024-05-18T09:20:00+07:00"),
      view_count: 8420,
      like_count: 184,
      dislike_count: 11,
    },
    {
      id: 2,
      username: "minh.tran",
      email: "minh.tran@globalhistory.org",
      avatar: "MT",
      is_admin: false,
      is_locked: false,
      last_active_at: formatIso("2026-03-25T18:20:00+07:00"),
      bio: "Editor covering maritime archives and material culture collections.",
      created_at: formatIso("2024-01-12T09:20:00+07:00"),
      view_count: 6650,
      like_count: 131,
      dislike_count: 9,
    },
    {
      id: 3,
      username: "anh.le",
      email: "anh.le@globalhistory.org",
      avatar: "AL",
      is_admin: false,
      is_locked: false,
      last_active_at: formatIso("2026-03-26T07:35:00+07:00"),
      bio: "Contributor for East and Southeast Asian exchange networks.",
      created_at: formatIso("2024-02-08T10:40:00+07:00"),
      view_count: 7012,
      like_count: 152,
      dislike_count: 14,
    },
    {
      id: 4,
      username: "thu.pham",
      email: "thu.pham@globalhistory.org",
      avatar: "TP",
      is_admin: true,
      is_locked: false,
      last_active_at: formatIso("2026-03-26T11:05:00+07:00"),
      bio: "Moderator supporting edits, approvals, and contributor onboarding.",
      created_at: formatIso("2023-11-04T08:15:00+07:00"),
      view_count: 5930,
      like_count: 98,
      dislike_count: 6,
    },
  ],
  topics: [
    { id: 11, name: "Maritime trade", slug: "maritime-trade", description: "Ports, routes, and exchange networks." },
    { id: 12, name: "Art and objects", slug: "art-and-objects", description: "Material culture and collections." },
    { id: 13, name: "Religious movements", slug: "religious-movements", description: "Sacred routes, rituals, and institutions." },
  ],
  historicalEvents: [
    {
      id: 201,
      creator_id: 3,
      title: "Expansion of the Maritime Silk Road",
      slug: "maritime-silk-road-expansion",
      summary: "A long-running network linking East and Southeast Asia to South Asia and beyond.",
      event_year: 1400,
      event_date: "1400-01-01",
      created_at: formatIso("2024-06-11T09:00:00+07:00"),
      reviewed_at: formatIso("2024-06-15T13:00:00+07:00"),
      reviewed_by: 4,
      current_edit_id: 306,
    },
    {
      id: 202,
      creator_id: 2,
      title: "Rise of Hue court ceramic workshops",
      slug: "hue-court-ceramic-workshops",
      summary: "An overview of imperial ceramic production and decorative systems in central Vietnam.",
      event_year: 1802,
      event_date: "1802-06-01",
      created_at: formatIso("2024-07-02T10:15:00+07:00"),
      reviewed_at: formatIso("2024-07-09T15:30:00+07:00"),
      reviewed_by: 4,
      current_edit_id: 307,
    },
  ],
  eventArticles: [
    { event_id: 201, article_id: 101 },
    { event_id: 202, article_id: 102 },
  ],
  eventTopics: [
    { event_id: 201, topic_id: 11 },
    { event_id: 202, topic_id: 12 },
  ],
  articles: [
    {
      id: 101,
      author_id: 7,
      title: "Ports that connected the Maritime Silk Road",
      slug: "ports-maritime-silk-road",
      summary: "A guide to port cities that linked trade, religion, and material exchange across Asia.",
      status: "published",
      content:
        "Port cities such as Hoi An and Malacca worked as archives of movement. Their docks, warehouses, and multilingual quarters connected merchants, pilgrims, and artisans through everyday routines of storage, bargaining, and ritual exchange.",
      current_edit_id: 301,
      thumbnail: "Ledger fragment and customs seal",
      view_count: 1420,
      like_count: 214,
      dislike_count: 12,
      created_at: formatIso("2025-11-10T09:00:00+07:00"),
      updated_at: formatIso("2026-03-18T08:45:00+07:00"),
    },
    {
      id: 102,
      author_id: 2,
      title: "Imperial ceramics of Hue",
      slug: "imperial-ceramics-of-hue",
      summary: "Court workshops, production systems, and decorative choices in Nguyen-era ceramics.",
      status: "published",
      content:
        "Hue court ceramics reveal how ritual demand, imperial symbolism, and technical specialization shaped finished objects. Workshop records show a dense relationship between court need and local adaptation.",
      current_edit_id: 302,
      thumbnail: "Court bowl with blue enamel detailing",
      view_count: 980,
      like_count: 167,
      dislike_count: 8,
      created_at: formatIso("2025-09-12T10:30:00+07:00"),
      updated_at: formatIso("2026-03-11T14:15:00+07:00"),
    },
    {
      id: 103,
      author_id: 3,
      title: "Pilgrimage routes and sacred geographies",
      slug: "pilgrimage-routes-sacred-geographies",
      summary: "How devotional travel shaped memory, landscape, and exchange networks.",
      status: "review",
      content:
        "Pilgrimage routes preserve movement patterns, sacred economies, and local interpretations of distant holy sites. They can be read as archives of repeated ritual motion and public memory.",
      current_edit_id: 303,
      thumbnail: "Illustrated route map of shrines and monasteries",
      view_count: 731,
      like_count: 94,
      dislike_count: 4,
      created_at: formatIso("2026-01-15T11:50:00+07:00"),
      updated_at: formatIso("2026-03-19T07:20:00+07:00"),
    },
  ],
  articleTopics: [
    { article_id: 101, topic_id: 11 },
    { article_id: 101, topic_id: 12 },
    { article_id: 102, topic_id: 12 },
    { article_id: 103, topic_id: 13 },
  ],
  edits: [
    {
      id: 301,
      editor_id: 7,
      editable_id: 101,
      editable_type: "article",
      title: "Ports that connected the Maritime Silk Road",
      summary: "Expanded the section on warehouse districts and multilingual merchant records.",
      status: "approved",
      content: "This approved edit deepens the relationship between port governance and multilingual documentation.",
      thumbnail: "Ledger fragment and customs seal",
      created_at: formatIso("2026-03-15T12:30:00+07:00"),
      reviewed_at: formatIso("2026-03-18T08:45:00+07:00"),
      reviewed_by: 4,
      upvote_count: 46,
      downvote_count: 3,
    },
    {
      id: 302,
      editor_id: 2,
      editable_id: 102,
      editable_type: "article",
      title: "Imperial ceramics of Hue",
      summary: "Clarified workshop hierarchy and added more detail on enamel techniques.",
      status: "approved",
      content: "The update reorganizes the workshop section and highlights distinctions between commissions and kiln clusters.",
      thumbnail: "Workshop shelves and glaze samples",
      created_at: formatIso("2026-03-08T09:00:00+07:00"),
      reviewed_at: formatIso("2026-03-11T14:15:00+07:00"),
      reviewed_by: 4,
      upvote_count: 29,
      downvote_count: 2,
    },
    {
      id: 303,
      editor_id: 7,
      editable_id: 103,
      editable_type: "article",
      title: "Pilgrimage routes and sacred geographies",
      summary: "Submitted a comparison of route mapping and devotional economies.",
      status: "pending",
      content: "This pending edit adds a comparative section on lodging houses, offerings, and ritual travel.",
      thumbnail: "Temple road and route marker",
      created_at: formatIso("2026-03-24T10:25:00+07:00"),
      reviewed_at: "",
      reviewed_by: null,
      upvote_count: 18,
      downvote_count: 1,
    },
    {
      id: 304,
      editor_id: 3,
      editable_id: 101,
      editable_type: "article",
      title: "Ports that connected the Maritime Silk Road",
      summary: "Suggested a short note on monsoon scheduling and convoy timing.",
      status: "pending",
      content: "The edit frames monsoon timing as an organizing rhythm for port operations and merchant planning.",
      thumbnail: "Annotated seasonal route chart",
      created_at: formatIso("2026-03-22T15:40:00+07:00"),
      reviewed_at: "",
      reviewed_by: null,
      upvote_count: 12,
      downvote_count: 2,
    },
    {
      id: 306,
      editor_id: 3,
      editable_id: 201,
      editable_type: "historical_event",
      title: "Expansion of the Maritime Silk Road",
      summary: "Updated the event summary with a wider emphasis on intermediary ports.",
      status: "approved",
      content: "The event page now emphasizes intermediary ports as cultural brokers rather than simple stops.",
      thumbnail: "Event timeline with coastal nodes",
      created_at: formatIso("2026-03-09T13:10:00+07:00"),
      reviewed_at: formatIso("2026-03-13T08:40:00+07:00"),
      reviewed_by: 4,
      upvote_count: 33,
      downvote_count: 3,
    },
    {
      id: 307,
      editor_id: 7,
      editable_id: 202,
      editable_type: "historical_event",
      title: "Rise of Hue court ceramic workshops",
      summary: "Proposed a new paragraph on workshop labor specialization and court demand.",
      status: "pending",
      content: "This event edit ties specialized labor and glaze preparation to changing court demand.",
      thumbnail: "Workshop interior with stacked ceramics",
      created_at: formatIso("2026-03-25T08:55:00+07:00"),
      reviewed_at: "",
      reviewed_by: null,
      upvote_count: 9,
      downvote_count: 0,
    },
  ],
  articleVotes: [
    { user_id: 7, article_id: 101, vote_type: "like", created_at: formatIso("2026-03-24T10:30:00+07:00") },
  ],
  editVotes: [
    { user_id: 7, edit_id: 304, vote_type: "upvote", created_at: formatIso("2026-03-25T09:10:00+07:00") },
  ],
  notifications: [
    {
      id: 901,
      user_id: 7,
      actor_id: 4,
      related_id: 303,
      related_type: "edit",
      title: "Edit queued for review",
      message: "Your update to Pilgrimage routes and sacred geographies is now pending moderation.",
      is_read: false,
      created_at: formatIso("2026-03-24T10:30:00+07:00"),
    },
    {
      id: 902,
      user_id: 7,
      actor_id: 3,
      related_id: 101,
      related_type: "article",
      title: "New reaction on your article",
      message: "A reader supported Ports that connected the Maritime Silk Road.",
      is_read: false,
      created_at: formatIso("2026-03-25T14:20:00+07:00"),
    },
    {
      id: 903,
      user_id: 7,
      actor_id: 4,
      related_id: 301,
      related_type: "edit",
      title: "Edit approved",
      message: "Your approved edit is now reflected in the live article detail.",
      is_read: true,
      created_at: formatIso("2026-03-18T08:50:00+07:00"),
    },
  ],
  comments: [
    {
      id: 701,
      content: "The warehouse section really helps explain why port governance mattered here.",
      user_id: 3,
      created_at: formatIso("2026-03-23T08:40:00+07:00"),
      commentable_id: 101,
      commentable_type: "article",
    },
    {
      id: 702,
      content: "Would love one more example of kiln output tied to court ritual timing.",
      user_id: 7,
      created_at: formatIso("2026-03-21T11:05:00+07:00"),
      commentable_id: 102,
      commentable_type: "article",
    },
    {
      id: 703,
      content: "The new route-economy framing makes this edit much easier to understand.",
      user_id: 2,
      created_at: formatIso("2026-03-25T09:22:00+07:00"),
      commentable_id: 303,
      commentable_type: "edit",
    },
  ],
};

function getSchemaUser(userId) {
  return userStore.users.find((user) => user.id === userId) || userStore.users[0];
}

function getSchemaArticle(articleId) {
  return userStore.articles.find((article) => article.id === Number(articleId));
}

function getSchemaTopicNames(articleId) {
  return userStore.articleTopics
    .filter((link) => link.article_id === articleId)
    .map((link) => userStore.topics.find((topic) => topic.id === link.topic_id)?.name)
    .filter(Boolean);
}

function getSchemaLinkedEvents(articleId) {
  return userStore.eventArticles
    .filter((link) => link.article_id === articleId)
    .map((link) => userStore.historicalEvents.find((eventItem) => eventItem.id === link.event_id))
    .filter(Boolean);
}

function getCurrentArticleVote(articleId) {
  return userStore.articleVotes.find(
    (vote) => vote.article_id === articleId && vote.user_id === userStore.currentUserId,
  );
}

function getCurrentEditVote(editId) {
  return userStore.editVotes.find(
    (vote) => vote.edit_id === editId && vote.user_id === userStore.currentUserId,
  );
}

function decorateSchemaEdit(edit) {
  if (!edit) {
    return null;
  }

  return {
    ...edit,
    editorName: getSchemaUser(edit.editor_id).username,
    currentUserVote: getCurrentEditVote(edit.id)?.vote_type || "",
  };
}

function decorateSchemaComment(comment) {
  return {
    ...comment,
    authorName: getSchemaUser(comment.user_id).username,
  };
}

function decorateSchemaArticle(article) {
  const currentEdit = userStore.edits.find((edit) => edit.id === article.current_edit_id) || null;

  return {
    ...article,
    authorName: getSchemaUser(article.author_id).username,
    topicNames: getSchemaTopicNames(article.id),
    linkedEvents: getSchemaLinkedEvents(article.id),
    currentEdit: decorateSchemaEdit(currentEdit),
    relatedEdits: userStore.edits
      .filter((edit) => edit.editable_type === "article" && edit.editable_id === article.id && edit.id !== article.current_edit_id)
      .map((edit) => decorateSchemaEdit(edit)),
    comments: userStore.comments
      .filter((comment) => comment.commentable_type === "article" && comment.commentable_id === article.id)
      .map((comment) => decorateSchemaComment(comment)),
    currentUserVote: getCurrentArticleVote(article.id)?.vote_type || "",
  };
}

function decorateSchemaNotification(notification) {
  return {
    ...notification,
    actorName: getSchemaUser(notification.actor_id).username,
  };
}

function getMonthlySchemaActivity() {
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short" });
  const anchor = new Date("2026-03-26T09:00:00+07:00");
  const months = [];

  for (let offset = 5; offset >= 0; offset -= 1) {
    const date = new Date(anchor.getFullYear(), anchor.getMonth() - offset, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    months.push({
      key,
      month: formatter.format(date),
      articles: 0,
      edits: 0,
    });
  }

  userStore.articles.forEach((article) => {
    const date = new Date(article.updated_at);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const bucket = months.find((item) => item.key === key);
    if (bucket) {
      bucket.articles += 1;
    }
  });

  userStore.edits.forEach((edit) => {
    const date = new Date(edit.created_at);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const bucket = months.find((item) => item.key === key);
    if (bucket) {
      bucket.edits += 1;
    }
  });

  return months.map(({ key, ...item }) => item);
}

function listAdminSchemaArticles() {
  return userStore.articles
    .map((article) => {
      const decoratedArticle = decorateSchemaArticle(article);
      const pendingEditCount = userStore.edits.filter(
        (edit) => edit.editable_type === "article" && edit.editable_id === article.id && edit.status === "pending",
      ).length;

      return {
        ...decoratedArticle,
        pendingEditCount,
      };
    })
    .sort((left, right) => new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime());
}

function listAdminSchemaTopics() {
  return userStore.topics.map((topic) => {
    const articleCount = userStore.articleTopics.filter((link) => link.topic_id === topic.id).length;
    const eventCount = userStore.eventTopics.filter((link) => link.topic_id === topic.id).length;

    return {
      ...topic,
      articleCount,
      eventCount,
    };
  });
}

function listAdminSchemaEvents() {
  return userStore.historicalEvents.map((eventItem) => {
    const currentEdit = userStore.edits.find((edit) => edit.id === eventItem.current_edit_id) || null;
    const linkedArticleCount = userStore.eventArticles.filter((link) => link.event_id === eventItem.id).length;
    const topicCount = userStore.eventTopics.filter((link) => link.event_id === eventItem.id).length;

    return {
      ...eventItem,
      creatorName: getSchemaUser(eventItem.creator_id).username,
      currentEditStatus: currentEdit?.status || "unknown",
      linkedArticleCount,
      topicCount,
    };
  });
}

function listAdminSchemaUsers() {
  return userStore.users.map((user) => ({
    ...user,
    role: user.is_admin ? "Admin" : "Contributor",
    articleCount: userStore.articles.filter((article) => article.author_id === user.id).length,
    editCount: userStore.edits.filter((edit) => edit.editor_id === user.id).length,
    pendingEditCount: userStore.edits.filter((edit) => edit.editor_id === user.id && edit.status === "pending").length,
  }));
}

function buildSchemaAdminOverview() {
  const articles = listAdminSchemaArticles();
  const topics = listAdminSchemaTopics();
  const events = listAdminSchemaEvents();
  const pendingEdits = userStore.edits.filter((edit) => edit.status === "pending");
  const totalReactions = userStore.articles.reduce(
    (sum, article) => sum + Number(article.like_count || 0) + Number(article.dislike_count || 0),
    0,
  );

  return {
    stats: {
      totalUsers: userStore.users.length,
      totalArticles: userStore.articles.length,
      totalTopics: userStore.topics.length,
      totalEvents: userStore.historicalEvents.length,
      pendingEdits: pendingEdits.length,
      totalReactions,
    },
    articleStatus: ["published", "review", "draft", "archived"].map((status) => ({
      name: status[0].toUpperCase() + status.slice(1),
      value: userStore.articles.filter((article) => article.status === status).length,
    })),
    topicBreakdown: topics.map((topic) => ({
      name: topic.name,
      articles: topic.articleCount,
    })),
    monthlyActivity: getMonthlySchemaActivity(),
    recentArticles: articles.slice(0, 4),
    pendingEditQueue: pendingEdits
      .map((edit) => decorateSchemaEdit(edit))
      .sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime())
      .slice(0, 4),
    recentNotifications: userStore.notifications
      .map((notification) => decorateSchemaNotification(notification))
      .sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime())
      .slice(0, 4),
    eventHighlights: events.slice(0, 4),
  };
}

function decoratePendingEdit(edit) {
  const baseRecord =
    edit.editable_type === "article"
      ? userStore.articles.find((article) => article.id === edit.editable_id)
      : userStore.historicalEvents.find((eventItem) => eventItem.id === edit.editable_id);

  return {
    ...decorateSchemaEdit(edit),
    baseRecord: baseRecord
      ? {
          id: baseRecord.id,
          title: baseRecord.title,
          summary: baseRecord.summary || "",
          content: baseRecord.content || "",
          current_edit_id: baseRecord.current_edit_id || null,
        }
      : null,
  };
}

export const adminApi = {
  async getDashboardOverview() {
    return wait(buildSchemaAdminOverview());
  },

  async getPendingEdits() {
    return wait(
      userStore.edits
        .filter((edit) => edit.status === "pending")
        .sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime())
        .map((edit) => decoratePendingEdit(edit)),
    );
  },

  async approveEdit(editId) {
    const edit = userStore.edits.find((item) => item.id === Number(editId));

    if (!edit) {
      throw new Error("Edit not found.");
    }

    edit.status = "approved";
    edit.reviewed_at = formatIso(new Date());
    edit.reviewed_by = 4;

    if (edit.editable_type === "article") {
      const article = userStore.articles.find((item) => item.id === edit.editable_id);

      if (article) {
        article.current_edit_id = edit.id;
        article.title = normalizeName(edit.title, article.title);
        article.content = normalizeName(edit.content, article.content);
        article.updated_at = formatIso(new Date());
      }
    } else {
      const eventItem = userStore.historicalEvents.find((item) => item.id === edit.editable_id);

      if (eventItem) {
        eventItem.current_edit_id = edit.id;
        eventItem.title = normalizeName(edit.title, eventItem.title);
        eventItem.summary = normalizeName(edit.content, eventItem.summary);
        eventItem.reviewed_at = formatIso(new Date());
        eventItem.reviewed_by = 4;
      }
    }

    userStore.notifications.unshift({
      id: Date.now(),
      user_id: edit.editor_id,
      actor_id: 4,
      related_id: edit.id,
      related_type: "edit",
      title: "Edit approved",
      message: `${edit.title} was approved and is now the live version.`,
      is_read: false,
      created_at: formatIso(new Date()),
    });

    return wait(decoratePendingEdit(edit));
  },

  async rejectEdit(editId) {
    const edit = userStore.edits.find((item) => item.id === Number(editId));

    if (!edit) {
      throw new Error("Edit not found.");
    }

    edit.status = "rejected";
    edit.reviewed_at = formatIso(new Date());
    edit.reviewed_by = 4;

    userStore.notifications.unshift({
      id: Date.now(),
      user_id: edit.editor_id,
      actor_id: 4,
      related_id: edit.id,
      related_type: "edit",
      title: "Edit rejected",
      message: `${edit.title} was reviewed and rejected by moderation.`,
      is_read: false,
      created_at: formatIso(new Date()),
    });

    return wait(decoratePendingEdit(edit));
  },

  async getArticles() {
    return wait(listAdminSchemaArticles());
  },

  async getArticle(articleId) {
    const article = getSchemaArticle(articleId);

    if (!article) {
      throw new Error("Article not found.");
    }

    return wait(decorateSchemaArticle(article));
  },

  async deleteArticle(articleId) {
    const targetId = Number(articleId);
    const article = getSchemaArticle(targetId);

    if (!article) {
      throw new Error("Article not found.");
    }

    userStore.articles = userStore.articles.filter((item) => item.id !== targetId);
    userStore.articleTopics = userStore.articleTopics.filter((link) => link.article_id !== targetId);
    userStore.eventArticles = userStore.eventArticles.filter((link) => link.article_id !== targetId);
    userStore.articleVotes = userStore.articleVotes.filter((vote) => vote.article_id !== targetId);
    userStore.comments = userStore.comments.filter(
      (comment) => !(comment.commentable_type === "article" && comment.commentable_id === targetId),
    );
    userStore.edits = userStore.edits.filter(
      (edit) => !(edit.editable_type === "article" && edit.editable_id === targetId),
    );
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

  async getTopics() {
    return wait(listAdminSchemaTopics());
  },

  async createTopic(payload) {
    const topic = {
      id: Date.now(),
      name: normalizeName(payload.name, "New category"),
      slug: normalizeName(payload.slug, "new-topic")
        .toLowerCase()
        .replace(/\s+/g, "-"),
      description: normalizeName(payload.description, ""),
    };

    userStore.topics = [topic, ...userStore.topics];
    return wait(topic);
  },

  async updateTopic(topicId, payload) {
    const topic = userStore.topics.find((item) => item.id === Number(topicId));

    if (!topic) {
      throw new Error("Topic not found.");
    }

    topic.name = normalizeName(payload.name, topic.name);
    topic.slug = normalizeName(payload.slug, topic.slug)
      .toLowerCase()
      .replace(/\s+/g, "-");
    topic.description = normalizeName(payload.description, topic.description);
    return wait(topic);
  },

  async deleteTopic(topicId) {
    const targetId = Number(topicId);
    const topic = userStore.topics.find((item) => item.id === targetId);

    if (!topic) {
      throw new Error("Topic not found.");
    }

    userStore.topics = userStore.topics.filter((item) => item.id !== targetId);
    userStore.articleTopics = userStore.articleTopics.filter((link) => link.topic_id !== targetId);
    userStore.eventTopics = userStore.eventTopics.filter((link) => link.topic_id !== targetId);
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

  async getEvents() {
    return wait(listAdminSchemaEvents());
  },

  async createEvent(payload) {
    const eventItem = {
      id: Date.now(),
      creator_id: userStore.currentUserId,
      title: normalizeName(payload.title, "New historical event"),
      slug: normalizeName(payload.slug, "new-historical-event")
        .toLowerCase()
        .replace(/\s+/g, "-"),
      summary: normalizeName(payload.summary, ""),
      event_year: Number(payload.event_year || new Date().getFullYear()),
      event_date: payload.event_date || `${new Date().getFullYear()}-01-01`,
      created_at: formatIso(new Date()),
      reviewed_at: "",
      reviewed_by: null,
      current_edit_id: null,
    };

    userStore.historicalEvents = [eventItem, ...userStore.historicalEvents];
    return wait(eventItem);
  },

  async updateEvent(eventId, payload) {
    const eventItem = userStore.historicalEvents.find((item) => item.id === Number(eventId));

    if (!eventItem) {
      throw new Error("Historical event not found.");
    }

    eventItem.title = normalizeName(payload.title, eventItem.title);
    eventItem.slug = normalizeName(payload.slug, eventItem.slug)
      .toLowerCase()
      .replace(/\s+/g, "-");
    eventItem.summary = normalizeName(payload.summary, eventItem.summary);
    eventItem.event_year = Number(payload.event_year || eventItem.event_year);
    eventItem.event_date = payload.event_date || eventItem.event_date;
    return wait(eventItem);
  },

  async linkArticleToEvent(eventId, articleId) {
    const numericEventId = Number(eventId);
    const numericArticleId = Number(articleId);
    const eventItem = userStore.historicalEvents.find((item) => item.id === numericEventId);
    const article = userStore.articles.find((item) => item.id === numericArticleId);

    if (!eventItem || !article) {
      throw new Error("Event or article not found.");
    }

    const existingLink = userStore.eventArticles.find(
      (link) => link.event_id === numericEventId && link.article_id === numericArticleId,
    );

    if (!existingLink) {
      userStore.eventArticles.push({
        event_id: numericEventId,
        article_id: numericArticleId,
      });
    }

    return wait({
      success: true,
      eventId: numericEventId,
      articleId: numericArticleId,
    });
  },

  async deleteEvent(eventId) {
    const targetId = Number(eventId);
    const eventItem = userStore.historicalEvents.find((item) => item.id === targetId);

    if (!eventItem) {
      throw new Error("Historical event not found.");
    }

    userStore.historicalEvents = userStore.historicalEvents.filter((item) => item.id !== targetId);
    userStore.eventArticles = userStore.eventArticles.filter((link) => link.event_id !== targetId);
    userStore.eventTopics = userStore.eventTopics.filter((link) => link.event_id !== targetId);
    userStore.edits = userStore.edits.filter(
      (edit) => !(edit.editable_type === "historical_event" && edit.editable_id === targetId),
    );
    return wait({ success: true });
  },

  async getUsers() {
    return wait(listAdminSchemaUsers());
  },

  async updateUserRole(userId, role) {
    const user = userStore.users.find((item) => item.id === Number(userId));

    if (!user) {
      throw new Error("User not found.");
    }

    user.is_admin = role === "Admin";
    return wait(user);
  },

  async toggleUserLock(userId) {
    const user = userStore.users.find((item) => item.id === Number(userId));

    if (!user) {
      throw new Error("User not found.");
    }

    user.is_locked = !user.is_locked;
    return wait(user);
  },
};

export const userApi = {
  async getTopics() {
    return wait(userStore.topics);
  },

  async getHistoricalEvents() {
    return wait(userStore.historicalEvents);
  },

  async getArticles(filters = {}) {
    const keyword = String(filters.keyword || "").trim().toLowerCase();
    const topic = String(filters.topic || "").trim();

    const results = userStore.articles
      .filter((article) => article.status === "published")
      .filter((article) => {
        const matchesKeyword =
          !keyword ||
          article.title.toLowerCase().includes(keyword) ||
          article.summary.toLowerCase().includes(keyword);
        const matchesTopic =
          !topic ||
          topic === "all" ||
          userStore.articleTopics.some(
            (link) => link.article_id === article.id && String(link.topic_id) === topic,
          );

        return matchesKeyword && matchesTopic;
      })
      .sort((left, right) => new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime())
      .map((article) => decorateSchemaArticle(article));

    return wait(results);
  },

  async getArticle(articleId) {
    const article = getSchemaArticle(articleId);

    if (!article) {
      throw new Error("Article not found.");
    }

    return wait(decorateSchemaArticle(article));
  },

  async voteArticle(articleId, voteType) {
    const article = getSchemaArticle(articleId);

    if (!article) {
      throw new Error("Article not found.");
    }

    const existingVote = getCurrentArticleVote(article.id);

    if (existingVote?.vote_type === "like") {
      article.like_count = Math.max(0, article.like_count - 1);
    }

    if (existingVote?.vote_type === "dislike") {
      article.dislike_count = Math.max(0, article.dislike_count - 1);
    }

    if (existingVote) {
      existingVote.vote_type = voteType;
      existingVote.created_at = formatIso(new Date());
    } else {
      userStore.articleVotes.push({
        user_id: userStore.currentUserId,
        article_id: article.id,
        vote_type: voteType,
        created_at: formatIso(new Date()),
      });
    }

    if (voteType === "like") {
      article.like_count += 1;
    } else {
      article.dislike_count += 1;
    }

    userStore.notifications.unshift({
      id: Date.now(),
      user_id: userStore.currentUserId,
      actor_id: userStore.currentUserId,
      related_id: article.id,
      related_type: "article",
      title: "Article vote saved",
      message: `Your ${voteType} vote for ${article.title} was recorded.`,
      is_read: false,
      created_at: formatIso(new Date()),
    });

    return wait(decorateSchemaArticle(article));
  },

  async voteEdit(editId, voteType) {
    const edit = userStore.edits.find((item) => item.id === Number(editId));

    if (!edit) {
      throw new Error("Edit not found.");
    }

    const existingVote = getCurrentEditVote(edit.id);

    if (existingVote?.vote_type === "upvote") {
      edit.upvote_count = Math.max(0, edit.upvote_count - 1);
    }

    if (existingVote?.vote_type === "downvote") {
      edit.downvote_count = Math.max(0, edit.downvote_count - 1);
    }

    if (existingVote) {
      existingVote.vote_type = voteType;
      existingVote.created_at = formatIso(new Date());
    } else {
      userStore.editVotes.push({
        user_id: userStore.currentUserId,
        edit_id: edit.id,
        vote_type: voteType,
        created_at: formatIso(new Date()),
      });
    }

    if (voteType === "upvote") {
      edit.upvote_count += 1;
    } else {
      edit.downvote_count += 1;
    }

    return wait(decorateSchemaEdit(edit));
  },

  async createEdit(payload) {
    const nextEdit = {
      id: Date.now(),
      editor_id: userStore.currentUserId,
      editable_id: Number(payload.editableId),
      editable_type: payload.editableType || "article",
      title: normalizeName(payload.title, "Untitled edit"),
      summary: normalizeName(payload.summary, "New suggested edit."),
      status: "pending",
      content: normalizeName(payload.content, ""),
      thumbnail: normalizeName(payload.thumbnail, "Draft submission"),
      created_at: formatIso(new Date()),
      reviewed_at: "",
      reviewed_by: null,
      upvote_count: 0,
      downvote_count: 0,
    };

    userStore.edits.unshift(nextEdit);
    userStore.notifications.unshift({
      id: Date.now() + 1,
      user_id: userStore.currentUserId,
      actor_id: userStore.currentUserId,
      related_id: nextEdit.id,
      related_type: "edit",
      title: "Edit submitted",
      message: `${nextEdit.title} is now waiting for moderator review.`,
      is_read: false,
      created_at: formatIso(new Date()),
    });

    return wait(decorateSchemaEdit(nextEdit));
  },

  async getMyArticles() {
    return wait(
      userStore.articles
        .filter((article) => article.author_id === userStore.currentUserId)
        .map((article) => decorateSchemaArticle(article)),
    );
  },

  async getMyEdits() {
    return wait(
      userStore.edits
        .filter((edit) => edit.editor_id === userStore.currentUserId)
        .sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime())
        .map((edit) => decorateSchemaEdit(edit)),
    );
  },

  async getMyComments() {
    return wait(
      userStore.comments
        .filter((comment) => comment.user_id === userStore.currentUserId)
        .sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime())
        .map((comment) => decorateSchemaComment(comment)),
    );
  },

  async getNotifications() {
    return wait(
      userStore.notifications
        .filter((notification) => notification.user_id === userStore.currentUserId)
        .sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime())
        .map((notification) => decorateSchemaNotification(notification)),
    );
  },

  async markNotificationRead(notificationId) {
    const notification = userStore.notifications.find((item) => item.id === Number(notificationId));

    if (!notification) {
      throw new Error("Notification not found.");
    }

    notification.is_read = true;
    return wait(decorateSchemaNotification(notification));
  },

  async getProfile() {
    const currentUser = getSchemaUser(userStore.currentUserId);

    return wait({
      ...currentUser,
      articleCount: userStore.articles.filter((article) => article.author_id === currentUser.id).length,
      editCount: userStore.edits.filter((edit) => edit.editor_id === currentUser.id).length,
      pendingEditCount: userStore.edits.filter(
        (edit) => edit.editor_id === currentUser.id && edit.status === "pending",
      ).length,
    });
  },
};
