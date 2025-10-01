const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    subjectId: { type: String, unique: true, required: true },
    name: { type: String, required: true, trim: true },
    code: {type: String, required:true},
    description: { type: String },
    classIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
    teacherIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
     schoolId: {
      type: String,
      ref: "School",
      required: true,
    },
    credits: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
