import React from "react";
import "./Banner.scss";
import Grid from "@mui/material/Grid";
import { Box, Typography, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { yellow, pink } from "@mui/material/colors";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Banner() {
	const theme = createTheme({
		palette: {
			primary: yellow,
			secondary: pink,
		},
	});

	return (
		<Container maxWidth="xl">
			<ThemeProvider theme={theme}>
				<div style={{ width: "1280px", margin: "0 auto" }}>
					<Grid container spacing={4} mt={5}>
						<Grid item md={6} sx={{ maxHeight: "400px" }}>
							<div className="banner">
								<img
									src="assets/images/banner-left.png"
									alt="adv"
								/>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="331"
									height="178"
									viewBox="0 0 331 178"
									fill="none"
								>
									<path
										d="M326.14 144.826C326.14 144.826 324.201 166.159 271.406 176.808C250.486 181.03 63.0232 173.015 38.4722 168.821C-28.4512 157.389 6.52898 33.2706 34.4275 16.4099C62.326 -0.450655 192.328 -1.5599 240.857 1.1023C291.374 3.87542 320.605 18.8503 328.108 72.538C335.61 126.226 326.147 144.826 326.147 144.826H326.14Z"
										fill="white"
									/>
								</svg>

								<Typography
									variant="h2"
									component="h2"
									sx={{
										position: "absolute",
										top: "50%",
										left: "50%",
										transform: "translate(-50%, -50%)",
										color: "#1096B5",
										fontFamily: "Chalkboard SE",
										zIndex: "4",
										textAlign: "center",
									}}
								>
									Experience the <br /> Pure Joy of Milk
								</Typography>
							</div>
						</Grid>
						<Grid item md={6} sx={{ maxHeight: "400px" }}>
							<div className="banner">
								<img
									src="assets/images/banner-right.jpg"
									alt="adv"
								/>

								<Box
									sx={{
										position: "absolute",
										top: "35%",
										left: "50%",
										transform: "translate(-50%, -30%)",
										color: "#1096B5",
										fontFamily: "Baloo Bhaina 2",
									}}
								>
									<Typography
										variant="h3"
										component="h3"
										sx={{
											fontFamily: "Chalkboard SE",
											color: "#1096B5",
											fontWeight: "bold",
										}}
									>
										Nature's Best Milk"
									</Typography>

									<Typography
										variant="h5"
										mt={2}
										sx={{
											width: "270px",
											color: "black",
										}}
									>
										Flash sale 30%, Extra discount for loyal
										customers
									</Typography>

									<Box mt={3}>
										<Link to={"/shop"}>
											<Button
												variant="contained"
												sx={{
													padding: "10px 20px",
													borderRadius: "20px",
													fontSize: "12px",
													fontWeight: "bold",
													color: "black",
												}}
											>
												Mua sắm ngay
											</Button>
										</Link>
									</Box>
								</Box>
							</div>
						</Grid>
					</Grid>
				</div>
			</ThemeProvider>
		</Container>
	);
}
