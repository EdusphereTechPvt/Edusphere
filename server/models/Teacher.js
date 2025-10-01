const mongoose = require("mongoose");

const TeacherProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    schoolId: {
      type: String,
      ref: "School",
      required: true,
    },
    teacherId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],

    joiningDate: {
      type: Date,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },
    experienceYears: {
      type: Number,
      required: true,
    },
    emergencyContactName: {
      type: String,
    },
    emergencyContactRelation: {
      type: String,
    },
    emergencyContactPhone: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherProfileSchema);
