const { default: mongoose } = require("mongoose");
const User = require("../models/AuthSchema");
const Student = require("../models/Student");
const Parent = require("../models/Parent");
const { syncReferences } = require("../utils/Sync");
const { sendEmail } = require("../utils/Email");
const { studentSignupTemplate } = require("../utils/templates/EmailTemplates");


const save = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      name,
      studentEmail,
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

    const { schoolId } = req.user || {};

    if (!name || !dateOfBirth || !schoolId || !classes || !sections || !parentName || !parentContactNumber) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Required fields missing", status: false });
    }

    const dobObj = new Date(dateOfBirth);
    if (isNaN(dobObj.getTime())) throw new Error("Invalid dateOfBirth format");

    const defaultEmail =
      studentEmail ||
      `${name.replace(/\s+/g, "").toLowerCase()}${dobObj.getFullYear()}${String(parentContactNumber).slice(-5)}@school.com`;

    const parentUserEmail =
      parentEmail ||
      (parentName && parentContactNumber
        ? `${parentName.replace(/\s+/g, "").toLowerCase()}${String(parentContactNumber).slice(-5)}@school.com`
        : `parent${Date.now()}@school.com`);

    
    let parentUser = await User.findOne({ email: parentUserEmail }).session(session);
    if (!parentUser) {
      const dobStr = parentDOB ? new Date(parentDOB).toISOString().split("T")[0].replace(/-/g, "") : Date.now();
      const password = `${parentName.split(" ")[0]}@${dobStr}`;
      parentUser = new User({
        name: parentName,
        dateOfBirth: new Date(parentDOB || Date.now()),
        email: parentUserEmail,
        password,
        role: "parent",
        schoolId,
        avatar: parentPhoto,
        isActive: isParentActive ?? true,
      });
      await parentUser.save({ session });
    }

    
    let parentDoc = await Parent.findOne({ userId: parentUser._id, schoolId }).session(session);
    if (!parentDoc) {
      parentDoc = new Parent({
        userId: parentUser._id,
        parentId: `PARENT-${Date.now()}`,
        name: parentName,
        photo: parentPhoto,
        schoolId,
        occupation: parentOccupation || "N/A",
        emergencyContact: parentContactNumber,
        email: parentUserEmail,
        alternativeEmail,
        alternativeContactNumber,
        relation,
        children: [],
        isActive: isParentActive ?? true,
      });
      await parentDoc.save({ session });
    }

    await syncReferences({ action: "save", targetModel: "Parent", targetId: parentDoc._id, session });

   
    let studentUser = await User.findOne({ email: defaultEmail }).session(session);
    if (!studentUser) {
      const dobStr = dobObj.toISOString().split("T")[0].replace(/-/g, "");
      const password = `${name.split(" ")[0]}@${dobStr}`;
      studentUser = new User({
        name,
        dateOfBirth: dobObj,
        email: defaultEmail,
        password,
        schoolId,
        role: "student",
        avatar: photo,
        isActive: isActive ?? true,
      });
      await studentUser.save({ session });
    }

   
    let student = await Student.findOne({ userId: studentUser._id, schoolId }).session(session);
    const studentData = {
      userId: studentUser._id,
      name,
      studentEmail: defaultEmail,
      dateOfBirth: dobObj,
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
    };

    if (student) {
      Object.assign(student, studentData);
      await student.save({ session });
    } else {
      student = new Student({ ...studentData, studentId: `STU-${Date.now()}` });
      await student.save({ session });
    }

    await syncReferences({ action: "save", targetModel: "Student", targetId: student._id, session });

    parentDoc.children = parentDoc.children || [];

    await Parent.updateMany(
      { children: student._id, _id: { $ne: parentDoc._id } },
      { $pull: { children: student._id } },
      { session }
    );

    const childrenSet = new Set(parentDoc.children.map((id) => id.toString()));
    childrenSet.add(student._id.toString());
    parentDoc.children = Array.from(childrenSet).map((id) => mongoose.Types.ObjectId(id));
    await parentDoc.save({ session });

   
    if (studentEmail) {
      await sendEmail(
        studentEmail,
        `Hey ${name}, Welcome to Edusphere! 🎓`,
        studentSignupTemplate(name, req.user.school?.name || "Your School"),
        false
      );
    }

    await session.commitTransaction();
    res.status(201).json({ message: "Student and Parent added/updated successfully", data: { student }, status: true });
  } catch (err) {
    await session.abortTransaction();
    console.error("Save Student Error:", err.stack || err);
    res.status(500).json({ message: err.message || "Server error during student add/update", status: false });
  } finally {
    session.endSession();
  }
};


const getAllStudentsList = async (req, res) => {
  try {
    const students = await Student.find({ schoolId: req.user.schoolId })
      .populate("userId", "name email avatar contactNumber isActive")
      // .populate("classes", "name")
      // .populate("sections", "name");

    if (!students || students.length === 0) {
      return res.status(200).json({ data: [], message: "No student found", status: false });
    }
        const total = students.length;
    const formattedStudents = students.map((student) => ({
      studentId: student.studentId,
      name: student.name,
      email: student.studentEmail,
      contactNumber: student.contactNumber || student.userId?.contactNumber || null,
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
    res.status(500).json({ message: "Server error while fetching student details", status: false });
  }
};

const getProfileCardData = async (req, res) => {
  try {
    const { key, value } = req.body.searchBy;
    const student = await Student.findOne({ [key]: value })
      .populate("userId", "name email avatar contactNumber isActive")
      .populate("classes", "name")
      .populate("sections", "name");

    if (!student) return res.status(404).json({ message: "Student not found", status: false });

    const formattedStudent = {
      _id: student._id,
      id: student.studentId,
      name: student.name,
      email: student.studentEmail,
      contactNumber: student.contactNumber || student.userId?.contactNumber || null,
      avatar: student.userId?.avatar || null,
      className: student.classes?.name || null,
      sectionName: student.sections?.name || null,
      gender: student.gender,
      isActive: student.isActive,
    };

    
    res.status(200).json({ status: true, data: formattedStudent });
  } catch (err) {
    console.error("Get Profile Card Error:", err);
    res.status(500).json({ message: "Server error while fetching student profile data", status: false });
  }
};


const deleteStudent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.body;
    const student = await Student.findById(id).session(session);

    if (!student) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Student not found", status: false });
    }

    const parent = await Parent.findOne({ children: student._id }).session(session);
    if (parent) {
      
      if (parent.children.length === 1) {
        await Parent.findByIdAndDelete(parent._id).session(session);
        await User.findByIdAndDelete(parent.userId).session(session);
      } else {
      
        parent.children = parent.children.filter(
          (childId) => childId.toString() !== student._id.toString()
        );
        await parent.save({ session });
      }
    }

    await Student.findByIdAndDelete(id).session(session);
    await User.findByIdAndDelete(student.userId).session(session);
    await syncReferences({ action: "remove", targetModel: "Student", targetId: student._id, session });

    await session.commitTransaction();
    res.status(200).json({ message: "Student and associated parent deleted successfully", status: true });
  } catch (err) {
    await session.abortTransaction();
    console.error("Delete Student Error:", err);
    res.status(500).json({ message: "Server error while deleting student", status: false });
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
