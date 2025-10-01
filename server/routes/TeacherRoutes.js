const express = require("express");
const router = express.Router();
const {
  save,
  getTeacherDetails,
  deleteTeacher,
  getAllTeachersList,
  getProfileCardData,
} = require("../controllers/TeacherController");
const AuthGuard = require("../middleware/AuthGuard");
const RoleGuard = require("../middleware/RoleGuard");

// Routes
router.post("/save",AuthGuard, RoleGuard(), save);
router.post("/search",AuthGuard, RoleGuard(), getTeacherDetails);
router.post("/getAll/",AuthGuard, RoleGuard(), getAllTeachersList);
router.post("/getProfileCardData", getProfileCardData)
router.post("/delete",AuthGuard, RoleGuard(), deleteTeacher);

module.exports = router;
