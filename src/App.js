import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import items from './mock-data/StoreItems.json';

import StoreList from "./components/StoreList/StoreList";
import CartList from "./components/CartList/CartList";
import Header from "./components/Header/Header";
import StoreItemPage from "./components/StoreItemPage/StoreItemPage";

import { calculateAllPrice, getAllPrice } from "./utils/priceUtils";


class App extends Component {
  state = {
    cartItems: {},
    cartAllPrice: 0,
  };

  buyItem = (itemName) => (cartItems) => {
    const item = cartItems[itemName];
    if (item) {
      item.count++;
      item.allPrice = getAllPrice(itemName, item.count);
    } else {
      cartItems[itemName] = {
        count: 1,
        allPrice: items[itemName].price,
      };
    }

    return cartItems;
  };

  removeItem = (itemName) => (cartItems) => {
    const item = cartItems[itemName];

    item.count--;
    if (item.count) {
      item.allPrice = getAllPrice(itemName, item.count);
    } else {
      delete cartItems[itemName];
    }

    return cartItems;
  };

  updateCart = (cartActionFn) => {
    this.setState(prevState => {
      let { cartItems } = prevState;
      cartItems = cartActionFn(cartItems);

      const cartAllPrice = calculateAllPrice(cartItems);

      return {
        cartItems,
        cartAllPrice,
      };
    });
  };

  addToCart = (itemName) => () => {
    this.updateCart(this.buyItem(itemName))
  };

  removeFromCart = (itemName) => () => {
    this.updateCart(this.removeItem(itemName));
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
            <Route path="/item/:itemName" component={({ match }) => <StoreItemPage item={items[match.params.itemName]} onBuy={this.addToCart}/>} />
            <Redirect to="/"/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
