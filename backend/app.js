const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const errorMiddleware = require("./middleWare/error");

// config
dotenv.config({ path: "config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routers/productRouter");
const user = require("./routers/userRouter");
const order = require("./routers/orderRouter");
const payment = require("./routers/paymentRouter");

// -- product
app.use("/api/v1", product);
// -- user
app.use("/api/v1", user);
// -- order
app.use("/api/v1", order);
// city
// app.use("/api/v1", city);
//stripe payment
app.use("/api/v1", payment);

//Middleware for Error
app.use(errorMiddleware);

module.exports = app;
