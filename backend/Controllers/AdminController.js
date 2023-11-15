const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../Models/Doctor");

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
    user = await Admin.findById(userId).select("-password");
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

const updateuser = async (req, res) => {
  const reqid = req.params.adminid;
  userid = req.id; //coming from cookie validating
  if (reqid !== userid) {
    return res.json({
      status: false,
      message: "You can not update other's data!",
    });
  }
  const { name, email } = req.body;
  console.log(userid, reqid);
  try {
    const updateduser = await Admin.findByIdAndUpdate(
      { _id: userid },
      { name, email },
      { new: true }
    );
    if (!updateduser) {
      return res.json({ message: "some error", status: false });
    }
    return res.json({
      updateduser,
      status: true,
      message: "Data being update succefully! ",
    });
  } catch (err) {
    console.log(err);
  }
};

const getDoctors = async (req, res, next) => {
  try {
    const doctorsList = await Doctor.find({});
    if (doctorsList.length !== 0) {
      console.log(typeof doctorsList);
      return res.json({
        message: "Successfully fetched!",
        doctorsList,
        status: true,
      });
    }
    return res.json({ status: false, message: "Empty list!" });
  } catch (err) {
    console.log(err);
  }
};

const updateDoctorStatus = async (req, res, next) => {
  const doctorId = req.params.doctorid;

  try {
    // Fetch the doctor from the database
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.json({ status: false, message: "Doctor not found" });
    }

    // Negate the admin_permission value
    doctor.admin_permission = !doctor.admin_permission;

    // Save the updated doctor document
    const updatedDoctor = await doctor.save();

    return res.json({ status: true, message: "Updated", updatedDoctor });
  } catch (error) {
    // Handle any errors (e.g., database errors)
    console.log(error);
  }
};

const popularDoctors = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const doctorsList = await Doctor.find({}); //.limit(parseInt(limit));
  const firstIndex = (page - 1) * limit; //5
  const lastIndex = page * limit; //10
  const result = doctorsList.slice(firstIndex, lastIndex); //5,10
  const total = doctorsList.length;
  return res.json({ result, total });
};

module.exports = {
  adminSignup,
  adminLogin,
  cookievalidate,
  getAdmin,
  logout,
  updateuser,
  getDoctors,
  updateDoctorStatus,
  popularDoctors,
};
