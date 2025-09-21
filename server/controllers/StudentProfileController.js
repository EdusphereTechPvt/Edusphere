const User = require("../models/AuthSchema");
const StudentProfile = require("../models/StudentProfile");
const bcrypt = require("bcrypt");


const addOrUpdateStudent = async (req, res) => {
  try {
    const {
      fullName,
      dob,
      email,
      phone,
      address,
      grade,
      section,
      enrollmentDate,
      previousSchool,
      guardianName,
      relationshipToStudent,
      guardianContact,
      allergies,
      medicalConditions,
      emergencyContacts
    } = req.body;

    if (!fullName || !dob || !email || !grade || !section) {
      return res.status(400).json({
        message: "Full name, DOB, Email, Grade, and Section are required",
        status: false
      });
    }


    let user = await User.findOne({ email });

    if (!user) {
      
      const dobString = new Date(dob).toISOString().split("T")[0].replace(/-/g, "");
      const passwordPlain = `${fullName.split(" ")[0]}@${dobString}`;
      const hashedPassword = await bcrypt.hash(passwordPlain, 10);

      user = new User({
        fullName,
        dob,
        email,
        phone,
        address,
        password: hashedPassword,
        role: "student",
        avatar: "",
        isActive: true
      });
      await user.save();
    } else {
    
      user.fullName = fullName || user.fullName;
      user.dob = dob || user.dob;
      user.phone = phone || user.phone;
      user.address = address || user.address;
      await user.save();
    }

    
    let studentProfile = await StudentProfile.findOne({ userId: user._id });

    if (!studentProfile) {
      
      studentProfile = new StudentProfile({
        userId: user._id,
        studentId: user.uid,
        grade,
        section,
        enrollmentDate,
        previousSchool,
        guardianName,
        relationshipToStudent,
        guardianContact,
        allergies,
        medicalConditions,
        emergencyContacts
      });
      await studentProfile.save();
    } else {
      
      studentProfile.grade = grade || studentProfile.grade;
      studentProfile.section = section || studentProfile.section;
      studentProfile.enrollmentDate = enrollmentDate || studentProfile.enrollmentDate;
      studentProfile.previousSchool = previousSchool || studentProfile.previousSchool;
      studentProfile.guardianName = guardianName || studentProfile.guardianName;
      studentProfile.relationshipToStudent = relationshipToStudent || studentProfile.relationshipToStudent;
      studentProfile.guardianContact = guardianContact || studentProfile.guardianContact;
      studentProfile.allergies = allergies || studentProfile.allergies;
      studentProfile.medicalConditions = medicalConditions || studentProfile.medicalConditions;
      studentProfile.emergencyContacts = emergencyContacts || studentProfile.emergencyContacts;

      await studentProfile.save();
    }

    res.status(200).json({
      message: studentProfile.isNew ? "Student added successfully" : "Student updated successfully",
      data: { user, profile: studentProfile },
      status: true
    });
  } catch (err) {
    console.error("Add/Update Student Error:", err);
    res.status(500).json({
      message: "Server error during add/update student",
      status: false
    });
  }
};

const getStudentDetails = async (req, res) => {
  const { fullName = "", email = "", grade = "", section = "" } = req.body;

  if (![fullName, email, grade, section].some(Boolean)) {
    return res.status(400).json({
      message: "At least one search field is required",
      status: false
    });
  }

  try {
    const query = {};
    if (grade) query.grade = { $regex: grade, $options: "i" };
    if (section) query.section = { $regex: section, $options: "i" };

    let students = await StudentProfile.find(query).populate("userId");

    if (fullName || email) {
      students = students.filter(s =>
        (fullName && s.userId.fullName.toLowerCase().includes(fullName.toLowerCase())) ||
        (email && s.userId.email.toLowerCase().includes(email.toLowerCase()))
      );
    }

    if (students.length === 0) {
      return res.status(404).json({
        data: [],
        message: "No student found",
        status: false
      });
    }

    res.status(200).json({
      data: students,
      message: `${students.length} student(s) found successfully`,
      status: true
    });
  } catch (err) {
    console.error("Get Student Error:", err);
    res.status(500).json({
      message: "Server error while fetching student details",
      status: false
    });
  }
};


const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const studentProfile = await StudentProfile.findById(id);
    if (!studentProfile) {
      return res.status(404).json({
        message: "Student profile not found",
        status: false
      });
    }

    await User.findByIdAndDelete(studentProfile.userId);
    await StudentProfile.findByIdAndDelete(id);

    res.status(200).json({
      message: "Student deleted successfully",
      status: true
    });
  } catch (err) {
    console.error("Delete Student Error:", err);
    res.status(500).json({
      message: "Server error while deleting student",
      status: false
    });
  }
};

module.exports = { addOrUpdateStudent, getStudentDetails, deleteStudent };
