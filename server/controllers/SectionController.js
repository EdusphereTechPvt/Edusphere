const { default: mongoose } = require("mongoose");
const Section = require("../models/Section");
const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

const save = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      _id,
      name,
      classId,
      teachers = [],
      students = [],
      classTeacher,
      capacity,
      roomNumber,
      isActive,
    } = req.body;

    const { schoolId } = req.user;

    if (!name || !classId || !classTeacher || !schoolId) {
      return res
        .status(400)
        .json({ message: "Name, Class ID, Class Teacher and School ID are required", status: false });
    }

    let section;
    if (_id) {
      section = await Section.findOne({ _id, schoolId }).session(session);
      if (!section) {
        return res.status(404).json({ message: "Section not found", status: false });
      }

      Object.assign(section, {
        name,
        classId,
        teachers,
        students,
        classTeacher,
        capacity,
        roomNumber,
        isActive,
      });

      await section.save({ session });
      await session.commitTransaction();
      return res
        .status(200)
        .json({ message: "Section updated successfully", data: section, status: true });
    }

    const newSection = new Section({
      sectionId: `SEC-${Date.now()}`,
      name,
      classId,
      teachers,
      students,
      capacity,
      
        classTeacher,
      roomNumber,
      schoolId,
      isActive,
    });

    await newSection.save({ session });
    await session.commitTransaction();

    res
      .status(201)
      .json({ message: "Section added successfully", data: newSection, status: true });
  } catch (err) {
    await session.abortTransaction();
    console.error("Save Section Error:", err);
    res
      .status(500)
      .json({ message: "Server error during section add/update", status: false });
  } finally {
    session.endSession();
  }
};

const getSectionDetails = async (req, res) => {
  const { id, sectionId, name = "" } = req.body;

  if (![id, sectionId, name].some(Boolean)) {
    return res
      .status(400)
      .json({ message: "At least one search field is required", status: false });
  }

  const searchFields = {};
  if (id && mongoose.Types.ObjectId.isValid(id)) searchFields._id = id;
  if (sectionId) searchFields.sectionId = sectionId;
  if (name) searchFields.name = { $regex: name, $options: "i" };

  try {
    const sections = await Section.find(searchFields)
      .populate("classId", "name gradeLevel")
      .populate("teachers", "teacherId name")
      .populate("classTeacher")
      .populate("students", "studentId name");

    if (!sections || sections.length === 0) {
      return res.status(404).json({
        data: [],
        message: "No section found",
        status: false,
      });
    }

    return res.status(200).json({
      data: sections.length === 1 ? sections[0] : sections,
      message:
        sections.length === 1
          ? "Section found successfully"
          : "Multiple sections found successfully",
      status: true,
    });
  } catch (err) {
    console.error("Get Section Details Error:", err);
    res.status(500).json({ message: "Server error while fetching section details", status: false });
  }
};

const getAllSectionsList = async (req, res) => {
  try {
    const sections = await Section.find({ schoolId: req.user.schoolId })
      .populate("classId", "name gradeLevel")
      .populate("teachers", "teacherId name")
      .populate("classTeacher", "teacherId name")
      .populate("students", "studentId name");

    if (!sections || sections.length === 0) {
      return res.status(200).json({
        data: [],
        message: "No section found",
        status: false,
      });
    }

    const formattedSections = sections.map((sec) => ({
      sectionId: sec.sectionId,
      name: sec.name,
      class: sec.classId ? { id: sec.classId._id, name: sec.classId.name } : null,
      teachers: sec.teachers.map((t) => ({
        teacherId: t.teacherId,
        name: t.name,
      })),
      classTeacher: sec.classTeacher
        ? {
            teacherId: sec.classTeacher.teacherId,
            name: sec.classTeacher.name,
            email: sec.classTeacher.email,
          }
        : null,
      students: sec.students.map((s) => ({
        studentId: s.studentId,
        name: s.name,
      })),
      capacity: sec.capacity,
      roomNumber: sec.roomNumber,
      isActive: sec.isActive,
    }));

    res.status(200).json({
      data: formattedSections,
      message: `${sections.length} section(s) found successfully`,
      status: true,
    });
  } catch (err) {
    console.error("Get All Sections Error:", err);
    res.status(500).json({ message: "Server error while fetching sections", status: false });
  }
};

const getProfileCardData = async (req, res) => {
  try {
    let keyName = req.body.searchBy.key;
    let keyValue = req.body.searchBy.value;

    let sectionProfileData = await Section.findOne({ [keyName]: keyValue })
      .populate("classId", "name")
      .populate("classTeacher")
      .populate("students", "name");

    if (!sectionProfileData) {
      return res.status(404).json({
        message: "Section not found",
        status: false,
      });
    }

    const formattedSection = {
      _id: sectionProfileData._id,
      id: sectionProfileData.sectionId,
      name: sectionProfileData.name,
      classTeacher: sectionProfileData.classTeacher?.name,
      className: sectionProfileData.classId?.name,
      teacherCount: sectionProfileData.teachers.length,
      studentCount: sectionProfileData.students.length,
      capacity: sectionProfileData.capacity,
      roomNumber: sectionProfileData.roomNumber,
    };

    res.status(200).json({ status: true, data: formattedSection });
  } catch (err) {
    console.error("Get Section ProfileCard Error:", err);
    res.status(500).json({
      message: "Server error while fetching section profile card data",
      status: false,
    });
  }
};


const deleteSection = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.body;
    const section = await Section.findByIdAndDelete(id).session(session);

    if (!section) {
      return res.status(404).json({
        message: "Section not found",
        status: false,
      });
    }

    await session.commitTransaction();

    res.status(200).json({
      message: "Section deleted successfully",
      status: true,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error("Delete Section Error:", err);
    res
      .status(500)
      .json({ message: "Server error while deleting section", status: false });
  } finally {
    session.endSession();
  }
};

module.exports = {
  save,
  getSectionDetails,
  getAllSectionsList,
  getProfileCardData,
  deleteSection,
};
