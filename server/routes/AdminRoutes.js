const express = require("express");
const router = express.Router();
const {
  save,
  getAdminDetails,
  deleteAdmin,
  getAllAdminsList,
  getProfileCardData,
} = require("../controllers/AdminController");
const AuthGuard = require("../middleware/AuthGuard");
const RoleGuard = require("../middleware/RoleGuard");

router.post("/save", AuthGuard, RoleGuard(), save);
router.post("/search", AuthGuard, RoleGuard(), getAdminDetails);
router.post("/getAll", AuthGuard, RoleGuard(), getAllAdminsList);
router.post("/getProfileCardData",  getProfileCardData);
router.post("/delete", AuthGuard, RoleGuard(), deleteAdmin);

module.exports = router;
