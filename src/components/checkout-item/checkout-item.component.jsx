import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import './checkout-item.styles.scss';

const CheckoutItem = ({checkoutItem}) => {
  const {name, imageUrl, price, quantity} = checkoutItem;
  const { cartItems, addItemToCart } = useContext(CartContext);

  return (
    <div className="checkout-item-container">
      <div className="image-container"><img src={imageUrl} alt={`${name}`} /></div>
      <span className="name">{name}</span>
      <div className="quantity">
        <button className="arrow">-</button>
        <span className="value">{quantity}</span>
        <button className="arrow">+</button>
      </div>
      <span className="price">${price}</span>
      <button className="removeButton">X</button>
    </div>
  )
}

export default CheckoutItem;