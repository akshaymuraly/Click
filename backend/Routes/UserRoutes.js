const express = require("express");
const {
  DoctorDetails,
  userSignUp,
  userLogin,
  cookievalidate,
  getUser,
  editUser,
  searchDoctor,
  bookDoctor,
} = require("../Controllers/UserControllers");
const router = express();

router.get("/booking/:id", DoctorDetails);
router.post("/signup", userSignUp);
router.post("/signin", userLogin);
router.get("/userdetails", cookievalidate, getUser);
router.put("/:userid", cookievalidate, editUser);
router.get("/search", searchDoctor);
router.post("/book/:doctorid", cookievalidate, bookDoctor);

module.exports = router;
