import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

const CartIcon = (props) => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => {
        return (
            setIsCartOpen(!isCartOpen)
        )
    }

    return(
        <CartIconContainer>
            <ShoppingIcon onClick={toggleIsCartOpen} />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;