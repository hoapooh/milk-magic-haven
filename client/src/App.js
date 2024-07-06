import { HashRouter as Router, Routes, Route } from "react-router-dom";
import FAQ from "./pages/FAQ/FAQ";
import Blog from "./pages/Blog/Blog";
import HomePage from "./pages/Home/HomePage";
import Products from "./pages/Shop/Products/Products";
import Contact from "./pages/contact/Contact";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AdminPage from "./pages/admin/admin_page/AdminPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AddAccount from "./pages/admin/addAccount/AddAccount";
import UpdateAccount from "./pages/admin/updateAccount/UpdateAccount";
import Statistic from "./pages/admin/statistic/Statistic";

const THEME = createTheme({
  typography: {
    fontFamily: `"Baloo Paaji 2", sans-serif`,
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={THEME}>
        <Router>
          <Routes>
            {/* ============ USER VIEW ============ */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/shop" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/detail" element={<ProductDetail />} />

            {/* ============ ADMIN VIEW ============ */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/addAccount" element={<AddAccount />} />
            <Route path="/update/:id" element={<UpdateAccount />} />
            <Route path="/admin/statistic" element={<Statistic />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
