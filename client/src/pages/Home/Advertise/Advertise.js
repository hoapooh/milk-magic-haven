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
		<Container>
			<ThemeProvider theme={theme}>
				<div className="adv">
					<img
						src="https://s3-alpha-sig.figma.com/img/13a4/2145/2e4da7835d87c386fb602437bc0c997a?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bqxC-LbM1h1N1itdGGcTAtPVHdG2~ASRLSyOAGU6Zz7vLmbFlx5fvqOZ2wLExAyPpgtXce7hP52gOe0BGCIxZeGr18nlqkJCrL3mI4U~pgkHBhY2lk1ZKW8SjSjbulaw6ofL-Z8JyZ-0oS1PDXLS7zgWENJqO-tNYsA8~U8Qvi2s8f83CulJKCIHd-bbc8fXx-xopEU9IYzTxwEv1w8d3SjkavLWpzCgQ4VckkBRejQTZ8Kaxv-kZNBAaCaLKsutPgHm6o74OL0klC9R8KDqkoMcJC7KonjbvvTN1-P516qOBFSZm20ZTassypUybfpsP-4Xte3Cb2m7GIS2RQIJMw__"
						alt="adv"
					/>
				</div>

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
						Crafting smiles with every toy, made for learning, fun,
						and growth.
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
			</ThemeProvider>
		</Container>
	);
}
