const userInfo = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : undefined;

export const appInitialState = {
  user: userInfo,
  foodItems: [],
};
