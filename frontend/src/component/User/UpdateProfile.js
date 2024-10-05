import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useSnackbar } from "notistack";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "../styles.css";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("firstName", firstName);
    myForm.set("lastName", lastName);
    myForm.set("email", email);
    myForm.set("gender", gender);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    setAvatar("");
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setGender(user.gender);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
      dispatch(loadUser());
      navigate("/account");

      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, user, isUpdated, navigate, enqueueSnackbar]);

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="newRow">
            <div className="user-personal-details">
              <div className="container-2">
                <header className="details-header-2">
                  Update User Information
                </header>

                <form
                  autoComplete="off"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <div className="form first">
                    <div className="details personal">
                      <span className="title">Personal Details</span>

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
                          <label htmlFor="name" className="datails-label">
                            Email Address
                          </label>
                          <input
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="input-field">
                          <label htmlFor="name" className="datails-label">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>

                        <div className="input-field">
                          <label htmlFor="name" className="datails-label">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>

                        <div className="input-field">
                          <label
                            className="datails-label"
                            style={{
                              marginLeft: "5px",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            Gender :
                          </label>
                          <div
                            className="option"
                            style={{
                              marginLeft: "10px",
                            }}
                          >
                            <RadioGroup
                              row
                              aria-labelledby="radio-buttons-group-label"
                              name="radio-buttons-group"
                            >
                              <div className="radio-option">
                                <FormControlLabel
                                  name="gender"
                                  value="male"
                                  checked={gender === "male"}
                                  onChange={(e) => setGender(e.target.value)}
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
                                <span className="datails-label-2">Male</span>
                              </div>
                              <div className="radio-option">
                                <FormControlLabel
                                  name="gender"
                                  value="female"
                                  checked={gender === "female"}
                                  onChange={(e) => setGender(e.target.value)}
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
                                <span className="datails-label-2">Female</span>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>

                        <div className="input-field">
                          <div className="registerImage">
                            <img src={avatarPreview} alt="Avater Preview" />
                            <input
                              className="newinput"
                              type="file"
                              name="avatar"
                              accept="image/*"
                              onChange={updateProfileDataChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="upadeProfilebtns">
                      <button
                        type="submit"
                        className="sumbitbtn"
                        value="updateProfile"
                      >
                        <span className="btnText">Update</span>
                      </button>
                      <Link to="/account" className="sumbitbtn-2">
                        <span className="btnText">Cancel</span>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UpdateProfile;
