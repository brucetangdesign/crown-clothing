import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity += 1 }
                : cartItem
        );
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToSubtract) => {
    const existingCartItem = cartItems.find(item => item.id === cartItemToSubtract.id);

    if(existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id != cartItemToSubtract.id);
    }


    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToSubtract.id
            ? { ...cartItem, quantity: cartItem.quantity -= 1 }
            : cartItem
    );
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id != cartItemToClear.id)

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => { },
    cartCount: 0,
    cartPriceTotal: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartPriceTotal, setCartPriceTotal] = useState(0);

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => (total + cartItem.quantity), 0);
        setCartCount(newCartCount);
    },[cartItems]);

    useEffect(() => {
        const newCartPriceTotal = cartItems.reduce((totalPrice, cartItem) => (totalPrice + (cartItem.quantity * cartItem.price)), 0);
        setCartPriceTotal(newCartPriceTotal);
    }, [cartItems]);

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartPriceTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}