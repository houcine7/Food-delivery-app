import React, { useState } from "react";

import { useStateValue } from "../context/StateProvider";

import { motion } from "framer-motion";
import { useEffect } from "react";

const CartContainer = () => {
  const [{ user, cartItems }, dispatch] = useStateValue();
  const [subTot, setSubTotal] = useState(0);

  useEffect(() => {
    let ttl = 0;
    cartItems.map((item) => {
      ttl += parseInt(item.price);
    });
    setSubTotal(ttl);
  }, [cartItems]);
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
            onClick={() => {
              localStorage.clear();
              dispatch({
                type: "SET_CART_ITEMS",
                cartItems: [],
              });
            }}
          >
            clear
          </button>
        </div>
        {cartItems.length > 0 ? (
          <div className="cart-body d-flex flex-column align-items-center mt-5">
            <div className="items container">
              {/* items goes here  */}
              {cartItems.map((item, index) => {
                return (
                  <Item
                    key={index}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    handelQty={setSubTotal}
                  />
                );
              })}
            </div>

            <div className="payement position-absolute bottom-0">
              <div className="container pt-5 ">
                <div className="d-flex justify-content-between pb-5">
                  <strong className="text-muted">Total Cart</strong>
                  <strong className="text-light">{subTot + " $"}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <strong className="text-muted">Delivery </strong>
                  <strong className="text-light">{3.5 + " $"}</strong>
                </div>

                <div className="text-center mt-5 pt-3 border1">
                  <div className="d-flex justify-content-between">
                    <strong className="text-light">Total</strong>
                    <strong className="text-light">{subTot + 3.5} $</strong>
                  </div>
                </div>

                <button
                  className="position-absolute btn btn-danger"
                  style={{ bottom: "10px", left: "5px", right: "5px" }}
                >
                  {user ? "By Now" : "Login To Complete"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart-body d-flex flex-column align-items-center mt-5">
            <img
              className="img-fluid mb-5"
              alt="emptycart"
              src="./imgs/addtocart.png"
            />
            <strong>your cart is currently empty</strong>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Item = ({ image, name, price, handelQty }) => {
  const [quantity, setQuantity] = useState(1);
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
          onClick={() => {
            setQuantity((preQty) => preQty + 1);
            handelQty((prePricing) => prePricing + parseInt(price));
          }}
        ></i>
        <strong className="pl-2 pr-2">{quantity}</strong>
        <i
          className="bi bi-dash-circle-fill"
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => {
            if (quantity >= 1) {
              setQuantity((preQty) => preQty - 1);
              handelQty((prePricing) => prePricing - parseInt(price));
            }
          }}
        ></i>
      </div>
    </div>
  );
};

export default CartContainer;
