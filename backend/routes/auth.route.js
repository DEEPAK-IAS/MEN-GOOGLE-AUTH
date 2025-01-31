const express = require("express");
const { signUP, signIn, signOut, isLoggedIn, googleSignin, resetPassword, verifyOTP} = require("../controllers/auth.controller");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();



router.post("/signup", signUP)
      .post("/signin", signIn)
      .get("/signout", signOut)
      .get("/google", isLoggedIn, googleSignin)
      .post("/reset-password", verifyToken, resetPassword)
      .post("/verify-OTP", verifyOTP);



module.exports = router;
