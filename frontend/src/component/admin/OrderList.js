import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
// import "./productList.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const status = ["preparing", "on the way", "delivered"];

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (deleteError) {
      enqueueSnackbar(deleteError, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      enqueueSnackbar("Order Deleted Successfully", { variant: "success" });
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, enqueueSnackbar, isDeleted, deleteError, navigate]);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minwidth: 150,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "delivered" ? (
              <span className="Order__Status_sucess">
                {params.row.status.toUpperCase()}
              </span>
            ) : (
              <span className="Order__Status">
                {params.row.status.toUpperCase()}
              </span>
            )}
          </>
        );
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "orderOn",
      headerName: "Order On",
      type: "date",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/order/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
              className="productListDelete"
            />
          </>
        );
      },
    },
  ];
  const formatDate = (dt) => {
    return new Date(dt).toUTCString().substring(0, 16);
  };
  const rows = [];
  orders &&
    orders.forEach((order) => {
      rows.unshift({
        id: order._id,
        itemsQty: order.orderItems.length,
        amount: order.totalPrice,
        orderOn: formatDate(order.createdAt),
        status: status[order.orderStatus],
      });
    });

  return (
    <div className="Admin__dashboard">
      <Sidebar />
      <section className="Admin__home">
        <h1 id="productListHeading">ALL Food Orders</h1>

        <div className="productList">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </section>
    </div>
  );
};

export default OrderList;
