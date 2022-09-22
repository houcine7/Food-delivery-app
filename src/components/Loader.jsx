import React from "react";
import { useState } from "react";
//app loader
import { BeatLoader } from "react-spinners";

const Loader = () => {
  const [loading, setLoading] = useState(true);

  setInterval(() => setLoading(false), 4000);
  return (
    loading && (
      <div className="position-absolute loader">
        <BeatLoader
          color="white"
          cssOverride={{
            position: "absolute",
            left: "49%",
            top: "15%",
          }}
        />
      </div>
    )
  );
};

export default Loader;
