const Attendance = require("../models/Attendance");

// MARK ATTENDANCE
exports.markAttendance = async (req, res) => {
  try {
    const { classId, records, date } = req.body;

    if (!classId || !records || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // CHECK IF ATTENDANCE ALREADY EXISTS FOR THIS CLASS + DATE
    const existingAttendance = await Attendance.findOne({
      classId: classId,
      date: date
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance already submitted for this date"
      });
    }

    // CREATE NEW ATTENDANCE
    const newAttendance = new Attendance({
      classId,
      records,
      date
    });

    await newAttendance.save();

    res.status(201).json({
      message: "Attendance submitted successfully"
    });

  } catch (error) {
    console.error("Attendance Error:", error);
    res.status(500).json({
      message: "Failed to submit attendance"
    });
  }
};


// GET ATTENDANCE BY CLASS
exports.getAttendanceByClass = async (req, res) => {
  try {

    const attendance = await Attendance.find({
      classId: req.params.classId
    });

    res.json(attendance);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch attendance"
    });
  }
};


// GET ATTENDANCE BY STUDENT
exports.getAttendanceByStudent = async (req, res) => {
  try {

    const studentId = req.params.studentId;

    const attendance = await Attendance.find({
      "records.studentId": studentId
    });

    const studentAttendance = attendance.map(a => {

      const record = a.records.find(r => r.studentId === studentId);

      return {
        classId: a.classId,
        date: a.date,
        status: record.status
      };

    });

    res.json(studentAttendance);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch student attendance"
    });
  }
};


// GET ATTENDANCE BY CLASS AND DATE
exports.getAttendanceByClassAndDate = async (req, res) => {
  try {

    const { classId, date } = req.query;

    const attendance = await Attendance.findOne({
      classId: classId,
      date: date
    });

    if (!attendance) {
      return res.json(null);
    }

    res.json(attendance);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch attendance"
    });
  }
};