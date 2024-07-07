import React, { useEffect, useState } from "react";

import "./ProductDetail.scss";
import AuthNav from "../../components/AuthNav/AuthNav";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { CiShoppingCart } from "react-icons/ci";
import {
	Container,
	Grid,
	Typography,
	Rating,
	Box,
	ButtonGroup,
	Button,
} from "@mui/material";
import { MainAPI } from "../../API";
import { useParams } from "react-router-dom";

export default function ProductPage() {
	const { id } = useParams();
	const baseURL = `${MainAPI}/product/get-product-by-id/${id}`;
	const [product, setProduct] = useState({});

	useEffect(() => {
		const fetchAPI = () => {
			fetch(baseURL)
				.then((response) => response.json())
				.then((data) => setProduct(data.product))
				.catch((error) => console.log(error));
		};

		fetchAPI();
	}, [baseURL]);

	// Khởi tạo state với giá trị ban đầu là 1
	const [quantity, setQuantity] = useState(1);
	// Khởi tạo state để theo dõi phần tử nào đang được hiển thị
	const [activeSection, setActiveSection] = useState("description");

	// Hàm xử lý khi bấm nút tăng
	const handleIncrease = () => {
		setQuantity((prevQuantity) => prevQuantity + 1);
	};

	// Hàm xử lý khi bấm nút giảm
	const handleDecrease = () => {
		setQuantity((prevQuantity) =>
			prevQuantity > 1 ? prevQuantity - 1 : 1
		);
	};

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

	// <ButtonGroup variant="outlined" aria-label="Basic button group">
	//   <Button onClick={() => handleDecrease(product.id)}>-</Button>
	//   <Button disableRipple>{quantities[product.id] || 0}</Button>
	//   <Button onClick={() => handleIncrease(product.id)}>+</Button>
	// </ButtonGroup>

	// Hàm xử lý khi click vào "Mô tả sản phẩm"
	const handleDescriptionClick = () => {
		setActiveSection(
			activeSection === "description" ? null : "description"
		);
	};

	// Hàm xử lý khi click vào "Đánh giá"
	const handleReviewClick = () => {
		setActiveSection(activeSection === "review" ? null : "review");
	};

	return (
		<>
			<AuthNav />
			<Header />
			<div>
				<Breadcrumb>{product.product_name}</Breadcrumb>
				<Container maxWidth="xl" className="productDetail__container">
					<div className="productDetail">
						<Grid container spacing={2}>
							{/* ======= PRODUCT IMAGE ======= */}
							<Grid item xs={12} md={6}>
								<Box
									className="productDetail__image"
									sx={{
										textAlign: "center",
										padding: "20px 40px",
										height: "400px",
										border: "1px solid #E0E0E0",
										borderRadius: "15px",
									}}
								>
									<img
										src={product.image_url}
										alt={product.product_name}
									/>
								</Box>
							</Grid>

							{/* ======= PRODUCT INFO ======= */}
							<Grid item xs={12} md={6}>
								<h1 className="productDetail__title">
									{product.product_name}
								</h1>
								<Typography
									gutterBottom
									component="p"
									sx={{
										color: "#2D2D2D",
										fontSize: "1.8rem",
										fontWeight: "600",
									}}
								>
									{`${(
										Number(product?.price) || 0
									).toLocaleString("vi-VN")} VND`}
								</Typography>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: "10px",
									}}
								>
									<Rating
										name="read-only"
										value={5}
										readOnly
										sx={{
											fontSize: "2.4rem",
											color: "#FFD700",
										}}
									/>
									<Typography
										component="span"
										fontSize={"1.6rem"}
									>
										(5 đánh giá)
									</Typography>
								</Box>
								<Typography
									component={"p"}
									fontSize={"1.6rem"}
									marginTop={"24px"}
								>
									Duis ultricies lacus sed turpis tincidunt id
									aliquet risus feugiat in ante metus dictum
									at tempor commodo ullamcorper a lacus. Lorem
									ipsum dolor sit amet, consectetur adipiscing
									elit, sed do eiusmod tempor incididunt ut
									labore et dolore magna aliqua.
								</Typography>
								<Box
									component={"div"}
									marginTop={"20px"}
									display={"flex"}
									alignItems={"center"}
									gap={"20px"}
								>
									<ButtonGroup
										variant="outlined"
										aria-label="Basic button group"
									>
										<Button
											onClick={handleDecrease}
											sx={{
												border: "1px solid #0F83B2",
												color: "#000000",
												fontSize: "1.6rem",
												borderRadius: "10px 0 0 10px",
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
											{quantity}
										</Button>
										<Button
											onClick={handleIncrease}
											sx={{
												border: "1px solid #0F83B2",
												color: "#000000",
												fontSize: "1.6rem",
												borderRadius: "0 10px 10px 0",
											}}
										>
											+
										</Button>
									</ButtonGroup>
									<Button
										variant="contained"
										className="productDetail__cartButton"
										style={{
											color: "#fff",
											background: "#0F83B2",
											fontSize: "1.6rem",
											borderRadius: "10px",
											padding: "5px 20px",
										}}
									>
										<CiShoppingCart />
										<span>Thêm vào giỏ hàng</span>
									</Button>
								</Box>
								<Box
									className="productDetail__shortInfo"
									marginTop={2}
								>
									<fieldset>
										<legend>Mô tả ngắn</legend>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<Typography
												fontSize="2rem"
												component={"p"}
											>
												<strong>Thương hiệu:</strong>{" "}
												{product.brand_name}
											</Typography>
											<Typography
												fontSize="2rem"
												component={"p"}
											>
												<strong>Xuất xứ:</strong>{" "}
												{product.country_name}
											</Typography>
										</Box>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												marginTop: "10px",
											}}
										>
											<Typography
												fontSize="2rem"
												component={"p"}
											>
												<strong>Độ tuổi:</strong>{" "}
												{product.age_range}
											</Typography>
										</Box>
									</fieldset>
								</Box>
							</Grid>
						</Grid>
						<Box className="productDetail__description">
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: "50px",
								}}
							>
								<Typography
									component={"a"}
									fontSize={"2.4rem"}
									color={"#0F83B2"}
									sx={{
										position: "relative",
										textDecoration: "none",
										color:
											activeSection === "description"
												? "#0F83B2"
												: "initial",
										"&::after": {
											content: '""',
											position: "absolute",
											bottom: 0,
											left: "50%",
											transform: "translateX(-50%)",
											width:
												activeSection === "description"
													? "100%"
													: "0%",
											height: "3px",
											backgroundColor: "#0F83B2",
											transition: "width .3s ease",
										},
										"&:hover::after": {
											width: "100%",
										},
									}}
									onClick={handleDescriptionClick}
								>
									Mô tả sản phẩm
								</Typography>
								<Typography
									component={"a"}
									fontSize={"2.4rem"}
									sx={{
										position: "relative",
										textDecoration: "none",
										color:
											activeSection === "review"
												? "#0F83B2"
												: "initial",
										"&::after": {
											content: '""',
											position: "absolute",
											bottom: 0,
											left: "50%",
											transform: "translateX(-50%)",
											width:
												activeSection === "review"
													? "100%"
													: "0%",
											height: "3px",
											backgroundColor: "#0F83B2",
											transition: "width .3s ease",
										},
										"&:hover::after": {
											width: "100%",
										},
									}}
									onClick={handleReviewClick}
								>
									Đánh giá (29)
								</Typography>
							</Box>
							<Box
								className="productDetail__descriptionInfo"
								sx={{
									marginTop: "45px",
									display:
										activeSection === "description"
											? ""
											: "none",
								}}
							>
								<Typography
									component={"p"}
									textAlign={"center"}
									fontSize={"2rem"}
								>
									{product.description}
								</Typography>
							</Box>
							<Box
								className="productDetail__descriptionReview"
								sx={{
									marginTop: "45px",
									display:
										activeSection === "review"
											? ""
											: "none",
								}}
							>
								<Typography component={"p"} fontSize={"2rem"}>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit, sed do eiusmod tempor ut
									labore et dolore magna aliqua. Ut enim ad
									minim veniam, quis nostrud exercitation
									ullamco laboris nisi ut aliquip ex ea
									commodo consequat. Lorem ipsum dolor sit
									amet, consectetur adipiscing elit, sed do
									eiusmod tempor ut labore et dolore magna
									aliqua. Ut enim ad minim veniam, quis
									nostrud exercitation ullamco laboris nisi ut
									aliquip ex ea commodo consequat.
								</Typography>
							</Box>
						</Box>
					</div>
				</Container>
			</div>
			<Footer />
		</>
	);
}
