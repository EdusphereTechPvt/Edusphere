const { default: mongoose } = require("mongoose");


const SectionSchema = new mongoose.Schema({
  sectionId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
   classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  capacity: { type: Number, default: 40 },
  roomNumber: { type: String },
  schoolId: {
      type: String,
      ref: "School",
      required: true,
    },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Section", SectionSchema);