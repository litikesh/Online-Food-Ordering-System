const express = require("express");
const router = express.Router();
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleWare/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
