import React from "react";
import Header from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const TopButton = styled.button`
  display: flex;
  margin-top: 25px;
  padding: 15px;
  margin-left: 100px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid #black;
  color: #fff;
  background-color: green;
  border-color: #111;
  transition: 0.4s ease-in-out;
  :hover {
    color: #fff;
    background-color: rgb(105, 203, 105);
  }
`;
const OrderSuccess = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="order__container">
          <div className="order__card">
            <div
              style={{
                borderRadius: "200px",
                height: "200px",
                width: "200px",
                background: "#F8FAF5",
                margin: "0 auto",
              }}
            >
              <i className="checkmark">✓</i>
            </div>
            <h1 className="sucess__title">Success</h1>
            <p className="sucess__desc">
              Your Order has been Placed successfully
              <br /> we'll be in touch shortly!
            </p>

            <Link to="/orders">
              <TopButton type="submit" value="Continue">
                <ArrowBackIcon style={{ marginRight: "5px" }} />
                VIEW ORDERS
              </TopButton>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;
