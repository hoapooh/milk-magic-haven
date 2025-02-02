import React from "react";
import "./Header.scss";
import { Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../Context/CartContext/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
	const nav = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
	}

	function handleAccessCart() {
		if (localStorage.getItem("username") === null) {
			toast.error("Vui lòng đăng nhập trước khi vào giỏ hàng", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			nav("/cart");
		}
	}

	const { cartList } = useCart();

	return (
		<>
			<Container className="header__container" maxWidth="xl">
				<ToastContainer style={{ fontSize: "1.6rem" }} />
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
							<Link to="/">Trang chủ</Link>
						</li>
						<li className="header__list__item">
							<Link to="/shop">Cửa hàng</Link>
						</li>
						<li className="header__list__item">
							<Link to="/blog">Bài viết</Link>
						</li>
						<li className="header__list__item">
							<Link to="/contact">Liên hệ</Link>
						</li>
					</ul>

					{/* ====== ACTION ====== */}
					<div className="header__action">
						{/* ====== CART ====== */}
						<div onClick={handleAccessCart} className="cart__icon">
							<div className="cart__icon__style">
								<ShoppingCartIcon />
								{cartList.length > 0 && (
									<span>{cartList.length}</span>
								)}
							</div>
						</div>

						{/* ====== SEARCH BAR ====== */}
						<form className="header__search">
							<input
								className="header__search__input"
								type="search"
								placeholder="Tìm kiếm..."
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
										fillRule="evenodd"
										clipRule="evenodd"
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
