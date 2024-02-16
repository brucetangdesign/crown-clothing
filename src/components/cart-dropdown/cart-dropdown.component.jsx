import { useContext } from 'react';
import Button from '../button/button.component';
import { Link } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);

    return(
        <div className='cart-dropdown-container'>
            {cartItems.length ? null : <span className='empty-message'></span>}
            <div className='cart-items'>
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Link to='/checkout'><Button>Checkout</Button></Link>
        </div>
    );
}

export default CartDropdown;