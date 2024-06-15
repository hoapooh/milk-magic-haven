import { HashRouter as Router, Routes, Route } from "react-router-dom";
import FAQ from "./pages/FAQ/FAQ";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthNav from "./components/AuthNav/AuthNav";
function App() {
	return (
		<>
			<Router>
				<AuthNav />
				<Header />
				<Routes>
					<Route path="/faq" element={<FAQ />} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
