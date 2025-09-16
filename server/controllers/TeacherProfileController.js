const User = require("../models/AuthSchema");
const TeacherProfile = require("../models/TeacherProfile");


const addOrUpdateTeacher = async (req, res) => {
  try {
    const {
      fullName,
      dob,
      gender,
      phone,
      email,
      address,
      subjects,
      classesAssigned,
      joiningDate,
      qualification,
      experienceYears,
      emergencyContact,
    } = req.body;

    if (!email || !fullName || !dob) {
      return res.status(400).json({
        message: "Full Name, DOB and Email are required",
        status: false,
      });
    }


    let user = await User.findOne({ email });

    if (!user) {
      
      const dobString = new Date(dob).toISOString().split("T")[0].replace(/-/g, "");
      const password = `${fullName.split(" ")[0]}@${dobString}`;

      user = new User({
        fullName,
        dob,
        email,
        password, 
        role: "teacher",
      });

      await user.save();
    }

    
    let teacher = await TeacherProfile.findOne({ userId: user._id });

    if (teacher) {
      teacher.fullName = fullName;
      teacher.dateOfBirth = dob;
      teacher.gender = gender;
      teacher.phone = phone;
      teacher.email = email;
      teacher.address = address;
      teacher.subjects = subjects;
      teacher.classesAssigned = classesAssigned;
      teacher.joiningDate = joiningDate;
      teacher.qualification = qualification;
      teacher.experienceYears = experienceYears;
      teacher.emergencyContact = emergencyContact;

      await teacher.save();

      return res.status(200).json({
        message: "Teacher updated successfully",
        data: teacher,
        status: true,
      });
    }

    
    const newTeacher = new TeacherProfile({
      userId: user._id,
      fullName,
      dateOfBirth: dob,
      gender,
      phone,
      email,
      address,
      teacherId: `TEACH-${Date.now()}`,
      subjects,
      classesAssigned,
      joiningDate,
      qualification,
      experienceYears,
      emergencyContact,
    });

    await newTeacher.save();

    res.status(201).json({
      message: "Teacher added successfully",
      data: newTeacher,
      status: true,
    });
  } catch (err) {
    console.error("Teacher Add/Update Error:", err);
    res.status(500).json({
      message: "Server error during teacher add/update",
      status: false,
    });
  }
};


const getTeacherDetails = async (req, res) => {
  const { fullName = "", email = "", phone = "" } = req.body;

  if (![fullName, email, phone].some(Boolean)) {
    return res.status(400).json({
      message: "At least one search field is required",
      status: false,
    });
  }

  const searchFields = {};
  if (fullName) searchFields.fullName = { $regex: fullName, $options: "i" };
  if (email) searchFields.email = { $regex: email, $options: "i" };
  if (phone) searchFields.phone = { $regex: phone, $options: "i" };

  try {
    const response = await TeacherProfile.find(searchFields).populate("userId");

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


const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await TeacherProfile.findByIdAndDelete(id);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
        status: false,
      });
    }

    await User.findByIdAndDelete(teacher.userId);

    res.status(200).json({
      message: "Teacher deleted successfully",
      status: true,
    });
  } catch (err) {
    console.error("Delete teacher error:", err);
    res.status(500).json({
      message: "Server error while deleting teacher",
      status: false,
    });
  }
};

module.exports = { addOrUpdateTeacher, getTeacherDetails, deleteTeacher };
