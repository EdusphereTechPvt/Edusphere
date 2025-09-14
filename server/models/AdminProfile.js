const mongoose = require("mongoose");

const AdminProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    employeeId: {
      type: String,
      unique: true,
      required: true
    },
    designation: {
      type: String,
      required: true,
      minlength: 3
    },
    department: {
      type: String,
      required: true
    },
    contactNumber: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 15
    },
    dateOfJoining: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("AdminProfile", AdminProfileSchema);
