import { HashRouter as Router, Routes, Route } from "react-router-dom";
import FAQ from "./pages/FAQ";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthNav from "./components/AuthNav/AuthNav";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
function App() {
	return (
		<>
			<Router>
				<AuthNav />
				<Header />
				<Breadcrumb />
				<Routes>
					<Route path="/faq" element={<FAQ />} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
