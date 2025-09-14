const mongoose = require("mongoose");

const StudentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  admissionId: { type: String, unique: true },
  class: String,
  section: String,
  rollNumber: Number,
  dateOfBirth: Date,
  bloodGroup: String,
  address: String,
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "ParentProfile" },
});

module.exports = mongoose.model("StudentProfile", StudentProfileSchema);