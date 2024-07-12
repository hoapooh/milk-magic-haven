import React from "react";
import "./AuthNav.scss";
import { Container, CssBaseline } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext/CartContext";

export default function AuthNav() {
	const username = JSON.parse(localStorage.getItem("username"));
	const nav = useNavigate();
	const { handleDeleteAll, handleDeleteCoupon } = useCart();

	const handleLogOut = () => {
		localStorage.removeItem("username");
		localStorage.removeItem("accessToken");
		handleDeleteAll();
		handleDeleteCoupon();
		nav("/");
	};

	return (
		<>
			<CssBaseline />
			<Container className="authnav" maxWidth="false">
				<nav className="authnav__navbar">
					<div className="authnav__shipping">
						<i className="fa-solid fa-truck"></i> Free shipping with
						over $150
					</div>
					<div className="authnav__auth">
						{username ? (
							<p
								onClick={handleLogOut}
								className="authnav__auth__link logout"
							>
								Hello, {username.username}
								<i class="fa-solid fa-right-from-bracket"></i>
							</p>
						) : (
							<>
								<Link
									to="/login"
									className="authnav__auth__link"
								>
									Đăng nhập
								</Link>
								<Link
									to="/register"
									className="authnav__auth__link"
								>
									Đăng ký
								</Link>
							</>
						)}
					</div>
				</nav>
			</Container>
		</>
	);
}
