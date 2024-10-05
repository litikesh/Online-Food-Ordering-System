import React from "react";
import { Link } from "react-router-dom";

const Categories = ({ FoodCat }) => {
  const LinkToPage = () => {
    window.reload();
  };
  return (
    <>
      <div className="Cat__card" style={{ marginTop: "5px" }}>
        <div className="card-bg">
          <img src={FoodCat.src} alt={FoodCat.name} />;
        </div>
        <div className="card-context">
          <div className="dark-bg"></div>
          <h2>{FoodCat.name}</h2>
          <p>{FoodCat.desc}</p>
          <Link to={`/products?category=${FoodCat.cat}`} onClick={LinkToPage}>
            <button>View more</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Categories;
