const express = require("express");
const router = express.Router();
const {
  addOrUpdateTeacher,
  getTeacherDetails,
  deleteTeacher,
} = require("../controllers/TeacherController");

// Routes
router.post("/addOrUpdate", addOrUpdateTeacher);
router.get("/search", getTeacherDetails);
router.delete("/delete/:id", deleteTeacher);

module.exports = router;
