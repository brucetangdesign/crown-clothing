
const CartItem = (cartItem) => {
    const { name, quantity, imageUrl, price } = cartItem;

    return(
        <div className="cart-item-container">
            <img src={imageUrl} alt={name} />
            <div>
                <h2 class='name'>{name}</h2>
                <span>{quantity}</span>
                <span class='price'>1 x {price}</span>
            </div>
        </div>
    );
}

export default CartItem;