const express = require("express");
const { addOrUpdateStudent, getStudentDetails, deleteStudent, getAllStudentsList, getProfileCardData } = require("../controllers/StudentController");
const AuthGuard = require("../middleware/AuthGuard");
const RoleGuard = require("../middleware/RoleGuard");

const router = express.Router();

router.post("/addOrUpdate", addOrUpdateStudent);
router.post("/search",AuthGuard, RoleGuard("student/list"), getStudentDetails);
router.get("/getAll/",AuthGuard, RoleGuard("student/list"), getAllStudentsList);
router.post("/getProfileCardData", getProfileCardData)
router.delete("/delete/:id", deleteStudent);

module.exports = router;
