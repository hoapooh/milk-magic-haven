import { createContext, useState } from "react";

const CartContext = createContext()

function CartProvider({ children }) {
    const [cartList, setCartList] = useState([])

    const handleAddToCart = (product) => {
        const checkExsit = cartList.find((pro) => pro.product_id === product.product_id);
        if (checkExsit) {
            const updateList = cartList.map((item) =>
                item.product_id === product.product_id ?
                    { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCartList(updateList)
        } else {
            setCartList([...cartList, { ...product, quantity: 1 }])
        }
    };

    const handleDeleteCart = (product) => {
        const updateList = cartList.filter((item) =>
            item.product_id !== product.product_id
        )
        setCartList(updateList)
    }

    const Increase = (product) => {
        const updateList = cartList.map((item) =>
            item.product_id === product.product_id ?
                { ...item, quantity: item.quantity + 1 }
                :
                item
        )
        setCartList(updateList)
    }

    const Descrease = (product) => {
        const updateList = cartList.map((item) =>
            item.product_id === product.product_id ?
                { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                :
                item
        )
        setCartList(updateList)
    }

    return (
        <CartContext.Provider value={{ cartList, handleAddToCart, handleDeleteCart, Increase, Descrease }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }