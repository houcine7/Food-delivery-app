export const actionType = {
  setUser: "SET_USER",
  setItems: "SET_FOOD_ITEMS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.setUser:
      return { ...state, user: action.user };
    case actionType.setItems:
      return { ...state, foodItems: action.foodItems };
    default:
      return state;
  }
};

// export reducer

export default reducer;
