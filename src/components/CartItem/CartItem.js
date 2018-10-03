import React from 'react';

const CartItem = (props) => {
  const { item: { itemName, count, allPrice } } = props;

  return (
    <li>
      <header>
        <h4>{itemName}</h4>
      </header>
      <section>
        <div>count: {count}</div>
        <div>allPrice: {allPrice}</div>
        <button onClick={props.onRemove(itemName)}>Remove</button>
      </section>
    </li>
  );
};

export default CartItem;