const express = require("express");
const router = express.Router();
const {
  addOrUpdateQrSession,
  getSessionDetails,
  deleteSession,
  getQr,
  getAllSessions,
} = require("../controllers/QrSessionController");
const AuthGuard = require("../middleware/AuthGuard");
const RoleGuard = require("../middleware/RoleGuard");

router.post("/add", AuthGuard, RoleGuard(), addOrUpdateQrSession);
router.post("/get", AuthGuard, RoleGuard(), getSessionDetails);
router.post("/getQr", AuthGuard, RoleGuard(), getQr);
router.post("/getAll/", AuthGuard, RoleGuard(), getAllSessions);
router.delete("/delete/:id", AuthGuard, RoleGuard(), deleteSession);

module.exports = router;