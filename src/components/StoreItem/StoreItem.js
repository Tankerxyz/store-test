import React from 'react';
import './StoreItem.css';

const StoreItem = (props) => {
  const { item: { itemName, price, image }, onBuy } = props;

  return (
    <li className="store-item">
      <header className="store-item-header">
        <h2 className="store-item-title">{itemName}</h2>
        <div className="store-image-container">
          <img className="store-item-image" src={image} />
          <div className="store-item-price">$ {price}</div>
        </div>
      </header>
      <section className="store-item-info">
        <button className="buy-button" onClick={onBuy(itemName)}>Buy</button>
      </section>
    </li>
  );
};

export default StoreItem;