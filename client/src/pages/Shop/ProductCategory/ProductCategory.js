import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Checkbox,
	Container,
	FormControlLabel,
	FormGroup,
	IconButton,
	Rating,
	Slider,
	Typography,
} from "@mui/material";
import React from "react";
import listOfProductCategory from "./Category";
import listOfPopularProduct from "./ListOfPopularProduct";
import "./ProductCategory.scss";

const MAX = 200;
const MIN = 20;
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

export default function ProductCategory() {
	const [val, setVal] = React.useState(MIN);
	const handleChange = (_, newValue) => {
		setVal(newValue);
	};

	return (
		<Box className="product-category-container">
			<Box className="category">
				<h3>Product categories</h3>
				<FormGroup>
					{listOfProductCategory.map((category) => {
						return (
							<FormControlLabel
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
					<Box sx={{ width: 250 }}>
						<Slider
							marks={marks}
							step={10}
							value={val}
							valueLabelDisplay="auto"
							min={MIN}
							max={MAX}
							onChange={handleChange}
							style={{ color: "#0f83b2" }}
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
								${MIN}.00
							</Typography>
							<Typography
								variant="body2"
								onClick={() => setVal(MAX)}
								sx={{ cursor: "pointer" }}
							>
								${MAX}.00
							</Typography>
						</Box>
					</Box>
					<Box className="btn">
						<Button
							variant="contained"
							style={{ backgroundColor: "#0f83b2" }}
						>
							Apply
						</Button>
					</Box>
				</Box>
			</Box>
			<Box className="popular-product">
				<h3>Popular products</h3>
				{listOfPopularProduct.map((product) => {
					return (
						<Card sx={{ display: "flex", boxShadow: "none" }}>
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
