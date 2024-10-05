import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TimelineIcon from "@mui/icons-material/Timeline";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { logout } from "../../actions/userAction";

import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    enqueueSnackbar("Logout Successfully", { variant: "success" });
    navigate("/");
  };

  return (
    <>
      <nav className="sidebar">
        <header>
          <div className="image-text">
            <span className="image">
              <a href="/admin/dashboard" style={{ color: "black" }}>
                <h1>Food Store.</h1>
              </a>
            </span>
            {/* 
            <div
              className="text logo-text"
              style={{
                paddingLeft: "5px",
              }}
            >
              <span className="name">Hello, {user.Username}</span>
            </div> */}
          </div>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li className="search-box">
              <SearchIcon className="icon" />
              <input type="text" placeholder="Search..." />
            </li>

            <ul className="menu-links">
              <li className="nav-link">
                <a href="/admin/dashboard">
                  <HomeOutlinedIcon className="icon" />
                  <span className="text nav-text">Dashboard</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="/admin/products">
                  <TimelineIcon className="icon" />
                  <span className="text nav-text">Products</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="/admin/product">
                  <AddBoxIcon className="icon" />
                  <span className="text nav-text">Add Product</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="/admin/orders">
                  <ListAltIcon className="icon" />
                  <span className="text nav-text">Orders</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="/admin/users">
                  <PeopleIcon className="icon" />
                  <span className="text nav-text">Users</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="/admin/reviews">
                  <RateReviewIcon className="icon" />
                  <span className="text nav-text">Reviews</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li>
              <a href="/" onClick={handleLogout}>
                <LogoutIcon className="icon" />
                <span className="text nav-text">Logout</span>
              </a>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
