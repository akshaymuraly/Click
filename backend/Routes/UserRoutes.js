const express = require("express");
const {
  DoctorDetails,
  userSignUp,
  userLogin,
  cookievalidate,
  getUser,
} = require("../Controllers/UserControllers");
const router = express();

router.get("/booking/:id", DoctorDetails);
router.post("/signup", userSignUp);
router.post("/signin", userLogin);
router.get("/userdetails", cookievalidate, getUser);

module.exports = router;
