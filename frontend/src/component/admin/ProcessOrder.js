import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";
import { useSnackbar } from "notistack";
import Sidebar from "./Sidebar";

const Product = styled.div`
  display: flex;
  border-bottom: 0;
  justify-content: space-evenly;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  width: 100%;
  height: 100%;
`;
const Image = styled.img`
  margin: 5%;
  width: 100px;
  height: 100px;
  border-radius: 15px;
  object-fit: cover;
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

const ProcessOrder = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState("");

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const params = useParams();
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const orderStatus = ["preparing", "on the way", "delivered"];
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(params.id, myForm));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (updateError) {
      enqueueSnackbar(updateError, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      enqueueSnackbar("Order Updates Successfully", { variant: "success" });
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, enqueueSnackbar, error, params.id, isUpdated, updateError]);

  return (
    <>
      <div className="Admin__dashboard">
        <Sidebar />
        <section className="Admin__home">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="newProductContainer">
                <header>Update Orders</header>
                <div className="confirmOrderPage">
                  <div>
                    <div className="confirmOrderArea">
                      <div className="shipInfo-Heading">
                        <h2>Shipping Info:</h2>
                      </div>
                      <div className="confirmOrderAreaBox">
                        <div>
                          <p>Name:</p>
                          <span>{order.user?.Username}</span>
                        </div>
                        <div>
                          <p>Phone:</p>
                          <span>{order.shippingInfo?.phoneNo}</span>
                        </div>
                        <div>
                          <p>Address:</p>
                          <span>
                            {order.shippingInfo &&
                              `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="confirmOrderArea">
                      <div className="shipInfo-Heading">
                        <h2>Payment Info:</h2>
                      </div>
                      <div className="confirmOrderAreaBox">
                        <div>
                          <p>Payment Status :</p>
                          <span
                            className={
                              order.paymentInfo &&
                              order.paymentInfo.status === "succeeded"
                                ? "greenColor"
                                : "redColor"
                            }
                          >
                            {" "}
                            {order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "PAID"
                              : "NOT PAID"}
                          </span>
                        </div>
                        <div>
                          <p>Amount:</p>
                          <span>
                            Rs.{" "}
                            {order.totalPrice &&
                              order.totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="confirmOrderArea">
                      <div className="shipInfo-Heading">
                        <h2>Order Status:</h2>
                      </div>
                      <div className="confirmOrderAreaBox">
                        <div>
                          <p>Order Status :</p>
                          <span
                            className={
                              orderStatus[order.orderStatus] &&
                              orderStatus[order.orderStatus] === "delivered"
                                ? "greenColor"
                                : "redColor"
                            }
                          >
                            {orderStatus[order.orderStatus] &&
                              orderStatus[order.orderStatus].toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* cart intem */}
                    <div className="confirmOrderedItems">
                      <div className="shipInfo-Heading">
                        <h2>Your Cart Items:</h2>
                      </div>
                      <div className="confirmCartItemsContainer">
                        {order.orderItems &&
                          order.orderItems.map((item) => (
                            <Product
                              className="pay__Product"
                              key={item.product}
                            >
                              <ProductDetail>
                                <Image src={item.image} />
                                <Details>
                                  <ProductName>
                                    <Link to={`/product/${item.product}`}>
                                      {item.name}
                                    </Link>
                                  </ProductName>
                                </Details>
                              </ProductDetail>
                              <PriceDetail>
                                <div className="pay__price">
                                  <div style={{ marginLeft: "-50px" }}>
                                    {item.quantity} X Rs. {item.price} =
                                  </div>
                                  <Price>
                                    Rs.{" "}
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString()}
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
                    <div className="Order__Updated">
                      <h2 style={{ textTransform: "uppercase" }}>
                        Process Order
                      </h2>
                      <div
                        style={{
                          display:
                            orderStatus[order.orderStatus] === "Delivered"
                              ? "none"
                              : "block",
                        }}
                      >
                        <form
                          className="updateOrderForm"
                          onSubmit={updateOrderSubmitHandler}
                        >
                          <div>
                            <p className="par">Update to Next Step :</p>
                            <AccountTreeIcon className="icon__red" />
                            <select
                              onChange={(e) =>
                                setStatus(() => order.orderStatus + 1)
                              }
                            >
                              <option value="">Choose Process</option>
                              {orderStatus[order.orderStatus] ===
                                "preparing" && (
                                <option value="on the way">on the way</option>
                              )}

                              {orderStatus[order.orderStatus] ===
                                "on the way" && (
                                <option value="Delivered">Delivered</option>
                              )}
                            </select>
                          </div>

                          <div className="PayButtons">
                            <button
                              id="createProductBtn"
                              disabled={
                                loading
                                  ? true
                                  : false || status === ""
                                  ? true
                                  : false
                              }
                              className="anybtn button buttonPrimary"
                            >
                              Process
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default ProcessOrder;
