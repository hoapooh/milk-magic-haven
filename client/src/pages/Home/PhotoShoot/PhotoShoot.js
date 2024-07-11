import React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { listPhoto } from "./GetPhotoShoot";
import "./PhotoShoot.scss";
import { Container } from "@mui/material";

export default function PhotoShoot() {
	return (
		<Container maxWidth="xl">
			<div className="photoshoot">
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

				<Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
					{listPhoto.map((photo, index) => (
						<Grid item md={3} key={index} mt={5} mb={5}>
							<div className="photo">
								<img src={photo.img} alt={photo.id} />
							</div>
						</Grid>
					))}
				</Grid>
			</div>
		</Container>
	);
}
