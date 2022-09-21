import React, { useState, useEffect } from "react";

import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
const categories = ["Fruits", "Drinks", "Rice&chiken", "Fish", "Icecream"];

const Menu = () => {
  const [categorie, setCategorie] = useState("");
  const [{ foodItems }, dispatch] = useStateValue();
  console.log(foodItems);
  console.log(categorie);

  // filter items by categories
  useEffect(() => {
    const cotegorieItems = foodItems.filter((item) => {
      return item.categorie === categorie;
    });
    console.log(cotegorieItems);
  }, [categorie]);

  return (
    <section className="container">
      <h1 className="heading title">Chose a categorie </h1>
      <div
        className=" d-flex justify-content-center align-items-center "
        style={{ gap: "1rem", overflow: "auto", padding: "0 2rem" }}
      >
        {categories.map((categ) => {
          return <CardMenu name={categ} setCategorie={setCategorie} />;
        })}
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
      id = "fish";
      break;
  }
  console.log(id);
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
          class="bi bi-cup-straw mt-4"
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
