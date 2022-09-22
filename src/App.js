import "./App.css";

import Hero from "./components/Hero";

import {
  NavBar,
  AddItem,
  Cards,
  Menu,
  Footer,
  CartContainer,
} from "./components/index";
import { getItems } from "./fireBaseFunctions";
//
import { useStateValue } from "./context/StateProvider";
import { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [{ cartShow }, dispatch] = useStateValue();
  //
  const fetchFoodItems = async () => {
    const foodData = await getItems();
    dispatch({
      type: "SET_FOOD_ITEMS",
      foodItems: foodData,
    });
  };

  //
  useEffect(() => {
    fetchFoodItems();
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              {cartShow && <CartContainer />}
              <Hero />
              <Cards />
              <Menu />
              <Footer />
            </>
          }
        />
        <Route
          path="/addItem"
          element={
            <>
              <NavBar />
              <AddItem />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
