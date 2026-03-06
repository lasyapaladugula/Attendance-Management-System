const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  adminId: {
    type: String,
    required: true
  },
  classTime: {
    type: String,
    required: true
  },
  students: [
    {
      studentId: {
        type: String,
        required: true
      },
      studentName: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("Class", classSchema);