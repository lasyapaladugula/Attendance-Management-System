const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  password: String
});

module.exports = mongoose.model("Student", StudentSchema);
