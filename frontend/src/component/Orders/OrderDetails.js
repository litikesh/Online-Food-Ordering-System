import React, { useEffect } from "react";
import "./OrderDetails.css";
import { useSnackbar } from "notistack";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Header from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import Loader from "../layout/Loader/Loader";
import { useParams } from "react-router-dom";
import paid from "../../img/status/paid.png";
import Checked from "../../img/status/checked.png";
import bake from "../../img/status/bake.png";
import bike from "../../img/status/bike.png";
import Delivered from "../../img/status/delivered.png";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const orderId = params.id;

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(orderId));
  }, [dispatch, enqueueSnackbar, error, orderId]);
  const styles = {
    done: "done",
    inProgress: "inProgress",
    undone: "undone",
  };

  const status = order?.orderStatus;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  return (
    <>
      <Header />

      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="Heading" style={{ marginTop: "120px" }}>
            <h1>
              YOUR ORDER
              <hr
                style={{
                  display: "block",
                  height: "1px",
                  width: "100px",
                  border: "0",
                  marginTop: "-5px",
                  borderRadius: "15px",
                  borderTop: "4px solid hsl(45, 91%, 58%)",
                  padding: "0",
                }}
              />
            </h1>
          </div>
          <div className="orderContainer">
            <div className="orderLeft__Container">
              <div className="Order__row" style={{ marginRight: "20px" }}>
                <table className="Order__table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Address</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <p>{order && order._id}</p>
                      </td>
                      <td>
                        <span className="UserName">
                          {order.user && order.user.Username}
                        </span>
                      </td>
                      <td>
                        <span className="Order__address">
                          {order.shippingInfo &&
                            ` ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        </span>
                      </td>
                      <td className="amount">
                        Rs.
                        {order.totalPrice && order.totalPrice.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="Order__row">
                {/* 1 */}
                <div className={statusClass(0)}>
                  <img src={paid} width={30} height={30} alt="" />
                  <span>Payment</span>
                  <div className="Order__checkedIcon">
                    <img
                      className="Order__checkedIcon"
                      src={Checked}
                      width={20}
                      height={20}
                      alt=""
                    />
                  </div>
                </div>
                {/* 2 */}
                <div className={statusClass(1)}>
                  <img src={bake} width={30} height={30} alt="" />
                  <span>Preparing</span>
                  <div className="Order__checkedIcon">
                    <img
                      className="Order__checkedIcon"
                      src={Checked}
                      width={20}
                      height={20}
                      alt=""
                    />
                  </div>
                </div>
                {/* 3 */}
                <div className={statusClass(2)}>
                  <img src={bike} width={30} height={30} alt="" />
                  <span>On the way</span>
                  <div className="Order__checkedIcon">
                    <img
                      className="Order__checkedIcon"
                      src={Checked}
                      width={20}
                      height={20}
                      alt=""
                    />
                  </div>
                </div>
                {/* 4 */}
                <div className={statusClass(3)}>
                  <img src={Delivered} width={30} height={30} alt="" />
                  <span>Delivered</span>
                  <div className="Order__checkedIcon">
                    <img
                      className="Order__checkedIcon"
                      src={Checked}
                      width={20}
                      height={20}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="orderRight__Container">
              <div className="order__wrapper">
                <h2 className="order__title">CART TOTAL</h2>
                <div className="order__totalText">
                  <b className="order__totalTextTitle">Subtotal:</b>
                  <span>Rs. {order.itemsPrice?.toLocaleString()}</span>
                </div>
                <div className="order__totalText">
                  <b className="order__totalTextTitle">GST:</b>{" "}
                  <span>Rs. {order.taxPrice}</span>
                </div>
                <div className="order__totalText">
                  <b className="order__totalTextTitle">Total:</b>{" "}
                  <span>Rs. {order.totalPrice?.toLocaleString()}</span>
                </div>
                <div className="orderSuc">
                  <span>Payment Status</span>
                  <span
                    className={`order__button ${
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }`}
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default OrderDetails;
