import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import getCoverUrl from "../../utils/getCoverUrl";

const Home = () => {
  const [mangaList, setMangaList] = useState([]); // Khởi tạo là mảng rỗng
  const [coverUrls, setCoverUrls] = useState({});
  const { data, loading } = useFetch("https://api.mangadex.org/manga", {
    limit: 12,
    order: { updatedAt: "desc" },
  });

  useEffect(() => {
    if (data) {
      setMangaList(data); // Cập nhật mangaList chỉ khi data có giá trị
    }
  }, [data]);

  useEffect(() => {
    const fetchCovers = async () => {
      const urls = {};
      for (const manga of mangaList) {
        urls[manga.id] = await getCoverUrl(manga.id);
      }
      setCoverUrls(urls);
    };

    if (mangaList.length > 0) { // Kiểm tra độ dài
      fetchCovers();
    }
  }, [mangaList]);

  if (loading) return <p className="text-center text-lg font-semibold mt-5">Đang tải manga...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">📢 Manga Mới Cập Nhật</h1>
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
};

export default Home;