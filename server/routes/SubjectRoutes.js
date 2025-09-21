const express = require("express");
const router = express.Router();
const { addOrUpdateSubject, getSubjects, deleteSubject } = require("../controllers/SubjectController");


router.post("/addOrUpdate", addOrUpdateSubject);
router.get("/list", getSubjects);
router.delete("/delete/:id", deleteSubject);

module.exports = router;
