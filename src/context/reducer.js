export const actionType = {
  setUser: "SET_USER",
  setItems: "SET_FOOD_ITEMS",
  setShowCart: "SET_SHOW_CART",
  setCartItems: "SET_CART_ITEMS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.setUser:
      return { ...state, user: action.user };
    case actionType.setItems:
      return { ...state, foodItems: action.foodItems };
    case actionType.setShowCart:
      return { ...state, cartShow: action.cartShow };
    case actionType.setCartItems:
      return { ...state, cartItems: action.cartItems };
    default:
      return state;
  }
};

// export reducer

export default reducer;
