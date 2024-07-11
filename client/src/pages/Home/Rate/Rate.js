import { Typography } from "@mui/material";
import React from "react";
import { listRate } from "./GetRate";
import Grid from "@mui/material/Grid";
import "./Rate.scss";
import { Container } from "@mui/material";

export default function Rate() {
	return (
		<Container maxWidth="xl">
			<div style={{ width: "1280px", margin: "0 auto" }}>
				<Typography
					variant="h3"
					component="h3"
					mt={5}
					mb={3}
					align="center"
					sx={{
						fontFamily: "Chalkboard SE",
					}}
				>
					Hear from Other Happy Parents
				</Typography>

				<Grid
					container
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
					marginTop={6}
				>
					{listRate.map((rate, index) => (
						<Grid item xs={12} sm={4} md={4} key={index}>
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
			</div>
		</Container>
	);
}
