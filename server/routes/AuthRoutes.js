const express = require("express");
const { loginController,signupController,oAuthController, refreshController, verify, revokeAll, logout, generateInviteToken, searchUser, forgetPassword, verifyTemporaryToken,} = require("../controllers/AuthController");

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/search", searchUser)
router.post("/verifytoken", verifyTemporaryToken)
router.post("/changepassword", forgetPassword)
router.post("/refresh", refreshController);
router.post("/verify", verify);
router.post("/revokeAll", revokeAll);
router.post("/logout", logout);
router.post("/oauth", oAuthController);
router.post("/getInviteToken", generateInviteToken);

module.exports = router;