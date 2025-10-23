const express = require("express");
const { save, getStudentDetails, deleteStudent, getAllStudentsList, getProfileCardData } = require("../controllers/StudentController");
const AuthGuard = require("../middleware/AuthGuard");
const RoleGuard = require("../middleware/RoleGuard");

const router = express.Router();

router.post("/save", AuthGuard, RoleGuard(), save);
router.post("/search",AuthGuard, RoleGuard(), getStudentDetails);
router.post("/getAll/",AuthGuard, RoleGuard(), getAllStudentsList);
router.post("/getProfileCardData", getProfileCardData)
router.delete("/delete/:id", AuthGuard, RoleGuard(), deleteStudent);

module.exports = router;
