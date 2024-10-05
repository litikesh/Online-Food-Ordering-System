import React, { useEffect } from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import "../styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Logout,
  Timeline,
  Settings,
  ShoppingBag,
  ModeEdit,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { useSnackbar } from "notistack";
import Loader from "../layout/Loader/Loader";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const nav = [
    {
      id: 1,
      title: "My Orders",
      icon: <ShoppingBag className="user-icons" />,
      redirect: "/orders",
    },
    {
      id: 3,
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
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="user-card-avatar">
                <div className="card-container">
                  <div>
                    <img
                      src={user.avatar?.url ? user.avatar.url : "/avatar.png"}
                      alt="Maxwell Admin"
                    />
                  </div>
                  <div className="info-2">
                    <span>Welcome,</span>
                    <h3>{user.Username}</h3>
                    <h6>{user.email}</h6>
                  </div>
                </div>
                <div className="all-links">
                  <div className="menu-2">
                    <ul>
                      {user.role === "admin" && (
                        <li>
                          <Timeline className="user-icons" />
                          <Link to="/admin/dashboard">Admin Panel</Link>
                        </li>
                      )}

                      <hr className="line" />
                      {nav.map((item) => {
                        const { title, icon, redirect, id } = item;
                        return (
                          <div key={id}>
                            <li>
                              {icon}
                              <Link to={redirect}>{title}</Link>
                            </li>
                            <hr className="line" />
                          </div>
                        );
                      })}
                      <li
                        onClick={handleLogout}
                        style={{ paddingBottom: "10px" }}
                      >
                        <Logout className="user-icons" />
                        <Link to="/">Logout</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="user-personal-details">
                <div className="container-2">
                  <header className="details-header">User Information</header>

                  <form action="#">
                    <div className="form first">
                      <div className="details personal">
                        <span className="title">
                          Personal Details
                          <Link to="/me/update" className="edit">
                            <ModeEdit style={{ fontSize: "20px" }} />
                            edit
                          </Link>
                        </span>

                        <div className="fields">
                          <div className="input-field">
                            <label className="datails-label">Username</label>
                            <input
                              type="text"
                              defaultValue={user.Username}
                              disabled
                            />
                          </div>

                          <div className="input-field">
                            <label className="datails-label">
                              Email Address
                            </label>
                            <input
                              type="email"
                              defaultValue={user.email}
                              disabled
                            />
                          </div>
                          <div className="input-field">
                            <label className="datails-label">First Name</label>
                            <input
                              type="text"
                              defaultValue={user.firstName}
                              disabled
                            />
                          </div>

                          <div className="input-field">
                            <label className="datails-label">Last Name</label>
                            <input
                              type="text"
                              defaultValue={user.lastName}
                              disabled
                            />
                          </div>

                          <div className="input-field">
                            <label className="datails-label">Joined on</label>
                            <input
                              type="date"
                              defaultValue={String(user.createdAt).substring(
                                0,
                                10
                              )}
                              disabled
                            />
                          </div>

                          <div className="input-field">
                            <label className="datails-label">Gender</label>
                            <input
                              type="text"
                              defaultValue={user.gender}
                              disabled
                            />
                          </div>
                        </div>
                      </div>

                      <Link to="/password/update" className="passwordbtn">
                        <span className="btnText">Change Password</span>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Profile;
