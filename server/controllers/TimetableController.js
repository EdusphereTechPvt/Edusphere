const Timetable = require("../models/TimetableSchema");
const Class = require("../models/Class");

const createOrUpdateTimetable = async (req, res) => {
  try {
    const { classId, startTime, endTime, Monday, Tuesday, Wednesday, Thursday, Friday } = req.body;
    const { schoolId } = req.user;

    if (!classId || !startTime || !endTime) {
      return res.status(400).json({ message: "classId, startTime and endTime are required", status: false });
    }

    
    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(404).json({ message: "Class not found", status: false });
    }

  
    const days = { Monday, Tuesday, Wednesday, Thursday, Friday };
    for (const [day, data] of Object.entries(days)) {
      if (data && data.roomno && !/^\d+$/.test(data.roomno)) {
        return res.status(400).json({ message: `${day} room number must be numeric only`, status: false });
      }
    }

    
    const time = `${startTime} - ${endTime}`;

    
    const timetableData = {
      time,
      Class: classData.name,
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      classId,
      schoolId,
    };

    
    let existing = await Timetable.findOne({ classId, schoolId, time });

    if (existing) {
      Object.assign(existing, timetableData);
      await existing.save();
      return res.status(200).json({ message: "Timetable updated successfully", data: existing, status: true });
    }

    const newTimetable = new Timetable(timetableData);
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

    const timetable = await Timetable.find({ classId, schoolId });

    if (!timetable || timetable.length === 0) {
      return res.status(404).json({ message: "Timetable not found for this class", status: false });
    }

    res.status(200).json({ message: "Class timetable fetched successfully", data: timetable, status: true });
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
    const { classId, time } = req.body;
    const { schoolId } = req.user;

    const timetable = await Timetable.findOneAndDelete({ classId, schoolId, time });

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
