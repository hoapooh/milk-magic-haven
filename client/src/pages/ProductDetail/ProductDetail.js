import React from "react";

import "./ProductDetail.scss";
import AuthNav from "../../components/AuthNav/AuthNav";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function ProductDetail() {
	return (
		<>
			<AuthNav />
			<Header />
			<div className="ProductPage">
				<div className="content">
					<div className="content__left">
						<img
							src="https://m.media-amazon.com/images/I/51C5TrSt-GL.jpg"
							alt="toy"
							width={400}
						/>
					</div>
					<div className="content__right">
						<div className="content__right__name">
							Block shape-sorting toy
						</div>
						<div className="content__right__price">39.00$</div>
						<div className="content__right__text">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation ullamco laboris nisi ut aliquip
							ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore
							eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia
							deserunt mollit anim id est laborum.
						</div>
						<div className="content__right__button">
							<button>Add to cart</button>
						</div>
						<div className="short__description">
							<h1>Short description</h1>
							<div className="short">
								<div className="description__category">
									Category: toy
								</div>
								<div className="EXP">EXP: 01/01/2024</div>
								<div className="EXP">EXP: 01/01/2024</div>
							</div>
						</div>
					</div>
				</div>
				<div className="content__under">
					<div className="under_title">
						<div className="under_title_description">
							<h1>Description</h1>
						</div>
						<div className="under_title_review">
							<h1>Reviews</h1>
						</div>
					</div>
					<div className="under_content">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu
						fugiat nulla pariatur. Excepteur sint occaecat cupidatat
						non proident, sunt in culpa qui officia deserunt mollit
						anim id est laborum.
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
