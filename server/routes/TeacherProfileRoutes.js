const express = require("express");
const router = express.Router();
const {
  addOrUpdateTeacher,
  getTeacherDetails,
  deleteTeacher,
} = require("../controllers/TeacherProfileController");

// Routes
router.post("/addOrUpdate", addOrUpdateTeacher);
router.post("/get", getTeacherDetails);
router.delete("/delete/:id", deleteTeacher);

module.exports = router;
