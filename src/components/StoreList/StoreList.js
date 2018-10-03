import React from 'react';
import StoreItem from "../StoreItem/StoreItem";

const StoreList = (props) => {
  const { items } = props;

  return (
    <div>
      <header>
        <h2>StoreList</h2>
      </header>
      <ul>
        {
          Object.keys(items).map((itemName) => {
            return (<StoreItem key={itemName} item={{...items[itemName], itemName}} onBuy={props.onBuy}/>)
          })
        }
      </ul>
    </div>
  )
};

export default StoreList;