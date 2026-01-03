const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  leaveType: String,
  fromDate: Date,
  toDate: Date,
  status: { type: String, default: "Pending" },
  remarks: String
});

module.exports = mongoose.model("LeaveRequest", leaveSchema);