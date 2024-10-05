import { useSnackbar } from "notistack";
import "../UpdatePassword.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (message) {
      enqueueSnackbar(message, { variant: "success" });
    }
  }, [dispatch, error, message, enqueueSnackbar]);
  return (
    <div>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="newRow">
            <div className="wrapper">
              <h2>Forgot Password</h2>
              <form autoComplete="off" onSubmit={forgotPasswordSubmit}>
                <div className="input-box">
                  <input
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="input-box button">
                  <input type="Submit" value="Send" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ForgotPassword;
