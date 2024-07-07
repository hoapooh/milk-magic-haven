import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Rating,
	Slider,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import listOfProductCategory from "./Category";
import listOfPopularProduct from "./ListOfPopularProduct";
import "./ProductCategory.scss";

const MAX = 1000000;
const MIN = 200000;
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

export default function ProductCategory({ onSliderChange }) {
	const [val, setVal] = useState(MIN);
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
								key={category}
								control={<Checkbox />}
								label={category}
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
				{listOfPopularProduct.map((product) => {
					return (
						<Card
							key={product.id}
							sx={{ display: "flex", boxShadow: "none" }}
						>
							<Box sx={{ display: "flex", flexDirection: "row" }}>
								<CardMedia
									component="img"
									sx={{ width: 84 }}
									image={product.image}
									alt="Live from space album cover"
								/>
								<CardContent sx={{ flex: "1 0 auto" }}>
									<Typography component="div" variant="p">
										{product.name}
									</Typography>
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
											value={product.rate}
											readOnly
										/>
									</Typography>
								</CardContent>
							</Box>
						</Card>
					);
				})}
			</Box>
		</Box>
	);
}
