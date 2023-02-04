const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/").get(authController.protected, userController.getAllUsers);

router.patch("/updateme", authController.protected, userController.updateMe);

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/signup", authController.signup);

router.patch("/forgotpassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch(
  "/updatePassword",
  authController.protected,
  authController.updatePassword
);

/////////////////////////

router.patch(
  "/",
  authController.protected,

  authController.restricTo("admin"),
  userController.updateUser
);
router.post(
  "/",
  authController.protected,

  authController.restricTo("admin"),
  userController.createUser
);

module.exports = router;
