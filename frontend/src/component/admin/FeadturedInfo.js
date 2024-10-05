import React, { useEffect } from "react";
import "./feadturedInfo.css";
import { AddShoppingCart, AttachMoney, BarChart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../actions/productAction.js";
import { getAllOrders } from "../../actions/orderAction.js";

export default function FeadturedInfo() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
  }, [dispatch]);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
  let totalAmount = 0;

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  return (
    <div className="featured">
      <div className="featuredItem">
        {/* info */}
        <div className="Admin__info">
          <div>
            <span className="featuredTitle">Product</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">
                {products && products.length}
              </span>
            </div>
          </div>
          <div
            className="boxIcons"
            style={{ color: " #2bd47d", background: "#c0f2d8" }}
          >
            <BarChart className="icons" />
          </div>
        </div>
        {/* text */}
        <span className="featuredSub">Compared to Last Month</span>
      </div>

      {/* sales */}
      <div className="featuredItem">
        {/* info */}
        <div className="Admin__info">
          <div>
            <span className="featuredTitle">Orders</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{orders && orders.length}</span>
            </div>
          </div>
          <div
            className="boxIcons"
            style={{ color: " #66b0ff", background: "#cce5ff" }}
          >
            <AddShoppingCart className="icons" />
          </div>
        </div>
        {/* text */}
        <span className="featuredSub">Compared to Last Month</span>
      </div>
      {/* cost */}
      <div className="featuredItem">
        {/* info */}
        <div className="Admin__info">
          <div>
            <span className="featuredTitle">Total Amount</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">
                Rs. {totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
          <div
            className="boxIcons"
            style={{ color: " #ffc233", background: "#ffe8b3" }}
          >
            <AttachMoney className="icons" />
          </div>
        </div>
        {/* text */}
        <span className="featuredSub">Compared to Last Month</span>
      </div>
    </div>
  );
}
