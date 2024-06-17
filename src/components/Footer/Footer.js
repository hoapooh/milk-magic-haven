import React from "react";
import "./Footer.css";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { amber } from "@mui/material/colors";

export default function Footer() {
	return (
		<>
			{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path
					fill="#cbdad5"
					fill-opacity="1"
					d="M0,128L48,128C96,128,192,128,288,144C384,160,480,192,576,208C672,224,768,224,864,192C960,160,1056,96,1152,80C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
				></path>
			</svg> */}
			<Container className="footer__container" maxWidth={"false"}>
				<footer className="footer">
					<Grid container spacing={4}>
						<Grid item xs={12} md={4}>
							<Link to="/faq">
								<img
									src="/assets/images/logo-big-2.webp"
									alt="logo"
									className="footer__logo"
								/>
							</Link>
							<p className="footer__small__desc">
								Nunc consequat interdum varius sit amet mattis.
							</p>
							<div className="footer__social">
								<Link to={"/faq"}>
									<FacebookIcon />
								</Link>
								<Link to={"/faq"}>
									<InstagramIcon />
								</Link>
								<Link to={"https://www.youtube.com/@hoapooh0306"}>
									<YouTubeIcon />
								</Link>
								<Link to={"/faq"}>
									<LinkedInIcon />
								</Link>
							</div>
						</Grid>
						<Grid item xs={12} md={4}>
							<p className="sub-title">About us</p>
							<ul className="list__item">
								<li>
									<Link to={"/faq"}>FAQ'S</Link>
								</li>
								<li>
									<Link to={"/blog"}>Blog</Link>
								</li>
								<li>
									<Link to={"/contact"}>Contact</Link>
								</li>
							</ul>
						</Grid>
						<Grid item xs={12} md={4}>
							<p className="sub-title">Customer sevice</p>
							<ul className="list__item">
								<li>Monday to Friday</li>
								<li>10am - 6pm (NewYork time)</li>
								<li>
									Call us:{" "}
									<a href="tel:0123456789">
										<strong>123-456-7868</strong>
									</a>
								</li>
								<li>
									Email us:{" "}
									<a href="mailto:example@gmail.com">
										<strong>info@example.com</strong>
									</a>
								</li>
							</ul>
						</Grid>
					</Grid>
				</footer>
				<Grid
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					className="footer__copyright"
					style={{ backgroundColor: amber["A100"] }}
				>
					© 2024 Milk Magic Haven | All rights reserved.
				</Grid>
			</Container>
		</>
	);
}