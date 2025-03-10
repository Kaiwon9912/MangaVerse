import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import getCoverUrl from "../../utils/getCoverUrl";

const MangaDetail = () => {
  const { mangaId } = useParams();
  const [coverUrl, setCoverUrl] = useState("https://via.placeholder.com/200x300?text=No+Image");

  // Fetch dữ liệu manga
  const { data: manga, loading: loadingManga } = useFetch(`https://api.mangadex.org/manga/${mangaId}`);

  // Fetch danh sách chương
  const { data: chapters, loading: loadingChapters } = useFetch(`https://api.mangadex.org/manga/${mangaId}/feed`, {
    translatedLanguage: ["en"],
    limit: 10,
    order: { chapter: "desc" },
  });

  // Fetch ảnh cover khi có mangaId
  useEffect(() => {
    const fetchCover = async () => {
      const cover = await getCoverUrl(mangaId);
      setCoverUrl(cover);
    };

    fetchCover();
  }, [mangaId]);

  if (loadingManga || loadingChapters) {
    return <p className="text-center text-lg font-semibold mt-5">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {manga && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Ảnh bìa & Thông tin */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={coverUrl}
              alt={manga.attributes.title.en}
              className="w-60 h-80 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{manga.attributes.title.en || "Không có tiêu đề"}</h1>
              <p className="text-gray-600 mt-2">{manga.attributes.description.en?.substring(0, 200) || "Không có mô tả"}...</p>
            </div>
          </div>

          {/* Danh sách chương */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-3">📚 Danh sách chương</h2>
            <ul className="space-y-2">
              {chapters && chapters.length > 0 ? (
                chapters.map((chapter) => (
                  <li key={chapter.id} className="bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition">
                    <a href={`/chapter/${chapter.id}`} className="text-blue-600 font-semibold">
                      Chapter {chapter.attributes.chapter || "??"}: {chapter.attributes.title || "Không có tiêu đề"}
                    </a>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">Không có chương nào.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaDetail;
