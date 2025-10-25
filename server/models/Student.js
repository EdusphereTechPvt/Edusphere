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

    classes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    sections: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },

    name: {
      type: String,
      required: true
    },

    dateOfBirth: {
      type: Date,
      required: true
    },

    gender: {
      type: String, enum: ["Male", "Female", "Other"],
      required: true
    },


    parentName: {
      type: String,
      required: true
    },

    guardianName: {
      type: String
    },

    parentEmail: {
      type: String,
      required: true
    },

    parentContactNumber: {
      type: String,
      required: true
    },

    parentOccupation: {
      type: String
    },
    motherName: {
      type: String
    },

    contactNumber: {
      type: String
    },

    address: {
      type: String
    },

    photo: {
      type: String
    },
    // qrId: { type: String },

    enrollmentDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Active", "On Hold", "Inactive"],
      default: "Active",
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentProfileSchema);
