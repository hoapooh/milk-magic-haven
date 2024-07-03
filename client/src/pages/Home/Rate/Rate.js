import { Typography } from "@mui/material";
import React from "react";
import { listRate } from "./GetRate";
import Grid from "@mui/material/Grid";
import "./Rate.scss";
import { Container } from "@mui/material";

export default function Rate() {
	return (
		<Container>
			<Typography
				variant="h3"
				component="h3"
				mt={5}
				align="center"
				sx={{
					fontFamily: "Chalkboard SE",
				}}
			>
				Hear from Other Happy Parents
			</Typography>

			<Typography
				align="center"
				sx={{
					fontFamily: "Comfortaa",
					fontSize: "15px",
				}}
				mb={5}
			>
				Customer testimonials
			</Typography>

			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{listRate.map((rate, index) => (
					<Grid item xs={2} sm={4} md={4} key={index}>
						<div className="rate_detail">
							<div
								style={{
									color: "orange",
									fontSize: "20px",
									marginBottom: "5px",
								}}
							>
								{rate.rate}
							</div>
							<p>{rate.detail}</p>
							<div className="info">
								<img src={rate.ava} alt={rate.name} />
								<p>{rate.name}</p>
							</div>
						</div>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
