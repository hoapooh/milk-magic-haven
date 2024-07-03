import React from "react";
import Advertise from "./Advertise/Advertise";
import Product from "./Product/Product";
import Banner from "./Banner/Banner";
import Loves from "./Loves/Loves";
import Rate from "./Rate/Rate";
import PhotoShoot from "./PhotoShoot/PhotoShoot";
import NewsLetter from "./NewsLetter/NewsLetter";
import Feature from "./Feature/Feature";
import Category from "./Category/Category";
import AuthNav from "../../components/AuthNav/AuthNav";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function HomePage() {
	return (
		<>
			<AuthNav />
			<Header />
			<div>
				<Advertise />
				<Category />
				<Product />
				<Banner />
				<Loves />
				<Rate />
				<PhotoShoot />
				<Feature />
				<NewsLetter />
			</div>
			<Footer />
		</>
	);
}
