const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "14", 10);

const SessionSchema = new mongoose.Schema({
  jti: { type: String, required: true, index: true },
  refreshTokenHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  ip: { type: String },
  userAgent: { type: String },
  replacedBy: { type: String, default: null },
});

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
      minlength: 3,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "parent", "student"],
      required: true,
    },
    avatar: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    sessions: {
      type: [SessionSchema],
      default: [],
    },
    failedLoginAttempts: { type: Number, default: 0 },
    lockedUntil: { type: Date, default: null },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.uid) {
    const dateOfBirthString = this.dateOfBirth
      ? this.dateOfBirth.toISOString().split("T")[0].replace(/-/g, "")
      : "00000000";
    const namePart = this.name
      ? this.name.substring(0, 4).toUpperCase()
      : "USER";
    this.uid = `${this.role.toUpperCase()}${dateOfBirthString}${namePart}`;
  }
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

UserSchema.methods.addSession = async function ({ jti, refreshToken, expiresAt, ip, userAgent, fingerprint }) {
  const hash = await bcrypt.hash(refreshToken, SALT_ROUNDS);
  this.sessions.push({ jti, refreshTokenHash: hash, expiresAt, ip, userAgent, fingerprint });
  if (this.sessions.length > 20) this.sessions = this.sessions.slice(-20);
  await this.save();
};

UserSchema.methods.findSession = async function (jti, refreshToken) {
  const s = this.sessions.find(x => x.jti === jti);
  if (!s) return null;
  const ok = await bcrypt.compare(refreshToken, s.refreshTokenHash);
  return ok ? s : null;
};

UserSchema.methods.removeSession = async function (jti) {
  this.sessions = this.sessions.filter(x => x.jti !== jti);
  await this.save();
};

UserSchema.methods.clearAllSessions = async function () {
  this.sessions = [];
  await this.save();
};


module.exports = mongoose.model("User", UserSchema);
