import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          📖 Manga Reader
        </Link>

        {/* Thanh điều hướng */}
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link to="/" className="hover:text-gray-200">Trang chủ</Link>
            </li>
            <li>
              <a href="https://api.mangadex.org/docs/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
                API Docs
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
