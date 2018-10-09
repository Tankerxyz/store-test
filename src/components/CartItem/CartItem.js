import React from 'react';
import { Link } from 'react-router-dom';

const CartItem = (props) => {
  const { item: { itemName, count, allPrice } } = props;

  return (
    <li>
      <header>
        <Link to={{pathname: `/item/${itemName}`}}>
          <h4>{itemName}</h4>
        </Link>
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