// const mongoose = require("mongoose");

// const TeacherProfileSchema = new mongoose.Schema({

//   userId: {
//      type: mongoose.Schema.Types.ObjectId,
//      ref: "User", required: true,
//       unique: true },

//   employeeId: {
//     type: String,
//     unique: true, required: true,
//      minlength: 3 },

//   subjects: {
//      type: [String],
//       required: true },

//   classes: {
//     type: [String],
//     required: true },

//   qualification: {
//      type: String,
//       minlength: 3 },

//   dateOfJoining: {
//     type: Date,
//      required: true },

// }, { timestamps: true });

// module.exports = mongoose.model("TeacherProfile", TeacherProfileSchema);

const mongoose = require("mongoose");

const TeacherProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      required: true,
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

    teacherId: {
      type: String,
      unique: true,
      sparse: true,
    },

    subjects: [
      {
        type: String,
        required: true,
      },
    ],

    classesAssigned: [
      {
        type: String,
      },
    ],

    joiningDate: {
      type: Date,
      required: true,
    },

    qualification: {
      type: String,
    },

    experienceYears: {
      type: Number,
    },

    emergencyContact: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeacherProfile", TeacherProfileSchema);
