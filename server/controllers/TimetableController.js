const Timetable = require("../models/TimetableSchema");
const Class = require("../models/Class");

const createOrUpdateTimetable = async (req, res) => {
  try {
    const { classId, timetable } = req.body;
    const { schoolId } = req.user;

    if (!classId || !timetable) {
      return res.status(400).json({ message: "classId and timetable are required", status: false });
    }

    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(404).json({ message: "Class not found", status: false });
    }

    let existing = await Timetable.findOne({ classId, schoolId });

    if (existing) {
      existing.timetable = timetable;
      await existing.save();
      return res.status(200).json({ message: "Timetable updated successfully", data: existing, status: true });
    }

    const newTimetable = new Timetable({
      classId,
      className: classData.name,
      timetable,
      schoolId,
    });

    await newTimetable.save();

    res.status(201).json({ message: "Timetable created successfully", data: newTimetable, status: true });
  } catch (err) {
    console.error("Timetable Save Error:", err);
    res.status(500).json({ message: "Server error while saving timetable", status: false });
  }
};

const getClassTimetable = async (req, res) => {
  try {
    const { classId } = req.params;
    const { schoolId } = req.user;

    const timetable = await Timetable.findOne({ classId, schoolId });

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found for this class", status: false });
    }

    res.status(200).json({ message: "Timetable fetched successfully", data: timetable, status: true });
  } catch (err) {
    console.error("Get Timetable Error:", err);
    res.status(500).json({ message: "Server error while fetching timetable", status: false });
  }
};

const getMasterTimetable = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const timetables = await Timetable.find({ schoolId }).populate("classId", "name");

    if (!timetables || timetables.length === 0) {
      return res.status(404).json({ message: "No timetables found", status: false });
    }

    res.status(200).json({ message: "Master timetable fetched successfully", data: timetables, status: true });
  } catch (err) {
    console.error("Get Master Timetable Error:", err);
    res.status(500).json({ message: "Server error while fetching master timetable", status: false });
  }
};

const deleteTimetable = async (req, res) => {
  try {
    const { classId } = req.body;
    const { schoolId } = req.user;

    const timetable = await Timetable.findOneAndDelete({ classId, schoolId });

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found", status: false });
    }

    res.status(200).json({ message: "Timetable deleted successfully", status: true });
  } catch (err) {
    console.error("Delete Timetable Error:", err);
    res.status(500).json({ message: "Server error while deleting timetable", status: false });
  }
};

module.exports = {
  createOrUpdateTimetable,
  getClassTimetable,
  getMasterTimetable,
  deleteTimetable,
};
