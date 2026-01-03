const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

router.get("/mark", (req, res) => {
  res.render("attendance/mark");
});

router.post("/mark", async (req, res) => {
  await Attendance.create({
    employeeId: req.session.user._id,
    date: new Date(),
    status: "Present"
  });
  res.redirect("/dashboard/employee");
});

module.exports = router;