import React, { useEffect, useState } from "react";
import "./Checkout.scss";
import AuthNav from "../../components/AuthNav/AuthNav";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { MainAPI } from "../../API";
import { useCart } from "../../components/Context/CartContext/CartContext";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
	const baseUrl = `${MainAPI}/admin/get-all-user`;
	const [users, setUsers] = useState([]);
	const { cartList, coupon } = useCart();
	const nav = useNavigate();

	useEffect(() => {
		fetch(baseUrl)
			.then((res) => res.json())
			.then((data) => setUsers(data.data))
			.catch((err) => console.log(err));
	}, [baseUrl]);

	const userExists = users.find(
		(user) =>
			user.username === localStorage.getItem("username") ||
			user.email === localStorage.getItem("username")
	);

	const calculateSubtotal = (cartList) => {
		return cartList.reduce((subtotal, item) => {
			const itemTotal = item.product.quantity * item.product.price; // Giả sử mỗi item có quantity và price
			return subtotal + itemTotal;
		}, 0);
	};

	const subtotal = calculateSubtotal(cartList);
	const shipping = 20000;
	let total = 0;

	if (coupon && coupon === "MILK2024") {
		total = subtotal + shipping - subtotal * 0.1;
	}

	const formik = useFormik({
		initialValues: {
			name: "",
			email: userExists?.email || "",
			phone: "",
			address: "",
		},

		onSubmit: () => {
			handlePlaceOrder();
		},

		validationSchema: Yup.object({
			name: Yup.string()
				.required("Bắt buộc.")
				.min(3, "Must be 3 characters or more"),
			email: Yup.string()
				.email("Địa chỉ email không hợp lệ.")
				.required("Bắt buộc."),
			phone: Yup.string()
				.required("Bắt buộc.")
				.min(10, "Phải có ít nhất 10 ký tự."),
			address: Yup.string().required("Bắt buộc."),
		}),
	});

	const handlePlaceOrder = async () => {
		try {
			const data = await fetch(`${MainAPI}/user/order`, {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify({
					name: formik.values.name,
					email: formik.values.email,
					phone: formik.values.phone,
					address: formik.values.address,
				}),
			}).then((res) => res.json());

			if (data.status === 200) {
				toast.success("Thanh toán thành công!", {
					onClose: () => {
						nav("/");
					},
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				setTimeout(() => {
					// nav("/");
				}, 3000);
			} else {
				toast.error(
					"Thanh toán thất bại! Vui lòng kiểm tra lại thông tin.",
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
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<AuthNav />
			<Header />
			<div>
				<Breadcrumb>Thanh toán</Breadcrumb>
				<Container className="checkout__container" maxWidth="xl">
					<div className="checkout">
						<h1 className="checkout__title">Thanh toán</h1>
						<Grid container spacing={4} mt={2}>
							<Grid item xs={12} md={7}>
								{/* ===== FORM INFO ===== */}
								<form
									onSubmit={formik.handleSubmit}
									className="checkout__form"
								>
									<h2 className="checkout__form__title">
										Thông tin cá nhân
									</h2>
									<div className="checkout__attention">
										(*) Thông tin bắt buộc
									</div>
									<div className="checkout__form__group">
										<label htmlFor="name">
											Họ và tên <sup>*</sup>
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={formik.values.name}
											onChange={formik.handleChange}
											placeholder="Nhập họ và tên của bạn"
										/>
									</div>
									{formik.touched.name &&
										formik.errors.name && (
											<Typography
												color="error"
												variant="h4"
											>
												{formik.errors.name}
											</Typography>
										)}
									<div className="checkout__form__group">
										<label htmlFor="email">
											Email <sup>*</sup>
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formik.values.email}
											onChange={formik.handleChange}
											placeholder="Nhập email của bạn"
										/>
									</div>
									{formik.touched.email &&
										formik.errors.email && (
											<Typography
												color="error"
												variant="h4"
											>
												{formik.errors.email}
											</Typography>
										)}
									<div className="checkout__form__group">
										<label htmlFor="phone">
											Số điện thoại <sup>*</sup>
										</label>
										<input
											type="text"
											id="phone"
											name="phone"
											value={formik.values.phone}
											onChange={formik.handleChange}
											placeholder="Nhập số điện thoại của bạn"
										/>
									</div>
									{formik.touched.phone &&
										formik.errors.phone && (
											<Typography
												color="error"
												variant="h4"
											>
												{formik.errors.phone}
											</Typography>
										)}
									<div className="checkout__form__group">
										<label htmlFor="address">
											Địa chỉ <sup>*</sup>
										</label>
										<input
											type="text"
											id="address"
											name="address"
											value={formik.values.address}
											onChange={formik.handleChange}
											placeholder="Nhập địa chỉ của bạn"
										/>
									</div>
									{formik.touched.address &&
										formik.errors.address && (
											<Typography
												color="error"
												variant="h4"
											>
												{formik.errors.address}
											</Typography>
										)}
									<div className="checkout__form__group">
										<Button
											type="submit"
											variant="contained"
											sx={{
												fontSize: "1.8rem",
												fontWeight: "bold",
												padding: "10px 20px",
												backgroundColor: "#0F83B2",
												borderRadius: "10px",
												color: "#fff",
												lineHeight: "normal",
												width: "100%",
												"&:hover": {
													color: "#fff",
													backgroundColor: "#0F83B2",
												},
											}}
										>
											Thanh toán
										</Button>
									</div>
								</form>
							</Grid>
							<Grid item xs={12} md={5}>
								<Box className="checkout__order">
									<h2 className="checkout__order__title">
										Thông tin đặt hàng
									</h2>
									{/* ====== ORDER ITEM ====== */}
									{cartList.map((product, item) => (
										<Box
											className="checkout__order__item"
											key={item}
										>
											<Box className="checkout__orderItem__info">
												<Box className="checkout__orderItem__infoImage">
													<img
														src={
															product.product
																.image_url
														}
														alt={
															product.product
																.product_name
														}
													/>
												</Box>
												<Box sx={{ width: "50%" }}>
													<Typography
														component={"h3"}
														sx={{
															fontSize: "2rem",
															wordBreak:
																"break-word",
															fontWeight: "bold",
														}}
													>
														{
															product.product
																.product_name
														}
													</Typography>
													<Typography
														component={"p"}
														sx={{
															fontSize: "1.6rem",
															wordBreak:
																"break-word",
														}}
													>
														Số lượng :{" "}
														{
															product.product
																.quantity
														}
													</Typography>
												</Box>
											</Box>
											<Box
												className="checkout__orderItem__price"
												sx={{
													fontSize: "1.6rem",
													width: "29%",
													textAlign: "right",
													fontWeight: "bold",
												}}
											>
												{`${(
													Number(
														product.product?.price *
															product.product
																.quantity
													) || 0
												).toLocaleString("vi-VN")} VND`}
											</Box>
										</Box>
									))}

									{/* ========= ORDER SUBTOTAL ========= */}
									<Box className="checkout__order__subTotal">
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												width: "100%",
												fontSize: "1.6rem",
											}}
										>
											Subtotal:{" "}
											<Box
												className="checkout__orderItem__price"
												sx={{
													fontSize: "1.6rem",
													width: "29%",
													textAlign: "right",
													fontWeight: "bold",
												}}
											>
												<span
													style={{
														fontWeight: "bold",
													}}
												>
													{subtotal.toLocaleString(
														"vi-VN"
													)}{" "}
													VND
												</span>
											</Box>
										</div>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												fontSize: "1.6rem",
											}}
										>
											Shipping:{" "}
											<Box
												className="checkout__orderItem__price"
												sx={{
													fontSize: "1.6rem",
													width: "29%",
													textAlign: "right",
													fontWeight: "bold",
												}}
											>
												{`${(
													Number(shipping) || 0
												).toLocaleString("vi-VN")} VND`}
											</Box>
										</div>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												fontSize: "1.6rem",
											}}
										>
											Mã giảm giá:{" "}
											<Box
												className="checkout__orderItem__price"
												sx={{
													fontSize: "1.6rem",
													width: "29%",
													textAlign: "right",
													fontWeight: "bold",
												}}
											>
												{coupon && coupon === "MILK2024"
													? "-10%"
													: "0%"}
											</Box>
										</div>
									</Box>

									{/* ========= ORDER TOTAL ========= */}
									<Box className="checkout__order__total">
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												fontSize: "1.6rem",
											}}
										>
											Total:{" "}
											<Box
												className="checkout__orderItem__price"
												sx={{
													fontSize: "1.6rem",
													width: "29%",
													textAlign: "right",
													fontWeight: "bold",
												}}
											>
												{`${(
													Number(total) || 0
												).toLocaleString("vi-VN")} VND`}
											</Box>
										</div>
									</Box>
								</Box>
							</Grid>
						</Grid>
					</div>
				</Container>
			</div>
			<Footer />
		</>
	);
}
