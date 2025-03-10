import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import getCoverUrl from "../../utils/getCoverUrl";

const Home = () => {
  // Fetch danh sách manga mới cập nhật
  const { data: mangaList, loading } = useFetch("https://api.mangadex.org/manga", {
    limit: 12, // Lấy 12 manga mới nhất
    order: { updatedAt: "desc" }, // Sắp xếp theo thời gian cập nhật giảm dần
  });

  // Fetch danh sách cover cho tất cả manga
  const mangaIds = mangaList?.map(manga => manga.id) || [];
  const { data: coverData } = useFetch("https://api.mangadex.org/cover", {
    manga: mangaIds,
  });

  if (loading) return <p className="text-center text-lg font-semibold mt-5">Đang tải manga...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">📢 Manga Mới Cập Nhật</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mangaList.map((manga) => {
          // Lấy URL ảnh cover từ hàm getCoverUrl


          return (
            <Link
              key={manga.id}
              to={`/manga/${manga.id}`}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={getCoverUrl(manga.id)} // Ảnh bìa manga
                alt={manga.attributes.title.en}
                className="w-full h-56 object-cover"
              />
              <h2 className="text-sm font-semibold text-center p-2">
                {manga.attributes.title.en || "Không có tiêu đề"}
              </h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
