const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const adminRoutes = require("./Routes/AdminRoutes");

try {
  mongoose.connect("mongodb://127.0.0.1:27017/click", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  console.log("DB connection error");
}
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Listening...");
});
