import React, { Component } from 'react';
import './App.css';

import items from './StoreItems.json';
import SpecialOffers from './SpecialOffers';

function calculateAllPrice(cartItems) {
  return Object.keys(cartItems).reduce((sum, curItem) => {
    return sum + cartItems[curItem].allPrice;
  }, 0);
}

function getAllPrice(itemName, count) {
  const specialOffer = SpecialOffers[itemName];

  if (specialOffer) {
    return specialOffer(count, items[itemName].price);
  } else {
    return count * items[itemName].price;
  }
}

class App extends Component {
  state = {
    cartItems: {},
    cartAllPrice: 0,
  };

  addToCart = (itemName) => () => {
    this.setState(prevState => {
      const { cartItems } = prevState;

      if (!cartItems[itemName]) {
        cartItems[itemName] = {
          count: 1,
          allPrice: items[itemName].price,
        };
      } else {
        cartItems[itemName].count++;
        cartItems[itemName].allPrice = getAllPrice(itemName, cartItems[itemName].count);
      }

      const cartAllPrice = calculateAllPrice(cartItems);

      return {
        cartItems,
        cartAllPrice,
      };
    });
  };

  removeFromCart = (itemName) => () => {
    this.setState(prevState => {
      const { cartItems } = prevState;

      if (cartItems[itemName]) {
        cartItems[itemName].count--;
        if (cartItems[itemName].count) {
          cartItems[itemName].allPrice = getAllPrice(itemName, cartItems[itemName].count);
        } else {
          delete cartItems[itemName];
        }
      }

      const cartAllPrice = calculateAllPrice(cartItems);

      return {
        cartItems,
        cartAllPrice,
      };
    })
  };

  render() {
    const { cartItems, cartAllPrice } = this.state;

    return (
      <div className="App">
        <ul>
          {
            Object.keys(items).map((item) => {
              return (<li key={item}>
                <header className="store-item-header">
                  <h2 className="store-item-title">{item}</h2>
                </header>
                <section>
                  <div className="store-item-price">$ {items[item].price}</div>
                  <button className="buy-button" onClick={this.addToCart(item)}>Buy</button>
                </section>
              </li>)
            })
          }
        </ul>
        <div className="cart" style={{backgroundColor: "lightgreen"}}>
          <header>
            <h2>Cart</h2>
            <div>
              All price: {cartAllPrice}
            </div>
          </header>
          <ul className="cart-list">
            {
              Object.keys(cartItems).map((item) => {
                return (<li key={item}>
                  <header>
                    <h4>{item}</h4>
                  </header>
                  <section>
                    <div>count: {cartItems[item].count}</div>
                    <div>allPrice: {cartItems[item].allPrice}</div>
                    <button onClick={this.removeFromCart(item)}>Remove</button>
                  </section>
                </li>)
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
