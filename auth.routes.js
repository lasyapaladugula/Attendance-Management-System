const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup/student", authController.studentSignup);
router.post("/signup/admin", authController.adminSignup);
router.post("/login", authController.login);

module.exports = router;

