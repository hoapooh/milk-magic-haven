import React, { useState } from "react";
import "./ProductList.scss";
import { Box, IconButton, Typography } from "@mui/material";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import AppPagination from "../Pagination/AppPagination";
import GridCard from "../ViewProduct/GridCard";
import ListCard from "../ViewProduct/ListCard";

export default function ProductList() {
	const [products, setProducts] = useState([]);
	const [view, setView] = useState(false);
	return (
		<Box className={"product-list-container"}>
			<Typography variant="h3" gutterBottom fontWeight={"bold"}>
				Educational Toys
			</Typography>
			<Box mb={2}>
				<IconButton
					onClick={() => {
						setView(true);
					}}
				>
					<GridViewIcon />
				</IconButton>
				<IconButton
					onClick={() => {
						setView(false);
					}}
				>
					<FormatListBulletedIcon />
				</IconButton>
			</Box>
			{view === true ? (
				<>
					<GridCard products={products} />
				</>
			) : (
				<>
					{" "}
					<ListCard products={products} />
				</>
			)}

			<AppPagination
				setProducts={(p) => {
					setProducts(p);
				}}
			/>
		</Box>
	);
}
