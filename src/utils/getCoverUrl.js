const getCoverUrl = async (mangaId) => {
    if (!mangaId) {
      return "https://via.placeholder.com/200x300?text=No+Image"; // Ảnh mặc định
    }
  
    try {
      const response = await fetch(`https://api.mangadex.org/cover?manga[]=${mangaId}`);
      const data = await response.json();
  
      if (data?.data?.length > 0) {
        const latestCover = data.data[0]?.attributes?.fileName;
        return `https://uploads.mangadex.org/covers/${mangaId}/${latestCover}`;
      }
    } catch (error) {
      console.error("Lỗi khi fetch ảnh cover:", error);
    }
  
    return "https://via.placeholder.com/200x300?text=No+Image"; // Nếu lỗi hoặc không có ảnh
  };
  
  export default getCoverUrl;
  