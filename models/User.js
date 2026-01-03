const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  employeeId: String,
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "employee"] }
});

module.exports = mongoose.model("User", userSchema);