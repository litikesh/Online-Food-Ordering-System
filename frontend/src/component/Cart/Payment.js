import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import Header from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./Payment.css";
import chip from "../../img/card/chip.png";
import visa from "../../img/card/visa.png";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const payBtn = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const stripe = useStripe();
  const elements = useElements();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.Username,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        enqueueSnackbar(result.error.message, { variant: "error" });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          enqueueSnackbar("There's some issue while processing payment ", {
            variant: "error",
          });
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <Header />
      <div className="container">
        <div style={{ margin: "150px -50px -20px -50px" }}>
          <CheckoutSteps activeStep={2} />
        </div>
        <div className="paymentContainer">
          {/* card */}
          <div className="card__container">
            <div className="front">
              <div className="image">
                <img src={chip} alt="" />
                <img src={visa} alt="" />
              </div>
              <div className="card-number-box">4242 4242 4242 4242</div>
              <div className="flexbox">
                <div className="box">
                  <span>Card Holder</span>
                  <div className="card-holder-name">Jon H</div>
                </div>
                <div className="box">
                  <span>Expires</span>
                  <div className="expiration">
                    <span className="exp-month">05 / </span>
                    <span className="exp-year">24</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="back">
              <div className="stripe"></div>
              <div className="box">
                <span>cvv</span>
                <div className="cvv-box"></div>
                <img src={visa} alt="" />
              </div>
            </div>
          </div>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="inputBox">
              <span>Card Number</span>
              <div>
                <CreditCardIcon />
                <CardNumberElement value={2} className="paymentInput" />
              </div>
            </div>
            <div className="inputBox">
              <span>Card Holder</span>
              <input type="text" className="card-holder-input" required />
            </div>
            <div className="flexbox">
              {/* year */}
              <div className="inputBox">
                <span>Expiration MM/YY</span>
                <div>
                  <EventIcon />
                  <CardExpiryElement className="paymentInput" />
                </div>
              </div>
              {/* cvv */}
              <div className="inputBox">
                <span style={{ marginLeft: "40px" }}>CVV</span>
                <div>
                  <VpnKeyIcon />
                  <CardCvcElement className="paymentInput" />
                </div>
              </div>
            </div>

            <input
              type="submit"
              value={`Pay - Rs. ${
                orderInfo && orderInfo.totalPrice.toLocaleString()
              }`}
              ref={payBtn}
              className="payment__submitBtn"
            />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
