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

	return (
		<>
			<Grid container spacing={2}>
				{products.map((product) => {
					return (
						<Grid item xs={6} md={4} key={product.product_id}>
							<Card
								sx={{
									maxWidth: 345,
									minHeight: 330,
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
										{/* == DÙNG ĐỂ HIỂN THỊ GIÁ TIỀN GIẢM GIÁ HOCWJ KO == */}
										{/* {!product.sale ? (
											<Typography
												gutterBottom
												component="div"
											>
												{`${product.price.toLocaleString(
													"vi-VN"
												)} VND`}
											</Typography>
										) : (
											<Box display={"flex"}>
												<Typography
													gutterBottom
													component="div"
													color={"green"}
												>
													{product.salePrice}
												</Typography>
												<Typography
													gutterBottom
													component="div"
													fontSize={13}
													style={{
														textDecoration:
															"line-through",
														marginLeft: 5,
														color: "gray",
													}}
												>
													{product.originPrice}
												</Typography>
											</Box>
										)} */}
										<Typography
											gutterBottom
											component="div"
										>
											<Rating
												name="read-only"
												value={5}
												readOnly
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
