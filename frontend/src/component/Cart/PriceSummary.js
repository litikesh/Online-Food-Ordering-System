import React from "react";
import styled from "styled-components";
import "../styles.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const Summary = styled.div`
  flex: 1;
  margin-left: 5px;
  margin-top: 15px;
  border-radius: 4px;
  padding: 20px;
  height: 56.7vh;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const SummaryTitle = styled.h1`
  text-align: center;
  font-weight: 700;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "600"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span`
  display: flex;
`;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
  color: white;
  font-weight: 600;
  transition: 0.4s ease-in-out;
  background-color: hsl(45, 91%, 58%);
  border-radius: 15px;

  :hover {
    color: #fff;
    background-color: hsl(45, 76%, 72%);
    transition: 0.4s ease-in-out;
    transform: translateY(-5px);
  }
`;

const Hr = styled.hr`
  background-color: #111;
  border: none;
  height: 1px;
`;

const PriceSummary = ({ cartItems }) => {
  const navigate = useNavigate();

  const placeOrderHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <>
      <Summary className="summary">
        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
        <SummaryItem>
          <SummaryItemText>
            Price{" "}
            <span style={{ fontSize: "15px", paddingLeft: "5px" }}>
              ({cartItems.length} item)
            </span>
          </SummaryItemText>
          <SummaryItemPrice>
            Rs.{" "}
            {cartItems
              .reduce((sum, item) => sum + item.actualPrice * item.quantity, 0)
              .toLocaleString()}
          </SummaryItemPrice>
        </SummaryItem>
        <SummaryItem>
          <SummaryItemText>Discount</SummaryItemText>
          <SummaryItemPrice style={{ color: "rgb(25, 156, 25)" }}>
            - Rs.{" "}
            {cartItems
              .reduce(
                (sum, item) =>
                  sum +
                  (item.actualPrice * item.quantity -
                    item.price * item.quantity),
                0
              )
              .toLocaleString()}
          </SummaryItemPrice>
        </SummaryItem>
        <SummaryItem>
          <SummaryItemText>Delivery Charges</SummaryItemText>
          <SummaryItemPrice style={{ color: "rgb(25, 156, 25)" }}>
            FREE
          </SummaryItemPrice>
        </SummaryItem>

        <Hr />
        <SummaryItem type="total">
          <SummaryItemText>Total</SummaryItemText>
          <SummaryItemPrice>
            Rs.{" "}
            {cartItems
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toLocaleString()}
          </SummaryItemPrice>
        </SummaryItem>

        <Button onClick={placeOrderHandler}>
          CHECKOUT NOW <ArrowForwardIcon style={{ marginLeft: "5px" }} />
        </Button>
      </Summary>
    </>
  );
};

export default PriceSummary;
