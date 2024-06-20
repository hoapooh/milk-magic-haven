import { HashRouter as Router, Routes, Route } from "react-router-dom";
import FAQ from "./pages/FAQ/FAQ";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthNav from "./components/AuthNav/AuthNav";
import Blog from "./pages/Blog/Blog";
import HomePage from "./pages/Home/HomePage";
import Products from "./pages/Shop/Products/Products";

function App() {
  return (
    <>
      <Router>
        <AuthNav />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/shop" element={<Products />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
