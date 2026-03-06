const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  adminId: String,
  name: String,
  password: String
});

module.exports = mongoose.model("Admin", AdminSchema);
