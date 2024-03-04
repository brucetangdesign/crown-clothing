import { useContext } from 'react';
import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';

import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return(
        <CartDropdownContainer>
            {cartItems.length ?
                <CartItems> 
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
                </CartItems>
            :
            <EmptyMessage>'Your cart is empty'</EmptyMessage>
            }
            {cartItems.length ? <Button onClick={goToCheckoutHandler}>Checkout</Button> : null}
        </CartDropdownContainer>
    );
}

export default CartDropdown;