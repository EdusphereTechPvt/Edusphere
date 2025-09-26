const { default: mongoose } = require("mongoose");
const User = require("../models/AuthSchema");
const Teacher = require("../models/Teacher");


const addOrUpdateTeacher = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      schoolId,
      status,
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
      emergencyContactName,
      emergencyContactRelation,
      emergencyContactPhone
    } = req.body;

    if (!email || !fullName || !dob || !schoolId) {
      return res.status(400).json({
        message: "Full Name, DOB, Email and School ID are required",
        status: false,
      });
    }


    let user = await User.findOne({ email }).session(session);

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

      await user.save({session});
    }

    
    let teacher = await Teacher.findOne({ userId: user._id, schoolId }).session(session);

    if (teacher) {
      teacher.fullName = fullName;
      teacher.dateOfBirth = dob;
      teacher.status = status
      teacher.gender = gender;
      teacher.phone = phone;
      teacher.email = email;
      teacher.address = address;
      teacher.subjects = subjects;
      teacher.classesAssigned = classesAssigned;
      teacher.joiningDate = joiningDate;
      teacher.qualification = qualification;
      teacher.experienceYears = experienceYears;
      teacher.emergencyContactName = emergencyContactName;
      teacher.emergencyContactRelation = emergencyContactRelation;
      teacher.emergencyContactPhone = emergencyContactPhone;

      await teacher.save({session});

      return res.status(200).json({
        message: "Teacher updated successfully",
        data: teacher,
        status: true,
      });
    }

    
    const newTeacher = new Teacher({
      userId: user._id,
      schoolId,
      fullName,
      dateOfBirth: dob,
      gender,
      status,
      phone,
      email,
      address,
      teacherId: `TEACH-${Date.now()}`,
      subjects,
      classesAssigned,
      joiningDate,
      qualification,
      experienceYears,
      emergencyContactName,
      emergencyContactRelation,
      emergencyContactPhone
    });

    await newTeacher.save({session});

    await session.commitTransaction();

    res.status(201).json({
      message: "Teacher added successfully",
      data: newTeacher,
      status: true,
    });
  } catch (err) {
    await session.abortTransaction()
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
    const response = await Teacher.find(searchFields).populate("userId");

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
    console.log(req.user)
    const teachers = await Teacher.find({ schoolId: req.user.schoolId })
      .populate("userId", "fullName email dob role avatar isActive"); 

    if (!teachers || teachers.length === 0) {
      return res.status(404).json({
        data: [],
        message: "No teacher found",
        status: false,
      });
    }

     const formattedteachers = teachers.map((teacher) => ({
      teacherId: teacher.teacherId,
      name: teacher.userId?.fullName,
      email: teacher.userId?.email,
      phone: teacher.phone,
      dob: teacher.userId?.dob,
      role: teacher.userId?.role,
      avatar: teacher.userId?.avatar,
      isActive: teacher.userId?.isActive,
      gender: teacher.gender,
      status: teacher.status,
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

    let keyName = req.body.key;
    let keyValue = req.body.value

    let teacherProfileData = await Teacher.findOne({ keyName:keyValue })
      .populate("userId", "fullName email dob role avatar isActive"); 

      const formattedTeachers = {
      id: teacherProfileData.teacherId,
      name: teacherProfileData.fullName,
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
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndDelete(id);

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

module.exports = { addOrUpdateTeacher, getTeacherDetails, deleteTeacher,getAllTeachersList,getProfileCardData };
