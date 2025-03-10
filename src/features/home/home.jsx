import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import getCoverUrl from "../../utils/getCoverUrl";

const Home = () => {
  // Các danh sách manga
  const [latestManga, setLatestManga] = useState([]);
  const [popularManga, setPopularManga] = useState([]);
  const [trendingManga, setTrendingManga] = useState([]);

  // Ảnh cover
  const [coverUrls, setCoverUrls] = useState({});

  // Fetch dữ liệu từ API MangaDex
  const { data: latestData, loading: latestLoading } = useFetch("https://api.mangadex.org/manga", {
    limit: 36,
    order: { updatedAt: "desc" }, // Lấy manga mới cập nhật nhất
  });

  const { data: popularData, loading: popularLoading } = useFetch("https://api.mangadex.org/manga", {
    limit: 36,
    order: { followedCount: "desc" }, // Lấy manga có nhiều người theo dõi nhất
  });

  const { data: trendingData, loading: trendingLoading } = useFetch("https://api.mangadex.org/manga", {
    limit: 36,
    order: { rating: "desc" }, // Lấy manga có rating cao nhất
  });

  // Cập nhật danh sách manga
  useEffect(() => {
    if (latestData) setLatestManga(latestData);
    if (popularData) setPopularManga(popularData);
    if (trendingData) setTrendingManga(trendingData);
  }, [latestData, popularData, trendingData]);

  // Fetch ảnh bìa của tất cả manga
  useEffect(() => {
    const fetchCovers = async () => {
      const urls = {};
      const allManga = [...latestManga, ...popularManga, ...trendingManga];

      for (const manga of allManga) {
        urls[manga.id] = await getCoverUrl(manga.id);
      }

      setCoverUrls(urls);
    };

    if (latestManga.length || popularManga.length || trendingManga.length) {
      fetchCovers();
    }
  }, [latestManga, popularManga, trendingManga]);

  if (latestLoading || popularLoading || trendingLoading) {
    return <p className="text-center text-lg font-semibold mt-5">Đang tải manga...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">📢 Manga Mới Cập Nhật</h1>

      {/* Danh sách Manga Mới Cập Nhật */}
      <MangaSection title="📌 Mới Cập Nhật" mangaList={latestManga} coverUrls={coverUrls} />

      {/* Danh sách Manga Phổ Biến */}
      <MangaSection title="🔥 Phổ Biến" mangaList={popularManga} coverUrls={coverUrls} />

      {/* Danh sách Manga Xu Hướng */}
      <MangaSection title="🚀 Đang Hot" mangaList={trendingManga} coverUrls={coverUrls} />
    </div>
  );
};

// Component hiển thị danh sách manga
const MangaSection = ({ title, mangaList, coverUrls }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {mangaList.map((manga) => (
        <Link
          key={manga.id}
          to={`/manga/${manga.id}`}
          className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img
            src={coverUrls[manga.id] || "https://via.placeholder.com/200x300?text=No+Image"}
            alt={manga.attributes.title.en}
            className="w-full h-56 object-cover"
          />
          <h2 className="text-sm font-semibold text-center p-2">
            {manga.attributes.title.en || "Không có tiêu đề"}
          </h2>
        </Link>
      ))}
    </div>
  </div>
);

export default Home;
