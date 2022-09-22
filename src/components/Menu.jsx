import React, { useState, useEffect } from "react";

import { useStateValue } from "../context/StateProvider";

// cards imports
import Slider from "react-slick";
import { Card } from "./card";
import CardMenu from "./CardMenu";
// cts
const categories = ["Fruits", "Drinks", "Rice&chiken", "Fish", "Icecream"];

// slider configs
var initSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
const Menu = () => {
  //
  const [categorie, setCategorie] = useState("fruits");
  const [{ foodItems, cartItems }, dispatch] = useStateValue();
  const [sliderSittings, setSliderSittings] = useState(initSettings);
  const [itemsSelected, setItemsSelected] = useState([]);

  // filter items by categories
  useEffect(() => {
    const cotegorieItems = foodItems.filter((item) => {
      return item.categorie == categorie;
    });

    setItemsSelected(cotegorieItems);
    const len = cotegorieItems.length;
    if (len >= 3) {
      setSliderSittings((prevSettings) => {
        return {
          ...prevSettings,
          slidesToShow: 3,
        };
      });
    } else {
      setSliderSittings((prevSettings) => {
        return { ...prevSettings, slidesToShow: len };
      });
    }
    console.log(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [categorie, foodItems, cartItems]);

  // ad to cart function

  const addToCart = (item) => {
    dispatch({
      type: "SET_CART_ITEMS",
      cartItems: [...cartItems, item],
    });
  };

  return (
    <section className="container">
      <h1 className="heading title">Chose a categorie </h1>
      <div className="d-flex justify-content-center">
        <div
          className="d-flex  align-items-center align-content-center"
          style={{
            gap: "1rem",
            padding: "0 2rem",
            overflow: "auto",
          }}
        >
          {categories.map((categ, index) => {
            return (
              <CardMenu key={index} name={categ} setCategorie={setCategorie} />
            );
          })}
        </div>
      </div>

      <div className="pt-5 pb-5">
        <Slider {...sliderSittings}>
          {itemsSelected.map((item) => {
            return (
              <>
                <Card
                  key={item.id}
                  name={item.name}
                  image={item.imageFile}
                  calories={item.calories}
                  price={item.price}
                  handelClick={addToCart}
                />
              </>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default Menu;
