import React from "react";

import { motion } from "framer-motion";

const HeroCards = ({ img, left, right, bottom, top }) => {
  return (
    <div
      className="card card-hero"
      style={{ left: left, right: right, bottom: bottom, top: top }}
    >
      <p className="card-title">gg</p>
      <div className="card-content text-center">
        <img
          className="img-fluid"
          src={img}
          alt="img-static"
          style={{
            maxWidth: "60%",
          }}
        />
      </div>
    </div>
  );
};

export default HeroCards;
