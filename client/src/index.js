import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./components/Context/CartContext/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<CartProvider>
				<App />
			</CartProvider>
		</BrowserRouter>
	</React.StrictMode>
);
