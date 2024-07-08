import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
	const [cartList, setCartList] = useState([]);

	const addToCart = (product, quantity = 1) => {
		const existingProductIndex = cartList.findIndex(
			(item) => item.product.product_id === product.product_id
		);
		if (existingProductIndex !== -1) {
			// Sản phẩm đã tồn tại, cập nhật số lượng
			const newCartList = [...cartList];
			newCartList[existingProductIndex].quantity += quantity;
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

	const value = {
		cartList,
		addToCart,
		handleIncrease,
		handleDecrease,
		handleDeleteProduct,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
}

// Hook để sử dụng context một cách dễ dàng
export const useCart = () => useContext(CartContext);

export { CartContext, CartProvider };
// import { createContext, useState } from "react";

// const CartContext = createContext()

// function CartProvider({ children }) {
//     const [cartList, setCartList] = useState([])

//     const handleAddToCart = (product) => {
//         const checkExsit = cartList.find((pro) => pro.product_id === product.product_id);
//         if (checkExsit) {
//             const updateList = cartList.map((item) =>
//                 item.product_id === product.product_id ?
//                     { ...item, quantity: item.quantity + 1 }
//                     : item
//             );
//             setCartList(updateList)
//         } else {
//             setCartList([...cartList, { ...product, quantity: 1 }])
//         }
//     };

//     const handleDeleteCart = (product) => {
//         const updateList = cartList.filter((item) =>
//             item.product_id !== product.product_id
//         )
//         setCartList(updateList)
//     }

//     const Increase = (product) => {
//         const updateList = cartList.map((item) =>
//             item.product_id === product.product_id ?
//                 { ...item, quantity: item.quantity + 1 }
//                 :
//                 item
//         )
//         setCartList(updateList)
//     }

//     const Descrease = (product) => {
//         const updateList = cartList.map((item) =>
//             item.product_id === product.product_id ?
//                 { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
//                 :
//                 item
//         )
//         setCartList(updateList)
//     }

//     return (
//         <CartContext.Provider value={{ cartList, handleAddToCart, handleDeleteCart, Increase, Descrease }}>
//             {children}
//         </CartContext.Provider>
//     )
// }

// export { CartContext, CartProvider }
