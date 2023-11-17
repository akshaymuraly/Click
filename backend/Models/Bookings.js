const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  bookedby: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: { type: String },
  },
  doctor: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
    },
    name: { type: String },
  },
  name: {
    type: String,
    require: true,
  },
  age: {
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
  phone: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  token: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("booking", bookingSchema);
