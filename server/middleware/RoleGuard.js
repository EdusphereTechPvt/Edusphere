const AccessControl = require("../models/AccessControl");
const Admin = require("../models/Admin");
const Parent = require("../models/Parent");
const School = require("../models/SchoolSchema");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

module.exports = function roleGuard() {
  return async function (req, res, next) {
    try {
      let user = req.user;
      if (!user) return res.status(401).json({ message: "Unauthorized" });

      const method = req.method;

      const page = req.query.page || req.headers["x-page"] || req.body.page;

      const permission = await AccessControl.findOne({
        role: user.role,
        page,
        method,
        allowed: true,
      });

      console.log(user.role, page,method)
      console.log("Permission" , permission)

      if (!permission) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      const userProfile = await getUserProfile(user._id, user.role)

      const schoolDetails = await School.findOne({_id: userProfile.schoolId})

      if (schoolDetails) {
        user = {
          ...user.toObject?.() || user, 
          schoolId: schoolDetails._id,
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


const getUserProfile = async(id,role) => {

  switch(role){
    case "admin":
      return await Admin.findOne({userId: id})
    case "teacher":
      return await Teacher.findOne({userId: id})
    case "student":
      return await Student.findOne({userId:id})
    case "parent":
      return await Parent.findOne({userId: id})
  }
}