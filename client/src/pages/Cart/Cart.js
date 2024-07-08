import React from "react";
import AuthNav from "../../components/AuthNav/AuthNav";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
	Box,
	Button,
	ButtonGroup,
	Container,
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import "./Cart.scss";
import { HiMiniXMark } from "react-icons/hi2";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { Link } from "react-router-dom";
import { useCart } from "../../components/Context/CartContext/CartContext";

export default function Cart() {
	const { cartList, handleIncrease, handleDecrease, handleDeleteProduct } =
		useCart();

	const calculateSubtotal = (cartList) => {
		return cartList.reduce((subtotal, item) => {
			const itemTotal = item.product.quantity * item.product.price; // Giả sử mỗi item có quantity và price
			return subtotal + itemTotal;
		}, 0);
	};

	const subtotal = calculateSubtotal(cartList);
	// CÁI NÀY DÙNG CHO CART

	// const [quantity, setQuantity] = useState({});

	// const handleIncrease = (id) => {
	// 	setQuantity((prevQuantities) => ({
	// 		...prevQuantities,
	// 		[id]: (prevQuantities[id] || 0) + 1,
	// 	}));
	// };

	// const handleDecrease = (id) => {
	// 	setQuantity((prevQuantities) => ({
	// 		...prevQuantities,
	// 		[id]: Math.max((prevQuantities[id] || 0) - 1, 0), // Đảm bảo số lượng không âm
	// 	}));
	// };

	return (
		<>
			<AuthNav />
			<Header />
			<div>
				<Container className="cart__container" maxWidth="xl">
					<div className="cart">
						<h1 className="cart__title">Giỏ hàng</h1>
						<TableContainer component={Paper}>
							<Table className="cart__table">
								<TableHead sx={{ background: "#EAEAEA" }}>
									<TableRow>
										<TableCell sx={{ fontSize: "2.4rem" }}>
											Tên sản phẩm
										</TableCell>
										<TableCell sx={{ fontSize: "2.4rem" }}>
											Giá
										</TableCell>
										<TableCell sx={{ fontSize: "2.4rem" }}>
											Số lượng
										</TableCell>
										<TableCell
											sx={{
												fontSize: "2.4rem",
												textAlign: "center",
											}}
										>
											Thành tiền
										</TableCell>
										<TableCell
											sx={{
												fontSize: "2.4rem",
												textAlign: "center",
											}}
										>
											Hành động
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{/* ========== CART ITEM ========== */}
									{cartList.map((product, index) => (
										<TableRow>
											<TableCell
												sx={{
													width: "530px",
													padding: "40px 16px",
												}}
												key={index}
											>
												<div className="cart__productImage__productName">
													<div className="cart__productImage">
														<img
															src={
																product.product
																	.image_url
															}
															alt="fox with snow"
														/>
													</div>{" "}
													<Typography
														component={"p"}
														sx={{
															fontSize: "2rem",
															wordBreak:
																"break-word",
															width: "50%",
														}}
													>
														{
															product.product
																.product_name
														}
													</Typography>
												</div>
											</TableCell>
											<TableCell
												sx={{
													fontSize: "2rem",
													padding: "40px 16px",
												}}
											>
												{`${(
													Number(
														product.product?.price
													) || 0
												).toLocaleString("vi-VN")} VND`}
											</TableCell>
											<TableCell
												sx={{
													fontSize: "2rem",
													padding: "40px 16px",
												}}
											>
												<ButtonGroup
													variant="outlined"
													aria-label="Basic button group"
												>
													<Button
														onClick={
															() =>
																handleDecrease(
																	product
																		.product
																		.product_id
																)
															//THAY CHỖ NÀY THÀNH product.product_id là được
														}
														sx={{
															border: "1px solid #0F83B2",
															color: "#000000",
															fontSize: "1.6rem",
															borderRadius:
																"10px 0 0 10px",
														}}
													>
														-
													</Button>
													<Button
														className="productDetail__quantity"
														disableRipple
														sx={{
															border: "1px solid #0F83B2",
															color: "#000000",
															fontSize: "1.6rem",
															width: "40px",
														}}
													>
														{
															product.product
																.quantity
														}
														{/*THAY CHỖ NÀY THÀNH product.product_id*/}
													</Button>
													<Button
														onClick={
															() =>
																handleIncrease(
																	product
																		.product
																		.product_id
																)
															//THAY CHỖ NÀY THÀNH product.product_id là được
														}
														sx={{
															border: "1px solid #0F83B2",
															color: "#000000",
															fontSize: "1.6rem",
															borderRadius:
																"0 10px 10px 0",
														}}
													>
														+
													</Button>
												</ButtonGroup>
											</TableCell>
											<TableCell
												sx={{
													fontSize: "2rem",
													padding: "40px 16px",
													textAlign: "center",
												}}
											>
												{`${(
													Number(
														product.product?.price *
															product.product
																.quantity
													) || 0
												).toLocaleString("vi-VN")} VND`}
											</TableCell>
											<TableCell
												sx={{
													padding: "40px 16px",
													textAlign: "center",
												}}
											>
												<Button
													sx={{
														fontSize: "2.4rem",
														fontWeight: "bold",
														color: "#7F7F7F",
														padding: "10px 20px",
														minWidth: "auto",
														"&:hover": {
															color: "#fff",
															backgroundColor:
																"tomato",
														},
													}}
													onClick={() =>
														handleDeleteProduct(
															product.product
																.product_id
														)
													}
												>
													<HiMiniXMark />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<Box
							className="cart__coupon__continueShop"
							display={"flex"}
							justifyContent={"space-between"}
						>
							<Box component={"div"}>
								<FormControl>
									<InputLabel htmlFor="outlined-adornment-mã_giảm_giá">
										Mã giảm giá
									</InputLabel>
									<OutlinedInput
										style={{
											borderRadius: "10px",
											width: "340px",
										}}
										id="outlined-adornment-mã_giảm_giá"
										endAdornment={
											<InputAdornment position="end">
												<LoyaltyIcon fontSize="large" />
											</InputAdornment>
										}
										name="mã_giảm_giá"
										label="mã_giảm_giá"
									/>
								</FormControl>
								<Button
									variant="contained"
									sx={{
										fontSize: "1.8rem",
										fontWeight: "bold",
										padding: "10px 20px",
										backgroundColor: "#0F83B2",
										borderRadius: "10px",
										color: "#fff",
										lineHeight: "normal",
										minWidth: "auto",
										marginLeft: "20px",
										"&:hover": {
											color: "#fff",
											backgroundColor: "#0F83B2",
										},
									}}
								>
									Áp dụng
								</Button>
							</Box>
							<Link to={"/shop"}>
								<Button
									sx={{
										fontSize: "1.8rem",
										fontWeight: "bold",
										padding: "10px 20px",
										backgroundColor: "#EAEAEA",
										borderRadius: "10px",
										lineHeight: "normal",
										minWidth: "auto",
										"&:hover": {
											color: "#fff",
											backgroundColor: "#0F83B2",
										},
									}}
								>
									Tiếp tục mua sắm
								</Button>
							</Link>
						</Box>
						<Box
							component={"div"}
							display={"flex"}
							justifyContent={"flex-end"}
						>
							<Box
								component={"div"}
								width={"460px"}
								sx={{
									marginTop: "80px",
									padding: "20px",
									borderRadius: "15px",
									border: "1px solid #EAEAEA",
								}}
							>
								<Typography
									component={"h3"}
									sx={{
										fontSize: "2.4rem",
										fontWeight: "bold",
									}}
								>
									Tổng giá trị đơn hàng
								</Typography>
								<Typography
									component={"p"}
									display={"flex"}
									justifyContent={"space-between"}
									sx={{
										fontSize: "1.8rem",
										marginTop: "36px",
										marginBottom: "24px",
									}}
								>
									Subtotal{" "}
									<span style={{ fontWeight: "bold" }}>
										{subtotal.toLocaleString("vi-VN")} VND
									</span>
								</Typography>
								<Typography
									component={"p"}
									display={"flex"}
									justifyContent={"space-between"}
									sx={{
										fontSize: "1.8rem",
										marginBottom: "36px",
									}}
								>
									Total{" "}
									<span style={{ fontWeight: "bold" }}>
										éo có
									</span>
								</Typography>
								<Button
									variant="contained"
									fullWidth
									sx={{
										fontSize: "1.8rem",
										padding: "10px 20px",
										backgroundColor: "#FFE926",
										borderRadius: "10px",
										color: "#191919",
										lineHeight: "normal",
										minWidth: "auto",
										"&:hover": {
											color: "#191919",
											backgroundColor: "#FFE926",
										},
									}}
								>
									Tiếp tục thanh toán
								</Button>
							</Box>
						</Box>
					</div>
				</Container>
			</div>
			<Footer />
		</>
	);
}
