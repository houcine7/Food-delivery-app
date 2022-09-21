import React from "react";

const Aert = ({ show, color, msg }) => {
  return (
    <div
      className={"alert alert-dismissible fade" + " " + show + " " + color}
      role="alert"
    >
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>{msg} </strong>
    </div>
  );
};

export default Aert;
