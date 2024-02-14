import Button from '../button/button.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    return(
        <div className='cart-dropdown-container'>
            <span className='empty-message'></span>
            <div className='cart-items'></div>
            <Button>Go to Checkout</Button>
        </div>
    );
}

export default CartDropdown;