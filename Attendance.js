const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class"
  },

  date: {
    type: String,
    required: true
  },

  records: [
    {
      studentId: String,
      studentName: String,
      status: {
        type: String,
        enum: ["present", "late", "absent"]
      }
    }
  ]
});

module.exports = mongoose.model("Attendance", attendanceSchema);