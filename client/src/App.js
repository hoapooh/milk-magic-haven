import { HashRouter as Router, Routes, Route } from "react-router-dom";
import FAQ from "./pages/FAQ/FAQ";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthNav from "./components/AuthNav/AuthNav";
import Blog from "./pages/Blog/Blog";
import HomePage from "./pages/Home/HomePage";
import Products from "./pages/Shop/Products/Products";
import Contact from "./pages/contact/Contact";
import ProductPage from "./pages/product_page/ProductPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
					<AuthNav />
					<Header />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/faq" element={<FAQ />} />
						<Route path="/blog" element={<Blog />} />
						<Route path="/shop" element={<Products />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/detail" element={<ProductPage />} />
					</Routes>
					<Footer />
				</Router>
			</ThemeProvider>
		</>
	);
}

export default App;
