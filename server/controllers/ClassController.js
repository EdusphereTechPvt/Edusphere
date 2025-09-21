const ClassModel = require("../models/ClassSchema");


const addOrUpdateClass = async (req, res) => {
  try {
    const { id, className, academicYear, roomNo, estimatedStudents, classTeacher, mediumOfInstruction, comments } = req.body;

    if (!className || !academicYear || !estimatedStudents || !classTeacher || !mediumOfInstruction) {
      return res.status(400).json({
        message: "Class Name, Academic Year, Estimated Students, Class Teacher, and Medium of Instruction are required",
        status: false
      });
    }

    let classData;
    if (id) {
      classData = await ClassModel.findByIdAndUpdate(
        id,
        { className, academicYear, roomNo, estimatedStudents, classTeacher, mediumOfInstruction, comments },
        { new: true }
      );
    } else {
      classData = new ClassModel({ className, academicYear, roomNo, estimatedStudents, classTeacher, mediumOfInstruction, comments });
      await classData.save();
    }

    res.status(201).json({
      message: id ? "Class updated successfully" : "Class added successfully",
      data: classData,
      status: true
    });
  } catch (err) {
    console.error("Class Add/Update Error:", err);
    res.status(500).json({ message: "Server error", status: false });
  }
};


const getClasses = async (req, res) => {
  try {
    const { className, academicYear } = req.query;
    const filter = {};

    if (className) filter.className = { $regex: className, $options: "i" };
    if (academicYear) filter.academicYear = academicYear;

    const classes = await ClassModel.find(filter);

    res.status(200).json({
      message: "Classes fetched successfully",
      data: classes,
      status: true
    });
  } catch (err) {
    console.error("Get Classes Error:", err);
    res.status(500).json({ message: "Server error", status: false });
  }
};


const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const classData = await ClassModel.findByIdAndDelete(id);

    if (!classData) {
      return res.status(404).json({ message: "Class not found", status: false });
    }

    res.status(200).json({ message: "Class deleted successfully", status: true });
  } catch (err) {
    console.error("Delete Class Error:", err);
    res.status(500).json({ message: "Server error", status: false });
  }
};

module.exports = { addOrUpdateClass, getClasses, deleteClass };
