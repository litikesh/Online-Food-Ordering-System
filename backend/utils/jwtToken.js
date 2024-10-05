// create oken and saving in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  //   options for cookie
  const options = {
    expires: new Date(
      // if cookie is 7 then it will be 7d
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
