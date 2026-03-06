const Student = require("../models/Student");
const Admin = require("../models/Admin");

/* Student Signup */
exports.studentSignup = async (req, res) => {
  try {
    await Student.create(req.body);
    res.json({ message: "Student registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Admin Signup */
exports.adminSignup = async (req, res) => {
  try {
    await Admin.create(req.body);
    res.json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Login */
exports.login = async (req, res) => {
  try {
    const { role, id, password } = req.body;

    let user = null;

    if (role === "student") {
      user = await Student.findOne({ studentId: id, password });
    } else {
      user = await Admin.findOne({ adminId: id, password });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
