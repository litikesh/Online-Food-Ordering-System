import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ConfirmOrder.css";
import styled from "styled-components";
import Header from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const Product = styled.div`
  display: flex;
  border-bottom: 0;
  justify-content: space-evenly;
`;

const Hr = styled.hr`
  margin: 10px 0;
  background-color: #acacad;
  border: none;
  height: 0.5px;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  width: 100%;
  height: 100%;
`;
const Image = styled.img`
  margin: 2%;
  width: 150px;
  height: 150px;
  object-fit: contain;
`;

const Details = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  display: flex;
  & .new:hover {
    color: #acb5ee;
  }
`;

const ProductId = styled.span`
  font-size: 16px;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
  gap: 10px 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.span`
  padding-left: 10px;
  font-weight: 700;
  font-size: 22px;
`;

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <>
      <Header />
      <div className="container">
        <div style={{ margin: "150px -50px 10px -50px" }}>
          <CheckoutSteps activeStep={1} />
        </div>
        <div className="confirmOrderPage">
          <div>
            <div className="confirmshippingArea">
              <div className="orderInfo-Heading">
                <h4>Shipping Info</h4>
              </div>
              <div className="confirmshippingAreaBox">
                <div>
                  <p>Name:</p>
                  <span>{user.Username}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>{address}</span>
                </div>
              </div>
            </div>
            {/* cart intem */}
            <div className="confirmCartItems">
              <div className="shipInfo-Heading">
                <h2>Your Cart Items:</h2>
              </div>
              <div className="confirmCartItemsContainer">
                {cartItems &&
                  cartItems.map((item) => (
                    <Product className="pay__Product" key={item.product}>
                      <ProductDetail>
                        <Image src={item.image} />
                        <Details>
                          <ProductName>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </ProductName>
                          <ProductId>
                            <b>ID:</b> #{item.product}
                          </ProductId>
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <div className="pay__price">
                          <div style={{ marginLeft: "-50px" }}>
                            {item.quantity} X Rs. {item.price} =
                          </div>
                          <Price>
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </Price>
                        </div>
                      </PriceDetail>
                    </Product>
                  ))}
              </div>
            </div>
          </div>
          {/*  */}
          <div>
            {/* order summary */}
            <div className="payment__summary">
              <h2 style={{ textTransform: "uppercase" }}>Confirm Order</h2>
              {/* <p>Order ID: {cartItems.product}</p> */}
              <div className="payment__summaryList">
                {cartItems.map((item) => (
                  <div className="payment__item">
                    <span className="payment__name">
                      {item.name.substring(0, 28)}
                    </span>
                    <small
                      className="payment__quantity"
                      style={{ marginLeft: "1px" }}
                    >
                      x {item.quantity}
                    </small>
                    <span className="payment__price">
                      <small>Rs. </small>
                      {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}

                <Hr />

                <div className="payment__item">
                  <span className="payment__name">Sub Total</span>
                  <span className="payment__price">
                    <small>Rs. </small>
                    {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="payment__item">
                  <span className="payment__name">Shipping Charges</span>
                  <span className="payment__price">
                    <small>Rs. </small>
                    {shippingCharges.toLocaleString()}
                  </span>
                </div>
                <div className="payment__item" style={{ color: "green" }}>
                  <span className="payment__name ">GST</span>
                  {/* <small className="payment__quantity">(+1%)</small> */}
                  <span className="payment__price">
                    <small>Rs. </small>
                    {tax}
                  </span>
                </div>
                <div style={{ marginTop: "1.5rem" }} className="payment__item">
                  <span className="payment__name">Grand Total</span>
                  <span className="payment__price">
                    <strong style={{ fontSize: "1.25em", fontWeight: "700" }}>
                      <small>Rs. </small>
                      {totalPrice.toLocaleString()}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="PayButtons">
                <button
                  onClick={proceedToPayment}
                  className="anybtn button buttonPrimary"
                >
                  Proceed To Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmOrder;
