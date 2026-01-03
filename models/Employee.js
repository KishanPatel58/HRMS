const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  department: String,
  designation: String,
  phone: String,
  email: String,
  address: String
});

module.exports = mongoose.model("Employee", employeeSchema);