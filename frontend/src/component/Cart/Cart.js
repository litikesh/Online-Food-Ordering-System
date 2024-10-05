import React from "react";
import styled from "styled-components";
import CartItemCard from "./CartItemCard";
import "./Cart.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Header from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import emptyCart from "../../img/emptyCart.svg";
import { Link } from "react-router-dom";
import PriceSummary from "./PriceSummary";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  margin-top: 120px;
  margin-right: 20px;
  padding: 20px 0;
`;

const TopButton = styled.button`
  display: flex;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid #black;
  color: #fff;
  background-color: hsl(45, 91%, 58%);
  border-radius: 15px;
  transition: 0.4s ease-in-out;
  :hover {
    color: #fff;
    background-color: hsl(45, 76%, 72%);
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
  border-radius: 5px;
`;

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <Header />
      <div className="container">
        <Wrapper>
          <div className="cart-Heading">
            <h1>
              SHOPPING CART
              <hr
                style={{
                  display: "block",
                  height: "1px",
                  width: "190px",
                  borderRadius: "5px",
                  border: "0",
                  borderTop: "4px solid hsl(45, 91%, 58%)",
                  padding: "0",
                }}
              />
            </h1>
          </div>
          {cartItems.length === 0 ? (
            <>
              <div style={{ paddingTop: "1rem" }} className="cart__inner">
                <div className="cart__items">
                  <img src={emptyCart} className="cart__empty" alt="img" />
                </div>
                <div className="cart__checkout">
                  <h4>Your cart feels lonely.</h4>
                  <p style={{ marginBottom: "2rem", fontWeight: "400" }}>
                    Your shopping cart lives to serve. Give it purpose - fill it
                    with books, electronicts, videos, etc. and make it happy.
                  </p>
                  <div className="buttons">
                    <Link to="/products">
                      <TopButton>
                        CONTINUE SHOPPING
                        <ArrowForwardIcon style={{ marginLeft: "5px" }} />
                      </TopButton>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Bottom className="btn-7">
                <Info>
                  {cartItems &&
                    cartItems.map((item) => (
                      <CartItemCard item={item} key={item.product} />
                    ))}
                </Info>

                <PriceSummary cartItems={cartItems} />
              </Bottom>
            </>
          )}
        </Wrapper>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
