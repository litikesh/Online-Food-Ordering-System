const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: [true, "Please Enter Your Username"],
    maxLength: [50, "Name Cannot Exceed 30 Characters"],
    minLength: [4, "Name Shoule Have More Than 4 Characters"],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "Please Enter Your firstName"],
    maxLength: [50, "Name Cannot Exceed 30 Characters"],
    minLength: [4, "Name Shoule Have More Than 4 Characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please Enter Your lastName"],
    maxLength: [50, "Name Cannot Exceed 30 Characters"],
    minLength: [1, "Name Shoule Have More Than 4 Characters"],
  },
  gender: {
    type: String,
    required: [true, "Please Enter Gender"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a vaild Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password Should be grater than 8 Characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT token for accessing the user
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JW_SECRET, {
    expiresIn: process.env.JW_EXPITE,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPasssword) {
  return await bcrypt.compare(enteredPasssword, this.password);
};

//  Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hashing and add to resetPassword to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
