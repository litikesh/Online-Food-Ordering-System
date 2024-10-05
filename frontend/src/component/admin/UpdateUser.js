import {
  PermIdentity,
  CalendarToday,
  LocalPhone,
  MailOutline,
  LocationOnOutlined,
} from "@mui/icons-material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";
import Sidebar from "./Sidebar";
import "./user.css";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const navigate = useNavigate();

  const [firstName, seFirstName] = useState("");
  const [lastName, seLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const userId = params.id;

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      seFirstName(user.firstName);
      seLastName(user.lastName);
      setEmail(user.email);
      setGender(user.gender);
      setRole(user.role);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (updateError) {
      enqueueSnackbar(updateError, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      enqueueSnackbar("User Updates Successfully", { variant: "success" });
      dispatch({ type: UPDATE_USER_RESET });

      navigate("/admin/users");
    }
  }, [
    dispatch,
    error,
    userId,
    user,
    navigate,
    isUpdated,
    updateError,
    enqueueSnackbar,
  ]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("firstName", firstName);
    myForm.set("lastName", lastName);
    myForm.set("gender", gender);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      <div className="Admin__dashboard">
        <Sidebar />
        <section className="Admin__home">
          {loading ? (
            <Loader />
          ) : (
            <div className="user__admin">
              <div className="userTitleContainer">
                <h1 className="userTitle">Update User</h1>
              </div>
              <div className="userContainer">
                <div className="userShow">
                  <div className="userShowTop">
                    <img
                      src={user.avatar?.url}
                      alt=""
                      className="userShowImg"
                    />
                    <div className="userShowTopTitle">
                      <div className="userShowUsername">{user?.Username}</div>
                      <div className="userShowUserTitle">
                        {user?.firstName} {user?.lastName}
                      </div>
                    </div>
                  </div>
                  <div className="userShowButtom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                      <PermIdentity className="userShowIcon" />
                      <span className="userShowInfoTitle">
                        {user?.Username}
                      </span>
                    </div>
                    <div className="userShowInfo">
                      <CalendarToday className="userShowIcon" />
                      <span className="userShowInfoTitle">
                        {user?.createdAt?.substring(0, 10)}
                      </span>
                    </div>
                    <span className="userShowTitle">Contact Details</span>
                    <div className="userShowInfo">
                      <LocalPhone className="userShowIcon" />
                      <span className="userShowInfoTitle">+91 9970882605</span>
                    </div>
                    <div className="userShowInfo">
                      <MailOutline className="userShowIcon" />
                      <span className="userShowInfoTitle">{user?.email}</span>
                    </div>
                    <div className="userShowInfo">
                      <LocationOnOutlined className="userShowIcon" />
                      <span className="userShowInfoTitle">
                        Bangalore | INDIA
                      </span>
                    </div>
                  </div>
                </div>
                <div className="userUpdate">
                  <span className="userUpdateTitle">Edit</span>
                  <form
                    className="userUpdateForm"
                    onSubmit={updateUserSubmitHandler}
                  >
                    <div className="userUpdateLeft">
                      <div className="userUpdateItem">
                        <label>Username</label>
                        <input
                          type="text"
                          value={user?.Username}
                          className="userUpdateInput"
                          disabled
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>First Name</label>
                        <input
                          type="text"
                          placeholder="Litikesh V"
                          className="userUpdateInput"
                          value={firstName}
                          onChange={(e) => seFirstName(e.target.value)}
                        />
                        <span class="bar"></span>
                      </div>
                      <div className="userUpdateItem">
                        <label>Last Name</label>
                        <input
                          type="text"
                          placeholder="Litikesh V"
                          className="userUpdateInput"
                          value={lastName}
                          onChange={(e) => seLastName(e.target.value)}
                        />
                        <span class="bar"></span>
                      </div>
                      <div className="userUpdateItem">
                        <label>Email</label>
                        <input
                          type="text"
                          placeholder="litikesh12@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="userUpdateInput"
                        />
                        <span class="bar"></span>
                      </div>
                      <div className="userUpdateItem">
                        <label>Role</label>
                        <RadioGroup
                          row
                          aria-labelledby="radio-buttons-group-label"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                            control={<Radio required />}
                            label="Male"
                          />
                          <FormControlLabel
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                            control={<Radio required />}
                            label="Female"
                          />
                        </RadioGroup>
                      </div>
                      <div className="userUpdateItem">
                        <label>Role</label>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="">Choose Role</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </div>
                    </div>

                    <div className="userUpdateRight">
                      <div className="userUpdateUpload">
                        <img
                          src={
                            avatarPreview !== ""
                              ? avatarPreview
                              : "https://www.w3schools.com/howto/img_avatar.png"
                          }
                          alt=""
                          className="userUpdateImg"
                        />
                      </div>
                      <button
                        type="submit"
                        className="userUpdateButton"
                        disabled={
                          updateLoading
                            ? true
                            : false || role === ""
                            ? true
                            : false
                        }
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default UpdateUser;

//     src="https://www.w3schools.com/howto/img_avatar.png"
