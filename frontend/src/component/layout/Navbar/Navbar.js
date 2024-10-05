import React from "react";
import { useSelector } from "react-redux";
import "./Navbar.css";
import SearchBar from "../../Product/SearchBar";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
// icon
import {
  AccountCircleOutlined,
  Settings,
  Logout,
  ShoppingBag,
  Timeline,
} from "@mui/icons-material";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useSnackbar } from "notistack";

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
  }

  const nav = [
    {
      id: 1,
      title: "My Orders",
      icon: <ShoppingBag className="user-icons" />,
      redirect: "/orders",
    },
    {
      id: 2,
      title: " My Profile",
      icon: <Settings className="user-icons " />,
      redirect: "/account",
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    enqueueSnackbar("Logout Successfully", { variant: "success" });
  };

  return (
    <div className="container">
      <header>
        <nav className="navbar">
          <div className="navbar-wrapper">
            <a href="/" className="heading">
              <h1>FoodosFest</h1>
            </a>

            <ul className="navbar-nav">
              <li>
                <a href="/" className="nav-link">
                  Home
                </a>
              </li>

              {/* <li>
                <a href="#Categories" className="nav-link">
                  Categories
                </a>
              </li> */}

              <li>
                <a href="/orders" className="nav-link">
                  Your Order
                </a>
              </li>

              <li>
                <a href="/products" className="nav-link">
                  Our Menu
                </a>
              </li>
              <li>
                <a href="/about" className="nav-link">
                  About
                </a>
              </li>
            </ul>

            <div className="scarch___box">
              <SearchBar />
            </div>

            <div className="navbar-btn-group">
              <div className="action">
                {isAuthenticated === false ? (
                  <Link to="/login">
                    <button className="shopping-cart-btn">
                      <AccountCircleOutlined
                        className="person"
                        style={{ fontSize: 30 }}
                      />
                    </button>
                  </Link>
                ) : (
                  <>
                    <button className="shopping-cart-btn" onClick={menuToggle}>
                      <AccountCircleOutlined
                        className="person"
                        style={{ fontSize: 30 }}
                      />
                    </button>
                    <div className="menu">
                      <div className="info">
                        <h3>
                          {/* <span>Welcome Back,</span> */}
                          {user.firstName} {user.lastName} <br />
                          <span>{user.email}</span>
                        </h3>
                      </div>

                      <ul>
                        {user.role === "admin" && (
                          <li>
                            <Timeline className="user-icons" />
                            <Link to="/admin/dashboard">Admin Panel</Link>
                          </li>
                        )}

                        {nav.map((item) => {
                          var { title, icon, redirect, id } = item;
                          return (
                            <li key={Number(id)}>
                              {icon}
                              <Link to={redirect}>{title}</Link>
                            </li>
                          );
                        })}

                        <li onClick={handleLogout}>
                          <Logout className="user-icons" />
                          <Link to="/">Logout</Link>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
              <Link to="/cart">
                <button className="shopping-cart-btn">
                  <ShoppingBagOutlinedIcon
                    className="person"
                    style={{ fontSize: 30 }}
                  />
                  <span className="count">{cartItems.length}</span>
                </button>
              </Link>
              {/* user login */}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
