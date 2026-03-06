const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/attendanceDB")
  .then(() => console.log("MongoDB connected"));

/* ✅ ADD THIS LINE */
app.use(express.static(path.join(__dirname, "../frontend")));


app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/attendance", require("./routes/attendance.routes"));
app.use("/api/student", require("./routes/student.routes"));

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
