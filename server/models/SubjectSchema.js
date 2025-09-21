const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      trim: true
    },
    subjectCode: {
      type: String,
      unique: true,
      sparse: true
    },
    department: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: "General"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
