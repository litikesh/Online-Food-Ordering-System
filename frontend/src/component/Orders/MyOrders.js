import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import Header from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import Loader from "../layout/Loader/Loader";
import OrdersTable from "./OrdersTable";
import "./MyOrders.css";
import { clearErrors, myOrders } from "../../actions/orderAction";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, enqueueSnackbar, error]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="cart-Heading" style={{ marginTop: "100px" }}>
          <h1>
            OUR ORDERS
            <hr
              style={{
                display: "block",
                height: "2px",
                width: "80px",
                borderRadius: "5px",
                border: "0",
                borderTop: "4px solid #9daaf2",
                padding: "0",
              }}
            />
          </h1>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="table-data">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  <th>Item Qty</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {orders &&
                orders.map((item) => (
                  <OrdersTable orderInfo={item} key={item._id} />
                ))}
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
