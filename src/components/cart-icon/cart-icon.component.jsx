import { useContext } from 'react';
import {ReactComponent as ShoppingBag} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = (props) => {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);

    const toggleIsCartOpen = () => {
        return (
            setIsCartOpen(!isCartOpen)
        )
    }

    return(
        <div className='cart-icon-container'>
            <ShoppingBag className='shopping-icon' onClick={toggleIsCartOpen} />
            <span className='item-count'>0</span>
        </div>
    );
}

export default CartIcon;