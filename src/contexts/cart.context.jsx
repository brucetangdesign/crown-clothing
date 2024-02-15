import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    let newCartItems = cartItems;
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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    /*const [cartItems, setCartItems] = useState([{
        "id": 3,
        "name": "Brown Cowboy",
        "imageUrl": "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
        "price": 35
    }]);*/

    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    
    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const value = { isCartOpen, setIsCartOpen, addItemToCart };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}