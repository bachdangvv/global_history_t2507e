export const mockData = {
  users: [
    { id: 1, username: 'Nguyễn Văn A', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, username: 'Trần Thị B', avatar: 'https://i.pravatar.cc/150?u=2' },
  ],
  topUpvoteRevision: {
    id: 1,
    author: { id: 1, username: 'Nguyễn Văn A', avatar: 'https://i.pravatar.cc/150?u=1' },
    upvote_count: '18k',
    status: 'ĐÃ KIỂM DUYỆT',
    diff: [
      { type: 'unchanged', text: '[-...triều đại...] [+...triều Lý...]' },
      { type: 'added', text: '+[-...triều đại...] [+...triều Lý...]' },
      { type: 'removed', text: '-[-...triều đại...] -Lịch sử Gốm sứ nhà...' },
      { type: 'added', text: '+[...triều đại...] +current chămsứ nhà...]' },
      { type: 'empty', text: '' },
      { type: 'unchanged', text: '[-...triều đại...] [+..Việt Gốm Sứ...]' }
    ]
  },
  topLikeArticle: {
    id: 1,
    title: 'Lịch sử Gốm sứ nhà Minh',
    summary: 'Lịch sử Gốm sứ nhà Minh là chiến sư Vận, là chúng khôn gã Sứ Việt văn Bì vĩ nhất mặt vâng công sứ tiếng ở vùng khiển của chính sứa...',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Ming_Dynasty_Vase.jpg/800px-Ming_Dynasty_Vase.jpg',
    like_count: 5000,
    dislike_count: 500,
  },
  countries: [
    { id: 1, name: 'Việt Nam', code: 'VN', flag: '🇻🇳' },
    { id: 2, name: 'Trung Quốc', code: 'CN', flag: '🇨🇳' },
    { id: 3, name: 'Pháp', code: 'FR', flag: '🇫🇷' },
    { id: 4, name: 'Nhật Bản', code: 'JP', flag: '🇯🇵' },
    { id: 5, name: 'China', code: 'CN', flag: '🇨🇳' }, // Based on mockup duplication
    { id: 6, name: 'Bussia', code: 'RU', flag: '🇷🇺' }, // Based on mockup typo "Bussia" -> Russia flag
    { id: 7, name: 'Trung Quốc', code: 'CN', flag: '🇨🇳' }, // Based on mockup duplication
    { id: 8, name: 'Vàng Bno', code: 'IT', flag: '🇮🇹' }, // Placeholder flag
    { id: 9, name: 'Vietnam', code: 'VN', flag: '🇧🇬' }, // Based on mockup flag (looks like Bulgaria for "Vietnam")
    { id: 10, name: 'Rai rian', code: 'RO', flag: '🇷🇴' }, // Placeholder flag
    { id: 11, name: 'Neutria', code: 'NL', flag: '🇳🇱' }, // Placeholder flag
    { id: 12, name: 'Cammark', code: 'ZA', flag: '🇿🇦' }, // Placeholder flag
  ],
  categories: [
    { id: 1, name: 'Lịch sử Thể thao', icon: '⚽' },
    { id: 2, name: 'Cổ vật và Di tích', icon: '🏛️' },
    { id: 3, name: 'Tác giả nổi tiếng', icon: '👤' },
    { id: 4, name: 'Cổ vật và Di tích', icon: '🏺' },
    { id: 5, name: 'Tác giả nổi tiếng', icon: '📝' },
    { id: 6, name: 'Tác giả thao', icon: '⚙️' },
    { id: 7, name: 'Tác giả thử', icon: '🔬' },
    { id: 8, name: 'Tác giả nổi tiếng', icon: '🌍' },
    { id: 9, name: 'Tác giả thao', icon: '⚖️' },
    { id: 10, name: 'Tác giả nổi tiếng', icon: '👨‍🏫' },
    { id: 11, name: 'Tác giả Article', icon: '📑' },
  ],
  recentRevisions: [
    { id: 1, author: 'Nguyễn Văn A', action: 'edited', title: 'fue text revisions', timeAgo: '1 minutes ago' },
    { id: 2, author: 'Nguyễn Văn A', action: 'edited', title: 'the origimes content', timeAgo: '4 hours ago' },
    { id: 3, author: 'Nguyễn Văn A', action: 'edited', title: 'hiirsenturatos', timeAgo: '7 hrs ago' },
  ],
  recentArticles: [
    {
      id: 2,
      title: 'Lịch sử Gốm sứ nhà Minh',
      summary: 'Lịch sử Gốm sứ nhà Minh - Vác consemtry sứ Virsám của Việt chang ban trừ và lờt khứ nàn vào bán và lóin thông sứ tiết tìm hoặc gân liệm...',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Ming_Dynasty_Vase.jpg/800px-Ming_Dynasty_Vase.jpg',
    },
    {
      id: 3,
      title: 'Lịch sử Gốm sứ nhà Minh',
      summary: 'Lịch sử Gốm sứ nhà Minh - Vác consemtry sứ Virsám hãm chú cùng nhà tạo nuốn tố tiết ánh nhân thô cuốn đứng trán chùng của...',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/A_River_Landscape_with_Fishermen_%28Jan_van_Goyen%29.jpg/800px-A_River_Landscape_with_Fishermen_%28Jan_van_Goyen%29.jpg',
    }
  ]
};
