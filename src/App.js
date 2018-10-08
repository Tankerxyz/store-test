import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';

import items from './StoreItems.json';
import SpecialOffers from './SpecialOffers';

import StoreList from "./components/StoreList/StoreList";
import CartList from "./components/CartList/CartList";
import Header from "./components/Header/Header";

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
    });
  };

  render() {
    const { cartItems, cartAllPrice } = this.state;

    return (
      <Router>
        <div className="App">
          <Header cartAllPrice={cartAllPrice}/>
          <Switch>
            <Route exact path="/" component={() => <StoreList items={items} onBuy={this.addToCart} />} />
            <Route path="/cart" component={() => <CartList onRemove={this.removeFromCart} cartAllPrice={cartAllPrice} cartItems={cartItems}/>} />
            <Redirect to="/"/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
