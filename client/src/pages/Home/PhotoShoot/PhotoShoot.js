import React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { listPhoto } from "./GetPhotoShoot";
import "./PhotoShoot.scss";
import { Container } from "@mui/material";

export default function PhotoShoot() {
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
				Recent photoshoots
			</Typography>

			<Typography
				align="center"
				sx={{
					fontFamily: "Comfortaa",
					fontSize: "15px",
				}}
			>
				Check gallery
			</Typography>

			<Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
				{listPhoto.map((photo, index) => (
					<Grid item md={3} key={index} mt={5} mb={5}>
						<div className="photo">
							<img src={photo.img} alt={photo.id} />
						</div>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
