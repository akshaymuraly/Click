const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const adminRoutes = require("./Routes/AdminRoutes");
const userRoutes = require("./Routes/UserRoutes");
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

try {
  mongoose.connect("mongodb://127.0.0.1:27017/click", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  console.log("DB connection error");
}
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//Routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.listen(5000, () => {
  console.log("Listening...");
});
