const AccessControl = require("../models/AccessControl");
const School = require("../models/SchoolSchema")

module.exports = function roleGuard(page) {
  return async function (req, res, next) {
    try {
      let user = req.user;
      if (!user) return res.status(401).json({ message: "Unauthorized" });

      const method = req.method;

      // Look up permissions in DB
      const permission = await AccessControl.findOne({
        role: user.role,
        page,
        method,
        allowed: true,
      });

      if (!permission) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      const schoolDetails = await School.findOne({adminId: user._id})

      if (schoolDetails) {
        user = {
          ...user.toObject?.() || user, 
          schoolId: schoolDetails.schoolId,
        };

        req.user = user;
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
};
