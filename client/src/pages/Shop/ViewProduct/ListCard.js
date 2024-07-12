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
import { useCart } from "../../../components/Context/CartContext/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListCard({ products }) {
	const { addToCart } = useCart();
	const quantity = 1;

	const username = localStorage.getItem("username");

	// Hiển thị số sao
	const Star = ({ rating }) => {
		// Tạo một mảng từ 0 đến 4 (đại diện cho 5 ngôi sao)
		const stars = Array.from({ length: 5 }, (_, index) => {
			// Nếu index nhỏ hơn rating, ngôi sao sẽ có màu, ngược lại sẽ không có màu
			const fill = index < rating ? "#fcc419" : "none";
			// Render SVG hoặc một component tương tự cho mỗi ngôi sao
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					key={index}
					// Change only fill property is enough to change the color of the star
					fill={fill}
					stroke={"#fcc419"}
					style={{
						width: "30px",
						height: "30px",
					}}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="{2}"
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
					/>
				</svg>
			);
		});
		return <div>{stars}</div>;
	};

	return (
		<div>
			{products.map((product) => {
				return (
					<Card
						sx={{ display: "flex", margin: 2, boxShadow: "none" }}
						key={product.product_id}
					>
						<Grid container spacing={3}>
							<Grid item md={3} xs={12}>
								<Box
									className="productList__image"
									height={"220px"}
								>
									<CardMedia
										component="img"
										image={product.image_url}
										alt={product.product_name}
										style={{
											width: "auto",
											height: "100%",
										}}
										loading="lazy"
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
										<Star rating={product.average_rating} />
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
											onClick={() => {
												if (username === null) {
													toast.error(
														"Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!",
														{
															position:
																"top-right",
															autoClose: 3000,
															hideProgressBar: false,
															closeOnClick: true,
															pauseOnHover: true,
															draggable: true,
															progress: undefined,
														}
													);
													return;
												} else {
													toast.success(
														"Thêm mới giỏ hàng thành công!",
														{
															position:
																"top-right",
															autoClose: 3000,
															hideProgressBar: false,
															closeOnClick: true,
															pauseOnHover: true,
															draggable: true,
															progress: undefined,
														}
													);
													addToCart({
														...product,
														quantity,
													});
												}
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
		</div>
	);
}
