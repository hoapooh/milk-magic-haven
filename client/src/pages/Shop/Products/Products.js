import React from "react";
import "./Products.scss";
import { Container, Grid } from "@mui/material";
import ProductCategory from "../ProductCategory/ProductCategory";
import ProductList from "../ProductList/ProductList";
import Header from "../../../components/Header/Header";
import AuthNav from "../../../components/AuthNav/AuthNav";
import Footer from "../../../components/Footer/Footer";

export default function Products() {
	return (
		<>
			<AuthNav />
			<Header />
			<div>
				<Container>
					<Grid container columnSpacing={20} marginTop={2}>
						<Grid item md={3} xs={12}>
							<ProductCategory />
						</Grid>
						<Grid item md={9} xs={12}>
							<ProductList />
						</Grid>
					</Grid>
				</Container>
			</div>
			<Footer />
		</>
	);
}
