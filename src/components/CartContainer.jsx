import React from "react";

import { useStateValue } from "../context/StateProvider";

import { motion } from "framer-motion";

const CartContainer = () => {
  const [{ cartItems }, dispatch] = useStateValue();
  const hideCart = () => {
    dispatch({
      type: "SET_SHOW_CART",
      cartShow: false,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0.5 }}
    >
      <div className="container-cart position-fixed  align-content-center">
        <div className="container cart-top d-flex justify-content-between align-items-center pt-2">
          <strong>
            <i
              className="bi bi-arrow-left-circle"
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={hideCart}
            ></i>
          </strong>
          <strong>cart</strong>
          <button
            className="btn btn-rounded"
            style={{
              background: "var(--red)",
              padding: "2px 12px",
              color: "white",
              fontWeight: "700",
            }}
          >
            clear
          </button>
        </div>

        <div className="cart-body d-flex flex-column align-items-center mt-5">
          <div className="items container">
            {/* items goes here  */}
            {cartItems &&
              cartItems.map((item, index) => {
                return (
                  <Item
                    key={index}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                  />
                );
              })}
          </div>

          <div className="payement position-absolute bottom-0">
            <div className="container pt-5 ">
              <div className="d-flex justify-content-between pb-5">
                <strong className="text-muted">Total Cart</strong>
                <strong className="text-light">{8 + "$"}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <strong className="text-muted">Total Cart</strong>
                <strong className="text-light">{8 + "$"}</strong>
              </div>

              <div className="text-center mt-5 pt-3 border1">
                <div className="d-flex justify-content-between">
                  <strong className="text-light">Total</strong>
                  <strong className="text-light">55$</strong>
                </div>
              </div>

              <button
                className="position-absolute btn btn-danger"
                style={{ bottom: "10px", left: "5px", right: "5px" }}
              >
                By Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Item = ({ image, name, price }) => {
  return (
    <div className=" cart-item d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img
          src={image}
          alt="item"
          className="img-fluid"
          style={{ height: "60px" }}
        />
        <div className="d-flex flex-column">
          <strong>{name}</strong>
          <p>{price} $</p>
        </div>
      </div>

      <div className="counter d-flex justify-content-around align-items-center">
        <i
          className="bi bi-plus-circle-fill"
          style={{ fontSize: "20px", cursor: "pointer" }}
        ></i>
        <strong className="pl-2 pr-2">1</strong>
        <i
          className="bi bi-dash-circle-fill"
          style={{ fontSize: "20px", cursor: "pointer" }}
        ></i>
      </div>
    </div>
  );
};

export default CartContainer;
