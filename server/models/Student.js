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
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    name: {
      type: String,
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
    gender: {
      type: String,
      enum: ["Male", "Female"],
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
    status: {
      type: String,
      required: true,
      enum: ["Active", "On Hold", "Inactive"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentProfileSchema);
