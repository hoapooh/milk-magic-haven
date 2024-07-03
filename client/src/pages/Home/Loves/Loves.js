import React from "react";
import "./Loves.scss";
import { listLoves } from "./GetLoves";
import Grid from "@mui/material/Grid";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";

export default function Loves() {
	return (
		<Container>
			<Typography
				variant="h3"
				component="h3"
				mt={5}
				align="center"
				sx={{
					fontFamily: "Chalkboard SE",
					// fontWeight: '700px'
				}}
			>
				Customer Loves
			</Typography>

			<Typography
				align="center"
				sx={{
					fontFamily: "Comfortaa",
					fontSize: "15px",
				}}
			>
				Popular product
			</Typography>

			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{listLoves.map((love, index) => (
					<Grid item md={3} key={index}>
						<div className="love_detail">
							<div
								style={{
									position: "relative",
									top: "50%",
									left: "50%",
									display: "flex",
									fontSize: "13px",
									cursor: "pointer",
								}}
							>
								<div
									style={{
										transform: "translate(500%, 130%)",
									}}
								>
									<FavoriteBorderOutlinedIcon />
									<br />
									<ShoppingCartOutlinedIcon />
								</div>

								{love.sale === true && (
									<>
										<p
											style={{
												transform:
													"translate(-250%, 240%)",
												width: "50px",
												maxHeight: "20px",
												border: "1px solid #F27373",
												textAlign: "center",
												borderRadius: "10px",
												color: "white",
												backgroundColor: "#F27373",
											}}
										>
											sale
										</p>
									</>
								)}
							</div>

							<img src={love.img} alt={love.name} />
						</div>

						<div>
							<div>
								<p style={{ fontSize: "20px" }}>{love.name}</p>
							</div>
							<div>
								{love.reprice !== undefined && (
									<div>
										<span
											style={{
												color: "#25BF0C",
												fontSize: "15px",
											}}
										>
											{love.reprice}&nbsp;&nbsp;
										</span>
										<span
											style={{
												textDecoration: "line-through",
												fontSize: "12px",
												color: "#9d9999",
											}}
										>
											{love.price}
										</span>
									</div>
								)}
								{love.reprice === undefined && (
									<span style={{ fontSize: "15px" }}>
										{love.price}
									</span>
								)}
							</div>

							<div style={{ color: "orange", fontSize: "20px" }}>
								{love.rate}
							</div>
						</div>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
