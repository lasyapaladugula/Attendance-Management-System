const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller");

router.post("/mark", attendanceController.markAttendance);
router.get("/class/:classId", attendanceController.getAttendanceByClass);
router.get("/student/:studentId", attendanceController.getAttendanceByStudent);
router.get("/check", attendanceController.getAttendanceByClassAndDate);

module.exports = router;