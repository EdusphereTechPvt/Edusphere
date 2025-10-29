const User = require("../models/AuthSchema");

const getAllUsers = async(req, res) => {
  try {
    console.log("inside users")
    const users = await User.find({ schoolId: req.user.schoolId }).select(
      "name uid dateOfBirth email role isActive lastLogin emailVerified"
    );
    console.log(users)
    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No user found",
        status: false,
      });
    }
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
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

module.exports = { getAllUsers };
