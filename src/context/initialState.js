const userInfo = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : undefined;

const items = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

export const appInitialState = {
  user: userInfo,
  foodItems: [],
  showCart: false,
  cartItems: items,
};
