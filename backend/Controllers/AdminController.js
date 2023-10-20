const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSignup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    name === "" ||
    email === "" ||
    password === ""
  ) {
    return res
      .status(200)
      .json({ message: "All fields are required! ", status: false });
  }
  try {
    const duplicate = await Admin.findOne({ email });
    if (duplicate) {
      return res
        .status(200)
        .json({ message: "Account alraedy exists!", status: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const admin = new Admin({
      name,
      email,
      password: hashedpassword,
    });
    await admin.save();
    return res
      .status(200)
      .json({ status: true, message: "Admin registered Successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "Error while registering!" });
  }
};

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return res
      .status(200)
      .json({ status: false, message: "Every fields are required!" });
  }
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(200)
        .json({ status: false, message: "No account found, please signup!" });
    }
    const comparepassword = await bcrypt.compare(password, admin.password);
    if (!comparepassword) {
      return res
        .status(200)
        .json({ status: false, message: "Incorrect email or password!" });
    }
    const token = await jwt.sign({ id: admin._id }, "Thiswillbethekey", {
      expiresIn: "1d",
    });
    await res.cookie("authtoken", token, {
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
    return res
      .status(500)
      .json({ status: false, message: "Unable to signin!" });
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
  jwt.verify(String(token), "Thiswillbethekey", (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token", status: false });
    }
    // console.log(typeof user.id);
    req.id = user.id;
    next();
  });
};
const getAdmin = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await Admin.findById(userId).select("-_id -password");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while fetching user data", status: false });
  }
  if (!user) {
    return res.status(404).json({ messsage: "User Not Found", status: false });
  }
  return res.status(200).json({ user, status: true });
};

const logout = (req, res) => {
  try {
    res.clearCookie("authtoken");
    return res.json({ status: true, message: "logged out" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  adminSignup,
  adminLogin,
  cookievalidate,
  getAdmin,
  logout,
};
