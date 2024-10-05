import React from "react";
import "./loading.css";

function Loader() {
  return (
    <div className="loading">
      <div className="arc"></div>
      <h1 className="Loading-head">
        <span>LOADING</span>
      </h1>
    </div>
  );
}

export default Loader;
