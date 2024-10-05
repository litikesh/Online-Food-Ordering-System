import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import Loader from "../layout/Loader/Loader";
import "../UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useSnackbar } from "notistack";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Password Updated Successfully", { variant: "success" });
      navigate("/login");
    }
  }, [dispatch, error, success, navigate, enqueueSnackbar]);
  return (
    <div>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="newRow">
            <div className="wrapper">
              <h2>Reset Password</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-box">
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="input-box button">
                  <input type="Submit" value="Update Password" />
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

export default ResetPassword;
