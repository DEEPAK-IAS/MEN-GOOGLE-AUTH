const express = require("express");
const { signUP, signIn, signOut, isLoggedIn, googleSignin } = require("../controllers/auth.controller");
const router = express.Router();



router.post("/signup", signUP)
      .post("/signin", signIn)
      .get("/signout", signOut)
      .get("/google", isLoggedIn, googleSignin)



module.exports = router;
