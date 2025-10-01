const mongoose = require("mongoose");

const AdminProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    },
    employeeId: {
      type: String,
      unique: true,
      sparse:true,
      default: () => `EMP-${Date.now()}-${Math.floor(Math.random()*1000)}`
    },
    designation: {
      type: String,
      minlength: 3
    },
    department: {
      type: String,
    },
    contactNumber: {
      type: String,
      minlength: 10,
      maxlength: 15
    },
    dateOfJoining: {
      type: Date,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Admin", AdminProfileSchema);
