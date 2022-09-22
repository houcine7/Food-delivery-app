import React from "react";
import { motion } from "framer-motion";

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
  let defaultCard = "";
  switch (name) {
    case "Fruits":
      id = "fruits";
      defaultCard = "clicked";
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
        className={"card align-items-center menu-cards " + defaultCard}
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

export default CardMenu;
