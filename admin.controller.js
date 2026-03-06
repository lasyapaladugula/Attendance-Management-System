const Class = require("../models/Class");


exports.createClass = async (req, res) => {
  try {
    const { className, subject, adminId, classTime, students } = req.body;

    if (!className || !subject || !adminId || !classTime || !students) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newClass = new Class({
      className,
      subject,
      adminId,
      classTime,
      students
    });

    await newClass.save();

    res.status(201).json({ message: "Class created successfully" });

  } catch (error) {
    console.error("Create Class Error:", error);
    res.status(500).json({ message: "Failed to create class" });
  }
};


/* Get Classes for Admin */
exports.getAdminClasses = async (req, res) => {
  try {
    const classes = await Class.find({ adminId: req.params.adminId });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
