const express = require("express");
const router = express.Router();
const User = require("../models/User");

// LOGIN PAGE as "/"
router.get("/", (req, res) => {
  res.render("auth/login");
});

// LOGIN SUBMIT
router.post("/user/login", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send("Invalid credentials");

  req.session.user = user;

  user.role === "admin"
    ? res.redirect("/dashboard/admin")
    : res.redirect("/dashboard/employee");
});

module.exports = router;