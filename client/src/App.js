import { HashRouter as Router, Routes, Route } from "react-router-dom";
import FAQ from "./pages/FAQ/FAQ";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthNav from "./components/AuthNav/AuthNav";
import Blog from "./pages/Blog/Blog";
import HomePage from "./pages/Home/HomePage";
import Products from "./pages/Shop/Products/Products";
import Contact from "./pages/contact/Contact";
// import ProductPage from "./pages/product_page/ProductPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// import AdminPage from "./pages/admin/admin_page/AdminPage";
// import Account from "./pages/admin/account/Account";
import Revenue from "./pages/admin/statistic/Revenue";
import Product from "./pages/Home/Product/Product";
// import ProductAdmin from "./pages/admin/product/ProductAdmin";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Staff from "./pages/Staff/Staff";
import AdminPage from "./pages/admin/admin_page/AdminPage";
import CartItem from "./pages/Cart/CartItem";

const THEME = createTheme({
	typography: {
		fontFamily: `"Baloo Paaji 2", sans-serif`,
	},
});

function App() {
	return (
		<>
			<ThemeProvider theme={THEME}>
				{/* <AuthNav />
				<Header /> */}
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/faq" element={<FAQ />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/shop" element={<Products />} />
					<Route path="/contact" element={<Contact />} />
					{/* <Route path="/detail" element={<ProductPage />} /> */}
					<Route path="/admin" element={<AdminPage />} />
					{/* <Route path="/account" element={<Account />} /> */}
					<Route path="/revenue" element={<Revenue />} />
					{/* <Route path="/product" element={<ProductAdmin />} /> */}
					<Route path="/staff/*" element={<Staff />}></Route>
					<Route path="/cart" element={<CartItem />}></Route>
				</Routes>
				{/* <Footer /> */}
			</ThemeProvider>

		</>
	);
}

export default App;