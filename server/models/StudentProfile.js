const mongoose = require("mongoose");

const StudentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    studentId: {
      type: String,
      unique: true,
      sparse: true,
    },
    schoolId: {
      type: String,
      ref: "School",
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },

    enrollmentDate: {
      type: Date,
      required: true,
    },

    previousSchool: {
      type: String,
    },

    guardianName: {
      type: String,
      required: true,
    },

    relationshipToStudent: {
      type: String,
      required: true,
    },

    guardianContact: {
      type: String,
      required: true,
    },

    allergies: {
      type: String,
    },

    medicalConditions: {
      type: String,
    },

    emergencyContacts: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentProfile", StudentProfileSchema);
