import React, { useState } from "react";
import "./Products.scss";
import { Container, Grid } from "@mui/material";
import ProductCategory from "../ProductCategory/ProductCategory";
import ProductList from "../ProductList/ProductList";
import Header from "../../../components/Header/Header";
import AuthNav from "../../../components/AuthNav/AuthNav";
import Footer from "../../../components/Footer/Footer";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";

const MAX = 1000000;

export default function Products() {
	const [maxPrice, setMaxPrice] = useState(MAX); // Giả sử MAX là giá trị tối đa ban đầu

	const handleSliderChange = (newValue) => {
		setMaxPrice(newValue);
	};

	return (
		<>
			<AuthNav />
			<Header />
			<div>
				<Breadcrumb>Cửa hàng</Breadcrumb>
				<Container maxWidth="xl" className="product__container">
					<div className="product">
						<Grid container spacing={2}>
							<Grid item md={3} xs={12}>
								<ProductCategory
									onSliderChange={handleSliderChange}
								/>
							</Grid>
							<Grid item md={9} xs={12}>
								<ProductList maxPrice={maxPrice} />
							</Grid>
						</Grid>
					</div>
				</Container>
			</div>
			<Footer />
		</>
	);
}
