import { Box, Pagination } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

const pageSize = 6;

export default function AppPagination({ setProducts, maxPrice }) {
	const baseURL = "http://localhost:8000/product/get-all-product";
	const [productsAPI, setProductsAPI] = useState([]);

	const fetchData = async () => {
		try {
			const response = await fetch(baseURL);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			setProductsAPI(data.data);
		} catch (error) {
			console.error("Fetching error: ", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []); // Ensure this array is correctly populated with dependencies if there are any

	// const filteredProducts = productsAPI.filter(
	// 	(product) => product.price <= maxPrice
	// );

	const [pagination, setPagination] = useState({
		count: 0,
		from: 0,
		to: pageSize,
	});

	const filteredProducts = useMemo(() => {
		// Assuming there's a function to filter products based on some criteria
		return productsAPI.filter((product) => product.price <= maxPrice);
	}, [maxPrice, productsAPI]); // dependencies that cause filteredProducts to change

	// Update products and pagination count when productsAPI or pagination state changes
	useEffect(() => {
		// This effect is only responsible for updating the pagination count
		// when the length of productsAPI changes.
		setPagination((prev) => ({ ...prev, count: filteredProducts.length }));
	}, [filteredProducts.length]);

	useEffect(() => {
		// This effect updates the displayed products based on the current pagination.
		// It's separated from the pagination count update to prevent dependency cycle.
		const updatedProducts = filteredProducts.slice(
			pagination.from,
			pagination.to
		);
		setProducts(updatedProducts);
	}, [
		productsAPI,
		pagination.from,
		pagination.to,
		filteredProducts,
		setProducts,
	]); // Removed setProducts from dependency array

	// Handle page change
	const handleChange = (event, page) => {
		const from = (page - 1) * pageSize;
		const to = page * pageSize;
		setPagination((prev) => ({
			...prev,
			from: from,
			to: to,
		}));
	};

	return (
		<Box
			display={"flex"}
			justifyContent={"center"}
			alignContent={"center"}
			sx={{ margin: "20px 0px" }}
		>
			<Pagination
				count={Math.ceil(pagination.count / pageSize)}
				color="primary"
				onChange={handleChange}
			/>
		</Box>
	);
}
