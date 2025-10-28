const { default: mongoose } = require("mongoose");
const User = require("../models/AuthSchema");
const Admin = require("../models/Admin");
const School = require("../models/SchoolSchema");
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
      email,
      phone,
      photo,
      department,
      designation,
      contactNumber,
      dateOfJoining,
      dateOfBirth,
      isActive,
    } = req.body;

    const { schoolId } = req.user;

    if (!name || !email || !schoolId) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Full Name, Email, and School ID are required",
        status: false,
      });
    }

    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser && !_id) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "A user with this email already exists.",
        status: false,
      });
    }

    let user = await User.findOne({ email }).session(session);

    if (!user) {
      const password = `${name.split(" ")[0]}@${new Date().getFullYear()}`;
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
        name,
        email,
        phone,
        photo,
        department,
        designation,
        contactNumber,
        dateOfJoining,
        isActive,
        dateOfBirth
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
      name,
      email,
      phone,
      photo,
      department: department ?? "N/A",
      designation: designation ?? "N/A",
      contactNumber,
      dateOfJoining,
      isActive,
      dateOfBirth,
      adminId: `EMP-${Date.now()}`,
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
    console.error("Admin Save Error:", err);
    res.status(500).json({
      message: "Server error during admin add/update",
      status: false,
    });
  } finally {
    session.endSession();
  }
};


const getAdminDetails = async (req, res) => {
  const { id, adminId, name = "", email = "", phone = "" } = req.body;

  if (![id, adminId, name, email, phone].some(Boolean)) {
    return res.status(400).json({
      message: "At least one search field is required",
      status: false,
    });
  }

  const searchFields = {};

  if (id && mongoose.Types.ObjectId.isValid(id)) searchFields._id = id;
  if (adminId) searchFields.adminId = adminId;
  if (name) searchFields.name = { $regex: name, $options: "i" };
  if (email) searchFields.email = { $regex: email, $options: "i" };
  if (phone) searchFields.phone = { $regex: phone, $options: "i" };

  try {
    const response = await Admin.find(searchFields)



    if (!response.length) {
      return res.status(404).json({ data: [], message: "No admin found", status: false });
    }

    if (response.length === 1) {
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
  } catch (error) {
    console.error("Error fetching admin details:", error);
    return res.status(500).json({
      message: "Server error while fetching admin details",
      status: false,
    });
  }
};


const getAllAdminsList = async (req, res) => {
  try {
    const admins = await Admin.find({
      schoolId: req.user.schoolId,
    }).populate("userId", "name email avatar role isActive");

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
      phone: admin.phone,
      avatar: admin.photo,
      role: admin.userId?.role,
      isActive: admin.userId?.isActive,
      designation: admin.designation,
      department: admin.department,
    }));

    res.status(200).json({
      data: formattedAdmins,
      message: `${admins.length} admin(s) found successfully`,
      status: true,
    });
  } catch (err) {
    console.error("Get All Admins Error:", err);
    res.status(500).json({
      message: "Server error while fetching admin details",
      status: false,
    });
  }
};


const getProfileCardData = async (req, res) => {
  try {
    const keyName = req.body.searchBy.key;
    const keyValue = req.body.searchBy.value;

    let adminProfileData = await Admin.findOne({ [keyName]: keyValue })
      .populate("userId", "name email avatar role isActive");

    if (!adminProfileData) {
      return res.status(404).json({ message: "Admin not found", status: false });
    }

    const formattedAdmin = {
      _id: adminProfileData._id,
      id: adminProfileData.adminId,
      name: adminProfileData.userId?.name,
      avatar: adminProfileData.userId?.avatar,
      designation: adminProfileData.designation,
      department: adminProfileData.department,
    };

    res.status(200).json({ status: true, data: formattedAdmin });
  } catch (err) {
    console.error("Get Admin Error:", err);
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
  deleteAdmin,
  getAllAdminsList,
  getProfileCardData,
};

