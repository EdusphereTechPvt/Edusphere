const express = require("express");

const { addOrUpdateQrSession, getSessionDetails, deleteSession } = require("../controllers/QrSessionController")
const router = express.Router();

router.post("/addOrUpdate", addOrUpdateQrSession);
router.post("/search", getSessionDetails);
router.delete("/delete/:id", deleteSession);

module.exports = router;