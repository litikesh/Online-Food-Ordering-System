import React from "react";
import "../styles.css";
import "./Shipping.css";
import Header from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckoutSteps from "./CheckoutSteps";
import { saveShippingInfo } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import states from "./states";

const TopButton = styled.button`
  margin-top: 20px;
  margin-left: 5px;
  display: flex;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid #black;
  color: #fff;
  background-color: hsl(45, 91%, 58%);
  border-radius: 15px;
  transition: 0.4s ease-in-out;
  :hover {
    color: #fff;
    background-color: hsl(45, 76%, 72%);
  }
`;

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState("IN");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      enqueueSnackbar("Invalid Phone Number", { variant: "error" });
      return;
    }
    if (pinCode.length < 6 || pinCode.length > 6) {
      enqueueSnackbar("Pin Code should be 6 digit", { variant: "error" });
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, country, state, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  return (
    <>
      <Header />
      <div className="container">
        <div style={{ margin: "150px -50px 30px -50px" }}>
          <CheckoutSteps activeStep={0} />
        </div>
        <div className="row-2">
          {/* shipping details */}
          <div className="user-Address-details" style={{ width: "100%" }}>
            <div className="container-2">
              <header className="details-header-2">Shipping Details</header>

              <form
                className="form__2"
                encType="multipart/form-data"
                onSubmit={shippingSubmit}
              >
                <div className="form second">
                  <div className="details personal">
                    <span className="title">Address Details</span>
                    {/* address */}
                    <div className="fields__2">
                      <div className="input__field">
                        <label className="datails__label">Address</label>
                        <input
                          type="text"
                          placeholder="Permanent or Temporary"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </div>
                      {/* city */}
                      <div className="input__field">
                        <label className="datails-label">City</label>
                        <input
                          type="text"
                          placeholder="Enter city"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      {/* pincode */}
                      <div className="input__field">
                        <label className="datails-label">Pin Code</label>
                        <input
                          type="number"
                          placeholder="Enter Pin Code"
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                          required
                        />
                      </div>
                      {/* phone no */}
                      <div className="input__field">
                        <label className="datails-label">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="Enter Phone number"
                          value={phoneNo}
                          onChange={(e) => setPhoneNo(e.target.value)}
                          size="10"
                          maxLength="10"
                          required
                        />
                      </div>
                      {/* country */}

                      <div className="input__field">
                        <label className="datails-label">Country</label>
                        <Select
                          labelId="country-select"
                          id="country-select"
                          defaultValue={country}
                          disabled
                          label="Country"
                          // onChange={(e) => setCountry(e.target.value)}
                        >
                          <MenuItem value={"IN"}>India</MenuItem>
                        </Select>
                      </div>
                      <div
                        className="input__field"
                        style={{ marginTop: "30px" }}
                      >
                        <FormControl
                          fullWidth
                          disabled={country ? false : true}
                        >
                          <InputLabel
                            className="datails-label"
                            id="state-select"
                          >
                            State
                          </InputLabel>
                          <Select
                            labelId="state-select"
                            id="state-select"
                            value={state}
                            label="State"
                            onChange={(e) => setState(e.target.value)}
                            required
                          >
                            {states.map((item) => (
                              <MenuItem key={item.code} value={item.code}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <TopButton
                      type="submit"
                      value="Continue"
                      disabled={state ? false : true}
                      className="btnpos"
                    >
                      CONTINUE
                      <ArrowForwardIcon style={{ marginLeft: "5px" }} />
                    </TopButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shipping;
