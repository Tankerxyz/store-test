import SpecialOffers from "../mock-data/SpecialOffers";
import items from "../mock-data/StoreItems";

export function calculateAllPrice(cartItems) {
  return Object.keys(cartItems).reduce((sum, curItem) => {
    return sum + cartItems[curItem].allPrice;
  }, 0);
}

export function getAllPrice(itemName, count) {
  const specialOffer = SpecialOffers[itemName];

  if (specialOffer) {
    return specialOffer(count, items[itemName].price);
  } else {
    return count * items[itemName].price;
  }
}