import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

const Checkout = () => {
  const { cartItems, cartPriceTotal } = useContext(CartContext);

  return(
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock><span>Product</span></HeaderBlock>
        <HeaderBlock><span>Description</span></HeaderBlock>
        <HeaderBlock><span>Quantity</span></HeaderBlock>
        <HeaderBlock><span>Price</span></HeaderBlock>
        <HeaderBlock><span>Remove</span></HeaderBlock>
      </CheckoutHeader>
      {cartItems.length ? cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem} />):'Your cart is empty' }
      <Total>Total: ${cartPriceTotal}</Total>
    </CheckoutContainer>
  )
}

export default Checkout;