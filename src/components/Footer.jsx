import React from "react";

const Footer = () => {
  return (
    <footer className="footer d-flex flex-column justify-content-center align-items-center pt-3 pb-3">
      <div>
        <strong className="text-light">©2022 : EL ADDALI LAHOUCINE</strong>
        <div className="d-flex text-light justify-content-around">
          <i className="bi bi-github" style={{ fontSize: "40px" }}></i>
          <i className="bi bi-linkedin" style={{ fontSize: "40px" }}></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
