const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRole } = require("../middleWare/auth");

// create a new Order
router.route("/order/new").post(isAuthenticatedUser, newOrder);
// Get Single user order details -- only admin
router
  .route("/order/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getSingleOrder);
// see order
router.route("/orders/me").get(isAuthenticatedUser, myOrder);
// Get All order -- only admin
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllOrder);
// Update order detail -- admin
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteOrder);
module.exports = router;
