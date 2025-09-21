const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    contactEmail: { type: String, required: true, unique: true },
    contactPhone: { type: String, required: true },
    establishedYear: { type: Number },
    website: { type: String },
    logoUrl: { type: String },
    isActive: { type: Boolean, default: true },
    adminId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    schoolId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("School", SchoolSchema);
