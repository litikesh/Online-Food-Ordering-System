import React from "react";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { Link } from "react-router-dom";

const OrdersTable = ({ orderInfo }) => {
  const status = ["Preparing", "On The Way", "Delivered"];

  return (
    <>
      <tbody>
        <tr>
          <td>
            <p>{orderInfo._id}</p>
          </td>
          <td>{orderInfo.paidAt.split("T")[0]}</td>
          <td>
            <p
              className={`status ${
                status[orderInfo?.orderStatus] === 0 ? "processing" : "paid"
              }`}
            >
              {status[orderInfo?.orderStatus]}
            </p>
          </td>
          <td>{orderInfo.orderItems.length}</td>
          <td className="amount">
            Rs. {orderInfo.totalPrice.toLocaleString()}
          </td>
          <td>
            <Link to={`/order/${orderInfo._id}`} className="order_act">
              <OpenInNewOutlinedIcon />
            </Link>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default OrdersTable;
