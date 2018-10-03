import React from 'react';
import CartItem from "../CartItem/CartItem";

const CartList = (props) => {
  const { cartItems, cartAllPrice } = props;

  return (
    <div className="cart" style={{backgroundColor: "lightgreen"}}>
      <header>
        <h2>Cart</h2>
        <div>
          All price: {cartAllPrice}
        </div>
      </header>
      <ul className="cart-list">
        {
          Object.keys(cartItems).map((itemName) => {
            return (<CartItem key={itemName} item={{...cartItems[itemName], itemName}} onRemove={props.onRemove}/>)
          })
        }
      </ul>
    </div>
  );
};

export default CartList;