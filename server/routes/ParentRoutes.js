const express = require("express");
const router = express.Router();
const {
  save,
  getParentDetails,
  getAllParentsList,
  getProfileCardData,
  deleteParent,
} = require("../controllers/ParentController");
const AuthGuard = require("../middleware/AuthGuard");
const RoleGuard = require("../middleware/RoleGuard");

router.post("/save", AuthGuard, RoleGuard(), save);
router.post("/search", AuthGuard, RoleGuard(), getParentDetails);
router.post("/getAll", AuthGuard, RoleGuard(), getAllParentsList);
router.post("/getProfileCardData", AuthGuard, RoleGuard(), getProfileCardData);
router.post("/delete", AuthGuard, RoleGuard(), deleteParent);

module.exports = router;
