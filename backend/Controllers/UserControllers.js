const Doctor = require("../Models/Doctor");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const DoctorDetails = async (req, res, next) => {
  const id = req.params.id;
  const doctorList = await Doctor.findOne({ _id: id });
  return res.json({ status: true, doctorList });
};

const userSignUp = async (req, res, next) => {
  const { name, email, phone, address, dob, password } = req.body;
  if (
    !name ||
    !email ||
    !phone ||
    !address ||
    !dob ||
    !password ||
    name === "" ||
    email === "" ||
    phone === "" ||
    address === "" ||
    dob === "" ||
    password === ""
  )
    return res.json({ status: false, message: "All fields are required!" });
  try {
    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
      return res.json({
        status: false,
        message: "Already signup,please login!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      phone,
      address,
      dob,
      password: hashedpassword,
    });
    await user.save();
    return res
      .status(200)
      .json({ status: true, message: "User registered Successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ status: false, message: "Error in DB!" });
  }
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "")
    return res.json({ status: false, message: "All fields are required!" });
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.json({
        status: false,
        message: "No active account, please Signup!",
      });
    const comparepassword = await bcrypt.compare(password, user.password);
    if (!comparepassword) {
      return res
        .status(200)
        .json({ status: false, message: "Incorrect email or password!" });
    }
    const token = await jwt.sign({ id: user._id }, "Thiswillbethekeyforuser", {
      expiresIn: "1d",
    });
    res.cookie("authtoken", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 600), // 600 seconds
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    return res
      .status(200)
      .json({ status: true, message: "Logged in successfully!" });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: "Error to connect with DB!" });
  }
};

const cookievalidate = async (req, res, next) => {
  console.log(req.headers);
  if (!req.headers.cookie) {
    return res.json({ status: false, message: "No cookie has found!" });
  }
  const cookie = req.headers.cookie;
  const token = cookie.split("authtoken=")[1];
  if (!token) {
    return res.json({ status: false, message: "No cookie has found!" });
  }
  jwt.verify(String(token), "Thiswillbethekeyforuser", (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token", status: false });
    }
    req.id = user.id;
    next();
  });
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId).select("-password");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while fetching user data", status: false });
  }
  if (!user) {
    return res.status(404).json({ messsage: "User Not Found", status: false });
  }
  return res
    .status(200)
    .json({ user, status: true, message: "Data fetched successfully!" });
};

module.exports = {
  DoctorDetails,
  userSignUp,
  userLogin,
  cookievalidate,
  getUser,
};
