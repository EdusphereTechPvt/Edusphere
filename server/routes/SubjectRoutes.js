const express = require("express");
const router = express.Router();
const {deleteSubject, getAllSubjectsList, save, getSubjectDetails } = require("../controllers/SubjectController");
const AuthGuard = require("../middleware/AuthGuard");
const RoleGuard = require("../middleware/RoleGuard");


router.post("/save",AuthGuard, RoleGuard(), save);
router.post("/search",AuthGuard, RoleGuard(), getSubjectDetails);
router.post("/getAll/",AuthGuard, RoleGuard(), getAllSubjectsList);
router.post("/delete",AuthGuard, RoleGuard(), deleteSubject);

module.exports = router;
