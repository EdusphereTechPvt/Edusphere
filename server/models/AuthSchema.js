const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, unique: true },
    fullName: { type: String, required: true, trim: true },
    dob: { type: Date },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Google signup users don't need password
      },
    },
    role: {
      type: String,
      enum: ["super_admin", "admin", "teacher", "student", "parent"],
      required: true,
    },
    avatar: String,
    isActive: { type: Boolean, default: true },
    lastLogin: Date,
    refreshTokens: [String],
    emailVerified: { type: Boolean, default: false },
    googleId: String,
  },
  { timestamps: true }
);

//Uid generation 
UserSchema.pre("save", function (next) {
  if (!this.uid) {
    const dobString = this.dob
      ? this.dob.toISOString().split("T")[0].replace(/-/g, "")
      : "00000000";
    const namePart = this.fullName
      ? this.fullName.substring(0, 4).toUpperCase()
      : "USER";
    this.uid = `${this.role.toUpperCase()}${dobString}${namePart}`;
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);