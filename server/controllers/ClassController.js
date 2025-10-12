const mongoose = require("mongoose");
const Class = require("../models/Class");
const Section = require("../models/Section"); 
const Teacher = require("../models/Teacher"); 
const Subject = require("../models/Subject");

const addOrUpdateClass = async (req, res) => {

  const session = await mongoose.startSession();
  session.startTransaction()
  try {
    const {
      id,
      classId,
      name,
      gradeLevel,
      sections,
      subjects,
      academicYear,
      comments,
      isActive,
    } = req.body;

    // Validation
    if (!name || !gradeLevel || !req.user.schoolId) {
      return res.status(400).json({
        message: "Class Name, Grade Level, Class Teacher, and School ID are required",
        status: false,
      });
    }

    let classData;

    if (id) {
      // Update existing class
      classData = await Class.findByIdAndUpdate(
        id,
        {
          name,
          gradeLevel,
          sections: Array.isArray(sections) ? sections : [],
          subjects: Array.isArray(subjects) ? subjects : [],
          academicYear,
          comments,
          isActive: typeof isActive === "boolean" ? isActive : true,
        },
        { new: true, session: session }
      );
    } else {
      // Create new class
      classData = new Class({
        classId: classId || `CLASS-${Date.now()}`,
        name: `Class ${name}`,
        gradeLevel,
        sections: Array.isArray(sections) ? sections : [],
        subjects: Array.isArray(subjects) ? subjects : [],
        academicYear,
        comments: comments || "",
        isActive: typeof isActive === "boolean" ? isActive : true,
        schoolId: req.user.schoolId,
      });
      await classData.save({session});
    }

    session.commitTransaction();

    res.status(201).json({
      message: id ? "Class updated successfully" : "Class added successfully",
      data: classData,
      status: true,
    });
  } catch (err) {
    session.abortTransaction();
    console.error("Class Add/Update Error:", err);
    res.status(500).json({ message: "Server error", status: false });
  }
};

const getClasses = async (req, res) => {
  try {
    const {id, name, gradeLevel, schoolId } = req.query;
    const filter = {};

    if (id) filter._id = id;
    if (name) filter.name = { $regex: name, $options: "i" };
    if (gradeLevel) filter.gradeLevel = gradeLevel;
    if (schoolId) filter.schoolId = schoolId;

    const classes = await Class.find(filter)
      .populate("sections")
      .populate("subjects");

    res.status(200).json({
      message: "Classes fetched successfully",
      data: classes,
      status: true,
    });
  } catch (err) {
    console.error("Get Classes Error:", err);
    res.status(500).json({ message: "Server error", status: false });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find({ schoolId: req.user.schoolId })
      .populate("sections")
      .populate("subjects");

    if (!classes || classes.length === 0) {
      return res.status(200).json({
        data: [],
        message: "No class found",
        status: false,
      });
    }

    const formattedClasses = classes.map((cls) => ({
      classId: cls.classId,
      name: cls.name,
      gradeLevel: cls.gradeLevel,
      sections: cls.sections.map((sec) => ({
        sectionId: sec.sectionId,
        name: sec.name,
      })),
      subjects: cls.subjects.map((sub) => ({
        subjectId: sub.subjectId,
        name: sub.name,
        code: sub.code,
      })),
      academicYear: cls.academicYear,
      status: cls.isActive,
      comments: cls.comments,
    }));

    res.status(200).json({
      data: formattedClasses,
      message: `${classes.length} class(es) found successfully`,
      status: true,
    });
  } catch (err) {
    console.error("Get All Classes Error:", err);
    res.status(500).json({
      message: "Server error while fetching class details",
      status: false,
    });
  }
};

const getProfileCardData = async(req,res) => {
  try{

    let keyName = req.body.searchBy.key;
    let keyValue = req.body.searchBy.value

    let classProfileData = await Class.findOne({ [keyName]:keyValue })
      .populate("sections")
      .populate("subjects"); 

      const formattedTeachers = {
      _id: classProfileData._id,
      id: classProfileData.classId,
      name: classProfileData.name,
      avatar: classProfileData.userId?.avatar,
      sections: classProfileData.sections,
      subjects: classProfileData.subjects
    };

      res.status(200).json({
        status: true,
        data: formattedTeachers
      })
  }
  catch (err) {
    console.error("Get Teacher Error:", err);
    res.status(500).json({
      message: "Server error while fetching teacher details",
      status: false
    });
  }
}

const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const classData = await Class.findByIdAndDelete(id);

    if (!classData) {
      return res.status(404).json({ message: "Class not found", status: false });
    }

    res.status(200).json({ message: "Class deleted successfully", status: true });
  } catch (err) {
    console.error("Delete Class Error:", err);
    res.status(500).json({ message: "Server error", status: false });
  }
};

module.exports = { addOrUpdateClass, getClasses,getAllClasses,getProfileCardData, deleteClass };
