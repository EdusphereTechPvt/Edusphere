const express = require("express");
const router = express.Router();
const {
  addOrUpdateQrSession,
  getSessionDetails,
  deleteSession,
} = require("../controllers/QrSessionController");

router.post("/add", addOrUpdateQrSession);
router.post("/get", getSessionDetails);
router.delete("/delete/:id", deleteSession);

module.exports = router;