const Student = require("../models/Student");
const Attendance = require("../models/Attendance");

/* 🔹 Get ALL students */
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* 🔹 Get Attendance for ONE student */
exports.getAttendance = async (req, res) => {
  try {
       const studentId = req.params.id;

    const attendanceRecords = await Attendance.find({
      "records.studentId": studentId
    }).populate("classId");

    const subjectData = {};

    attendanceRecords.forEach(record => {
      record.records.forEach(r => {
        if (r.studentId === studentId) {

          const subject = record.classId?.subject || "Unknown";

          if (!subjectData[subject]) {
            subjectData[subject] = {
              present: 0,
              late: 0,
              absent: 0
            };
          }

          if (r.status === "present") subjectData[subject].present++;
          if (r.status === "late") subjectData[subject].late++;
          if (r.status === "absent") subjectData[subject].absent++;
        }
      });
    });

    res.json(subjectData);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


