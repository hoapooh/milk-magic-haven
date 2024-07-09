import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Grid,
	Rating,
	Slider,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import listOfProductCategory from "./Category";
import "./ProductCategory.scss";
import { MainAPI } from "../../../API";
import { Link } from "react-router-dom";

const MAX = 1000000;
const MIN = 300000;
const marks = [
	{
		value: MIN,
		label: "",
	},
	{
		value: MAX,
		label: "",
	},
];

export default function ProductCategory({ onSliderChange, onCategoryChange }) {
	const [val, setVal] = useState(MIN);
	const baseURL = `${MainAPI}/admin/dashboard`;
	const [popularProduct, setPopularProduct] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(baseURL);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setPopularProduct(data.topProduct);
			} catch (error) {
				console.error("Fetching error: ", error);
			}
		};

		fetchData();
	}, [baseURL]);

	const handleChange = (_, newValue) => {
		setVal(newValue);
	};

	const handleSliderValueChange = (event, newValue) => {
		onSliderChange(newValue);
	};

	return (
		<Box className="product-category-container">
			<Box className="category">
				<h3>Product categories</h3>
				<FormGroup>
					{listOfProductCategory.map((category) => {
						return (
							<FormControlLabel
								key={category.id}
								control={
									<Checkbox
										onChange={(e) => {
											onCategoryChange(
												category.id,
												e.target.checked
											);
										}}
									/>
								}
								label={category.name}
							/>
						);
					})}
				</FormGroup>
			</Box>
			<Box className="filter">
				<h3>Filter by price</h3>
				<Box className="price-range">
					<Slider
						defaultValue={MAX}
						onChangeCommitted={handleSliderValueChange}
						marks={marks}
						step={100000}
						value={val}
						valueLabelDisplay="auto"
						min={MIN}
						max={MAX}
						onChange={handleChange}
						style={{ color: "#0f83b2", height: 6 }}
					/>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Typography
							variant="body2"
							onClick={() => setVal(MIN)}
							sx={{ cursor: "pointer" }}
						>
							{MIN.toLocaleString("vi-VN")} VND
						</Typography>
						<Typography
							variant="body2"
							onClick={() => setVal(MAX)}
							sx={{ cursor: "pointer" }}
						>
							{MAX.toLocaleString("vi-VN")} VND
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box className="popular-product">
				<h3>Popular products</h3>
				{popularProduct.map((product) => {
					return (
						<Card
							key={product.product_id}
							sx={{ display: "flex", boxShadow: "none" }}
						>
							<Grid container>
								<Grid item xs={12} md={4}>
									<Box
										component={"div"}
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											width: "84px",
											height: "84px",
											padding: "5px",
											border: "1px solid #d4d4d4",
											borderRadius: "15px",
										}}
									>
										<CardMedia
											component="img"
											sx={{
												width: "auto",
												height: "100%",
											}}
											image={product.image_url}
											alt={product.product_name}
										/>
									</Box>
								</Grid>
								<Grid item xs={12} md={8}>
									<CardContent
										sx={{
											padding: "5px 10px",
											"&:last-child": {
												paddingBottom: "5px",
											},
										}}
									>
										<Link
											to={`/detail/${product.product_id}`}
										>
											<Typography
												className="productList__title"
												component="div"
												variant="p"
												sx={{
													fontWeight: "bold",
													fontSize: "2.6rem",
													color: "black",
													wordWrap: "break-word",
												}}
											>
												{product.product_name}
											</Typography>
										</Link>
										<Typography
											variant="subtitle1"
											color="text.secondary"
											component="div"
										>
											{product.price}
										</Typography>
										<Typography component="div" variant="p">
											<Rating
												name="read-only"
												value={5}
												readOnly
											/>
										</Typography>
									</CardContent>
								</Grid>
							</Grid>
						</Card>
					);
				})}
			</Box>
		</Box>
	);
}
