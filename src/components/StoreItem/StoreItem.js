import React from 'react';

const StoreItem = (props) => {
  const { item: { itemName, price }, onBuy } = props;

  return (
    <li>
      <header className="store-item-header">
        <h2 className="store-item-title">{itemName}</h2>
      </header>
      <section>
        <div className="store-item-price">$ {price}</div>
        <button className="buy-button" onClick={onBuy(itemName)}>Buy</button>
      </section>
    </li>
  );
};

export default StoreItem;