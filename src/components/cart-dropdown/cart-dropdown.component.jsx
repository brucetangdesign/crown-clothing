import { useContext } from 'react';
import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return(
        <div className='cart-dropdown-container'>
            {cartItems.length ?
                <div className='cart-items'> 
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
                </div>
            :
            <span className='empty-message'>'Your cart is empty'</span>
            }
            {cartItems.length ? <Button onClick={goToCheckoutHandler}>Checkout</Button> : null}
        </div>
    );
}

export default CartDropdown;