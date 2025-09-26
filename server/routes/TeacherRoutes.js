const express = require("express");
const router = express.Router();
const {
  addOrUpdateTeacher,
  getTeacherDetails,
  deleteTeacher,
  getAllTeachersList,
  getProfileCardData,
} = require("../controllers/TeacherController");
const AuthGuard = require("../middleware/AuthGuard");
const RoleGuard = require("../middleware/RoleGuard");

// Routes
router.post("/addOrUpdate", addOrUpdateTeacher);
router.get("/search", getTeacherDetails);
router.get("/getAll/",AuthGuard, RoleGuard("teacher/list"), getAllTeachersList);
router.post("/getProfileCardData", getProfileCardData)
router.delete("/delete/:id", deleteTeacher);

module.exports = router;
