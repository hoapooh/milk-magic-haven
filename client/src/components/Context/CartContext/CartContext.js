import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
	const [cartList, setCartList] = useState([]);
	const [coupon, setCoupon] = useState(""); // Thêm trạng thái cho mã giảm giá

	const applyCoupon = (couponCode) => {
		setCoupon(couponCode); // Cập nhật mã giảm giá
	};

	const addToCart = (product, quantity = 1) => {
		const existingProductIndex = cartList.findIndex(
			(item) => item.product.product_id === product.product_id
		);
		if (existingProductIndex !== -1) {
			// Sản phẩm đã tồn tại, cập nhật số lượng
			const newCartList = [...cartList];
			newCartList[existingProductIndex].product.quantity += quantity;
			setCartList(newCartList);
		} else {
			// Thêm sản phẩm mới vào giỏ hàng
			setCartList([...cartList, { product, quantity }]);
		}
	};

	const handleDeleteProduct = (productId) => {
		const updatedCartList = cartList.filter(
			(item) => item.product.product_id !== productId
		);
		setCartList(updatedCartList);
	};

	const handleIncrease = (productId) => {
		const newCartList = cartList.map((item) =>
			item.product.product_id === productId
				? {
						...item,
						product: {
							...item.product,
							quantity: item.product.quantity + 1,
						},
				  }
				: item
		);
		setCartList(newCartList);
	};

	const handleDecrease = (productId) => {
		const newCartList = cartList.map((item) =>
			item.product.product_id === productId
				? {
						...item,
						product: {
							...item.product,
							quantity: Math.max(item.product.quantity - 1, 1),
						},
				  }
				: item
		);
		setCartList(newCartList);
	};

	const handleDeleteAll = () => {
		setCartList([]);
	};

	const handleDeleteCoupon = () => {
		setCoupon([]);
	};

	const value = {
		cartList,
		addToCart,
		handleIncrease,
		handleDecrease,
		handleDeleteProduct,
		handleDeleteAll,
		coupon,
		applyCoupon,
		handleDeleteCoupon,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
}

// Hook để sử dụng context một cách dễ dàng
export const useCart = () => useContext(CartContext);

export { CartContext, CartProvider };
