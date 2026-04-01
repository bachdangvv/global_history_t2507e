export const mockData = {
  users: [
    { id: 1, username: 'Nguyễn Văn A', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, username: 'Trần Thị B', avatar: 'https://i.pravatar.cc/150?u=2' },
  ],
  topUpvoteRevisions: [
    {
      id: 1,
      articleTitle: 'Lịch sử triều đại nhà Lý',
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
    {
      id: 2,
      articleTitle: 'Khám phá văn hóa Ai Cập cổ đại',
      author: { id: 3, username: 'Lê Văn C', avatar: 'https://i.pravatar.cc/150?u=3' },
      upvote_count: '12k',
      status: 'ĐÃ KIỂM DUYỆT',
      diff: [
        { type: 'unchanged', text: '[-...kim tự tháp...] [+...kim tự tháp Giza...]' },
        { type: 'added', text: '+[...xây dựng...] +bởi pharaoh Khufu...]' },
        { type: 'removed', text: '-[-...xây dựng...] -không rõ người xây...' },
      ]
    },
    {
      id: 3,
      articleTitle: 'Cách mạng Công nghiệp',
      author: { id: 4, username: 'Phạm Thị D', avatar: 'https://i.pravatar.cc/150?u=4' },
      upvote_count: '9k',
      status: 'ĐÃ KIỂM DUYỆT',
      diff: [
        { type: 'unchanged', text: '[-...thế kỷ 18...] [+...cuối thế kỷ 18...]' },
        { type: 'added', text: '+[...máy hơi nước...] +do James Watt phát minh...]' }
      ]
    },
    {
      id: 4,
      articleTitle: 'Chiến tranh thế giới thứ hai',
      author: { id: 2, username: 'Trần Thị B', avatar: 'https://i.pravatar.cc/150?u=2' },
      upvote_count: '8k',
      status: 'ĐÃ KIỂM DUYỆT',
      diff: [
        { type: 'added', text: '+[...năm 1939...] +Đức xâm lược Ba Lan...]' },
        { type: 'removed', text: '-[-...năm 1939...] -xảy ra sự kiện...' }
      ]
    }
  ],
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
  ],
  recentRevisionsDiffs: [
    {
      id: 2,
      articleTitle: 'Lịch sử quân sự nhà Trần',
      author: { id: 2, username: 'Trần Thị B', avatar: 'https://i.pravatar.cc/150?u=2' },
      upvote_count: '2k',
      status: 'CHỜ DUYỆT',
      diff: [
        { type: 'unchanged', text: '[-...nhà Trần...] [+...nhà Trần...]' },
        { type: 'removed', text: '-[-...nhà Trần...] -Lịch sử quân sự nhà Trần...' },
        { type: 'added', text: '+[...nhà Trần...] +Lịch sử quân sự vẻ vang...]' }
      ]
    },
    {
      id: 3,
      articleTitle: 'Thành Nhà Hồ',
      author: { id: 5, username: 'Hoàng Văn E', avatar: 'https://i.pravatar.cc/150?u=5' },
      upvote_count: '1k',
      status: 'CHỜ DUYỆT',
      diff: [
        { type: 'added', text: '+[...năm 1397...] +Xây dựng bằng đá...]' },
        { type: 'unchanged', text: '[-...Thanh Hóa...] [+...Thanh Hóa...]' }
      ]
    },
    {
      id: 4,
      articleTitle: 'Trận Bạch Đằng',
      author: { id: 6, username: 'Đinh Thị F', avatar: 'https://i.pravatar.cc/150?u=6' },
      upvote_count: '500',
      status: 'CHỜ DUYỆT',
      diff: [
        { type: 'unchanged', text: '[-...năm 938...] [+...năm 938...]' },
        { type: 'added', text: '+[...ngọn giáo...] +cọc gỗ vót nhọn...]' },
        { type: 'removed', text: '-[-...ngọn giáo...] -vũ khí thô sơ...' }
      ]
    },
    {
      id: 5,
      articleTitle: 'Chiến thắng Điện Biên Phủ',
      author: { id: 7, username: 'Phan Văn G', avatar: 'https://i.pravatar.cc/150?u=7' },
      upvote_count: '1.5k',
      status: 'CHỜ DUYỆT',
      diff: [
        { type: 'added', text: '+[...năm 1954...] +Tướng Giáp chỉ huy...]' }
      ]
    }
  ],
  topViewArticles: [
    {
      id: 4,
      title: 'Khám phá văn hóa Ai Cập cổ đại',
      summary: 'Một cái nhìn sâu sắc về văn hóa, tôn giáo và xã hội của người Ai Cập cổ đại...',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/800px-All_Gizah_Pyramids.jpg',
      view_count: 15400,
    },
    {
      id: 5,
      title: 'Cách mạng Công nghiệp',
      summary: 'Những thay đổi lớn về kinh tế, xã hội và công nghệ trong thế kỷ 18 và 19.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Power_loom_weaving_in_1835.jpg/800px-Power_loom_weaving_in_1835.jpg',
      view_count: 12200,
    }
  ],
  topLikeArticles: [
    {
      id: 1,
      title: 'Lịch sử Gốm sứ nhà Minh',
      summary: 'Lịch sử Gốm sứ nhà Minh là chiến sư Vận, là chúng khôn gã Sứ Việt văn Bì vĩ nhất mặt vâng công sứ tiếng ở vùng khiển của chính sứa...',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Ming_Dynasty_Vase.jpg/800px-Ming_Dynasty_Vase.jpg',
      like_count: 5000,
      dislike_count: 500,
    }
  ],
  historicalEvents: [
    {
      id: 1,
      title: 'Khánh thành tháp Eiffel',
      summary: 'Tháp Eiffel chính thức được khánh thành tại Paris, Pháp.',
      event_year: 1889,
      event_date: '1889-03-31',
      view_count: 8500
    },
    {
      id: 2,
      title: 'Đế quốc La Mã sụp đổ',
      summary: 'Sự kiện đánh dấu sự kết thúc của Đế quốc Tây La Mã.',
      event_year: 476,
      event_date: '0476-09-04',
      view_count: 12000
    },
    {
      id: 3,
      title: 'Trận Trân Châu Cảng',
      summary: 'Cuộc tấn công bất ngờ của Hải quân Đế quốc Nhật Bản vào căn cứ hải quân Hoa Kỳ.',
      event_year: 1941,
      event_date: '1941-12-07',
      view_count: 20000
    },
    {
      id: 4,
      title: 'Ký hiệp ước Paris',
      summary: 'Chấm dứt chiến tranh Việt Nam, lập lại hòa bình.',
      event_year: 1973,
      event_date: '1973-01-27',
      view_count: 15000
    },
    {
      id: 5,
      title: 'Giải phóng miền Nam',
      summary: 'Sự kiện 30 tháng 4, thống nhất đất nước Việt Nam.',
      event_year: 1975,
      event_date: '1975-04-30',
      view_count: 35000
    },
    {
      id: 6,
      title: 'Sự kiện lịch sử khác (Hôm nay)',
      summary: 'Một sự kiện quan trọng trong lịch sử thế giới xảy ra vào ngày này.',
      event_year: 1900,
      event_date: '1900-03-31',
      view_count: 500
    }
  ]
};
