import React from "react";
import Advertise from "./Advertise/Advertise";
import Banner from "./Banner/Banner";
import Rate from "./Rate/Rate";
import PhotoShoot from "./PhotoShoot/PhotoShoot";
import Feature from "./Feature/Feature";
import AuthNav from "../../components/AuthNav/AuthNav";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
	return (
		<>
			<AuthNav />
			<Header />
			<div style={{ paddingBottom: "50px" }}>
				<Advertise />
				<Banner />
				<Rate />
				<PhotoShoot />
				<Feature />
			</div>
			<Footer />
		</>
	);
}
