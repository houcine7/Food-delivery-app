import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import HeroCards from "./HeroCards";

import { heroImgs } from "../data/dataFront";

const Hero = () => {
  return (
    <section className="container d-flex align-items-center justify-content-center flex-wrap">
      <div className="col-lg-6 ">
        <div className="container deliver-detail row align-items-center justify-content-center">
          <p className=" title text-light text-center">
            Fastest delivery with our MOTOservice
          </p>
          <i className="bi bi-bicycle " style={{ fontSize: "40px" }}></i>
        </div>
        <h1 className=" hero-text text-light text-size-large">
          Order Faster , Eat earlier <br /> We are
          <span className="important-hero">EVERYWHERE</span>
        </h1>
        <p className="text-size-large text-light">
          this is a text that describes our busniss but for now let it empty
          because I can't really think about somthing that would fit
        </p>
        <button
          className="btn hero-btn "
          style={{ width: "60%", padding: "10px" }}
        >
          Order now
        </button>
      </div>
      <div className="col-lg-6  position-relative hero-hook">
        <img className="img-fluid" src="./imgs/hero-photo.png" />
        <HeroCards img={heroImgs[0].img} top="0px" left="-6%" />
        <HeroCards img={heroImgs[1].img} bottom="0px" right="6%" />
        <HeroCards img={heroImgs[2].img} top="0px" right="6%" />
        <HeroCards img={heroImgs[3].img} bottom="0px" left="-6%" />
      </div>
    </section>
  );
};

export default Hero;
