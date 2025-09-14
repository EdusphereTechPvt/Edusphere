const mongoose = require("mongoose");

const AdminProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  employeeId: { type: String, unique: true },
  department: String,
  designation: String,
});

module.exports = mongoose.model("AdminProfile", AdminProfileSchema);