const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

// existing route (DO NOT TOUCH)
router.get("/attendance/:id", studentController.getAttendance);

// ✅ add this new route
router.get("/all", studentController.getAllStudents);

module.exports = router;



