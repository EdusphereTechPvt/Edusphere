const User = require("../models/AuthSchema");
const StudentProfile = require("../models/StudentProfile");
const TeacherProfile = require("../models/TeacherProfile");
const ParentProfile = require("../models/ParentProfile");
const AdminProfile = require("../models/AdminProfile");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admin = require("../utils/Firebase");


//login controller
const loginController = async (req, res) => {
  try {
    const { type, uidOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: uidOrEmail }, { uid: uidOrEmail }],
    });

    if (!user) return res.status(404).json({ message: "User not found", status: false });

    if (user.role !== type) {
      return res.status(400).json({ message: "Invalid role for this user", status: false });
    }

    if (user.googleId && user.emailVerified === true) {
      return res.status(403).json({
        message: "This account uses Google login. Please login via Google.",
        status: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password", status: false });
    }

    const jwtToken = jwt.sign(
      { id: user._id, uid: user.uid, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", status: true, jwtToken, user });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login", status: false });
  }
};

//signup controller
const signupController = async (req, res) => {
  try {
    const { fullName, dob, email, password, role, extraData } = req.body;

  
    if (req.user?.role !== "admin" && req.user?.role !== "super_admin") {
      return res.status(403).json({ message: "Only admin can create accounts", status: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      dob,
      email,
      password: hashedPassword,
      role,
      emailVerified: false,
    });

    await newUser.save();

    if (role === "student") {
      await new StudentProfile({ userId: newUser._id, ...extraData }).save();
    } else if (role === "teacher") {
      await new TeacherProfile({ userId: newUser._id, ...extraData }).save();
    } else if (role === "parent") {
      await new ParentProfile({ userId: newUser._id, ...extraData }).save();
    } else if (role === "admin") {
      await new AdminProfile({ userId: newUser._id, ...extraData }).save();
    }

    res.status(201).json({ message: "User registered successfully", status: true, uid: newUser.uid });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error during signup", status: false });
  }
};
//verify token
const verifyToken = (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "No token provided", status: false });

    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ status: true, decoded });
  } catch (error) {
    console.error("JWT Error:", error);
    res.status(401).json({ message: "Invalid or expired token", status: false });
  }
};

const oAuthController = async (req, res) => {
  try {
    const { token, role, dob, fullName, extraData } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) return res.status(400).json({ message: "Invalid Google Token" });

    let user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      user = new User({
        fullName: fullName || decodedToken.name,
        dob: dob || null,
        email: decodedToken.email,
        googleId: decodedToken.uid,
        role,
        emailVerified: true,
      });
      await user.save();

    
      if (role === "student") {
        await new StudentProfile({ userId: user._id, ...extraData }).save();
      } else if (role === "teacher") {
        await new TeacherProfile({ userId: user._id, ...extraData }).save();
      } else if (role === "parent") {
        await new ParentProfile({ userId: user._id, ...extraData }).save();
      } else if (role === "admin") {
        await new AdminProfile({ userId: user._id, ...extraData }).save();
      }
    }
    const jwtToken = jwt.sign(
      { id: user._id, uid: user.uid, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Google login successful", status: true, jwtToken, user });
  } catch (err) {
    console.error("OAuth Error:", err);
    res.status(500).json({ message: "Internal server error during Google login", status: false });
  }
};

module.exports = {
  loginController,
  signupController,
  verifyToken,
  oAuthController,
};