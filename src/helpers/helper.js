const sumProducts = (products) => {
  const itemsCounter = products.reduce((acc, cur) => acc + cur.quantity, 0);
  const total = products.reduce(
    (acc, cur) => acc + +cur.productPrice * cur.quantity,
    0,
  );
  return { itemsCounter, total };
};

const productQuantity = (state, _id) => {
  const index = state.selectedItems.findIndex((item) => item._id === _id);
  if (index === -1) {
    return 0;
  } else {
    return state.selectedItems[index].quantity;
  }
};

const separator = (num) => {
  return num.toLocaleString();
};

const tax = (num) => {
  return num * 0.09;
};

const disCount = (number) => {
  const firstResult = (number * 10) / 100;
  // const finalResult =   number - firstResult
  return firstResult;
};

const finalPrice = (number) => {
  return number + number * 0.09;
};

export { sumProducts, productQuantity, separator, tax, disCount, finalPrice };
