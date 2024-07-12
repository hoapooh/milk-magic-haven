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
import { useCart } from "../../components/Context/CartContext/CartContext";
import { toast } from "react-toastify";
import StarRating from "./StarRating";
import "react-toastify/dist/ReactToastify.css";

export default function ProductPage() {
	const { addToCart } = useCart();
	const { id } = useParams();
	const baseURL = `${MainAPI}/product/get-product-by-id/${id}`;
	const [product, setProduct] = useState({});
	const username = JSON.parse(localStorage.getItem("username"));
	const [rating, setRating] = useState(0);

	console.log(product);

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

	const Star = ({ rating }) => {
		let comment = "";
		if (rating === 1) {
			comment = "Rất tệ";
		} else if (rating === 2) {
			comment = "Tệ";
		} else if (rating === 3) {
			comment = "Ổn";
		} else if (rating === 4) {
			comment = "Tốt";
		} else if (rating === 5) {
			comment = "Tuyệt vời";
		}

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
		return (
			<div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
				<span>{stars}</span>{" "}
				<span style={{ fontSize: "2rem", color: "#fcc419" }}>
					{comment}
				</span>
			</div>
		);
	};

	async function handleReview() {
		// Địa chỉ của API endpoint
		const apiUrl = `${MainAPI}/user/review-product`;

		if (rating === 0) {
			toast.warn("Vui lòng đánh giá ít nhất 1 sao!", {
				position: "top-right",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return;
		}

		try {
			// Thực hiện fetch request
			const response = await fetch(apiUrl, {
				method: "POST", // Phương thức HTTP
				headers: {
					"Content-Type": "application/json",
					"x-access-token": localStorage.getItem("accessToken"),
				},
				body: JSON.stringify({
					user_id: username.user_id,
					product_id: product.product_id,
					rating: rating,
				}), // Dữ liệu được gửi trong request
			});

			// Chuyển đổi response sang dạng JSON
			const result = await response.json();
			console.log(result);

			// Xử lý kết quả
			if (response.ok) {
				toast.success("Đánh giá thành công!", {
					position: "top-right",
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				toast.error("Đánh giá thất bại! Vui lòng thử lại.", {
					position: "top-right",
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				console.error("Failed to add review:", result.message);
			}
		} catch (error) {
			console.error("Error during fetch:", error);
		}
	}

	console.log(product.product_id);

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
								<Typography
									component={"div"}
									fontSize={"2rem"}
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: "10px",
										padding: "20px 0",
										borderRadius: "15px",
										boxShadow:
											"0 0 10px 0 rgba(0, 0, 0, 0.1)",
									}}
								>
									<StarRating
										maxRating={5}
										messages={[
											"Rất tệ",
											"Tệ",
											"Ổn",
											"Tốt",
											"Tuyệt vời",
										]}
										rating={rating}
										setRating={setRating}
									/>
									<Button
										type="submit"
										variant="contained"
										size="large"
										style={{
											backgroundColor: "#0f83b2",
											fontSize: "2rem",
											padding: "10px 20px",
											borderRadius: "10px",
										}}
										onClick={handleReview}
									>
										Gửi đánh giá
									</Button>
								</Typography>
								<Box
									sx={{
										marginTop: "20px",
										borderBottom: "1px solid #EAEAEA",
										padding: "10px 0",
									}}
								>
									<Typography
										component={"p"}
										fontSize={"2.4rem"}
										color={"#0F83B2"}
										fontWeight={"bold"}
									>
										hehe
									</Typography>
									<Star rating={2} />
								</Box>
							</Box>
						</Box>
					</div>
				</Container>
			</div>
			<Footer />
		</>
	);
}
