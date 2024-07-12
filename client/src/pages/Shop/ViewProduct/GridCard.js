import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	IconButton,
	Rating,
	Typography,
} from "@mui/material";
import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./GridListCard.scss";
import { useCart } from "../../../components/Context/CartContext/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function GridCard({ products }) {
	const { addToCart } = useCart();
	const username = localStorage.getItem("username");
	const quantity = 1;

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
		<>
			<Grid container spacing={2}>
				{products.map((product) => {
					return (
						<Grid item xs={6} md={4} key={product.product_id}>
							<Card
								sx={{
									maxWidth: 345,
									minHeight: 370,
									position: "relative",
									borderRadius: "15px",
								}}
							>
								<Box
									justifyContent={"end"}
									display={"flex"}
									sx={{
										position: "absolute",
										top: "0",
										right: "0",
										width: "100%",
										padding: "0 0 0 8px",
									}}
								>
									<CardActions
										onClick={() => {
											if (username === null) {
												toast.error(
													"Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!",
													{
														position: "top-right",
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
														position: "top-right",
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
										<IconButton aria-label="share">
											<ShoppingCartOutlinedIcon />
										</IconButton>
									</CardActions>
								</Box>
								<Box>
									<Box className="productGrid__image">
										<CardMedia
											component="img"
											image={product.image_url}
											alt="green iguana"
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												width: "auto",
												height: "100%",
											}}
										/>
									</Box>
									<CardContent>
										<Link
											to={`/detail/${product.product_id}`}
										>
											<Typography
												gutterBottom
												className="productList__title"
												component="div"
												variant="h4"
												sx={{
													fontWeight: "700",
													fontSize: "1.8rem",
													color: "#191919",
												}}
											>
												{product.product_name}
											</Typography>
										</Link>
										<Typography
											gutterBottom
											component="div"
											sx={{
												fontWeight: "600",
												fontSize: "1.6rem",
												color: "#171717",
											}}
										>
											{`${product.price.toLocaleString(
												"vi-VN"
											)} VND`}
										</Typography>
										<Typography
											gutterBottom
											component="div"
										>
											<Star
												rating={product.average_rating}
											/>
										</Typography>
									</CardContent>
								</Box>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}
