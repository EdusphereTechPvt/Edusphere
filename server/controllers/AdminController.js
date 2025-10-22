const mongoose = require("mongoose");
const User = require("../models/AuthSchema");
const Admin = require("../models/Admin");
const School = require("../models/SchoolSchema");
const { syncReferences } = require("../utils/Sync");

const save = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      _id,
      name,
      email,
      dateOfBirth,
      designation,
      department,
      contactNumber,
      dateOfJoining,
    } = req.body;

    const { schoolId } = req.user;

    if (!name || !email || !schoolId) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Name, Email, and School ID are required",
        status: false,
      });
    }

    let user = await User.findOne({ email }).session(session);
    if (!user) {
      const dobStr = dateOfBirth
        ? new Date(dateOfBirth).toISOString().split("T")[0].replace(/-/g, "")
        : "00000000";
      const password = `${name.split(" ")[0]}@${dobStr}`;
      user = new User({
        name,
        email,
        dateOfBirth,
        schoolId,
        password,
        role: "admin",
      });
      await user.save({ session });
    }

    let admin = await Admin.findOne({ userId: user._id, schoolId }).session(session);

    if (admin) {
      Object.assign(admin, {
        designation,
        department,
        contactNumber,
        dateOfJoining,
      });

      await admin.save({ session });
      await session.commitTransaction();

      return res.status(200).json({
        message: "Admin updated successfully",
        data: admin,
        status: true,
      });
    }

    const newAdmin = new Admin({
      userId: user._id,
      schoolId,
      designation,
      department,
      contactNumber,
      dateOfJoining,
    });

    await newAdmin.save({ session });
    await session.commitTransaction();

    res.status(201).json({
      message: "Admin added successfully",
      data: newAdmin,
      status: true,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error("Admin save error:", err);
    res.status(500).json({
      message: "Server error during admin add/update",
      status: false,
    });
  } finally {
    session.endSession();
  }
};


const getAdminDetails = async (req, res) => {
  const { id, employeeId, name = "", email = "" } = req.body;

  if (![id, employeeId, name, email].some(Boolean)) {
    return res.status(400).json({
      message: "At least one search field is required",
      status: false,
    });
  }

  const searchFields = {};

  if (id && mongoose.Types.ObjectId.isValid(id)) searchFields._id = id;
  if (employeeId) searchFields.employeeId = employeeId;
  if (name) searchFields.name = { $regex: name, $options: "i" };
  if (email) searchFields.email = { $regex: email, $options: "i" };

  try {
    const response = await Admin.find(searchFields).populate(
      "userId",
      "name email dateOfBirth role avatar isActive"
    );

    if (response.length === 0) {
      return res.status(404).json({
        data: [],
        message: "No admin found",
        status: false,
      });
    } else if (response.length === 1) {
      return res.status(200).json({
        data: response[0],
        message: "Admin found successfully",
        status: true,
      });
    }

    return res.status(200).json({
      data: response,
      message: "Multiple admins found successfully",
      status: true,
    });
  } catch (err) {
    console.error("Get Admin Error:", err);
    res.status(500).json({
      message: "Server error while fetching admin details",
      status: false,
    });
  }
};


const getAllAdminsList = async (req, res) => {
  try {
    const admins = await Admin.find({ schoolId: req.user.schoolId }).populate(
      "userId",
      "name email dateOfBirth role avatar isActive"
    );

    if (!admins || admins.length === 0) {
      return res.status(200).json({
        data: [],
        message: "No admin found",
        status: false,
      });
    }

    const formattedAdmins = admins.map((admin) => ({
      adminId: admin.adminId,
      name: admin.userId?.name,
      email: admin.userId?.email,
      contactNumber: admin.contactNumber,
      designation: admin.designation,
      department: admin.department,
      role: admin.userId?.role,
      isActive: admin.userId?.isActive,
    }));

    res.status(200).json({
      data: formattedAdmins,
      message: `${admins.length} admin(s) found successfully`,
      status: true,
    });
  } catch (err) {
    console.error("Get All Admins Error:", err);
    res.status(500).json({
      message: "Server error while fetching admin list",
      status: false,
    });
  }
};


const getProfileCardData = async (req, res) => {
  try {
    let keyName = req.body.searchBy.key;
    let keyValue = req.body.searchBy.value;

    const adminProfile = await Admin.findOne({ [keyName]: keyValue }).populate(
      "userId",
      "name email dateOfBirth role avatar isActive"
    );

    if (!adminProfile) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

    const formattedAdmin = {
      _id: adminProfile._id,
      id: adminProfile.employeeId,
      name: adminProfile.userId?.name,
      avatar: adminProfile.userId?.avatar,
      designation: adminProfile.designation,
      department: adminProfile.department,
    };

    res.status(200).json({
      status: true,
      data: formattedAdmin,
    });
  } catch (err) {
    console.error("Get Admin Profile Error:", err);
    res.status(500).json({
      message: "Server error while fetching admin profile",
      status: false,
    });
  }
};


const deleteAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.body;

    const admin = await Admin.findByIdAndDelete(id).session(session);
    if (!admin) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Admin not found", status: false });
    }

    await User.findByIdAndDelete(admin.userId).session(session);

    await session.commitTransaction();
    res.status(200).json({ message: "Admin deleted successfully", status: true });
  } catch (err) {
    await session.abortTransaction();
    console.error("Delete Admin Error:", err);
    res.status(500).json({ message: "Server error while deleting admin", status: false });
  } finally {
    session.endSession();
  }
};

module.exports = {
  save,
  getAdminDetails,
  getAllAdminsList,
  getProfileCardData,
  deleteAdmin,
};
