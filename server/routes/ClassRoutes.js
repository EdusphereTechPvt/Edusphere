const express = require("express");
const router = express.Router();
const AuthGuard = require("../middleware/AuthGuard");
const RoleGuard = require("../middleware/RoleGuard");
const { addOrUpdateClass, getClasses, deleteClass, getAllClasses, getProfileCardData } = require("../controllers/ClassController");


router.post("/save",AuthGuard, RoleGuard(), addOrUpdateClass);
router.post("/search",AuthGuard, RoleGuard(), getClasses);
router.post("/getProfileCardData", getProfileCardData);
router.post("/getAll/",AuthGuard, RoleGuard(), getAllClasses);
router.post("/delete",AuthGuard, RoleGuard(), deleteClass);

module.exports = router;
