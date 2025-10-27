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
    adminId: {
      type: String,
      unique: true,
      sparse:true,
      default: () => `EMP-${Date.now()}`
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
    }, 
    
     photo: {
      type: String, // URL or base64
      default: null
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 15,
      default: null
    },
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
      lowercase: true,
      trim: true,
      default: null
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Admin", AdminProfileSchema);
