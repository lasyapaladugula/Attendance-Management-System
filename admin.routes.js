const express = require("express");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.post("/create-class", adminController.createClass);
router.get("/classes/:adminId", adminController.getAdminClasses);

module.exports = router;

