const express = require("express");
const {
  adminSignup,
  adminLogin,
  cookievalidate,
  getAdmin,
  logout,
  updateuser,
  getDoctors,
  updateDoctorStatus,
  popularDoctors,
} = require("../Controllers/AdminController");
const router = express();

router.post("/signup", adminSignup);
router.post("/signin", adminLogin);
router.post("/homepage", cookievalidate, getAdmin);
router.get("/logout", cookievalidate, logout);
router.get("/details", cookievalidate, getAdmin);
router.put("/:adminid", cookievalidate, updateuser);

router.get("/doctorslist", getDoctors);
router.put("/doctor/:doctorid", updateDoctorStatus);
router.get("/populardoctors", popularDoctors);

module.exports = router;
