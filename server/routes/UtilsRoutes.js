const express = require("express");
const { getDistinctValues, sendEmailController } = require("../controllers/UtilsController");
const AuthGuard = require("../middleware/AuthGuard");
const RoleGuard = require("../middleware/RoleGuard");
const router = express.Router();

router.post("/distinct-values",AuthGuard, RoleGuard(), getDistinctValues);
router.post("/sendEmail", sendEmailController);

module.exports = router;
