import React from "react";
import "../styles.css";
import Header from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import errorImg from "../../img/404.png";

const PageNotFound = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="pagenot">
          <img src={errorImg} className="four-0-four-img" alt="" />
          <p className="four-0-four-msg">
            Look like you are lost. Head to back to our
            <a href="/"> Home Page.</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;
