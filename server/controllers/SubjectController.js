const { default: mongoose } = require("mongoose");
const Subject = require("../models/Subject");

const save = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      _id,
      subjectId,
      name,
      code,
      description,
      classIds = [],
      teacherIds = [],
      credits = 0,
      isActive = true,
    } = req.body;

    const { schoolId } = req.user;

    if (!name || !schoolId) {
      return res.status(400).json({
        message: "Name, and School ID are required",
        status: false,
      });
    }

    let subject = await Subject.findOne({ _id, schoolId }).session(session);

    if (subject) {
      Object.assign(subject, {
        subjectId,
        name,
        code,
        description,
        classIds,
        teacherIds,
        credits,
        isActive,
      });
      await subject.save({ session });
      await session.commitTransaction();
      return res.status(200).json({
        message: "Subject updated successfully",
        data: subject,
        status: true,
      });
    }

    const newSubject = new Subject({
      subjectId: subjectId || `SUB-${Date.now()}`,
      name,
      code: code || `${name.replace(/\s+/g, '').toUpperCase()}-${Math.floor(Math.random() * 10000)}`,
      description,
      classIds,
      teacherIds,
      schoolId,
      credits,
      isActive,
    });

    await newSubject.save({ session });
    await session.commitTransaction();

    res.status(201).json({
      message: "Subject added successfully",
      data: newSubject,
      status: true,
    });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ message: "Server error during subject add/update", status: false });
  } finally {
    session.endSession();
  }
};

const getSubjectDetails = async (req, res) => {
  const { id, subjectId, name = "", code = "" } = req.body;

  if (![id, subjectId, name, code].some(Boolean)) {
    return res.status(400).json({
      message: "At least one search field is required",
      status: false,
    });
  }

  const searchFields = {};
  if (id && mongoose.Types.ObjectId.isValid(id)) {
    searchFields._id = id;
  }
  if (subjectId) {
    searchFields.subjectId = subjectId;
  }
  if (name) {
    searchFields.name = { $regex: name, $options: "i" };
  }
  if (code) {
    searchFields.code = { $regex: code, $options: "i" };
  }

  try {
    const response = await Subject.find(searchFields);

    if (response.length === 0) {
      return res.status(404).json({
        data: [],
        message: "No subject found",
        status: false,
      });
    } else if (response.length === 1) {
      return res.status(200).json({
        data: response[0],
        message: "Subject found successfully",
        status: true,
      });
    }

    return res.status(200).json({
      data: response,
      message: "Multiple subjects found successfully",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching subject details",
      status: false,
    });
  }
};

const getAllSubjectsList = async (req, res) => {
  try {
    const subjects = await Subject.find({ schoolId: req.user.schoolId });

    if (!subjects || subjects.length === 0) {
      return res.status(404).json({
        data: [],
        message: "No subject found",
        status: false,
      });
    }

    const formattedSubjects = subjects.map((subject) => ({
      subjectId: subject.subjectId,
      name: subject.name,
      code: subject.code,
      credits: subject.credits,
      status: subject.isActive,
    }));

    res.status(200).json({
      data: formattedSubjects,
      message: `${subjects.length} subject(s) found successfully`,
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error while fetching subject details",
      status: false,
    });
  }
};

const deleteSubject = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.body;
    const subject = await Subject.findByIdAndDelete(id).session(session);

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
        status: false,
      });
    }

    await session.commitTransaction();
    res.status(200).json({
      message: "Subject deleted successfully",
      status: true,
    });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({
      message: "Server error while deleting subject",
      status: false,
    });
  } finally {
    session.endSession();
  }
};

module.exports = { save, getSubjectDetails, getAllSubjectsList, deleteSubject };
