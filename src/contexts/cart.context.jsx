import { createContext, useState, useEffect, useReducer } from "react";

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

export const CART_ACTION_TYPES = {
    'SET_CART_OPEN': 'SET_CART_OPEN',
    'ADD_ITEM_TO_CART': 'ADD_ITEM_TO_CART',
    'SET_CART_COUNT': 'SET_CART_COUNT',
    'REMOVE_ITEM_FROM_CART': 'REMOVE_ITEM_FROM_CART',
    'CLEAR_ITEM_FROM_CART': 'CLEAR_ITEM_FROM_CART',
    'SET_CART_PRICE_TOTAL': 'SET_CART_PRICE_TOTAL',
}

export const cartReducer = (state, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
            break;
        case CART_ACTION_TYPES.ADD_ITEM_TO_CART || CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART || CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: payload
            }
            break;
        case CART_ACTION_TYPES.SET_CART_COUNT:
            return {
                ...state,
                cartCount: payload
            }
            break;
        case CART_ACTION_TYPES.SET_CART_PRICE_TOTAL:
            return {
                ...state,
                cartPriceTotal: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartPriceTotal: 0
}

export const CartProvider = ({children}) => {
    //const [isCartOpen, setIsCartOpen] = useState(false);
    const [{ isCartOpen, cartItems, cartCount, cartPriceTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    //const [cartItems, setCartItems] = useState([]);
    //const [{ cartItems }, dispatch] = useReducer(cartReducer,[]);
    //const [cartCount, setCartCount] = useState(0);
    //const [cartPriceTotal, setCartPriceTotal] = useState(0);

    const setIsCartOpen = (bool) => {
        dispatch({ type: CART_ACTION_TYPES.SET_CART_OPEN, payload: bool });
    }

    const setCartItems = (action, func) => {
        dispatch({ type: CART_ACTION_TYPES.ADD_ITEM_TO_CART, payload: func});
    }

    const setCartCount = (newCartCount) => {
        dispatch({ type: CART_ACTION_TYPES.SET_CART_COUNT, payload: newCartCount });
    }

    const setCartPriceTotal = (total) => {
        dispatch({type: CART_ACTION_TYPES.SET_CART_PRICE_TOTAL, payload: total})
    }

    const addItemToCart = (productToAdd) =>{
        setCartItems(CART_ACTION_TYPES.ADD_ITEM_TO_CART, addCartItem(cartItems, productToAdd));
        //setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART, removeCartItem(cartItems, cartItemToRemove));
        //setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART, clearCartItem(cartItems, cartItemToClear));
        //setCartItems(clearCartItem(cartItems, cartItemToClear));
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