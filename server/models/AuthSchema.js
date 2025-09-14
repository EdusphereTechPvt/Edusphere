const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; 
      },
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "student", "parent"],
      default: "student",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String, 
    },
  },
  { timestamps: true }
);

// UID generate before saving user
UserSchema.pre("save", function (next) {
  if (!this.uid) {
    const dobString = this.dob
      ? this.dob.toISOString().split("T")[0].replace(/-/g, "")
      : "00000000";
    const namePart = this.name ? this.name.substring(0, 4).toUpperCase() : "USER";
    this.uid = `${this.role.toUpperCase()}${dobString}${namePart}`;
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);