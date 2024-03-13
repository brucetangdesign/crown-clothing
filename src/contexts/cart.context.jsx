import { createContext, useReducer } from "react";
import { createAction } from '../utils/reducer/reducer.utils';

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

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartPriceTotal: 0
}

export const CART_ACTION_TYPES = {
    'SET_CART_OPEN': 'SET_CART_OPEN',
    'SET_CART_ITEMS': 'SET_CART_ITEMS',
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
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
            break;
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

export const CartProvider = ({children}) => {
    const [{ isCartOpen, cartItems, cartCount, cartPriceTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const setIsCartOpen = (bool) => {
        //dispatch({type: CART_ACTION_TYPES.SET_CART_OPEN, payload: bool });
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool));
    }

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => (total + cartItem.quantity), 0);
        const newCartTotal = newCartItems.reduce((totalPrice, cartItem) => (totalPrice + (cartItem.quantity * cartItem.price)), 0);
        dispatch(createAction(
            CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartCount: newCartCount,
            cartPriceTotal: newCartTotal
        }));
        /*dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartPriceTotal: newCartTotal
            }
        });*/
    }

    const addItemToCart = (productToAdd) =>{
        updateCartItemsReducer(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        updateCartItemsReducer(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        updateCartItemsReducer(clearCartItem(cartItems, cartItemToClear));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartPriceTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}