const mongoose = require("mongoose");

const StudentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    admissionId: {
      type: String,
      unique: true,
      required: true
    },
    class: {
      type: String,
      required: true
    },
    section: {
      type: String,
      required: true
    },
    rollNumber: {
      type: Number,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    bloodGroup: {
      type: String
    },
    address: {
      type: String,
      minlength: 5
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParentProfile"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentProfile", StudentProfileSchema);