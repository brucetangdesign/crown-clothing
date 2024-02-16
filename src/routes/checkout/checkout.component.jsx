import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, cartPriceTotal } = useContext(CartContext);

  return(
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block"><span>Product</span></div>
        <div className="header-block"><span>Description</span></div>
        <div className="header-block"><span>Quantity</span></div>
        <div className="header-block"><span>Price</span></div>
        <div className="header-block"><span>Remove</span></div>
      </div>
      {cartItems.length ? cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem} />):'Your cart is empty' }
      <div className="total">Total: ${cartPriceTotal}</div>
    </div>
  )
}

export default Checkout;