const express = require("express");
const router = express.Router();
const authGuard = require("../middleware/AuthGuard");
const {
  createOrUpdateTimetable,
  getClassTimetable,
  getMasterTimetable,
  deleteTimetable,
} = require("../controllers/TimetableController");

// ✅ Create or Update timetable (with time, days, etc.)
router.post("/save", authGuard, createOrUpdateTimetable);

// ✅ Get specific class timetable
router.get("/class/:classId", authGuard, getClassTimetable);

// ✅ Get all timetables (master view)
router.get("/master", authGuard, getMasterTimetable);

// ✅ Delete timetable (requires classId + time)
router.delete("/delete", authGuard, deleteTimetable);

module.exports = router;
