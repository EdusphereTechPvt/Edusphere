const express = require("express");
const { loginController,signupController,verifyToken,oAuthController,} = require("../controllers/AuthController");

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/verify-token", verifyToken);
router.post("/oauth", oAuthController);

module.exports = router;