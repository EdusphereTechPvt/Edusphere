const mongoose = require("mongoose");
const Class = require("../models/Class");
const Section = require("../models/Section");
const Subject = require("../models/Subject");
const { syncReferences } = require("../utils/Sync");

const addOrUpdateClass = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      _id,
      classId,
      name,
      gradeLevel,
      sections = [],
      subjects = [],
      academicYear,
      comments,
      isActive,
    } = req.body;

    if (!name || !gradeLevel || !req.user.schoolId) {
      return res.status(400).json({
        message: "Class Name, Grade Level, and School ID are required",
        status: false,
      });
    }

    let classData;

    if (_id) {
      classData = await Class.findById(_id).session(session);
      if (!classData) {
        return res.status(404).json({ message: "Class not found", status: false });
      }

      const oldSections = classData.sections.map(s => s.toString());
      const oldSubjects = classData.subjects.map(s => s.toString());

      Object.assign(classData, {
        name,
        gradeLevel,
        sections: Array.isArray(sections) ? sections : [],
        subjects: Array.isArray(subjects) ? subjects : [],
        academicYear,
        comments: comments || "",
        isActive: typeof isActive === "boolean" ? isActive : true,
      });

      await classData.save({ session });

      const newRefs = [...subjects, ...sections].filter(
        ref => ![...oldSubjects, ...oldSections].includes(ref.toString())
      );
      for (const refId of newRefs) {
        await syncReferences({
          action: "save",
          targetModel: "Class",
          targetId: classData._id,
          refId,
          session,
        });
      }

      const removedRefs = [...oldSubjects, ...oldSections].filter(
        ref => ![...subjects, ...sections].includes(ref.toString())
      );
      for (const refId of removedRefs) {
        await syncReferences({
          action: "remove",
          targetModel: "Class",
          targetId: classData._id,
          refId,
          session,
        });
      }
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

      await classData.save({ session });

      // Sync all references
      for (const refId of [...subjects, ...sections]) {
        await syncReferences({
          action: "save",
          targetModel: "Class",
          targetId: classData._id,
          refId,
          session,
        });
      }
    }

    await session.commitTransaction();

    res.status(201).json({
      message: _id ? "Class updated successfully" : "Class added successfully",
      data: classData,
      status: true,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error("Class Add/Update Error:", err);
    res.status(500).json({ message: "Server error", status: false });
  } finally {
    session.endSession();
  }
};


const getClasses = async (req, res) => {
  const { id, classId, name = "", gradeLevel = "", schoolId = "" } = req.body;

  // Ensure at least one search field is provided
  if (![id, classId, name, gradeLevel, schoolId].some(Boolean)) {
    return res.status(400).json({
      message: "At least one search field is required",
      status: false,
    });
  }

  const searchFields = {};
  if (id && mongoose.Types.ObjectId.isValid(id)) searchFields._id = id;
  if (classId) searchFields.classId = classId;
  if (name) searchFields.name = { $regex: name, $options: "i" };
  if (gradeLevel) searchFields.gradeLevel = gradeLevel;
  if (schoolId) searchFields.schoolId = schoolId;

  try {
    // Find classes with fully populated subjects and sections
    const classes = await Class.find(searchFields)

    if (classes.length === 0) {
      return res.status(404).json({
        data: {},
        message: "No class found",
        status: false,
      });
    }

    // Return only the first class to match the Subject-like response
    const classData = classes[0];

    return res.status(200).json({
      data: classData,
      message: "Class found successfully",
      status: true,
    });
  } catch (err) {
    console.error("Error fetching classes:", err);
    return res.status(500).json({
      message: "Server error while fetching class",
      status: false,
    });
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
console.log("classes", classes)
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
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.body;
    const classData = await Class.findById(id).session(session);

    if (!classData) {
      return res.status(404).json({ message: "Class not found", status: false });
    }

    await syncReferences({ action: "remove", targetModel: "Class", targetId: classData._id, session });

    await Class.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    res.status(200).json({ message: "Class deleted successfully", status: true });
  } catch (err) {
    await session.abortTransaction();
    console.error("Delete Class Error:", err);
    res.status(500).json({ message: "Server error", status: false });
  } finally {
    session.endSession();
  }
};


module.exports = { addOrUpdateClass, getClasses,getAllClasses,getProfileCardData, deleteClass };
