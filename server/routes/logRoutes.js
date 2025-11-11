const express = require("express");
const router = express.Router();
const AuthGuard = require("../middleware/AuthGuard");
const RoleGuard = require("../middleware/RoleGuard");
const { getAllLogs } = require("../controllers/LogController");

router.post("/save", AuthGuard, RoleGuard(), addorUpdateLog);
router.post("/search", AuthGuard, RoleGuard(), getLog);
router.post("/getAll/", AuthGuard, RoleGuard(), getAllLogs);
router.post("/delete", AuthGuard, RoleGuard(), deleteLog);

module.exports = router;


