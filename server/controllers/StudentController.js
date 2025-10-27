const { default: mongoose } = require("mongoose");
const User = require("../models/AuthSchema");
const Student = require("../models/Student");
const Parent = require("../models/Parent");
const School = require("../models/SchoolSchema");
const { syncReferences } = require("../utils/Sync");
const { sendEmail } = require("../utils/Email");
const {
  studentSignupTemplate,
  parentSignupTemplate,
} = require("../utils/templates/EmailTemplates");

const save = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      name,
      email,
      dateOfBirth,
      gender,
      classes,
      sections,
      enrollmentDate,
      contactNumber,
      previousSchool,
      isActive,
      photo,
      address,
      parentPhoto,
      parentName,
      parentDOB,
      parentEmail,
      parentContactNumber,
      relation,
      alternativeEmail,
      alternativeContactNumber,
      parentOccupation,
      isParentActive,
    } = req.body;

    const { schoolId } = req.user;

    if (
      !name ||
      !dateOfBirth ||
      !schoolId ||
      !classes ||
      !sections ||
      !parentName ||
      !parentContactNumber
    ) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ message: "Required fields missing", status: false });
    }

    let newParentAdded = false;
    let newStudentAdded = false;

    const dobObj = new Date(dateOfBirth);
    if (isNaN(dobObj.getTime())) throw new Error("Invalid dateOfBirth format");

    let parentUser = await User.findOne({ email: parentEmail }).session(
      session
    );
    let parentDoc;

    const school = await School.findOne({ _id: schoolId }).session(session);

    if (!parentUser) {
      const dobStr = parentDOB
        ? new Date(parentDOB).toISOString().split("T")[0].replace(/-/g, "")
        : Date.now();
      const password = `${parentName.split(" ")[0]}@${dobStr}`;
      parentUser = new User({
        name: parentName,
        dateOfBirth: new Date(parentDOB || Date.now()),
        email: parentEmail,
        password,
        role: "parent",
        schoolId,
        avatar: parentPhoto,
        isActive: isParentActive ?? true,
      });

      parentDoc = new Parent({
        userId: parentUser._id,
        parentId: `PARENT-${Date.now()}`,
        name: parentName,
        photo: parentPhoto,
        schoolId,
        occupation: parentOccupation || "N/A",
        emergencyContact: parentContactNumber,
        email: parentEmail,
        alternativeEmail,
        alternativeContactNumber,
        relation,
        children: [],
        isActive: isParentActive ?? true,
      });

      await parentUser.save({ session });
      await parentDoc.save({ session });

      newParentAdded = true;
    }

    let student = await User.findOne({ email }).session(session);

    if (!student) {
      const studentEmail =
        email ||
        `${name
          .replace(/\s+/g, "")
          .toLowerCase()}${dobObj.getFullYear()}${String(
          parentContactNumber
        ).slice(-5)}@school.com`;

        console.log(studentEmail)

      const studentDobStr = dobObj
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");
      const studentPassword = `${name.split(" ")[0]}@${studentDobStr}`;

      let parentDoc = await Parent.findOne({ userId: parentUser._id }).session(
        session
      );

      studentUser = new User({
        name,
        dateOfBirth: studentDobStr,
        email: studentEmail,
        password: studentPassword,
        schoolId,
        role: "student",
        avatar: photo,
        isActive: isActive ?? true,
      });

      const studentData = new Student({
        userId: studentUser._id,
        studentId: `STU-${Date.now()}`,
        name,
        email: studentEmail,
        dateOfBirth: studentDobStr,
        gender,
        classes,
        sections,
        contactNumber,
        address,
        previousSchool,
        photo,
        schoolId,
        parent: parentDoc._id,
        enrollmentDate: enrollmentDate || new Date(),
        isActive: isActive ?? true,
      });

      await studentUser.save({ session });
      await studentData.save({ session });

      await Parent.findByIdAndUpdate(
        parentDoc._id,
        { $addToSet: { children: studentData._id } },
        { session }
      );

      await syncReferences({
        action: "save",
        targetModel: "Student",
        targetId: studentData._id,
        filters: {
          Class: { _id: classes },
          Section: { _id: sections },
          Parent: { _id: parentDoc._id },
        },
        session,
      });

      newStudentAdded = true;

      if (newParentAdded) {
        await sendEmail(
          parentEmail,
          `Hey ${parentName}, Welcome to Edusphere! 🎓`,
          parentSignupTemplate(parentName, school?.name),
          false
        );
      }

      if (newStudentAdded) {
        await sendEmail(
          parentEmail,
          `Hey ${parentName}, Welcome to Edusphere! 🎓`,
          studentSignupTemplate(parentName, school?.name),
          false
        );
      }

      await session.commitTransaction();

      return res.status(200).json({
        message: "Student or Parent added successfully",
        status: true,
      });
    }

    const studentProfile = await Student.findOne({
      userId: student._id,
      schoolId,
    }).session(session);

    const oldClasses = studentProfile.classes ? [studentProfile.classes] : [];
    const oldSections = studentProfile.sections
      ? [studentProfile.sections]
      : [];

    Object.assign(studentProfile, {
      name,
      classes,
      sections,
      email,
      dateOfBirth,
      enrollmentDate,
      contactNumber,
      previousSchool,
      photo,
      address,
      isActive,
    });

    await studentProfile.save({ session });

    await syncReferences({
      action: "save",
      targetModel: "Student",
      targetId: studentProfile._id,
      filters: {
        Class: { _id: classes },
        Section: { _id: sections },
        Parent: { _id: parentUser._id}
      },
      session,
    });

    const removedIds = [...oldClasses, ...oldSections].filter(
      (id) => ![classes, sections].includes(id)
    );

    for (const removedId of removedIds) {
      await syncReferences({
        action: "remove",
        targetModel: "Student",
        targetId: studentProfile._id,
        filters: {
          Class: { _id: removedId },
          Section: { _id: removedId },
          Parent: { _id: parentUser._id}
        },
        session,
      });
    }

    await session.commitTransaction();

    return res.status(200).json({
      message: "Section updated successfully",
      data: studentProfile,
      status: true,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error("Save Error:", err);
    res.status(500).json({
      message: "Server error during student or parent add/update",
      status: false,
    });
  } finally {
    session.endSession();
  }
};

const getStudentDetails = async (req, res) => {
  const { id, studentId, name = "", email = "", contactNumber = "" } = req.body;

  if (![id, studentId, name, email, contactNumber].some(Boolean)) {
    return res.status(400).json({
      message: "At least one search field is required",
      status: false,
    });
  }

  const searchFields = {};
  if (id && mongoose.Types.ObjectId.isValid(id)) searchFields._id = id;
  if (studentId) searchFields.studentId = studentId;
  if (name) searchFields.name = { $regex: name, $options: "i" };
  if (email) searchFields.email = { $regex: email, $options: "i" };
  if (contactNumber)
    searchFields.contactNumber = { $regex: contactNumber, $options: "i" };

  try {
    const response = await Student.find(searchFields)
      .populate("userId", "email name avatar isActive dateOfBirth")
      .populate("schoolId", "name")
      .populate({
        path: "parent",
        populate: {
          path: "userId",
          select: "email name avatar isActive dateOfBirth",
        },
      });

    if (!response || response.length === 0) {
      return res.status(404).json({
        data: [],
        total: 0,
        message: "No student found",
        status: false,
      });
    }

    const total = response.length;

    const formattedData = response.map((student) => {
      const parent = student.parent;
      const parentUser = parent?.userId;

      const parentInfo = parent
        ? {
            parentId: parent._id,
            parentName: parent.name,
            parentEmail: parent.email,
            parentContactNumber: parent.emergencyContact,
            parentDOB: parentUser?.dateOfBirth || null,
            parentPhoto: parent.photo,
            relation: parent.relation,
            parentOccupation: parent.occupation,
            alternativeEmail: parent.alternativeEmail,
            alternativeContactNumber: parent.alternativeContactNumber,
            isParentActive: parent.isActive,
          }
        : null;

      return {
        studentId: student.studentId,
        name: student.name,
        email: student.email,
        dateOfBirth: student.dateOfBirth,
        gender: student.gender,
        classes: student.classes,
        sections: student.sections,
        enrollmentDate: student.enrollmentDate,
        contactNumber: student.contactNumber,
        previousSchool: student.previousSchool || "",
        address: student.address,
        photo: student.photo,
        isActive: student.isActive,
        school: student.schoolId?.name || null,
        ...parentInfo,
      };
    });

    res.status(200).json({
      total,
      data: total === 1 ? formattedData[0] : formattedData,
      message:
        total === 1
          ? "Student found successfully"
          : `${total} student(s) found successfully`,
      status: true,
    });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({
      message: "Server error while fetching student details",
      status: false,
    });
  }
};

const getAllStudentsList = async (req, res) => {
  try {
    const students = await Student.find({
      schoolId: req.user.schoolId,
    })
      .populate("userId", "name email avatar contactNumber isActive")
      .populate("classes", "name")
      .populate("sections", "name");

    if (!students || students.length === 0) {
      return res
        .status(200)
        .json({ data: [], message: "No student found", status: false });
    }
    const total = students.length;
    const formattedStudents = students.map((student) => ({
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      contactNumber:
        student.contactNumber || student.userId?.contactNumber || null,
      avatar: student.userId?.avatar || null,
      isActive: student.isActive,
      gender: student.gender,
      className: student.classes?.name || null,
      sectionName: student.sections?.name || null,
    }));

    res.status(200).json({
      total,
      data: formattedStudents,
      message: `${students.length} student(s) found successfully`,
      status: true,
    });
  } catch (err) {
    console.error("Get All Students Error:", err);
    res.status(500).json({
      message: "Server error while fetching student details",
      status: false,
    });
  }
};

const getProfileCardData = async (req, res) => {
  try {
    const { key, value } = req.body.searchBy;
    const student = await Student.findOne({ [key]: value })
      .populate("userId", "name email avatar contactNumber isActive")
      .populate("classes", "name")
      .populate("sections", "name");

    if (!student)
      return res
        .status(404)
        .json({ message: "Student not found", status: false });

    const formattedStudent = {
      _id: student._id,
      id: student.studentId,
      name: student.name,
      email: student.email,
      contactNumber:
        student.contactNumber || student.userId?.contactNumber || null,
      avatar: student.userId?.avatar || null,
      className: student.classes?.name || null,
      sectionName: student.sections?.name || null,
      gender: student.gender,
      isActive: student.isActive,
    };

    res.status(200).json({ status: true, data: formattedStudent });
  } catch (err) {
    console.error("Get Profile Card Error:", err);
    res.status(500).json({
      message: "Server error while fetching student profile data",
      status: false,
    });
  }
};

const deleteStudent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.body;
    const student = await Student.findByIdAndDelete(id)
      .populate("parent")
      .session(session);

    if (!student) {
      await session.abortTransaction();
      return res
        .status(404)
        .json({ message: "Student not found", status: false });
    }

    await syncReferences({
      action: "remove",
      targetModel: "Student",
      targetId: student._id,
      session,
    });

    if (student.parent.children && student.parent.children.length === 1) {
      await Parent.findByIdAndDelete(student.parent._id).session(session);
      await User.findByIdAndDelete(student.parent.userId).session(session);
    }

    await User.findByIdAndDelete(student.userId).session(session);

    await session.commitTransaction();
    res.status(200).json({
      message: "Student and associated parent deleted successfully",
      status: true,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error("Delete Student Error:", err);
    res
      .status(500)
      .json({ message: "Server error while deleting student", status: false });
  } finally {
    session.endSession();
  }
};

module.exports = {
  save,
  getStudentDetails,
  getAllStudentsList,
  getProfileCardData,
  deleteStudent,
};
