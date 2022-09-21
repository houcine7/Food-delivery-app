import React, { useState, useEffect } from "react";

import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";

// cards imports
import Slider from "react-slick";
import { Card } from "./card";

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
  const [categorie, setCategorie] = useState("no categorie");
  const [itemsSelected, setItemsSelected] = useState([]);

  const [{ foodItems }, dispatch] = useStateValue();
  const [sliderSittings, setSliderSittings] = useState(initSettings);

  // filter items by categories
  useEffect(() => {
    const cotegorieItems = foodItems.filter((item) => {
      return item.categorie === categorie;
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
  }, [categorie]);

  return (
    <section className="container">
      <h1 className="heading title">Chose a categorie </h1>
      <div
        className="d-flex  align-items-center align-content-center"
        style={{ gap: "1rem", padding: "0 2rem", overflow: "auto" }}
      >
        {categories.map((categ, index) => {
          return (
            <CardMenu key={index} name={categ} setCategorie={setCategorie} />
          );
        })}
      </div>
      <div className="pt-5 pb-5">
        <Slider {...sliderSittings}>
          {itemsSelected.map((item, index) => {
            return (
              <>
                <Card
                  key={index}
                  name={item.name}
                  image={item.imageFile}
                  calories={item.calories}
                  price={item.price}
                />
              </>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

const CardMenu = ({ name, setCategorie }) => {
  const handelClick = (e) => {
    // change background color of cards when clicking on a card set categorie state
    const active = document.querySelector(".clicked");
    if (active) active.classList.remove("clicked");
    if (e.target.classList.contains("card")) {
      e.target.classList.add("clicked");
      setCategorie(e.target.id);
    }
    if (e.target.parentNode.classList.contains("card")) {
      e.target.parentNode.classList.add("clicked");
      setCategorie(e.target.parentNode.id);
    }
    if (e.target.parentNode.parentNode.classList.contains("card")) {
      e.target.parentNode.parentNode.classList.add("clicked");
      setCategorie(e.target.parentNode.parentNode.id);
    }

    //
  };

  // id to match categrie name in db
  let id = "";
  switch (name) {
    case "Fruits":
      id = "fruits";
      break;
    case "Drinks":
      id = "drinks";
      break;
    case "Rice&chiken":
      id = "rice & chiken";
      break;
    case "Icecream":
      id = "icecream";
      break;
    case "Fish":
      id = "Fish";
      break;
  }
  return (
    <motion.div whileTap={{ scale: "0.9" }}>
      <div
        className="card align-items-center menu-cards"
        style={{
          width: "150px",
          transition: "0.6s",
          borderRadius: "9px",
          cursor: "pointer",
          scale: "1",
        }}
        onClick={(e) => handelClick(e)}
        id={id}
      >
        <i
          className="bi bi-cup-straw mt-4"
          style={{
            fontSize: "50px",
            borderRadius: "50%",
            background: "#dc3545",
            padding: "0rem 1rem",
          }}
        ></i>
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
        </div>
      </div>
    </motion.div>
  );
};

export default Menu;
