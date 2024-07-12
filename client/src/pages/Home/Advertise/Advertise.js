import React from "react";
import "./Advertise.scss";
import { Box, Typography, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { yellow, pink } from "@mui/material/colors";
import { Container } from "@mui/material";

export default function Advertise() {
	const theme = createTheme({
		palette: {
			primary: yellow,
			secondary: pink,
		},
	});

	return (
		<Container maxWidth="xl">
			<ThemeProvider theme={theme}>
				<div className="adv">
					<img
						src="/assets/images/hero-section.png"
						alt="hero banner"
					/>

					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(35%, -20%)",
							color: "#1096B5",
							fontFamily: "Baloo Bhaina 2",
						}}
					>
						<Typography variant="h2" component="h2">
							Play, learn, &grow!
						</Typography>

						<Typography
							variant="h5"
							mt={2}
							sx={{
								width: "350px",
								color: "black",
							}}
						>
							Crafting smiles with every toy, made for learning,
							fun, and growth.
						</Typography>

						<Box mt={3}>
							<Button
								variant="contained"
								sx={{
									padding: "10px 20px",
									borderRadius: "20px",
									fontSize: "12px",
									fontWeight: "bold",
								}}
							>
								Shop Now
							</Button>
						</Box>
					</Box>
				</div>
			</ThemeProvider>
		</Container>
	);
}
