const mongoose = require("mongoose");

const ParentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    emergencyContact: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 15,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentProfile",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ParentProfile", ParentProfileSchema);
