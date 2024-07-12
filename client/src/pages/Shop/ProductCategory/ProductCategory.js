import {
	Box,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Slider,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import listOfProductCategory from "./Category";
import "./ProductCategory.scss";

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
		</Box>
	);
}
