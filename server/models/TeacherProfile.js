
const mongoose = require("mongoose");

const TeacherProfileSchema = new mongoose.Schema({
    
  userId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "User", required: true,
      unique: true },

  employeeId: { 
    type: String, 
    unique: true, required: true,
     minlength: 3 },

  subjects: {
     type: [String],
      required: true },

  classes: { 
    type: [String], 
    required: true },

  qualification: {
     type: String,
      minlength: 3 },

  dateOfJoining: { 
    type: Date,
     required: true },

}, { timestamps: true });

module.exports = mongoose.model("TeacherProfile", TeacherProfileSchema);
