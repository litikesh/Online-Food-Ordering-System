const ErrorHandler = require("../utils/errorHandler");

// error check for get status code and message
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Intertnal Sever Error";

  // wrong Mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not Found. Invalid; ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // Mongoose Duplicate key error || email or password
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  // Worng JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

// for exact location     error: err.stack,
