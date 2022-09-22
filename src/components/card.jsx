import React from "react";

import Slider from "react-slick";
import { useStateValue } from "../context/StateProvider";

var settings = {
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
export const Card = ({ name, image, calories, price }) => {
  return (
    <div
      className="card p-3"
      style={{
        marginLeft: "5px",
        marginRight: "5px",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <div className="d-flex justify-content-between align-items-center ">
        <div className="mt-2">
          <h4 className="text-uppercase">{name}</h4>
          <div className="mt-3">
            <h5 className="mb-0 text-muted">{calories}</h5>
            <h1 className="main-heading mt-1">{price} $</h1>
          </div>
        </div>
        <div className="image-fluid d-flex justify-content-center">
          <img
            className="img-food"
            src={image}
            style={{ height: "200px", transition: "0.5" }}
            loading="lazy"
          />
        </div>
      </div>
      <p>A great option where ever you are. </p>

      <button className="btn btn-danger">Add to cart</button>
    </div>
  );
};

const Cards = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  return (
    <div className="container">
      <h1 className="heading title">Most ordred Food</h1>
      <Slider {...settings}>
        {foodItems.map((food, index) => {
          if (
            food.name === "coca" ||
            food.name === "watermelon" ||
            food.name === "Sardine" ||
            food.name === "grape" ||
            food.name === "kentaki"
          ) {
            return (
              <Card
                name={food.name}
                image={food.imageFile}
                calories={food.calories}
                price={food.price}
                key={food.id}
              />
            );
          }
        })}
      </Slider>
    </div>
  );
};

export default Cards;
