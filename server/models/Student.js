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

    name: {
      type: String,
      required: true,
    },

    studentEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
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
    contactNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    previousSchool: {
      typr: String,
    },
    photo: {
      type: String,
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    enrollmentDate: {
      type: Date,
      default: Date.now,
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentProfileSchema);
