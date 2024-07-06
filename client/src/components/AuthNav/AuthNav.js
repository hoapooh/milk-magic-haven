import React from "react";
import "./AuthNav.scss";
import { Container, CssBaseline } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function AuthNav() {
	const username = localStorage.getItem("username");
	const nav = useNavigate();

	const handleLogOut = () => {
		localStorage.removeItem("username");
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
								Hello, {username}
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
