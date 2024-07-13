import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./Rate.scss";
import { Container } from "@mui/material";
import { MainAPI } from "../../../API";
import Slider from "react-slick";

export default function Rate() {
	const baseUrl = `${MainAPI}/user/get-good-review`;
	const [reviews, setReviews] = React.useState([]);

	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
	};

	useEffect(() => {
		fetch(baseUrl)
			.then((res) => res.json())
			.then((data) => {
				setReviews(data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [baseUrl]);

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
		<Container
			maxWidth="xl"
			sx={{
				background: "#b8e9f5",
				padding: "20px 0 50px",
				marginTop: "50px",
				borderRadius: "15px",
			}}
		>
			<div style={{ width: "1280px", margin: "0 auto" }}>
				<Typography
					variant="h3"
					component="h3"
					mb={3}
					align="center"
					sx={{
						fontFamily: "Chalkboard SE",
					}}
				>
					Hear from Other Happy Parents
				</Typography>

				<Slider {...settings}>
					{reviews.map((review) => (
						<Box key={review.review_id}>
							<div className="rate_detail">
								<Star rating={review.rating} />
								<p
									style={{
										fontSize: "2.2rem",
										fontWeight: "bold",
									}}
								>
									{review.product_name}
								</p>
								<div
									className="info"
									style={{
										color: "#0f83b2",
										fontSize: "2.6rem",
									}}
								>
									<p
										style={{
											fontWeight: "bold",
										}}
									>
										{review.username}
									</p>
								</div>
							</div>
						</Box>
					))}
				</Slider>
			</div>
		</Container>
	);
}
