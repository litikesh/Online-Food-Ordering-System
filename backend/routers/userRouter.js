const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,

  getUserStats,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRole } = require("../middleWare/auth");
const router = express.Router();

// new user
router.route("/register").post(registerUser);
// existing user
router.route("/login").post(loginUser);
// forget password
router.route("/password/forgot").post(forgotPassword);
// reset password
router.route("/password/reset/:token").put(resetPassword);
// logout
router.route("/logout").get(logout);
// user detail
router.route("/me").get(isAuthenticatedUser, getUserDetails);
// update password
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
// update user detail
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

// get All users --- Only Admin
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllUsers);
// get users Stats --- Only Admin
router
  .route("/admin/users/stats")
  .get(isAuthenticatedUser, authorizeRole("admin"), getUserStats);
// get Single users details --- Only Admin
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRole("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteUser);

module.exports = router;
