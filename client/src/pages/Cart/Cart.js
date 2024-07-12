import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../components/Context/CartContext/CartContext";
import { toast } from "react-toastify";
import { MainAPI } from "../../API";

export default function Cart() {
	const {
		cartList,
		handleIncrease,
		handleDecrease,
		handleDeleteProduct,
		coupon,
		applyCoupon,
	} = useCart();
	const nav = useNavigate();
	const [total, setTotal] = useState(0);
	const [couponFetch, setCouponFetch] = useState([]);
	const [couponInput, setCouponInput] = useState("");
	const [isApplied, setIsApplied] = useState(false);
	const [disRate, setDisRate] = useState(0);

	const calculateSubtotal = (cartList) => {
		return cartList.reduce((subtotal, item) => {
			const itemTotal = item.product.quantity * item.product.price;
			return subtotal + itemTotal;
		}, 0);
	};

	const subtotal = calculateSubtotal(cartList);

	// Hàm để cập nhật giá trị mã giảm giá
	const handleCouponChange = (event) => {
		setCouponInput(event.target.value);
	};

	useEffect(() => {
		fetch(`${MainAPI}/user/get-all-voucher`)
			.then((response) => {
				if (!response.ok) throw new Error("Failed to delete product");
				return response.json();
			})
			.then((data) => {
				setCouponFetch(data.data);
			})
			.catch((error) => {
				console.error("Error fetching data product:", error);
			});
	}, []);

	useEffect(() => {
		// Tính toán lại tổng tiền khi cartList hoặc coupon thay đổi
		if (coupon) {
			setIsApplied(true);
		} else {
			setIsApplied(false);
		}
	}, [cartList, coupon, subtotal]);

	// Hàm để áp dụng mã giảm giá và cập nhật subtotal
	const applyDiscount = (discountCode) => {
		// Giả sử mã giảm giá "MILK2024" giảm 10%
		if (
			couponFetch.find((co) => {
				return co.code === discountCode;
			})
		) {
			const discountRate = couponFetch.find((co) => {
				return co.code === discountCode;
			}).discount;
			console.log(discountRate);
			setDisRate(discountRate);
			const discountedPrice = subtotal - (subtotal * discountRate) / 100; // Giảm giá 10%
			setTotal(discountedPrice);
			applyCoupon(discountRate);
			toast.success("Áp dụng mã giảm giá thành công!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error("Mã giảm giá không hợp lệ!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	useEffect(() => {
		setTotal(calculateSubtotal(cartList));
	}, [cartList]);

	function handleLinkCheckout() {
		nav("/checkout");
		setIsApplied(false);
	}

	return (
		<>
			<AuthNav />
			<Header />
			<div>
				<Container className="cart__container" maxWidth="xl">
					<div className="cart">
						<h1 className="cart__title">Giỏ hàng</h1>
						{/* KIỂM TRA XEM GIỎ HÀNG CÓ TRỐNG HAY KHÔNG */}
						{cartList.length === 0 ? (
							<Box
								display={"flex"}
								justifyContent={"center"}
								flexDirection={"column"}
								alignItems={"center"}
								gap={"20px"}
							>
								<img
									src="/assets/images/empty-cart.png"
									alt="empty-cart"
								/>
								<Typography
									component={"p"}
									sx={{ fontSize: "2.4rem" }}
								>
									Giỏ hàng của bạn đang trống. Hãy tiếp tục
									mua sắm để tìm một sản phầm phù hợp.
								</Typography>
								<Link to={"/shop"}>
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
										Tiếp tục mua sắm
									</Button>
								</Link>
							</Box>
						) : (
							<>
								{/* ======= TABLE ======= */}
								<TableContainer component={Paper}>
									<Table className="cart__table">
										<TableHead
											sx={{ background: "#EAEAEA" }}
										>
											<TableRow>
												<TableCell
													sx={{ fontSize: "2.4rem" }}
												>
													Tên sản phẩm
												</TableCell>
												<TableCell
													sx={{ fontSize: "2.4rem" }}
												>
													Giá
												</TableCell>
												<TableCell
													sx={{ fontSize: "2.4rem" }}
												>
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
															padding:
																"40px 16px",
														}}
														key={index}
													>
														<div className="cart__productImage__productName">
															<div className="cart__productImage">
																<img
																	src={
																		product
																			.product
																			.image_url
																	}
																	alt={
																		product
																			.product
																			.product_name
																	}
																/>
															</div>{" "}
															<Typography
																component={"p"}
																sx={{
																	fontSize:
																		"2rem",
																	wordBreak:
																		"break-word",
																	width: "50%",
																}}
															>
																{
																	product
																		.product
																		.product_name
																}
															</Typography>
														</div>
													</TableCell>
													<TableCell
														sx={{
															fontSize: "2rem",
															padding:
																"40px 16px",
														}}
													>
														{`${(
															Number(
																product.product
																	?.price
															) || 0
														).toLocaleString(
															"vi-VN"
														)} VND`}
													</TableCell>
													<TableCell
														sx={{
															fontSize: "2rem",
															padding:
																"40px 16px",
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
																	fontSize:
																		"1.6rem",
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
																	fontSize:
																		"1.6rem",
																	width: "40px",
																}}
															>
																{
																	product
																		.product
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
																	fontSize:
																		"1.6rem",
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
															padding:
																"40px 16px",
															textAlign: "center",
														}}
													>
														{`${(
															Number(
																product.product
																	?.price *
																	product
																		.product
																		.quantity
															) || 0
														).toLocaleString(
															"vi-VN"
														)} VND`}
													</TableCell>
													<TableCell
														sx={{
															padding:
																"40px 16px",
															textAlign: "center",
														}}
													>
														<Button
															sx={{
																fontSize:
																	"2.4rem",
																fontWeight:
																	"bold",
																color: "#7F7F7F",
																padding:
																	"10px 20px",
																minWidth:
																	"auto",
																"&:hover": {
																	color: "#fff",
																	backgroundColor:
																		"tomato",
																},
															}}
															onClick={() =>
																handleDeleteProduct(
																	product
																		.product
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

								{/* ======= COUPON ======= */}
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
												value={couponInput}
												onChange={handleCouponChange}
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
											onClick={() =>
												applyDiscount(couponInput)
											}
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

								{/* ======= TOTAL PRICE SECTION ======= */}
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
											<span
												style={{ fontWeight: "bold" }}
											>
												{subtotal.toLocaleString(
													"vi-VN"
												)}{" "}
												VND
											</span>
										</Typography>
										{isApplied && (
											<Typography
												component={"p"}
												display={"flex"}
												justifyContent={"space-between"}
												sx={{
													fontSize: "1.8rem",
													marginBottom: "24px",
												}}
											>
												Mã giảm giá{" "}
												<span
													style={{
														fontWeight: "bold",
													}}
												>
													{disRate
														? `-${disRate}%`
														: "0%"}
												</span>
											</Typography>
										)}
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
											<span
												style={{ fontWeight: "bold" }}
											>
												{total.toLocaleString("vi-VN")}{" "}
												VND
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
											onClick={handleLinkCheckout}
										>
											Tiếp tục thanh toán
										</Button>
									</Box>
								</Box>
							</>
						)}
					</div>
				</Container>
			</div>
			<Footer />
		</>
	);
}
