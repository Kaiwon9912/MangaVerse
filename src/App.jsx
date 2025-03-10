import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MangaDetail from "./features/mangaDetail/mangaDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./features/home/home";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manga/:mangaId" element={<MangaDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
