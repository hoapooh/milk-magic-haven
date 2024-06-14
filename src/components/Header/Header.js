import React from "react";
import "./Header.css";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
	function handleSubmit(e) {
		e.preventDefault();
	}

	return (
		<>
			<Container className="header__container" maxWidth="xl">
				<header className="header">
					{/* ====== LOGO ====== */}
					<Link to="/faq">
						<img
							src="/assets/images/logo-big-2.webp"
							alt="logo"
							className="header__logo"
						/>
					</Link>

					{/* ====== LIST NAVIGATION ====== */}
					<ul className="header__list">
						<li className="header__list__item">
							<Link to="/faq">Home</Link>
						</li>
						<li className="header__list__item">
							<Link to="/faq">Shop</Link>
						</li>
						<li className="header__list__item">
							<Link to="/faq">Page</Link>
						</li>
						<li className="header__list__item">
							<Link to="/faq">Blog</Link>
						</li>
						<li className="header__list__item">
							<Link to="/faq">Contact</Link>
						</li>
					</ul>

					{/* ====== ACTION ====== */}
					<div className="header__action">
						{/* ====== CART ====== */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 28 29"
							fill="none"
						>
							<g clip-path="url(#clip0_2108_1345)">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M2.5 4.7931C2.5 4.07894 3.07894 3.5 3.7931 3.5H6.57239C8.07574 3.5 9.34552 4.6057 9.5587 6.08621H26.2069C26.5671 6.08621 26.9109 6.23643 27.1557 6.50071C27.4004 6.76499 27.5238 7.11936 27.4962 7.47849L26.879 15.5016C26.689 17.9718 24.6292 19.8793 22.1516 19.8793H11.2017L11.3617 21.2234C11.3875 21.4402 11.5713 21.6034 11.7897 21.6034H22.7586C23.4728 21.6034 24.0517 22.1824 24.0517 22.8965C24.0517 23.6107 23.4728 24.1897 22.7586 24.1897H11.7897C10.2613 24.1897 8.97427 23.0468 8.79359 21.5291L7.0004 6.46629C6.97459 6.24947 6.79073 6.08621 6.57239 6.08621H3.7931C3.07894 6.08621 2.5 5.50726 2.5 4.7931ZM10.8938 17.2931H22.1516C23.2778 17.2931 24.2141 16.4261 24.3004 15.3032L24.8105 8.67241H9.8675L10.8938 17.2931ZM15.431 27.6383C15.431 28.5905 14.6591 29.3624 13.7069 29.3624C12.7546 29.3624 11.9827 28.5905 11.9827 27.6383C11.9827 26.6861 12.7546 25.9141 13.7069 25.9141C14.6591 25.9141 15.431 26.6861 15.431 27.6383ZM24.0517 27.6383C24.0517 28.5905 23.2798 29.3624 22.3276 29.3624C21.3754 29.3624 20.6034 28.5905 20.6034 27.6383C20.6034 26.6861 21.3754 25.9141 22.3276 25.9141C23.2798 25.9141 24.0517 26.6861 24.0517 27.6383Z"
									fill="#4A4A4A"
								/>
							</g>
							<defs>
								<clipPath id="clip0_2108_1345">
									<rect
										width="28"
										height="28"
										fill="white"
										transform="translate(0 0.5)"
									/>
								</clipPath>
							</defs>
						</svg>

						{/* ====== SEARCH BAR ====== */}
						<form className="header__search">
							<input
								className="header__search__input"
								type="search"
								placeholder="Search..."
							/>
							<button
								onClick={handleSubmit}
								type="submit"
								className="header__search__submit"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="15"
									height="16"
									viewBox="0 0 15 16"
									fill="none"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M9.67416 11.7217C8.68008 12.4926 7.44031 12.9501 6.09593 12.9501C2.8247 12.9501 0.172852 10.2414 0.172852 6.9001C0.172852 3.55877 2.8247 0.850098 6.09593 0.850098C9.36715 0.850098 12.019 3.55877 12.019 6.9001C12.019 8.27329 11.5711 9.53962 10.8164 10.555L13.9363 13.7417C14.2517 14.0639 14.2517 14.5863 13.9363 14.9085C13.6209 15.2306 13.1095 15.2306 12.794 14.9085L9.67416 11.7217ZM10.4036 6.9001C10.4036 9.33015 8.475 11.3001 6.09593 11.3001C3.71686 11.3001 1.78824 9.33015 1.78824 6.9001C1.78824 4.47004 3.71686 2.5001 6.09593 2.5001C8.475 2.5001 10.4036 4.47004 10.4036 6.9001Z"
										fill="#F2F2F2"
									/>
								</svg>
							</button>
						</form>
					</div>
				</header>
			</Container>
		</>
	);
}
