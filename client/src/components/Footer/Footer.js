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
			<Container className="footer__container" maxWidth={"false"}>
				<footer className="footer">
					<Grid container spacing={4}>
						<Grid item xs={12} md={5}>
							<Link to="/faq">
								<img
									src="/assets/images/logo-big-2.webp"
									alt="logo"
									className="footer__logo"
								/>
							</Link>
							<p className="footer__small__desc" style={{ fontWeight: "bold" }}>
								Công ty cổ phần Milk Magic Haven
							</p>
							<p className="footer__small__desc">
								<span style={{ fontWeight: "bold" }}>Địa chỉ:</span> Lô E2a-7,
								Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh
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
						<Grid item xs={12} md={3}>
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
