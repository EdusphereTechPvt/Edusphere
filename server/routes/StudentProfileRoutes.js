const express = require("express");
const { addOrUpdateStudent, getStudentDetails, deleteStudent } = require("../controllers/StudentProfileController");

const router = express.Router();

router.post("/addOrUpdate", addOrUpdateStudent);
router.post("/search", getStudentDetails);
router.delete("/delete/:id", deleteStudent);

module.exports = router;
