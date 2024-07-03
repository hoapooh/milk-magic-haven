import { Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";

const pageSize = 6;

export default function AppPagination({ setProducts }) {
	const baseURL = "http://localhost:8000/products";
	const [productsAPI, setProductsAPI] = useState([]);

	useEffect(() => {
		fetch(baseURL)
			.then((response) => response.json())
			.then((data) => setProductsAPI(data))
			.catch((error) => console.log(error));
	}, []);

	const [pagination, setPagination] = useState({
		count: 0,
		from: 0,
		to: pageSize,
	});
	useEffect(() => {
		setPagination({ ...pagination, count: productsAPI.length });
		setProducts(productsAPI.slice(pagination.from, pagination.to));
	}, [pagination, pagination.from, pagination.to, productsAPI, setProducts]);

	const handleChange = (event, page) => {
		const from = (page - 1) * pageSize;
		const to = (page - 1) * pageSize + pageSize;
		setPagination({
			...pagination,
			from: from,
			to: to,
		});
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
