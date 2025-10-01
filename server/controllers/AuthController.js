const mongoose = require("mongoose");
const User = require("../models/AuthSchema");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Parent = require("../models/Parent");
const School = require("../models/SchoolSchema");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const admin = require("../utils/Firebase");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} = require("../utils/tokenUtils");
const InviteToken = require("../models/InviteToken");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  // domain: '.edusphere.com'
};

function genJti() {
  return crypto.randomBytes(16).toString("hex");
}

const loginController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {

    const { role, uidOrEmail, password } = req.body;

    const ip = req.ip;
    const ua = req.headers["user-agent"] || "";

    console.log(ip, ua);

    const user = await User.findOne({
      $or: [{ email: uidOrEmail }, { uid: uidOrEmail }],
    }).session(session);

    if (!user)
      return res.status(404).json({ message: "User not found", status: false });

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return res
        .status(423)
        .json({
          message: "Account locked. Try later or contact admin.",
          status: false,
        });
    }

    if (user.role !== role)
      return res
        .status(400)
        .json({ message: "Invalid role for this user", status: false });

    if (user.googleId && user.emailVerified === true)
      return res.status(403).json({
        message: "This account uses Google login. Please login via Google.",
        status: false,
      });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      if (user.failedLoginAttempts >= 5) {
        user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // lock 15 minutes
      }
      await user.save({ session });
      return res
        .status(401)
        .json({ message: "Invalid credentials", status: false });
    }

    user.failedLoginAttempts = 0;
    user.lockedUntil = null;

    const jti = genJti();
    const refreshPayload = { userId: user._id, jti };
    const refreshToken = signRefreshToken(refreshPayload);

    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await user.addSession({ jti, refreshToken, expiresAt, ip, userAgent: ua });

    const accessEnc = signAccessToken({ userId: user._id, role: user.role });

    res.cookie("accessToken", accessEnc, {
      ...cookieOptions,
      maxAge: 10 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    const csrf = crypto.randomBytes(24).toString("hex");
    res.cookie("csrfToken", csrf, {
      secure: cookieOptions.secure,
      sameSite: "Strict",
    });

    user.lastLogin = new Date();
    await user.save({ session });

    const jwtToken = jwt.sign(
      { id: user._id, uid: user.uid, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    session.commitTransaction();

    res.status(200).json({
      message: "Login successful",
      status: true,
      jwtToken,
      csrf,
    });
  } catch (err) {
    session.abortTransaction();
    console.error("Login Error:", err);
    res
      .status(500)
      .json({ message: "Server error during login", status: false });
  }
};

const signupController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, dateOfBirth, email, password, inviteToken } = req.body;

    const invite = await InviteToken.findOne({ token: inviteToken }).session(
      session
    );
    if (!invite || invite.expiresAt < Date.now() || invite.used) {
      throw new Error("Invalid or expired invite token");
    }

    const school = await School.findById(invite.schoolId).session(session);
    if (!school) {
      throw new Error("Invalid school linked to invite");
    }

    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = new User({
      name,
      dateOfBirth: new Date(dateOfBirth),
      email,
      password,
      role: "admin",
      schoolId: school._id,
    });
    await newUser.save({ session });

    const admin = new Admin({
      userId: newUser._id,
      schoolId: school._id,
    });
    await admin.save({ session });

    invite.used = true;
    invite.usedBy = newUser._id;
    invite.usedAt = new Date();
    await invite.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      message: "Admin registered successfully",
      status: true,
      uid: newUser._id,
      schoolId: school.schoolId,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error("Signup Error:", err);
    res
      .status(500)
      .json({
        message: err.message || "Server error during signup",
        status: false,
      });
  } finally {
    session.endSession();
  }
};

const searchUser = async (req, res) => {
  try {
    let { uid, email } = req.body.params;

    let searchParams = {};

    if (uid) searchParams = { ...searchParams, uid: uid };
    if (email) searchParams = { ...searchParams, email: email };

    let user = await User.findOne(searchParams);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    res.status(200).json({
      data: user,
      message: "User fetched successfully",
      status: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", status: false });
  }
};

const forgetPassword = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {

    let { email, password } = req.body;

    let user = await User.findOne({ email }).session(session);

    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    user.password = password;

    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Password updated successfully",
      status: true,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    res.status(500).json({ message: "Server error", status: false });
  }
};

const refreshController = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!refreshToken)
      return res
        .status(401)
        .json({ message: "No refresh token", status: false });

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (e) {
      return res
        .status(403)
        .json({ message: "Invalid refresh token", status: false });
    }

    const { userId, jti } = payload;
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(403)
        .json({ message: "Invalid token (user)", status: false });

    const session = user.sessions.find((s) => s.jti === jti);

    if (!session) {
      user.sessions = [];
      await user.save();
      return res
        .status(403)
        .json({
          message: "Refresh token reuse detected. All sessions revoked.",
          status: false,
        });
    }
    const matches = await bcrypt.compare(
      refreshToken,
      session.refreshTokenHash
    );
    if (!matches) {
      user.sessions = [];
      await user.save();
      return res
        .status(403)
        .json({
          message: "Refresh token reuse detected. All sessions revoked.",
          status: false,
        });
    }

    const newJti = genJti();
    const newRefreshToken = signRefreshToken({ userId: user._id, jti: newJti });
    const newExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    session.replacedBy = newJti;

    await user.addSession({
      jti: newJti,
      refreshToken: newRefreshToken,
      expiresAt: newExpiresAt,
      ip: req.ip,
      userAgent: req.headers["user-agent"] || "",
      fingerprint: req.body?.fingerprint || null,
    });
    await user.save();

    // Signed + encrypted access token
    const newAccessEnc = signAccessToken({ userId: user._id, role: user.role });
    res.cookie("accessToken", newAccessEnc, {
      ...cookieOptions,
      maxAge: 10 * 60 * 1000,
    });
    res.cookie("refreshToken", newRefreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // rotate csrf token
    const csrf = crypto.randomBytes(24).toString("hex");
    res.cookie("csrfToken", csrf, {
      secure: cookieOptions.secure,
      sameSite: "Strict",
    });

    res.json({ status: true, csrf });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", status: false });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!refreshToken) {
      res.clearCookie("accessToken", cookieOptions);
      res.clearCookie("refreshToken", cookieOptions);
      res.clearCookie("csrfToken", {
        sameSite: "Strict",
        secure: cookieOptions.secure,
      });
      return res.json({ status: true, message: "Logged out" });
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      res.clearCookie("accessToken", cookieOptions);
      res.clearCookie("refreshToken", cookieOptions);
      res.clearCookie("csrfToken", {
        sameSite: "Strict",
        secure: cookieOptions.secure,
      });
      return res.json({ status: true, message: "Logged out" });
    }

    const user = await User.findById(payload.userId);
    if (user) {
      user.sessions = user.sessions.filter((s) => s.jti !== payload.jti);
      await user.save();
    }

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    res.clearCookie("csrfToken", {
      sameSite: "Strict",
      secure: cookieOptions.secure,
    });
    return res.json({ status: true, message: "Logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", status: false });
  }
};

const revokeAll = async (req, res) => {
  try {
    // require auth: you can call authGuard first or check refresh token user
    // for brevity assume userId in body and validation done
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.clearAllSessions();
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    res.clearCookie("csrfToken", {
      sameSite: "Strict",
      secure: cookieOptions.secure,
    });
    res.json({ status: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", status: false });
  }
};

const verify = async (req, res) => {
  try {
    const enc =
      req.cookies?.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!enc)
      return res.status(401).json({ message: "No token", status: false });
    let decoded;
    try {
      const decryptToken = decodeURIComponent(enc);
      decoded = verifyAccessToken(decryptToken);
    } catch (e) {
      return res
        .status(401)
        .json({ message: "Invalid or expired token", status: false });
    }
    const user = await User.findById(decoded.userId).select(
      "-password -sessions"
    );
    if (!user)
      return res
        .status(401)
        .json({ message: "Unauthenticated", status: false });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", status: false });
  }
};

const oAuthController = async (req, res) => {
  try {
    const { token, role, dateOfBirth, name } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken)
      return res
        .status(400)
        .json({ message: "Invalid Google Token", status: false });

    let user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      user = new User({
        name: name || decodedToken.name,
        dateOfBirth: dateOfBirth || null,
        email: decodedToken.email,
        googleId: decodedToken.uid,
        role,
        emailVerified: true,
      });
      await user.save();

      switch (role) {
        case "student":
          await new Student({ userId: user._id }).save();
          break;
        case "teacher":
          await new Teacher({ userId: user._id }).save();
          break;
        case "parent":
          await new Parent({ userId: user._id }).save();
          break;
        case "admin":
          await new Admin({ userId: user._id }).save();
          break;
        default:
          return res
            .status(400)
            .json({ message: "Invalid role", status: false });
      }
    }

    const jwtToken = jwt.sign(
      { id: user._id, uid: user.uid, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Google login successful",
      status: true,
      jwtToken,
      user,
    });
  } catch (err) {
    console.error("OAuth Error:", err);
    res.status(500).json({
      message: "Internal server error during Google login",
      status: false,
    });
  }
};

const generateInviteToken = async (req, res) => {
  try {
    const { schoolName, address, contactEmail, contactPhone } = req.body;

    const schoolId = crypto.randomBytes(8).toString("hex");
    const school = new School({
      name: schoolName,
      address,
      contactEmail,
      contactPhone,
      schoolId,
    });
    await school.save();

    const token = crypto.randomBytes(16).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const invite = new InviteToken({
      token,
      schoolId: school._id,
      expiresAt,
    });
    await invite.save();

    res.status(201).json({
      inviteToken: token,
      schoolId,
      expiresAt,
      status: true,
    });
  } catch (err) {
    console.error("Invite Token Error:", err);
    res.status(500).json({ message: "Server error", status: false });
  }
};

const ping = async(req,res) => {
   try {
    res.status(200).json({
      status: true,
      authorized: true,
      message: "User is online & authorized",
    });
  } catch (err) {
    console.error("Ping Error:", err);
    res.status(500).json({ status: false, authorized: false, message: "Server error" });
  }
};

module.exports = {
  loginController,
  signupController,
  searchUser,
  forgetPassword,
  verify,
  revokeAll,
  logout,
  refreshController,
  generateInviteToken,
  oAuthController,
  ping
};
