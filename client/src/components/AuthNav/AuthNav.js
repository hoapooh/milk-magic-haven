import React from "react";
import "./AuthNav.css";
import { Container, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";

export default function AuthNav() {
	return (
		<>
			<CssBaseline />
			<Container className="authnav" maxWidth="false">
				<nav className="authnav__navbar">
					<div className="authnav__shipping">
						<i className="fa-solid fa-truck"></i> Free shipping with over $150
					</div>
					<div className="authnav__auth">
						<Link to="/login" className="authnav__auth__link">
							Đăng nhập
						</Link>
						<Link to="/register" className="authnav__auth__link">
							Đăng ký
						</Link>
					</div>
				</nav>
			</Container>
		</>
	);
}
