import { useContext, createContext, useReducer } from "react";

export const StateContext = createContext();

//ccontext provider

export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <>
      <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
      </StateContext.Provider>
    </>
  );
};

export const useStateValue = () => useContext(StateContext);
