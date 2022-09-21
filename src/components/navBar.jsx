import React from "react";
import { motion } from "framer-motion";

// firebase imports
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  ActionCodeOperation,
} from "firebase/auth";
import { app } from "../firebase.config";

// context imports

import { useStateValue } from "../context/StateProvider";
//
const NavBar = () => {
  const firebaseAthentication = getAuth(app);
  const providerAuth = new GoogleAuthProvider();

  // context
  const [{ user }, dispatch] = useStateValue();
  //
  const handelClick = async () => {
    console.log("clicked");
    if (!user) {
      const res = await signInWithPopup(firebaseAthentication, providerAuth);

      //get user refresh token and user's data
      const {
        user: { refreshToken, providerData },
      } = res;

      console.log(providerData[0]);
      //
      dispatch({
        type: "SET_USER",
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    }
  };

  function logoutFunction() {
    localStorage.clear();
    dispatch({
      type: "SET_USER",
      user: null,
    });
  }

  // store user info in localStorage

  return (
    <nav className="nav navbar navbar-expand-lg position-fixed">
      <a
        className="navbar-brand"
        to="#home"
        style={{
          color:
            "linear-gradient(90deg, #963cff 0%, rgba(255, 0, 101, 1) 100%)",
        }}
      >
        <img
          src="./imgs/logo.png"
          alt="logo img"
          className="navbr-brand img-fluid"
        />
      </a>

      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label
        className="menu-icon navbar-toggler"
        htmlFor="menu-btn"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navicon"></span>
      </label>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ">
          <li className="nav-item active ">
            <a className=" nav-link   homelink " href="/">
              Home
            </a>
          </li>
          <li className="nav-item ">
            <div className="dropdown show">
              <a className="nav-link projectslink" href="#">
                AboutUs
              </a>
            </div>
          </li>
          <li className="nav-item ">
            <a className=" nav-link  crlink" href="#">
              Menu
            </a>
          </li>
          <li className="nav-item ">
            <a className=" nav-link eclink" href="/Education">
              Services
            </a>
          </li>
          <div
            className="nav-item "
            onClick={handelClick}
            style={{ position: "relative" }}
          >
            {user ? (
              <img
                className="img-profile dropdown-toggle"
                src={user.photoURL}
                alt="userprofile"
                data-toggle="dropdown"
              />
            ) : (
              <i
                className="bi bi-person-circle dropdown-toggle"
                data-toggle="dropdown"
              ></i>
            )}
            {user ? (
              <>
                <div
                  className="dropdown-menu text-center"
                  style={{ left: "-50px" }}
                >
                  <h6 className="dropdown-header">Welcome to FOODIFY</h6>
                  <a className="dropdown-item" href="#">
                    Add item
                  </a>
                  <button
                    className="btn btn-primary btn-sm btn-block"
                    onClick={logoutFunction}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="container position-relative">
            <div data-badge="3" className="bi bi-bag">
              <span className="cart-count">3</span>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
