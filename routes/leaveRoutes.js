const express = require("express");
const router = express.Router();
const { applyLeave, approveLeave } = require("../controllers/leaveController");

router.post("/apply", applyLeave);
router.post("/approve/:id", approveLeave);

module.exports = router;