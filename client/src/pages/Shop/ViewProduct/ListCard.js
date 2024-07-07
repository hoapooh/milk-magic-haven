import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Rating,
	Typography,
} from "@mui/material";
import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./GridListCard.scss";
import { Link } from "react-router-dom";

export default function ListCard({ products }) {
	return (
		<>
			{products.map((product) => {
				return (
					<Card
						sx={{ display: "flex", margin: 2, boxShadow: "none" }}
						key={product.product_id}
					>
						<Grid container spacing={3}>
							<Grid item md={3} xs={12}>
								<Box className="productList__image">
									<CardMedia
										component="img"
										image={product.image_url}
										alt="Milk product"
										style={{ width: "120px" }}
									/>
								</Box>
							</Grid>

							<Grid item md={9} xs={12}>
								<CardContent sx={{ flex: "1 0 auto" }}>
									<Link to={`/detail/${product.product_id}`}>
										<Typography
											className="productList__title"
											component="div"
											variant="h4"
											sx={{
												fontWeight: "bold",
												fontSize: "2.6rem",
												color: "black",
											}}
										>
											{product.product_name}
										</Typography>
									</Link>
									<Typography
										variant="subtitle1"
										color="text.secondary"
										component="div"
										sx={{
											fontWeight: "400",
											fontSize: "1.8rem",
										}}
									>
										{product.description}
									</Typography>
									<Typography
										gutterBottom
										component="div"
										sx={{
											color: "#2D2D2D",
											fontSize: "1.8rem",
											fontWeight: "600",
										}}
									>
										{`${product.price.toLocaleString(
											"vi-VN"
										)} VND`}
									</Typography>
									<Typography gutterBottom component="div">
										<Rating
											name="read-only"
											value={5}
											readOnly
										/>
									</Typography>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
										}}
									>
										<Button
											variant="contained"
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												gap: 10,
												backgroundColor: "#0f83b2",
												marginRight: 20,
												borderRadius: "15px",
												padding: "10px 20px",
												fontSize: "1.6rem",
											}}
										>
											<ShoppingCartOutlinedIcon /> Add to
											cart
										</Button>
									</Box>
								</CardContent>
							</Grid>
						</Grid>
					</Card>
				);
			})}
		</>
	);
}
