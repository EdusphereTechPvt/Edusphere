const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      trim: true
    },
    academicYear: {
      type: String,
      required: true
    },
    roomNo: {
      type: String
    },
    estimatedStudents: {
      type: Number,
      required: true
    },
    classTeacher: {
      type: String,
      required: true
    },
    mediumOfInstruction: {
      type: String,
      required: true
    },
    comments: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", ClassSchema);
