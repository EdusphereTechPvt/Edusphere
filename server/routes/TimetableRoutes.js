const express = require("express");
const router = express.Router();
const authGuard = require("../middleware/AuthGuard");
const {
  createOrUpdateTimetable,
  getClassTimetable,
  getMasterTimetable,
  deleteTimetable,
} = require("../controllers/TimetableController");

router.post("/save", authGuard, createOrUpdateTimetable);
router.get("/class/:classId", authGuard, getClassTimetable);
router.get("/master", authGuard, getMasterTimetable);
router.delete("/delete", authGuard, deleteTimetable);

module.exports = router;
