import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import './checkout.styles.scss';

const Checkout = () => {
  const {cartItems} = useContext(CartContext);

  return(
    <div className="checkout-container">
      {cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} checkoutItem={cartItem} />)}
    </div>
  )
}

export default Checkout;