const User = require("../models/AuthSchema");
const StudentProfile = require("../models/StudentProfile");
const TeacherProfile = require("../models/TeacherProfile");
const ParentProfile = require("../models/ParentProfile");
const AdminProfile = require("../models/AdminProfile");
//const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admin = require("../utils/Firebase");



// if (!JWT_SECRET) {
//   console.error("JWT_SECRET is not defined in .env");
//   process.exit(1); 
// }


// login controller
const loginController = async (req, res) => {
  try {
    const { type, uidOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: uidOrEmail }, { uid: uidOrEmail }],
    });

    if (!user)
      return res.status(404).json({ message: "User not found", status: false });

    if (user.role !== type)
      return res
        .status(400)
        .json({ message: "Invalid role for this user", status: false });

    if (user.googleId && user.emailVerified === true)
      return res.status(403).json({
        message: "This account uses Google login. Please login via Google.",
        status: false,
      });

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Incorrect password", status: false });


    user.lastLogin = new Date();
    await user.save();

    const jwtToken = jwt.sign(
      { id: user._id, uid: user.uid, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      status: true,
      jwtToken,
      user,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login", status: false });
  }
};

//signup controller
const signupController = async (req, res) => {
  try {
    const { fullName, dob, email, password, role, extraData = {} } = req.body;


   // Signup controller
if (!req.user || (req.user.role !== "admin" && req.user.role !== "super_admin")) {
  return res.status(403).json({ message: "Only admin or super_admin can create accounts",
     status: false });
}


    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exists", status: false });

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
    switch (role) {
      case "student":
      
        if (
          !extraData.admissionId ||
          !extraData.class ||
          !extraData.section ||
          !extraData.rollNumber ||
          !extraData.dateOfBirth
        ) {
          return res
            .status(400)
            .json({ message: "Missing required student fields", status: false });
        }
        await new StudentProfile({ userId: newUser._id, ...extraData }).save();
        break;

      case "teacher":
        if (
          !extraData.employeeId ||
          !extraData.subjects ||
          !extraData.classes ||
          !extraData.dateOfJoining
        ) {
          return res
            .status(400)
            .json({ message: "Missing required teacher fields", status: false });
        }
        await new TeacherProfile({ userId: newUser._id, ...extraData }).save();
        break;

      case "parent":
        if (!extraData.occupation || !extraData.emergencyContact) {
          return res
            .status(400)
            .json({ message: "Missing required parent fields", status: false });
        }
        await new ParentProfile({ userId: newUser._id, ...extraData }).save();
        break;

      case "admin":
        if (
          !extraData.employeeId ||
          !extraData.designation ||
          !extraData.department ||
          !extraData.contactNumber ||
          !extraData.dateOfJoining
        ) {
          return res
            .status(400)
            .json({ message: "Missing required admin fields", status: false });
        }
        await new AdminProfile({ userId: newUser._id, ...extraData }).save();
        break;

      default:
        return res.status(400).json({ message: "Invalid role", status: false });
    }

    res.status(201).json({
      message: "User registered successfully",
      status: true,
      uid: newUser.uid,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res
      .status(500)
      .json({ message: "Server error during signup", status: false });
  }
};

//verify token 
const verifyToken = (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res.status(401).json({ message: "No token provided", status: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ status: true, decoded });
  } catch (error) {
    console.error("JWT Error:", error);
    res
      .status(401)
      .json({ message: "Invalid or expired token", status: false });
  }
};

// google auth 
const oAuthController = async (req, res) => {
  try {
    const { token, role, dob, fullName, extraData = {} } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken)
      return res.status(400).json({ message: "Invalid Google Token", status: false });

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

      
      switch (role) {
        case "student":
          await new StudentProfile({ userId: user._id, ...extraData }).save();
          break;
        case "teacher":
          await new TeacherProfile({ userId: user._id, ...extraData }).save();
          break;
        case "parent":
          await new ParentProfile({ userId: user._id, ...extraData }).save();
          break;
        case "admin":
          await new AdminProfile({ userId: user._id, ...extraData }).save();
          break;
        default:
          return res.status(400).json({ message: "Invalid role", status: false });
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

module.exports = {
  loginController,
  signupController,
  verifyToken,
  oAuthController,
};
