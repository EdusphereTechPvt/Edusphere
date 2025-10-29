const express = require("express");
const router = express.Router();
const AuthGuard = require("../middleware/AuthGuard");
const RoleGuard = require("../middleware/RoleGuard");
const { getAllUsers } = require("../controllers/UserController");

router.post("/getAll/",AuthGuard, RoleGuard(), getAllUsers);

module.exports = router;
