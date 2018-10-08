import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

export default function Header(props) {
  const { cartAllPrice } = props;

  return (
    <div className="Header">
      <div className="Header-item">
        <Link to="/" >Home</Link>
      </div>
      <div className="Header-item cart">
        <Link to="/cart" >
          {
            cartAllPrice
              ? <div className="cart-price">
                {`$${cartAllPrice}`}
              </div>
              : null
          }
          🛒
        </Link>
      </div>
    </div>
  );
}