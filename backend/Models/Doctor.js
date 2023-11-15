const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  specialization: {
    type: String,
    require: true,
  },
  admin_permission: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("doctor", doctorSchema);
