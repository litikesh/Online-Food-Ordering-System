import React, { useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar.js";
import FeadturedInfo from "./FeadturedInfo.js";

import WidgetSm from "./widgetSm/WidgetSm.js";
import WidgetLg from "./widgetLg/WidgetLg.js";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { clearErrors, getAllUsers } from "../../actions/userAction.js";
import { getAllOrders } from "../../actions/orderAction.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { orders } = useSelector((state) => state.allOrders);

  const { error, users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch, error, enqueueSnackbar, navigate]);

  return (
    <div className="Admin__dashboard">
      <Sidebar />
      <section className="Admin__home">
        <FeadturedInfo />
      </section>
    </div>
  );
};

export default Dashboard;
