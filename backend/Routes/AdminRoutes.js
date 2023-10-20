const express = require("express");
const {
  adminSignup,
  adminLogin,
  cookievalidate,
  getAdmin,
  logout,
} = require("../Controllers/AdminController");
const router = express();

router.post("/signup", adminSignup);
router.post("/signin", adminLogin);
router.post("/homepage", cookievalidate, getAdmin);
router.get("/logout", cookievalidate, logout);
router.get("/details", cookievalidate, getAdmin);

module.exports = router;
