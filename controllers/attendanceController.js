const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  const attendance = await Attendance.create(req.body);
  res.status(201).json(attendance);
};