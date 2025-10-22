// const User = require("../models/AuthSchema");
// const Student = require("../models/Student");
// const bcrypt = require("bcrypt");


// const addOrUpdateStudent = async (req, res) => {
//   const session = await mongoose.startSession();
//     session.startTransaction();
//   try {
//     const {
//       name,
//       dateOfBirth,
//       email,
//       phone,
//       address,
//       status,
//       gender,
//       grade,
//       section,
//       schoolId,
//       enrollmentDate,
//       previousSchool,
//       guardianName,
//       relationshipToStudent,
//       guardianContact,
//       allergies,
//       medicalConditions,
//       emergencyContacts
//     } = req.body;

//     if (!name || !dateOfBirth || !email || !grade || !section || !schoolId || !status || !gender) {
//       return res.status(400).json({
//         message: "Full name, dateOfBirth, Email, Grade, Section or School ID is required",
//         status: false
//       });
//     }


//     let user = await User.findOne({ email }).session(session);

//     if (!user) {
      
//       const dateOfBirthString = new Date(dateOfBirth).toISOString().split("T")[0].replace(/-/g, "");
//       const passwordPlain = `${name.split(" ")[0]}@${dateOfBirthString}`;
//       const hashedPassword = await bcrypt.hash(passwordPlain, 10);

//       user = new User({
//         name,
//         dateOfBirth,
//         email,
//         phone,
//         address,
//         password: hashedPassword,
//         role: "student",
//         avatar: "",
//         isActive: true
//       });
//       await user.save({session});
//     } else {
    
//       user.name = name || user.name;
//       user.dateOfBirth = dateOfBirth || user.dateOfBirth;
//       user.phone = phone || user.phone;
//       user.address = address || user.address;
//       await user.save({session});
//     }

    
//     let studentProfile = await Student.findOne({ userId: user._id }).session(session);

//     if (!studentProfile) {
      
//       studentProfile = new Student({
//         userId: user._id,
//         studentId: user.uid,
//         grade,
//         status,
//         gender,
//         section,
//         enrollmentDate,
//         schoolId,
//         previousSchool,
//         guardianName,
//         relationshipToStudent,
//         guardianContact,
//         allergies,
//         medicalConditions,
//         emergencyContacts
//       });
//       await studentProfile.save({session});
//     } else {
      
//       studentProfile.grade = grade || studentProfile.grade;
//       studentProfile.section = section || studentProfile.section;
//       studentProfile.enrollmentDate = enrollmentDate || studentProfile.enrollmentDate;
//       studentProfile.previousSchool = previousSchool || studentProfile.previousSchool;
//       studentProfile.guardianName = guardianName || studentProfile.guardianName;
//       studentProfile.relationshipToStudent = relationshipToStudent || studentProfile.relationshipToStudent;
//       studentProfile.guardianContact = guardianContact || studentProfile.guardianContact;
//       studentProfile.allergies = allergies || studentProfile.allergies;
//       studentProfile.medicalConditions = medicalConditions || studentProfile.medicalConditions;
//       studentProfile.emergencyContacts = emergencyContacts || studentProfile.emergencyContacts;
//       studentProfile.gender = gender || studentProfile.gender;
//       studentProfile.status = status || studentProfile.status;

//       await studentProfile.save({session});
//     }

//     res.status(200).json({
//       message: studentProfile.isNew ? "Student added successfully" : "Student updated successfully",
//       data: { user, profile: studentProfile },
//       status: true
//     });
//   } catch (err) {
//     console.error("Add/Update Student Error:", err);
//     res.status(500).json({
//       message: "Server error during add/update student",
//       status: false
//     });
//   }
// };

// const getStudentDetails = async (req, res) => {
//   const { name = "", email = "", grade = "", section = "" } = req.body;

//   if (![name, email, grade, section].some(Boolean)) {
//     return res.status(400).json({
//       message: "At least one search field is required",
//       status: false
//     });
//   }

//   try {
//     const query = {};
//     if (grade) query.grade = { $regex: grade, $options: "i" };
//     if (section) query.section = { $regex: section, $options: "i" };

//     let students = await Student.find(query).populate("userId");
//     console.log(students)

//     if (name || email) {
//       students = students.filter(s =>
//         (name && s.userId.name.toLowerCase().includes(name.toLowerCase())) ||
//         (email && s.userId.email.toLowerCase().includes(email.toLowerCase()))
//       );
//     }

//     if (students.length === 0) {
//       return res.status(404).json({
//         data: [],
//         message: "No student found",
//         status: false
//       });
//     }

//     res.status(200).json({
//       data: students,
//       message: `${students.length} student(s) found successfully`,
//       status: true
//     });
//   } catch (err) {
//     console.error("Get Student Error:", err);
//     res.status(500).json({
//       message: "Server error while fetching student details",
//       status: false
//     });
//   }
// };

// const getAllStudentsList = async (req, res) => {
//   try {

//     console.log(req.user)
//     const students = await Student.find({ schoolId: req.user.schoolId })
//       .populate("userId", "name email dateOfBirth role avatar isActive"); 

//       console.log(students)
//     if (!students || students.length === 0) {
//       return res.status(404).json({
//         data: [],
//         message: "No student found",
//         status: false,
//       });
//     }

//      const formattedStudents = students.map((student) => ({
//       studentId: student.studentId,
//       name: student.userId?.name,
//       email: student.userId?.email,
//       dateOfBirth: student.userId?.dateOfBirth,
//       role: student.userId?.role,
//       avatar: student.userId?.avatar,
//       isActive: student.userId?.isActive,
//       gender: student.gender,
//       grade: student.grade,
//       section: student.section,
//       status: student.status,
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

// const getProfileCardData = async(req,res) => {
//   try{

//     let keyName = req.body.key;
//     let keyValue = req.body.value

//     let studentProfileData = await Student.findOne({ keyName:keyValue })
//       .populate("userId", "name email dateOfBirth role avatar isActive"); 

//       const formattedStudents = {
//       id: studentProfileData.studentId,
//       name: studentProfileData.userId?.name,
//       avatar: studentProfileData.userId?.avatar,
//       grade: studentProfileData.grade,
//       section: studentProfileData.section
//     };

//       res.status(200).json({
//         status: true,
//         data: formattedStudents
//       })
//   }
//   catch (err) {
//     console.error("Get Student Error:", err);
//     res.status(500).json({
//       message: "Server error while fetching student details",
//       status: false
//     });
//   }
// }


// const deleteStudent = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const studentProfile = await StudentProfile.findById(id);
//     if (!studentProfile) {
//       return res.status(404).json({
//         message: "Student profile not found",
//         status: false
//       });
//     }

//     await User.findByIdAndDelete(studentProfile.userId);
//     await Student.findByIdAndDelete(id);

//     res.status(200).json({
//       message: "Student deleted successfully",
//       status: true
//     });
//   } catch (err) {
//     console.error("Delete Student Error:", err);
//     res.status(500).json({
//       message: "Server error while deleting student",
//       status: false
//     });
//   }
// };

// module.exports = { addOrUpdateStudent, getStudentDetails, deleteStudent, getAllStudentsList, getProfileCardData };
const { default: mongoose } = require("mongoose");
const User = require("../models/AuthSchema");
const Student = require("../models/Student");
// const School = require("../models/SchoolSchema");
const { sendEmail } = require("../utils/Email");
const { signupTemplate } = require("../utils/templates/EmailTemplates");
const { syncReferences } = require("../utils/Sync");

const save = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      _id,
      name,
      dateOfBirth,
      gender,
      classId,
      sectionId,
      parentName,
      guardianName,
      parentEmail,
      parentContactNumber,
      occupation,
      motherName,
      studentContactNumber,
      address,
      studentPhoto,
      isActive,
    } = req.body;

    const { schoolId } = req.user;

    if (!name || !dateOfBirth || !schoolId || !classId || !sectionId || !parentName || !parentEmail || !parentContactNumber) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Required fields missing",
        status: false,
      });
    }

    
    let user = await User.findOne({ email: parentEmail }).session(session);
    if (!user) {
      const dobStr = new Date(dateOfBirth).toISOString().split("T")[0].replace(/-/g, "");
      const password = `${name.split(" ")[0]}@${dobStr}`;
      user = new User({ name, dateOfBirth, schoolId, email: parentEmail, password, role: "student" });
      await user.save({ session });
    }

    let student = await Student.findOne({ userId: user._id, schoolId }).session(session);

    if (student) {
      Object.assign(student, {
        name,
        dateOfBirth,
        gender,
        classId,
        sectionId,
        parentName,
        guardianName,
        parentEmail,
        parentContactNumber,
        occupation,
        motherName,
        studentContactNumber,
        address,
        studentPhoto,
        isActive,
      });

      await student.save({ session });

      await syncReferences({ action: "save", targetModel: "Student", targetId: student._id, session });

      await session.commitTransaction();
      return res.status(200).json({ message: "Student updated successfully", data: student, status: true });
    }

    const newStudent = new Student({
      userId: user._id,
      schoolId,
      name,
      dateOfBirth,
      gender,
      classId,
      sectionId,
      parentName,
      guardianName,
      parentEmail,
      parentContactNumber,
      occupation,
      motherName,
      studentContactNumber,
      address,
      studentPhoto,
      isActive,
      studentId: `STU-${Date.now()}`,
    });

    await newStudent.save({ session });
    await syncReferences({ action: "save", targetModel: "Student", targetId: newStudent._id, session });

    await session.commitTransaction();
    res.status(201).json({ message: "Student added successfully", data: newStudent, status: true });
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    res.status(500).json({ message: "Server error during student add/update", status: false });
  } finally {
    session.endSession();
  }
};

const getStudentDetails = async (req, res) => {
  const { id, studentId, name = "", parentEmail = "", parentContactNumber = "" } = req.body;

  if (![id, studentId, name, parentEmail, parentContactNumber].some(Boolean)) {
    return res.status(400).json({
      message: "At least one search field is required",
      status: false,
    });
  }

  const searchFields = {};
  if (id && mongoose.Types.ObjectId.isValid(id)) searchFields._id = id;
  if (studentId) searchFields.studentId = studentId;
  if (name) searchFields.name = { $regex: name, $options: "i" };
  if (parentEmail) searchFields.parentEmail = { $regex: parentEmail, $options: "i" };
  if (parentContactNumber) searchFields.parentContactNumber = { $regex: parentContactNumber, $options: "i" };

  try {
    const response = await Student.find(searchFields);

    if (response.length === 0) {
      return res.status(404).json({ data: [], message: "No student found", status: false });
    } else if (response.length === 1) {
      return res.status(200).json({ data: response[0], message: "Student found successfully", status: true });
    }

    return res.status(200).json({ data: response, message: "Multiple students found successfully", status: true });
  } catch (error) {
    console.error("Error fetching student details:", error);
    return res.status(500).json({ message: "Server error while fetching student details", status: false });
  }
};

const getAllStudentsList = async (req, res) => {
  try {
    const students = await Student.find({ schoolId: req.user.schoolId })
      .populate("userId", "name email dateOfBirth role avatar isActive");

    if (!students || students.length === 0) {
      return res.status(200).json({ data: [], message: "No student found", status: false });
    }

    const formattedStudents = students.map(student => ({
      studentId: student.studentId,
      name: student.userId?.name,
      parentEmail: student.parentEmail,
      parentContactNumber: student.parentContactNumber,
      dateOfBirth: student.userId?.dateOfBirth,
      role: student.userId?.role,
      avatar: student.userId?.avatar,
      isActive: student.userId?.isActive,
      gender: student.gender,
      classId: student.classId,
      sectionId: student.sectionId,
    }));

    res.status(200).json({
      data: formattedStudents,
      message: `${students.length} student(s) found successfully`,
      status: true,
    });
  } catch (err) {
    console.error("Get All students Error:", err);
    res.status(500).json({ message: "Server error while fetching student details", status: false });
  }
};

const getProfileCardData = async (req, res) => {
  try {
    const { key, value } = req.body.searchBy;

    const studentProfileData = await Student.findOne({ [key]: value })
      .populate("userId", "name email dateOfBirth role avatar isActive");

    if (!studentProfileData) {
      return res.status(404).json({ message: "Student not found", status: false });
    }

    const formattedStudent = {
      _id: studentProfileData._id,
      id: studentProfileData.studentId,
      name: studentProfileData.name,
      avatar: studentProfileData.userId?.avatar,
      classId: studentProfileData.classId,
      sectionId: studentProfileData.sectionId,
      parentName: studentProfileData.parentName,
      address: studentProfileData.address,
    };

    res.status(200).json({ status: true, data: formattedStudent });
  } catch (err) {
    console.error("Get Student Error:", err);
    res.status(500).json({ message: "Server error while fetching student details", status: false });
  }
};

const deleteStudent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.body;
    const student = await Student.findByIdAndDelete(id).session(session);

    if (!student) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Student not found", status: false });
    }

    await syncReferences({ action: "remove", targetModel: "Student", targetId: student._id, session });
    await User.findByIdAndDelete(student.userId).session(session);

    await session.commitTransaction();
    res.status(200).json({ message: "Student deleted successfully", status: true });
  } catch (err) {
    await session.abortTransaction();
    console.error("Delete student error:", err);
    res.status(500).json({ message: "Server error while deleting student", status: false });
  } finally {
    session.endSession();
  }
};

module.exports = { save, getStudentDetails, deleteStudent, getAllStudentsList, getProfileCardData };
