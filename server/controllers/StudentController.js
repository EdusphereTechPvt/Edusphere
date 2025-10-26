// const { default: mongoose } = require("mongoose");
// const User = require("../models/AuthSchema");
// const Student = require("../models/Student");
// const Parent = require("../models/Parent");
// const { syncReferences } = require("../utils/Sync");


// const save = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const {
//       _id,
//       name,
//       dateOfBirth,
//       gender,
//       classes,
//       sections,
//       parentName,
//       guardianName,
//       parentEmail,
//       parentContactNumber,
//       parentOccupation,
//       motherName,
//       contactNumber,
//       address,
//       photo,
//       status,
//     } = req.body;

//     const { schoolId } = req.user || {};

//     if (!name || !dateOfBirth || !schoolId || !classes || !sections || !parentName || !parentContactNumber) {
//       await session.abortTransaction();
//       return res.status(400).json({ message: "Required fields missing", status: false });
//     }

//     // Normalize
//     const normalizedEmail = parentEmail?.trim().toLowerCase() || "";
//     const normalizedDob = new Date(dateOfBirth);
//     if (isNaN(normalizedDob.getTime())) throw new Error("Invalid dateOfBirth format");

//     const allowedGenders = ["Male", "Female", "Other"];
//     const normalizedGender = gender
//       ? gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()
//       : null;
//     if (!allowedGenders.includes(normalizedGender)) {
//       await session.abortTransaction();
//       return res.status(400).json({
//         message: `Invalid gender. Allowed: ${allowedGenders.join(", ")}`,
//         status: false,
//       });
//     }

//     const normalizeObjectId = (value) => {
//       if (!value) return null;
//       if (Array.isArray(value)) return value.map((id) => mongoose.Types.ObjectId(id));
//       return new mongoose.Types.ObjectId(value);
//     };
//     const classesObjId = normalizeObjectId(classes);
//     const sectionsObjId = normalizeObjectId(sections);

//     // Create or update student user
//     let user = await User.findOne({ email: normalizedEmail }).session(session);
//     if (!user) {
//       const dobStr = normalizedDob.toISOString().split("T")[0].replace(/-/g, "");
//       const password = `${name.split(" ")[0]}@${dobStr}`;
//       user = new User({
//         name,
//         email: `student_${name}@school.com`,
//         password,
//         role: "student",
//         dateOfBirth: normalizedDob,
//         schoolId,
//       });
//       await user.save({ session });
//     }

//     // Create/update student document
//     let student = await Student.findOne({ userId: user._id, schoolId }).session(session);
//     const studentData = {
//       name,
//       dateOfBirth: normalizedDob,
//       gender: normalizedGender,
//       classes: classesObjId,
//       sections: sectionsObjId,
//       parentName,
//       guardianName,
//       parentEmail: normalizedEmail,
//       parentContactNumber,
//       parentOccupation,
//       motherName,
//       contactNumber,
//       address,
//       photo,
//       schoolId,
//       userId: user._id,
//       enrollmentDate: new Date(),
//       status: status || "Active",
//     };

//     if (student) {
//       Object.assign(student, studentData);
//       await student.save({ session });
//     } else {
//       student = new Student({
//         ...studentData,
//         studentId: `STU-${Date.now()}`,
//       });
//       await student.save({ session });
//     }
//     await syncReferences({ action: "save", targetModel: "Student", targetId: student._id, session });

//     // Parent user creation
//     const parentEmailForUser = normalizedEmail || `parent_${Date.now()}@school.com`;
//     let parentUser = await User.findOne({
//       $or: [
//         { email: parentEmailForUser },
//         { contactNumber: parentContactNumber },
//       ],
//     }).session(session);

//     if (!parentUser) {
//       const password = `${parentName.split(" ")[0]}@${(parentContactNumber || "0000").toString().slice(0, 4)}`;
//       parentUser = new User({
//         name: parentName,
//         dateOfBirth: new Date(),
//         email: parentEmailForUser,
//         password,
//         role: "parent",
//         isActive: true,
//         schoolId,
//       });
//       await parentUser.save({ session });
//     }

//     // Create/update parent document
//     let parentDoc = await Parent.findOne({ userId: parentUser._id, schoolId }).session(session);
//     if (!parentDoc) {
//       parentDoc = new Parent({
//         userId: parentUser._id,
//         name: parentName,
//         parentId: `PARENT-${Date.now()}`,
//         schoolId,
//         occupation: parentOccupation || "N/A",
//         emergencyContact: parentContactNumber,
//         children: [student._id],
//       });
//     } else {
//       if (!parentDoc.children.includes(student._id)) {
//         parentDoc.children.push(student._id);
//       }
//     }
//     await parentDoc.save({ session });
//     await syncReferences({ action: "save", targetModel: "Parent", targetId: parentDoc._id, session });

//     await session.commitTransaction();

//     res.status(201).json({
//       message: "Student and Parent added/updated successfully",
//       data: { student, parent: parentDoc },
//       status: true,
//     });
//   } catch (err) {
//     await session.abortTransaction();
//     console.error("Save Student Error:", err.stack || err);
//     res.status(500).json({ message: err.message || "Server error during student add/update", status: false });
//   } finally {
//     session.endSession();
//   }
// };
// const getStudentDetails = async (req, res) => {
//   const { id, studentId, name = "", parentContactNumber = "" } = req.body;

//   if (![id, studentId, name, parentContactNumber].some(Boolean)) {
//     return res.status(400).json({
//       message: "At least one search field is required",
//       status: false,
//     });
//   }

//   const searchFields = {};

//   if (id && mongoose.Types.ObjectId.isValid(id)) {
//     searchFields._id = new mongoose.Types.ObjectId(id.trim());
//   }
//   if (studentId) searchFields.studentId = studentId;
//   if (name) searchFields.name = { $regex: name, $options: "i" };
//   if (parentContactNumber)
//     searchFields.parentContactNumber = { $regex: parentContactNumber, $options: "i" };

//   try {
//     const response = await Student.find(searchFields)
//       .populate("userId", "email contactNumber name")
//     // .populate("classes", "name")
//     // .populate("sections", "name");

//     if (!response || response.length === 0) {
//       return res.status(404).json({ data: [], message: "No student found", status: false });
//     }

//     if (response.length === 1) {
//       return res.status(200).json({ data: response[0], message: "Student found successfully", status: true });
//     }

//     res.status(200).json({
//       data: response,
//       message: "Multiple students found successfully",
//       status: true,
//     });
//   } catch (error) {
//     console.error("Error fetching student details:", error);
//     res.status(500).json({ message: "Server error while fetching student details", status: false });
//   }
// };

// const getAllStudentsList = async (req, res) => {
//   try {
//     const students = await Student.find({ schoolId: req.user.schoolId })
//       .populate("userId", "name email avatar contactNumber status")
//       .populate("classes", "name")
//       .populate("sections", "name");

//     if (!students || students.length === 0) {
//       return res.status(200).json({ data: [], message: "No student found", status: false });
//     }

//     const formattedStudents = students.map((student) => ({
//       studentId: student.studentId,
//       name: student.name,
//       email: student.userId?.email || null,
//       contactNumber: student.contactNumber || student.userId?.contactNumber || null,
//       parentName: student.parentName,
//       parentContactNumber: student.parentContactNumber,
//       avatar: student.userId?.avatar || null,
//       status: student.status,
//       gender: student.gender,
//       className: student.classes?.name || null,
//       sectionName: student.sections?.name || null,
//     }));

//     res.status(200).json({
//       data: formattedStudents,
//       message: `${students.length} student(s) found successfully`,
//       status: true,
//     });
//   } catch (err) {
//     console.error("Get All Students Error:", err);
//     res.status(500).json({
//       message: "Server error while fetching student details",
//       status: false,
//     });
//   }
// };
// const getProfileCardData = async (req, res) => {
//   try {
//     const { key, value } = req.body.searchBy;
//     const studentProfileData = await Student.findOne({ [key]: value })
//       .populate("userId", "name email avatar contactNumber status")
//       .populate("classes", "name")
//       .populate("sections", "name");

//     if (!studentProfileData) {
//       return res.status(404).json({ message: "Student not found", status: false });
//     }

//     const formattedStudent = {
//       _id: studentProfileData._id,
//       id: studentProfileData.studentId,
//       name: studentProfileData.name,
//       email: studentProfileData.userId?.email || null,
//       contactNumber:
//         studentProfileData.contactNumber ||
//         studentProfileData.userId?.contactNumber ||
//         null,
//       parentName: studentProfileData.parentName,
//       parentContactNumber: studentProfileData.parentContactNumber,
//       avatar: studentProfileData.userId?.avatar || null,
//       className: studentProfileData.classes?.name || null,
//       sectionName: studentProfileData.sections?.name || null,
//       gender: studentProfileData.gender,
//       status: studentProfileData.status,
//     };

//     res.status(200).json({ status: true, data: formattedStudent });
//   } catch (err) {
//     console.error("Get Profile Card Error:", err);
//     res.status(500).json({
//       message: "Server error while fetching student profile data",
//       status: false,
//     });
//   }
// };

// const deleteStudent = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { id } = req.body;
//     const student = await Student.findById(id).session(session);

//     if (!student) {
//       await session.abortTransaction();
//       return res.status(404).json({ message: "Student not found", status: false });
//     }

//     // Delete student
//     await Student.findByIdAndDelete(id).session(session);
//     await User.findByIdAndDelete(student.userId).session(session);

//     // Delete parent(s) linked to this student
//     const parentDocs = await Parent.find({ children: student._id }).session(session);
//     for (let parent of parentDocs) {
//       await Parent.findByIdAndDelete(parent._id).session(session);
//       await User.findByIdAndDelete(parent.userId).session(session);
//       await syncReferences({ action: "remove", targetModel: "Parent", targetId: parent._id, session });
//     }

//     await syncReferences({ action: "remove", targetModel: "Student", targetId: student._id, session });

//     await session.commitTransaction();

//     res.status(200).json({ message: "Student and linked parent(s) deleted successfully", status: true });
//   } catch (err) {
//     await session.abortTransaction();
//     console.error("Delete Student Error:", err);
//     res.status(500).json({ message: "Server error while deleting student", status: false });
//   } finally {
//     session.endSession();
//   }
// };

// module.exports = {
//   save,
//   getStudentDetails,
//   getAllStudentsList,
//   getProfileCardData,
//   deleteStudent,
// };


// const { default: mongoose } = require("mongoose");
// const User = require("../models/AuthSchema");
// const Student = require("../models/Student");
// const Parent = require("../models/Parent");
// const { syncReferences } = require("../utils/Sync");

// const save = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const {
//       name,
//       studentEmail,
//       dateOfBirth,
//       gender,
//       classes,
//       sections,
//       enrollmentDate,
//       contactNumber,
//       previousSchool,
//       isActive,
//       photo,
//       address,

//       parentPhoto,
//       parentName,
//       parentDOB,
//       parentEmail,
//       parentContactNumber,
//       relation,
//       alternativeEmail,
//       alternativeContactNumber,
//       parentOccupation,
//       isParentActive
//     } = req.body;

//     const { schoolId } = req.user || {};

//     if (!name || !studentEmail || !dateOfBirth || !schoolId || !classes || !sections || !parentName || !parentContactNumber) {
//       await session.abortTransaction();
//       return res.status(400).json({ message: "Required fields missing", status: false });
//     }


//     //is this necessary? i changes the model same as teacher so it no longer neeeded
//     const allowedGenders = ["Male", "Female", "Other"];
//     if (!allowedGenders.includes(gender)) {
//       await session.abortTransaction();
//       return res.status(400).json({ message: `Invalid gender. Allowed: ${allowedGenders.join(", ")}`, status: false });
//     }



//     const dobObj = new Date(dateOfBirth);
//     if (isNaN(dobObj.getTime())) throw new Error("Invalid dateOfBirth format");
//     //  const dobStr = new Date(dateOfBirth).toISOString().split("T")[0].replace(/-/g, ""); do this as it in teacher and teacher working fine with new dtae fields i checked it

//     // studentEmail is not necesaay fileds so give it a defualt email like studentName+YYYY+parentNo.last 5 digit  a custom we will create by defualt wo hi rahega 
//     let studentUser = await User.findOne({ email: studentEmail }).session(session);
//     if (!studentUser) {
//       const dobStr = dobObj.toISOString().split("T")[0].replace(/-/g, "");
//       const password = `${name.split(" ")[0]}@${dobStr}`;
//       studentUser = new User({
//         name,
//         dateOfBirth: dobObj,
//         email: studentEmail,
//         password,
//         schoolId,
//         role: "student",
//         avatar: photo,
//         isActive: isActive
//       });
//       await studentUser.save({ session });
//     }


//     let student = await Student.findOne({ userId: studentUser._id, schoolId }).session(session);
//     const studentData = {
//       userId: studentUser._id,
//       name,
//       studentEmail,
//       dateOfBirth: dobObj,
//       gender,
//       classes,
//       sections,
//       contactNumber,
//       address,
//       previousSchool,
//       photo,
//       schoolId,
//       enrollmentDate: enrollmentDate || new Date(),
//       // parent id
//       isActive: isActive || "Active",
//     };

//     if (student) {
//       Object.assign(student, studentData);
//       await student.save({ session });
//     } else {
//       student = new Student({
//         ...studentData,
//         studentId: `STU-${Date.now()}`,
//       });
//       await student.save({ session });
//     }
//     await syncReferences({ action: "save", targetModel: "Student", targetId: student._id, session });

//     // use name + mobile 5 didgit and dob instead of this custom
//     const parentUserEmail = parentEmail || `parent_${Date.now()}@school.com`;
//     let parentUser = await User.findOne({ email: parentUserEmail }).session(session);

//     if (!parentUser) {
//       const password = `${parentName.split(" ")[0]}@${new Date(parentDOB)}`; //it should be name@YYYYMMDD
//       parentUser = new User({
//         name: parentName,
//         dateOfBirth: new Date(parentDOB || Date.now()),
//         email: parentUserEmail,
//         password,
//         role: "parent",
//         schoolId,
//         avatar: parentPhoto,
//         isActive: isParentActive,
//       });
//       await parentUser.save({ session });
//     }

//     let parentDoc = await Parent.findOne({ userId: parentUser._id, schoolId }).session(session);
//     if (!parentDoc) {
//       parentDoc = new Parent({
//         userId: parentUser._id,
//         parentId: `PARENT-${Date.now()}`,
//         name: parentName,
//         photo: parentPhoto,
//         schoolId,
//         occupation: parentOccupation || "N/A",
//         emergencyContact: parentContactNumber,
//         email: parentEmail,
//         alternativeEmail,
//         alternativeContactNumber,
//         relation: relation,
//         children: [student._id],
//         isActive: isParentActive
//       });
//       await parentDoc.save({ session });
//     }

//     await syncReferences({ action: "save", targetModel: "Parent", targetId: parentDoc._id, session });

//     await session.commitTransaction();

//     res.status(201).json({
//       message: "Student and Parent added/updated successfully",
//       data: { student },
//       status: true,
//     });
//   } catch (err) {
//     await session.abortTransaction();
//     console.error("Save Student Error:", err.stack || err);
//     res.status(500).json({ message: err.message || "Server error during student add/update", status: false });
//   } finally {
//     session.endSession();
//   }
// };

// const getStudentDetails = async (req, res) => {
//   const { id, studentId, name = "" } = req.body;

//   if (![id, studentId, name].some(Boolean)) {
//     return res.status(400).json({ message: "At least one search field is required", status: false });
//   }

//   const searchFields = {};
//   if (id && mongoose.Types.ObjectId.isValid(id)) searchFields._id = id;
//   if (studentId) searchFields.studentId = studentId;
//   if (name) searchFields.name = { $regex: name, $options: "i" };

//   // add email and contact no. too like in teacher
//   try {
//     const response = await Student.find(searchFields)
//       .populate("userId", "email contactNumber name")
//       .populate("classes", "name")
//       .populate("sections", "name");

//     if (!response || response.length === 0) {
//       return res.status(404).json({ data: [], message: "No student found", status: false });
//     }

//     res.status(200).json({
//       data: response.length === 1 ? response[0] : response,
//       message: response.length === 1 ? "Student found successfully" : "Multiple students found successfully",
//       status: true,
//     });
//   } catch (error) {
//     console.error("Error fetching student details:", error);
//     res.status(500).json({ message: "Server error while fetching student details", status: false });
//   }
// };

// const getAllStudentsList = async (req, res) => {
//   try {
//     const students = await Student.find({ schoolId: req.user.schoolId })
//       .populate("userId", "name email avatar contactNumber isActive")
//       .populate("classes", "name")//i thiki these two are not needed as it will give me classses {id: name:} but we accpet only id so try it once then remove it after checking
//       .populate("sections", "name");

//     if (!students || students.length === 0) {
//       return res.status(200).json({ data: [], message: "No student found", status: false });
//     }

//     const formattedStudents = students.map((student) => ({
//       studentId: student.studentId,
//       name: student.name,
//       email: student.studentEmail,
//       contactNumber: student.contactNumber || student.userId?.contactNumber || null,
//       avatar: student.userId?.avatar || null,
//       isActive: student.isActive,
//       gender: student.gender,
//       className: student.classes?.name || null,
//       sectionName: student.sections?.name || null,
//     }));

//     res.status(200).json({ data: formattedStudents, message: `${students.length} student(s) found successfully`, status: true });
//   } catch (err) {
//     console.error("Get All Students Error:", err);
//     res.status(500).json({ message: "Server error while fetching student details", status: false });
//   }
// };

// const getProfileCardData = async (req, res) => {
//   try {
//     const { key, value } = req.body.searchBy;
//     const student = await Student.findOne({ [key]: value })
//       .populate("userId", "name email avatar contactNumber status")
//       .populate("classes", "name")
//       .populate("sections", "name");

//     if (!student) return res.status(404).json({ message: "Student not found", status: false });

//     const formattedStudent = {
//       _id: student._id,
//       id: student.studentId,
//       name: student.name,
//       email: student.studentEmail,
//       contactNumber: student.contactNumber || student.userId?.contactNumber || null,
//       avatar: student.userId?.avatar || null,
//       className: student.classes?.name || null,
//       sectionName: student.sections?.name || null,
//       gender: student.gender,
//       status: student.status,
//     };
//     // add attendance and feestatus in future
//     res.status(200).json({ status: true, data: formattedStudent });
//   } catch (err) {
//     console.error("Get Profile Card Error:", err);
//     res.status(500).json({ message: "Server error while fetching student profile data", status: false });
//   }
// };

// const deleteStudent = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { id } = req.body;
//     const student = await Student.findById(id).session(session);

//     if (!student) {
//       await session.abortTransaction();
//       return res.status(404).json({ message: "Student not found", status: false });
//     }

//     const parent = await Parent.findOne({ children: student._id }).session(session);
//     if (parent) {
//       await Parent.findByIdAndDelete(parent._id).session(session);//dlete parent only if there is only one student
//       await User.findByIdAndDelete(parent.userId).session(session);
//     }

//     await Student.findByIdAndDelete(id).session(session);
//     await User.findByIdAndDelete(student.userId).session(session);
//     await syncReferences({ action: "remove", targetModel: "Student", targetId: student._id, session });

//     await session.commitTransaction();
//     res.status(200).json({ message: "Student and associated parent deleted successfully", status: true });
//   } catch (err) {
//     await session.abortTransaction();
//     console.error("Delete Student Error:", err);
//     res.status(500).json({ message: "Server error while deleting student", status: false });
//   } finally {
//     session.endSession();
//   }
// };

// module.exports = {
//   save,
//   getStudentDetails,
//   getAllStudentsList,
//   getProfileCardData,
//   deleteStudent,
// };

const { default: mongoose } = require("mongoose");
const User = require("../models/AuthSchema");
const Student = require("../models/Student");
const Parent = require("../models/Parent");
const { syncReferences } = require("../utils/Sync");

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


    const defaultEmail = studentEmail
      ? studentEmail
      : `${name.replace(/\s+/g, "").toLowerCase()}${dobObj.getFullYear()}${parentContactNumber.slice(-5)}@school.com`;


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
        isActive: isActive,
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
      parentId: `PRT-${Date.now()}`,
      enrollmentDate: enrollmentDate || new Date(),
      isActive: isActive || true,
    };

    if (student) {
      Object.assign(student, studentData);
      await student.save({ session });
    } else {
      student = new Student({
        ...studentData,
        studentId: `STU-${Date.now()}`,
      });
      await student.save({ session });
    }

    await syncReferences({ action: "save", targetModel: "Student", targetId: student._id, session });

  
    const parentUserEmail =
      parentEmail || `${parentName.replace(/\s+/g, "").toLowerCase()}${parentContactNumber.slice(-5)}@school.com`;
    let parentUser = await User.findOne({ email: parentUserEmail }).session(session);

    if (!parentUser) {
      const dobStr = new Date(parentDOB).toISOString().split("T")[0].replace(/-/g, "");
      const password = `${parentName.split(" ")[0]}@${dobStr}`;
      parentUser = new User({
        name: parentName,
        dateOfBirth: new Date(parentDOB || Date.now()),
        email: parentUserEmail,
        password,
        role: "parent",
        schoolId,
        avatar: parentPhoto,
        isActive: isParentActive,
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
        email: parentEmail,
        alternativeEmail,
        alternativeContactNumber,
        relation,
        children: [student._id],
        isActive: isParentActive,
      });
      await parentDoc.save({ session });
    }

    await syncReferences({ action: "save", targetModel: "Parent", targetId: parentDoc._id, session });

    await session.commitTransaction();

    res.status(201).json({
      message: "Student and Parent added/updated successfully",
      data: { student },
      status: true,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error("Save Student Error:", err.stack || err);
    res.status(500).json({ message: err.message || "Server error during student add/update", status: false });
  } finally {
    session.endSession();
  }
};


const getStudentDetails = async (req, res) => {
  const { id, studentId, name = "", email = "", contactNumber = "" } = req.body;

  if (![id, studentId, name, email, contactNumber].some(Boolean)) {
    return res.status(400).json({ message: "At least one search field is required", status: false });
  }

  const searchFields = {};
  if (id && mongoose.Types.ObjectId.isValid(id)) searchFields._id = id;
  if (studentId) searchFields.studentId = studentId;
  if (name) searchFields.name = { $regex: name, $options: "i" };
  if (email) searchFields.studentEmail = { $regex: email, $options: "i" };
  if (contactNumber) searchFields.contactNumber = { $regex: contactNumber, $options: "i" };

  try {
    const response = await Student.find(searchFields)
      .populate("userId", "email contactNumber name")
      .populate("classes", "name")
      .populate("sections", "name");

    if (!response || response.length === 0) {
      return res.status(404).json({ data: [], message: "No student found", status: false });
    }

    res.status(200).json({
      data: response.length === 1 ? response[0] : response,
      message: response.length === 1 ? "Student found successfully" : "Multiple students found successfully",
      status: true,
    });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ message: "Server error while fetching student details", status: false });
  }
};


const getAllStudentsList = async (req, res) => {
  try {
    const students = await Student.find({ schoolId: req.user.schoolId })
      .populate("userId", "name email avatar contactNumber isActive")
      .populate("classes", "name")
      .populate("sections", "name");

    if (!students || students.length === 0) {
      return res.status(200).json({ data: [], message: "No student found", status: false });
    }

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
