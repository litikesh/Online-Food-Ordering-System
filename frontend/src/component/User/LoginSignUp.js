import React, { useEffect, useState } from "react";
import "./LoginSignUp.css";
import logImg from "../../img/log/log.jpg";
import RegImg from "../../img/log/register.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

// import { useAlert } from "react-alert";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [eOpen, seteOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    Username: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    cpassword: "",
  });

  const { Username, firstName, lastName, email, gender, password, cpassword } =
    user;

  const [avatar, setAvatar] = useState();

  const [avatarPreview, setAvatarPreview] = useState("/user.png");

  const toggleForm = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };

  const CloseErrorMsg = () => {
    eOpen === true ? seteOpen(false) : seteOpen(true);
  };

  const redirect = location.search ? location.search.split("=")[1] : "account";

  useEffect(() => {
    if (error) {
      // alert.error(error);
      setErrorMsg(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }
  }, [dispatch, error, isAuthenticated, redirect, navigate]); // alert

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("Username", Username);
    myForm.set("firstName", firstName);
    myForm.set("lastName", lastName);
    myForm.set("email", email);
    myForm.set("gender", gender);
    myForm.set("avatar", avatar);
    myForm.set("password", password);

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="newSection">
            <div className={`container ${isOpen === true ? "active" : ""}`}>
              {/* login page */}
              <div className="user signinBx">
                <div className="imgBx">
                  <img src={logImg} alt="" />
                </div>
                <div className="formBx">
                  <form onSubmit={loginSubmit} autoComplete="off">
                    <h2 className="headerSign">Sign In</h2>
                    {errorMsg ? (
                      <>
                        <div
                          className={`error-txt ${
                            eOpen === true ? "active" : ""
                          }`}
                        >
                          {errorMsg}
                          <button className="closeBtn" onClick={CloseErrorMsg}>
                            <CloseIcon style={{ fontSize: "20px" }} />
                          </button>
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    <div className="input-group">
                      <input
                        type="email"
                        required
                        className="input"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                      <label htmlFor="name" className="input-label">
                        Email Address
                      </label>
                    </div>
                    <div className="input-group">
                      <input
                        type="password"
                        required
                        className="input"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <label htmlFor="name" className="input-label">
                        Password
                      </label>
                    </div>
                    <input type="submit" value="Sign In" />
                    <div className="textPrag">
                      <div className="slidePage">
                        <p
                          className="signup"
                          style={{
                            display: "flex",
                            textAlign: "center",
                            justifyContent: "center",
                          }}
                        >
                          Don't have an account ?
                          <a href="/">
                            <button onClick={toggleForm}>Sign Up.</button>
                          </a>
                        </p>
                      </div>
                      <h3 className="signup" style={{ marginTop: "0px" }}>
                        Or
                      </h3>
                      <div className="forgotPass">
                        <p className="signup" style={{ marginTop: "0px" }}>
                          <a className="link" href="/password/forgot">
                            Forget Password ?
                          </a>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* Register Page */}
              <div className="user signupBx">
                <div className="formBx">
                  <form
                    autoComplete="off"
                    encType="multipart/form-data"
                    onSubmit={registerSubmit}
                  >
                    <h2 className="headerSign">Create an account</h2>
                    {errorMsg ? (
                      <>
                        <div
                          className={`error-txt ${
                            eOpen === true ? "active" : ""
                          }`}
                        >
                          {errorMsg}
                          <button className="closeBtn" onClick={CloseErrorMsg}>
                            <CloseIcon style={{ fontSize: "20px" }} />
                          </button>
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    <div className="input-group">
                      <input
                        type="text"
                        name="Username"
                        required
                        className="input"
                        value={Username}
                        onChange={registerDataChange}
                      />
                      <label htmlFor="name" className="input-label">
                        Username
                      </label>
                    </div>
                    <div className="flex-input">
                      <div
                        className="input-group"
                        style={{ marginRight: "5px" }}
                      >
                        <input
                          type="text"
                          name="firstName"
                          required
                          className="input"
                          value={firstName}
                          onChange={registerDataChange}
                        />
                        <label htmlFor="name" className="input-label">
                          FirstName
                        </label>
                      </div>
                      <div className="input-group">
                        <input
                          type="text"
                          name="lastName"
                          required
                          className="input"
                          value={lastName}
                          onChange={registerDataChange}
                        />
                        <label htmlFor="name" className="input-label">
                          LastName
                        </label>
                      </div>
                    </div>

                    <div className="input-group">
                      <input
                        type="text"
                        name="email"
                        required
                        className="input"
                        value={email}
                        onChange={registerDataChange}
                      />
                      <label htmlFor="name" className="input-label">
                        Email Address
                      </label>
                    </div>

                    <div className="input-group">
                      <input
                        type="password"
                        name="password"
                        required
                        className="input"
                        value={password}
                        onChange={registerDataChange}
                      />
                      <label htmlFor="name" className="input-label">
                        Create Password
                      </label>
                    </div>
                    <div className="input-group">
                      <input
                        type="password"
                        name="cpassword"
                        required
                        className="input"
                        value={cpassword}
                        onChange={registerDataChange}
                      />
                      <label htmlFor="name" className="input-label">
                        Confirm Password
                      </label>
                    </div>
                    <div className="input-field-2">
                      <label className="datails-label-2">Your Gender :</label>
                      <div className="option">
                        <RadioGroup
                          row
                          aria-labelledby="radio-buttons-group-label"
                          name="radio-buttons-group"
                        >
                          <div className="radio-option">
                            <FormControlLabel
                              name="gender"
                              value="male"
                              onChange={registerDataChange}
                              control={
                                <Radio
                                  required
                                  sx={{
                                    "& .MuiSvgIcon-root": {
                                      fontSize: 18,
                                    },
                                  }}
                                />
                              }
                            />
                            <span>Male</span>
                          </div>
                          <div className="radio-option">
                            <FormControlLabel
                              name="gender"
                              value="female"
                              onChange={registerDataChange}
                              control={
                                <Radio
                                  required
                                  sx={{
                                    "& .MuiSvgIcon-root": {
                                      fontSize: 18,
                                    },
                                  }}
                                />
                              }
                            />
                            <span>Female</span>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="registerImage">
                      <img src={avatarPreview} alt="Avater Preview" />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                      />
                    </div>

                    <input type="submit" value="Sign Up" />
                    <p className="signup" style={{ display: "flex" }}>
                      Already have an account ?
                      <a href="/">
                        <button onClick={toggleForm}>Sign in.</button>
                      </a>
                    </p>
                  </form>
                </div>
                <div className="imgBx">
                  <img src={RegImg} alt="" />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default LoginSignUp;
