const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      unique: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    dob: {
      type: Date,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      minlength: 6
    },
    role: {
      type: String,
      enum: ["super_admin", "admin", "teacher", "parent", "student"],
      required: true
    },
    avatar: {
      type: String
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    googleId: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date
    },
    refreshTokens: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);
// UID auto-generate
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