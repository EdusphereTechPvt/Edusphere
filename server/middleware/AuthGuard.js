const { verifyAccessToken } = require("../utils/tokenUtils");
const User = require("../models/AuthSchema");

module.exports = async function authGuard(req, res, next) {
  try {
    const enc = req.cookies?.accessToken || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!enc) return res.status(401).json({ message: "No token" });

    let decoded;
    try {
      decoded = verifyAccessToken(enc);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    
    const user = await User.findById(decoded.userId).select("-password -sessions");
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
