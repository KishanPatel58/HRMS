const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  basicSalary: Number,
  hra: Number,
  allowance: Number,
  deduction: Number,
  netSalary: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Payroll", payrollSchema);