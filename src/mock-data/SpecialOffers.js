
export default {
  "papaya": function(count, price) {
    const allPrice = (count * price);
    const discountCount = 3;
    const discountPrice = ~~(count / discountCount) * price;

    return allPrice - discountPrice;
  },
};