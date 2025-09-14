const mongoose = require("mongoose");

const TeacherProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  employeeId: { type: String, unique: true },
  subjects: [String],
  classes: [String],
  qualification: String,
  dateOfJoining: Date,
});

module.exports = mongoose.model("TeacherProfile", TeacherProfileSchema);