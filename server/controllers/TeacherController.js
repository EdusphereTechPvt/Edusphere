const { default: mongoose } = require("mongoose");
const User = require("../models/AuthSchema");
const Teacher = require("../models/Teacher");


const save = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      _id,
      name,
      phone,
      email,
      address,
      dateOfBirth,
      gender,
      qualification,
      experienceYears,
      classes,
      sections,
      subjects,
      isActive,
      joiningDate,
      emergencyContactName,
      emergencyContactRelation,
      emergencyContactPhone
    } = req.body;

    const { schoolId } = req.user;

    if (!name || !email || !dateOfBirth || !schoolId) {
      return res.status(400).json({ message: "Full Name, Date of Birth, Email and School ID are required", status: false });
    }

    let user = await User.findOne({ email }).session(session);

    if (user && !_id && user.role !== "teacher") {
      return res.status(403).json({ message: "Email already exists with different role", status: false });
    }

    if (!user) {
      const dateOfBirthString = new Date(dateOfBirth).toISOString().split("T")[0].replace(/-/g, "");
      const password = `${name.split(" ")[0]}@${dateOfBirthString}`;
      user = new User({ name, dateOfBirth: dateOfBirth, email, password, role: "teacher" });
      await user.save({ session });
    }

    let teacher = await Teacher.findOne({ userId: user._id, schoolId }).session(session);

    if (teacher) {
      const emailConflict = await Teacher.findOne({ email, _id: { $ne: teacher._id } }).session(session);
      if (emailConflict) {
        return res.status(403).json({ message: "Email already exists for another teacher", status: false });
      }
      Object.assign(teacher, { name, dateOfBirth, gender, phone, email, address, subjects, classes, sections, joiningDate, qualification, experienceYears, emergencyContactName, emergencyContactRelation, emergencyContactPhone, isActive });
      await teacher.save({ session });
      await session.commitTransaction();
      return res.status(200).json({ message: "Teacher updated successfully", data: teacher, status: true });
    }

    const newTeacher = new Teacher({
      userId: user._id,
      schoolId,
      name,
      dateOfBirth,
      gender,
      phone,
      email,
      address,
      subjects,
      classes,
      sections,
      joiningDate,
      qualification,
      experienceYears,
      emergencyContactName,
      emergencyContactRelation,
      emergencyContactPhone,
      isActive,
      teacherId: `TEACH-${Date.now()}`
    });

    await newTeacher.save({ session });
    await session.commitTransaction();

    res.status(201).json({ message: "Teacher added successfully", data: newTeacher, status: true });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ message: "Server error during teacher add/update", status: false });
  } finally {
    session.endSession();
  }
};

const getTeacherDetails = async (req, res) => {
  const { id, teacherId, name = "", email = "", phone = "" } = req.body;

  // ensure at least one search field is provided
  if (![id, teacherId, name, email, phone].some(Boolean)) {
    return res.status(400).json({
      message: "At least one search field is required",
      status: false,
    });
  }

  const searchFields = {};

  if (id && mongoose.Types.ObjectId.isValid(id)) {
    searchFields._id = id;
  }
  if (teacherId) {
    searchFields.teacherId = teacherId;
  }
  if (name) {
    searchFields.name = { $regex: name, $options: "i" };
  }
  if (email) {
    searchFields.email = { $regex: email, $options: "i" };
  }
  if (phone) {
    searchFields.phone = { $regex: phone, $options: "i" };
  }

  try {
    const response = await Teacher.find(searchFields);

    if (response.length === 0) {
      return res.status(404).json({
        data: [],
        message: "No teacher found",
        status: false,
      });
    } else if (response.length === 1) {
      return res.status(200).json({
        data: response[0],
        message: "Teacher found successfully",
        status: true,
      });
    }

    return res.status(200).json({
      data: response,
      message: "Multiple teachers found successfully",
      status: true,
    });
  } catch (error) {
    console.error("Error fetching teacher details:", error);
    return res.status(500).json({
      message: "Server error while fetching teacher details",
      status: false,
    });
  }
};

const getAllTeachersList = async (req, res) => {
  try {
    const teachers = await Teacher.find({ schoolId: req.user.schoolId })
      .populate("userId", "name email dateOfBirth role avatar isActive"); 

    if (!teachers || teachers.length === 0) {
      return res.status(404).json({
        data: [],
        message: "No teacher found",
        status: false,
      });
    }

     const formattedteachers = teachers.map((teacher) => ({
      teacherId: teacher.teacherId,
      name: teacher.userId?.name,
      email: teacher.userId?.email,
      phone: teacher.phone,
      dateOfBirth: teacher.userId?.dateOfBirth,
      role: teacher.userId?.role,
      avatar: teacher.userId?.avatar,
      isActive: teacher.userId?.isActive,
      gender: teacher.gender,
      status: teacher.isActive,
    }));

    res.status(200).json({
      data: formattedteachers,
      message: `${teachers.length} teacher(s) found successfully`,
      status: true,
    });
  } catch (err) {
    console.error("Get All teachers Error:", err);
    res.status(500).json({
      message: "Server error while fetching teacher details",
      status: false,
    });
  }
};

const getProfileCardData = async(req,res) => {
  try{

    let keyName = req.body.searchBy.key;
    let keyValue = req.body.searchBy.value

    console.log(keyName, keyValue)

    let teacherProfileData = await Teacher.findOne({ [keyName]:keyValue })
      .populate("userId", "name email dateOfBirth role avatar isActive"); 

      const formattedTeachers = {
        _id: teacherProfileData._id,
      id: teacherProfileData.teacherId,
      name: teacherProfileData.name,
      avatar: teacherProfileData.userId?.avatar,
      qualification: teacherProfileData.qualification,
      address: teacherProfileData.address
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


const deleteTeacher = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction()
  try {
    const { id } = req.body;
    const teacher = await Teacher.findByIdAndDelete(id).session(session);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
        status: false,
      });
    }

    await User.findByIdAndDelete(teacher.userId).session(session);

    session.commitTransaction()

    res.status(200).json({
      message: "Teacher deleted successfully",
      status: true,
    });
  } catch (err) {
    session.abortTransaction()
    console.error("Delete teacher error:", err);
    res.status(500).json({
      message: "Server error while deleting teacher",
      status: false,
    });
  }
};

module.exports = { save, getTeacherDetails, deleteTeacher,getAllTeachersList,getProfileCardData };
