import React from 'react';

export default function StoreItemPage(props) {
  const { item: { itemName, image, price }, onBuy } = props;

  return (
    <div>
      <header>
        <h2>{itemName}</h2>
        <img className="store-item-image" src={image} />
      </header>
      <section className="store-item-info">
        <div className="store-item-price">$ {price}</div>
        <button className="buy-button" onClick={onBuy(itemName)}>Buy</button>
      </section>
    </div>
  );
}