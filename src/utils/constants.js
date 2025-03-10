// Base URL của MangaDex API
export const API_BASE_URL = "https://api.mangadex.org";

// Số lượng manga hiển thị trên mỗi danh mục
export const MANGA_LIMIT = 6;

// URL mặc định nếu manga không có ảnh bìa
export const DEFAULT_COVER_URL = "https://via.placeholder.com/200x300?text=No+Image";

// Các loại danh sách manga
export const MANGA_CATEGORIES = {
  LATEST: {
    title: "📌 Mới Cập Nhật",
    apiParams: {

      limit: MANGA_LIMIT,
    },
  },
  POPULAR: {
    title: "🔥 Phổ Biến",
    apiParams: {
      order: { followedCount: "desc" },
      limit: MANGA_LIMIT,
    },
  },
  TRENDING: {
    title: "🚀 Đang Hot",
    apiParams: {
      order: { rating: "desc" },
      limit: MANGA_LIMIT,
    },
  },
};
