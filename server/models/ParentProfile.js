const mongoose = require("mongoose");

const ParentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  occupation: String,
  emergencyContact: String,
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudentProfile" }],
});

module.exports = mongoose.model("ParentProfile", ParentProfileSchema);